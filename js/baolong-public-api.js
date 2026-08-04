(() => {
  'use strict';

  const SAFE_REQUEST_ID = /^[A-Za-z0-9._-]{8,64}$/;
  const PUBLIC_PATH = /^\/api\/public\//;
  const GENERATION_SUBMIT_PATH = '/api/public/generation/jobs';

  class BaoLongApiError extends Error {
    constructor({status = 0, code = 'NETWORK_ERROR', message = 'The request could not be completed.', requestId = null, payload = null, transportUnknown = false} = {}) {
      super(message);
      this.name = 'BaoLongApiError';
      this.status = Number(status) || 0;
      this.code = String(code || 'NETWORK_ERROR');
      this.requestId = requestId || null;
      this.payload = payload || null;
      this.transportUnknown = Boolean(transportUnknown);
    }
  }

  function generateRequestId() {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    const hex = Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('');
    return `blg-${hex}`;
  }

  function isSafeRequestId(value) {
    return SAFE_REQUEST_ID.test(String(value || ''));
  }

  function normalizePath(path) {
    const value = String(path || '');
    if (!PUBLIC_PATH.test(value) || value.includes('://') || value.startsWith('//')) {
      throw new TypeError('Only same-origin /api/public/ paths are allowed.');
    }
    return value;
  }

  function headerObject(headers) {
    return Object.fromEntries(new Headers(headers || {}).entries());
  }

  async function parseJsonSafely(response) {
    const text = await response.text();
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch {
      throw new BaoLongApiError({
        status: response.status,
        code: 'INVALID_API_RESPONSE',
        message: 'The server returned an unreadable response.'
      });
    }
  }

  async function executeRequest(path, init) {
    const adapter = window.BaoLongApiAdapter;
    const previewAdapterAllowed = document.documentElement.dataset.baolongNoAiPreview === 'true';
    if (previewAdapterAllowed && adapter && typeof adapter.request === 'function') {
      return adapter.request({
        path,
        method: init.method,
        headers: headerObject(init.headers),
        body: init.body,
        signal: init.signal,
        responseType: init.responseType
      });
    }
    return window.fetch(path, {
      method: init.method,
      headers: init.headers,
      body: init.body,
      signal: init.signal,
      credentials: 'same-origin',
      redirect: 'error',
      cache: 'no-store',
      referrerPolicy: 'no-referrer'
    });
  }

  async function request(path, options = {}) {
    const safePath = normalizePath(path);
    const method = String(options.method || 'GET').toUpperCase();
    const isGenerationSubmission = method === 'POST' && safePath === GENERATION_SUBMIT_PATH;
    const suppliedRequestId = options.requestId == null ? null : String(options.requestId);

    // Browser-provided X-Request-ID is an idempotency key only for generation submission.
    // Auth/status/result requests intentionally rely on the server/Nginx correlation-ID fallback.
    if (isGenerationSubmission) {
      if (!isSafeRequestId(suppliedRequestId)) {
        throw new TypeError('A valid generation X-Request-ID is required.');
      }
    } else if (suppliedRequestId !== null) {
      throw new TypeError('Browser X-Request-ID is reserved for generation submission.');
    }

    const headers = new Headers(options.headers || {});
    if (isGenerationSubmission) headers.set('X-Request-ID', suppliedRequestId);
    else headers.delete('X-Request-ID');
    headers.set('Accept', options.responseType === 'blob' ? 'image/jpeg,image/png,image/webp,application/json' : 'application/json');

    let body = options.body;
    if (Object.prototype.hasOwnProperty.call(options, 'json')) {
      headers.set('Content-Type', 'application/json');
      body = JSON.stringify(options.json);
    }

    let response;
    try {
      response = await executeRequest(safePath, {
        method,
        headers,
        body,
        signal: options.signal,
        responseType: options.responseType || 'json'
      });
    } catch (error) {
      if (error instanceof BaoLongApiError) throw error;
      throw new BaoLongApiError({
        status: 0,
        code: 'NETWORK_ERROR',
        message: 'The network response is unknown.',
        requestId: isGenerationSubmission ? suppliedRequestId : null,
        transportUnknown: isGenerationSubmission
      });
    }

    if (!(response instanceof Response)) {
      throw new BaoLongApiError({
        status: 0,
        code: 'INVALID_API_RESPONSE',
        message: 'The API adapter returned an invalid response.',
        requestId: isGenerationSubmission ? suppliedRequestId : null
      });
    }

    const responseRequestId = response.headers.get('X-Request-ID') || null;
    const contentType = (response.headers.get('Content-Type') || '').toLowerCase();

    if (options.responseType === 'blob' && response.ok && contentType.startsWith('image/')) {
      return {
        status: response.status,
        requestId: responseRequestId,
        data: await response.blob(),
        contentType,
        headers: response.headers
      };
    }

    const payload = await parseJsonSafely(response);
    if (!response.ok) {
      const error = payload && payload.error ? payload.error : {};
      throw new BaoLongApiError({
        status: response.status,
        code: error.code || `HTTP_${response.status}`,
        message: error.message || 'The request could not be completed.',
        requestId: payload.requestId || responseRequestId,
        payload
      });
    }

    return {
      status: response.status,
      requestId: payload.requestId || responseRequestId,
      data: payload.data,
      payload,
      idempotentReplay: Boolean(payload.idempotentReplay),
      headers: response.headers
    };
  }

  window.BaoLongPublicApi = Object.freeze({
    ApiError: BaoLongApiError,
    generateRequestId,
    isSafeRequestId,
    request,
    get(path, options = {}) {
      return request(path, {...options, method: 'GET'});
    },
    postJson(path, json, options = {}) {
      return request(path, {...options, method: 'POST', json});
    },
    postForm(path, formData, options = {}) {
      return request(path, {...options, method: 'POST', body: formData});
    }
  });
})();
