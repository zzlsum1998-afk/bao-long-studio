(() => {
  'use strict';

  const SCENARIO_KEY = 'baolong.noai.scenario.v2';
  const JOBS_KEY = 'baolong.noai.jobs.v2';
  const REQUESTS_KEY = 'baolong.noai.requests.v2';
  const SESSION_COOKIE = '__Host-baolong_preview_session';
  const CSRF_COOKIE = '__Host-baolong_csrf';
  const ALLOWLIST_EMAIL = 'preview.allowlist@example.test';
  const ALLOWLIST_PASSWORD = 'PreviewOnly!123';
  const REQUEST_ID_RE = /^[A-Za-z0-9._-]{8,64}$/;
  const JOB_ID_RE = /^[0-9a-f]{32}$/;

  function restoreMap(key) {
    try {
      const entries = JSON.parse(sessionStorage.getItem(key) || '[]');
      return new Map(Array.isArray(entries) ? entries : []);
    } catch {
      return new Map();
    }
  }

  const jobs = restoreMap(JOBS_KEY);
  const requests = restoreMap(REQUESTS_KEY);
  const metrics = window.__BAOLONG_NO_AI_METRICS;
  const persistMetrics = window.__BAOLONG_NO_AI_PERSIST_METRICS || (() => {});
  if (!metrics) throw new Error('The no-AI network guard must load before the adapter.');

  function randomHex(bytes = 16) {
    const buffer = new Uint8Array(bytes);
    crypto.getRandomValues(buffer);
    return Array.from(buffer, (value) => value.toString(16).padStart(2, '0')).join('');
  }

  function internalCorrelationId() {
    return `preview-corr-${randomHex(8)}`;
  }

  function readCookie(name) {
    const prefix = `${encodeURIComponent(name)}=`;
    const item = document.cookie.split(';').map((value) => value.trim()).find((value) => value.startsWith(prefix));
    return item ? decodeURIComponent(item.slice(prefix.length)) : null;
  }

  function setSecureCookie(name, value) {
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=/; Secure; SameSite=Strict`;
  }

  function clearSecureCookie(name) {
    document.cookie = `${encodeURIComponent(name)}=; Path=/; Secure; SameSite=Strict; Max-Age=0`;
  }

  function getSession() {
    if (readCookie(SESSION_COOKIE) !== '1') return null;
    const csrfToken = readCookie(CSRF_COOKIE);
    return csrfToken ? {email: ALLOWLIST_EMAIL, csrfToken} : null;
  }

  function setSession(value) {
    if (value) {
      setSecureCookie(SESSION_COOKIE, '1');
      setSecureCookie(CSRF_COOKIE, value.csrfToken);
    } else {
      clearSecureCookie(SESSION_COOKIE);
      clearSecureCookie(CSRF_COOKIE);
    }
  }

  function jsonResponse(status, body, requestId) {
    return new Response(JSON.stringify(body), {
      status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Request-ID': requestId
      }
    });
  }

  function ok(data, requestId, extra = {}) {
    return jsonResponse(extra.status || 200, {
      ok: true,
      requestId,
      data,
      ...extra.body
    }, requestId);
  }

  function fail(status, code, message, requestId) {
    return jsonResponse(status, {
      ok: false,
      requestId,
      error: {code, message}
    }, requestId);
  }

  function getScenario() {
    return sessionStorage.getItem(SCENARIO_KEY) || 'success';
  }

  function setScenario(value) {
    sessionStorage.setItem(SCENARIO_KEY, String(value || 'success'));
  }

  function persistMaps() {
    sessionStorage.setItem(JOBS_KEY, JSON.stringify(Array.from(jobs.entries())));
    sessionStorage.setItem(REQUESTS_KEY, JSON.stringify(Array.from(requests.entries())));
  }

  function header(headers, name) {
    const target = name.toLowerCase();
    const entry = Object.entries(headers || {}).find(([key]) => key.toLowerCase() === target);
    return entry ? entry[1] : null;
  }

  function recordRequest(path, method, headers) {
    const browserRequestId = header(headers, 'X-Request-ID');
    const csrf = header(headers, 'X-CSRF-Token');
    metrics.apiRequests += 1;
    metrics.requestLog.push({
      path,
      method,
      hasBrowserRequestId: Boolean(browserRequestId),
      requestIdLength: browserRequestId ? String(browserRequestId).length : 0,
      requestIdSafe: browserRequestId ? REQUEST_ID_RE.test(String(browserRequestId)) : null,
      hasCsrfHeader: Boolean(csrf)
    });
    if (metrics.requestLog.length > 80) metrics.requestLog.splice(0, metrics.requestLog.length - 80);
    persistMetrics();
    return browserRequestId;
  }

  async function sha256Hex(bytes) {
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, '0')).join('');
  }

  async function formFingerprint(form) {
    const file = form.get('images');
    const metadata = JSON.stringify({
      templateId: form.get('templateId'),
      parametersJson: form.get('parametersJson'),
      additionalNotes: form.get('additionalNotes'),
      type: file instanceof File ? file.type : '',
      size: file instanceof File ? file.size : 0
    });
    const metaBytes = new TextEncoder().encode(metadata);
    const fileBytes = file instanceof File ? new Uint8Array(await file.arrayBuffer()) : new Uint8Array();
    const combined = new Uint8Array(metaBytes.length + fileBytes.length);
    combined.set(metaBytes, 0);
    combined.set(fileBytes, metaBytes.length);
    return sha256Hex(combined);
  }

  function requireSession(requestId) {
    const session = getSession();
    if (!session) return {error: fail(401, 'SESSION_INVALID', 'The session is invalid.', requestId)};
    return {session};
  }

  function requireCsrf(headers, requestId) {
    const session = getSession();
    const token = header(headers, 'X-CSRF-Token');
    if (!session || !token || token !== session.csrfToken) {
      return fail(403, 'CSRF_VALIDATION_FAILED', 'CSRF validation failed.', requestId);
    }
    return null;
  }

  async function handleLogin(body, requestId) {
    let payload = {};
    try { payload = JSON.parse(String(body || '{}')); }
    catch { return fail(422, 'REQUEST_VALIDATION_FAILED', 'Invalid JSON.', requestId); }
    if (String(payload.email || '').toLowerCase() !== ALLOWLIST_EMAIL || String(payload.password || '') !== ALLOWLIST_PASSWORD) {
      return fail(403, 'PUBLIC_ACCESS_NOT_ALLOWED', 'Public access is not allowed.', requestId);
    }
    const session = {email: ALLOWLIST_EMAIL, csrfToken: `preview-${randomHex(12)}`};
    setSession(session);
    return ok({
      csrfToken: session.csrfToken,
      user: {email: ALLOWLIST_EMAIL, emailVerified: true}
    }, requestId);
  }

  async function handleSubmit(body, headers, browserRequestId, responseId) {
    metrics.submitCalls += 1;
    metrics.lastSubmitRequestId = browserRequestId || null;
    persistMetrics();
    if (!REQUEST_ID_RE.test(browserRequestId || '')) {
      return fail(422, 'GENERATION_REQUEST_ID_REQUIRED', 'A valid browser request ID is required.', responseId);
    }
    const auth = requireSession(responseId);
    if (auth.error) return auth.error;
    const csrfError = requireCsrf(headers, responseId);
    if (csrfError) return csrfError;
    if (!(body instanceof FormData)) return fail(422, 'REQUEST_VALIDATION_FAILED', 'Multipart form data is required.', responseId);

    if (getScenario() === 'quota') return fail(429, 'QUOTA_ACCOUNT_EXCEEDED', 'Account quota exceeded.', responseId);

    const templateId = String(body.get('templateId') || '');
    const file = body.get('images');
    if (templateId !== 'su-white-model-competition-atmosphere-v1') return fail(422, 'PUBLIC_REQUEST_REJECTED', 'Unknown template.', responseId);
    if (!(file instanceof File) || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return fail(415, 'UNSUPPORTED_MIME', 'Unsupported image type.', responseId);

    const fingerprint = await formFingerprint(body);
    const existing = requests.get(browserRequestId);
    if (existing) {
      if (existing.fingerprint !== fingerprint) return fail(409, 'GENERATION_REQUEST_CONFLICT', 'The request ID conflicts with another payload.', responseId);
      return ok({jobId: existing.jobId}, responseId, {status: 202, body: {idempotentReplay: true}});
    }

    const jobId = randomHex(16);
    const scenario = getScenario();
    const job = {
      id: jobId,
      state: 'queued',
      polls: 0,
      scenario,
      createdAt: new Date().toISOString()
    };
    jobs.set(jobId, job);
    requests.set(browserRequestId, {fingerprint, jobId});
    persistMaps();
    metrics.providerInvocations += 1;
    persistMetrics();

    if (scenario === 'unknown-once') {
      setScenario('success');
      throw new TypeError('SIMULATED_UNKNOWN_TRANSPORT_AFTER_ACCEPT');
    }

    return ok({jobId}, responseId, {status: 202, body: {idempotentReplay: false}});
  }

  function handleStatus(jobId, responseId) {
    const auth = requireSession(responseId);
    if (auth.error) return auth.error;
    if (!JOB_ID_RE.test(jobId)) return fail(404, 'HTTP_404', 'Not found.', responseId);
    const job = jobs.get(jobId);
    if (!job) return fail(404, 'GENERATION_NOT_FOUND', 'Not found.', responseId);
    if (job.scenario === 'session-expire-on-poll' && job.polls >= 1) {
      setSession(null);
      return fail(401, 'SESSION_INVALID', 'The session is invalid.', responseId);
    }
    job.polls += 1;
    if (job.scenario === 'failure' && job.polls >= 2) job.state = 'failed';
    else if (job.scenario === 'slow-success' && job.polls < 4) job.state = 'queued';
    else if (job.scenario === 'slow-success' && job.polls < 9) job.state = 'running';
    else if (job.polls === 1) job.state = 'queued';
    else if (job.polls === 2) job.state = 'running';
    else job.state = 'succeeded';
    persistMaps();

    const data = {
      jobId,
      state: job.state,
      createdAt: job.createdAt,
      updatedAt: new Date().toISOString()
    };
    if (job.state === 'succeeded') data.result = {downloadPath: `/api/public/generation/jobs/${jobId}/result`};
    if (job.state === 'failed') data.error = {code: 'GENERATION_FAILED', message: 'The generation request failed.'};
    return ok(data, responseId);
  }

  async function handleResult(jobId, responseId) {
    const auth = requireSession(responseId);
    if (auth.error) return auth.error;
    const job = jobs.get(jobId);
    if (!job) return fail(404, 'GENERATION_NOT_FOUND', 'Not found.', responseId);
    if (job.state !== 'succeeded') return fail(409, 'GENERATION_RESULT_NOT_READY', 'The result is not ready.', responseId);
    if (job.scenario === 'result-expired') return fail(410, 'GENERATION_RESULT_EXPIRED', 'The result expired.', responseId);
    const originalFetch = window.__BAOLONG_ORIGINAL_FETCH || window.fetch.bind(window);
    const response = await originalFetch(new URL('images/template-su-white-model-atmosphere/result-demo.webp', document.baseURI));
    const blob = await response.blob();
    return new Response(blob, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'no-store',
        'X-Request-ID': responseId
      }
    });
  }

  async function request({path, method, headers, body}) {
    const browserRequestId = recordRequest(path, method, headers);
    const responseId = browserRequestId || internalCorrelationId();

    if (path === '/api/public/auth/login' && method === 'POST') return handleLogin(body, responseId);
    if (path === '/api/public/auth/me' && method === 'GET') {
      const auth = requireSession(responseId);
      if (auth.error) return auth.error;
      // Intentionally omit csrfToken: the new page must recover it from the readable
      // __Host-baolong_csrf cookie after navigation, matching the production contract.
      return ok({user: {email: auth.session.email, emailVerified: true}}, responseId);
    }
    if (path === '/api/public/auth/logout' && method === 'POST') {
      const csrfError = requireCsrf(headers, responseId);
      if (csrfError) return csrfError;
      setSession(null);
      return ok({loggedOut: true}, responseId);
    }
    if (path === '/api/public/quota/status' && method === 'GET') {
      const auth = requireSession(responseId);
      if (auth.error) return auth.error;
      const succeeded = Array.from(jobs.values()).filter((job) => job.state === 'succeeded').length;
      return ok({accountUsed: succeeded}, responseId);
    }
    if (path === '/api/public/generation/jobs' && method === 'POST') {
      return handleSubmit(body, headers, browserRequestId, responseId);
    }

    const statusMatch = path.match(/^\/api\/public\/generation\/jobs\/([0-9a-f]{32})$/);
    if (statusMatch && method === 'GET') return handleStatus(statusMatch[1], responseId);
    const resultMatch = path.match(/^\/api\/public\/generation\/jobs\/([0-9a-f]{32})\/result$/);
    if (resultMatch && method === 'GET') return handleResult(resultMatch[1], responseId);
    return fail(404, 'HTTP_404', 'Not found.', responseId);
  }

  function resetMetrics() {
    Object.assign(metrics, {
      apiRequests: 0,
      submitCalls: 0,
      providerInvocations: 0,
      productionApiRequests: 0,
      realAiRequests: 0,
      lastSubmitRequestId: null,
      requestLog: []
    });
    persistMetrics();
  }

  window.BaoLongNoAiAdapter = Object.freeze({
    credentials: Object.freeze({email: ALLOWLIST_EMAIL, password: ALLOWLIST_PASSWORD}),
    setScenario,
    getScenario,
    reset() {
      setSession(null);
      setScenario('success');
      jobs.clear();
      requests.clear();
      sessionStorage.removeItem(JOBS_KEY);
      sessionStorage.removeItem(REQUESTS_KEY);
      resetMetrics();
    },
    metrics,
    request
  });
  window.BaoLongApiAdapter = window.BaoLongNoAiAdapter;
})();
