(() => {
  'use strict';

  const api = window.BaoLongPublicApi;
  if (!api) throw new Error('BaoLongPublicApi must load before BaoLongGenerationClient.');

  const CASE25_TEMPLATE_ID = 'su-white-model-competition-atmosphere-v1';
  const RECOVERY_KEY = 'baolong.case25.generationRecovery.v1';
  const SAFE_JOB_ID = /^[0-9a-f]{32}$/;
  const SAFE_RESULT_PATH = /^\/api\/public\/generation\/jobs\/([0-9a-f]{32})\/result$/;
  const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
  const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp']);
  const MAX_FILE_BYTES = 40 * 1024 * 1024;
  const PARAMETER_ALLOWLIST = {
    vegetationSupport: new Set(['none', 'restrained']),
    materialRealism: new Set(['light', 'restrained'])
  };

  function hex(buffer) {
    return Array.from(new Uint8Array(buffer), (value) => value.toString(16).padStart(2, '0')).join('');
  }

  async function sha256(value) {
    return hex(await crypto.subtle.digest('SHA-256', value));
  }

  function extensionOf(name) {
    const match = String(name || '').toLowerCase().match(/\.([a-z0-9]+)$/);
    return match ? match[1] : '';
  }

  async function decodeImage(file) {
    if (typeof createImageBitmap === 'function') {
      const bitmap = await createImageBitmap(file);
      const valid = bitmap.width > 0 && bitmap.height > 0;
      bitmap.close();
      if (!valid) throw new Error('INVALID_IMAGE');
      return;
    }
    await new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(objectUrl);
        image.width > 0 && image.height > 0 ? resolve() : reject(new Error('INVALID_IMAGE'));
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('INVALID_IMAGE'));
      };
      image.src = objectUrl;
    });
  }

  async function validateFile(file) {
    if (!(file instanceof File)) throw new api.ApiError({status: 422, code: 'IMAGE_REQUIRED', message: 'One source image is required.'});
    const extension = extensionOf(file.name);
    if (!ALLOWED_TYPES.has(file.type) || !ALLOWED_EXTENSIONS.has(extension)) {
      throw new api.ApiError({status: 415, code: 'UNSUPPORTED_MIME', message: 'Only JPEG, PNG, and WebP images are supported.'});
    }
    if (file.size <= 0) throw new api.ApiError({status: 422, code: 'INVALID_IMAGE', message: 'The image is empty.'});
    if (file.size > MAX_FILE_BYTES) throw new api.ApiError({status: 413, code: 'PAYLOAD_TOO_LARGE', message: 'The image is too large.'});
    try {
      await decodeImage(file);
    } catch {
      throw new api.ApiError({status: 422, code: 'INVALID_IMAGE', message: 'The image could not be decoded.'});
    }
    return file;
  }

  function validateParameters(parameters) {
    const input = parameters && typeof parameters === 'object' ? parameters : {};
    const output = {};
    for (const [key, allowed] of Object.entries(PARAMETER_ALLOWLIST)) {
      const value = String(input[key] || '');
      if (!allowed.has(value)) {
        throw new api.ApiError({status: 422, code: 'REQUEST_VALIDATION_FAILED', message: 'A generation parameter is invalid.'});
      }
      output[key] = value;
    }
    if (Object.keys(input).some((key) => !Object.prototype.hasOwnProperty.call(PARAMETER_ALLOWLIST, key))) {
      throw new api.ApiError({status: 422, code: 'REQUEST_VALIDATION_FAILED', message: 'An unknown generation parameter was supplied.'});
    }
    return output;
  }

  function validateNotes(notes) {
    const value = String(notes || '').trim();
    if (value.length > 120) throw new api.ApiError({status: 422, code: 'REQUEST_VALIDATION_FAILED', message: 'Additional notes are too long.'});
    return value;
  }

  async function payloadFingerprint({templateId, parameters, notes, file}) {
    const fileDigest = await sha256(await file.arrayBuffer());
    const metadata = new TextEncoder().encode(JSON.stringify({
      templateId,
      parameters,
      notes,
      fileType: file.type,
      fileSize: file.size,
      fileDigest
    }));
    return sha256(metadata);
  }

  function safeUploadName(mediaType) {
    if (mediaType === 'image/jpeg') return 'source.jpg';
    if (mediaType === 'image/png') return 'source.png';
    return 'source.webp';
  }

  function formDataFor(snapshot) {
    const form = new FormData();
    form.set('templateId', snapshot.templateId);
    form.set('parametersJson', JSON.stringify(snapshot.parameters));
    form.set('additionalNotes', snapshot.notes);
    form.append('images', snapshot.file, safeUploadName(snapshot.file.type));
    return form;
  }

  function writeRecovery(record) {
    sessionStorage.setItem(RECOVERY_KEY, JSON.stringify(record));
  }

  function readRecovery() {
    try {
      const value = JSON.parse(sessionStorage.getItem(RECOVERY_KEY) || 'null');
      if (!value || !api.isSafeRequestId(value.requestId) || !SAFE_JOB_ID.test(value.jobId || '') || value.templateId !== CASE25_TEMPLATE_ID || !/^[0-9a-f]{64}$/.test(value.payloadFingerprint || '')) return null;
      return value;
    } catch {
      return null;
    }
  }

  function clearRecovery() {
    sessionStorage.removeItem(RECOVERY_KEY);
  }

  class GenerationClient {
    constructor({csrfProvider, pollBaseMs = 2000, pollSlowMs = 5000, slowAfterMs = 60000} = {}) {
      this.csrfProvider = csrfProvider;
      this.pollBaseMs = Math.max(20, Number(pollBaseMs) || 2000);
      this.pollSlowMs = Math.max(this.pollBaseMs, Number(pollSlowMs) || 5000);
      this.slowAfterMs = Math.max(1000, Number(slowAfterMs) || 60000);
      this.inFlight = null;
      this.unknownSnapshot = null;
    }

    async createSnapshot({templateId, parameters, notes, file}) {
      if (templateId !== CASE25_TEMPLATE_ID) throw new api.ApiError({status: 403, code: 'TEMPLATE_NOT_ENABLED', message: 'This template is not enabled for generation.'});
      const checkedFile = await validateFile(file);
      const checkedParameters = validateParameters(parameters);
      const checkedNotes = validateNotes(notes);
      const fingerprint = await payloadFingerprint({templateId, parameters: checkedParameters, notes: checkedNotes, file: checkedFile});
      return Object.freeze({
        templateId,
        parameters: Object.freeze({...checkedParameters}),
        notes: checkedNotes,
        file: checkedFile,
        payloadFingerprint: fingerprint,
        requestId: api.generateRequestId(),
        createdAt: new Date().toISOString()
      });
    }

    async submit(input) {
      if (this.inFlight) return this.inFlight;
      this.inFlight = (async () => {
        const snapshot = await this.createSnapshot(input);
        return this.submitSnapshot(snapshot, {recovery: false});
      })().finally(() => {
        this.inFlight = null;
      });
      return this.inFlight;
    }

    async submitSnapshot(snapshot, {recovery}) {
      const csrf = typeof this.csrfProvider === 'function' ? this.csrfProvider() : null;
      if (!csrf) throw new api.ApiError({status: 403, code: 'CSRF_VALIDATION_FAILED', message: 'The security session is unavailable.'});
      try {
        const response = await api.postForm('/api/public/generation/jobs', formDataFor(snapshot), {
          requestId: snapshot.requestId,
          headers: {'X-CSRF-Token': csrf}
        });
        const jobId = response.data && response.data.jobId;
        if (!SAFE_JOB_ID.test(String(jobId || ''))) throw new api.ApiError({status: 0, code: 'INVALID_API_RESPONSE', message: 'The server returned an invalid job identifier.'});
        const record = {
          requestId: snapshot.requestId,
          jobId,
          templateId: snapshot.templateId,
          payloadFingerprint: snapshot.payloadFingerprint,
          createdAt: snapshot.createdAt
        };
        writeRecovery(record);
        this.unknownSnapshot = null;
        return {...record, idempotentReplay: Boolean(response.idempotentReplay), recovered: Boolean(recovery)};
      } catch (error) {
        if (error instanceof api.ApiError && error.transportUnknown) {
          this.unknownSnapshot = snapshot;
        }
        throw error;
      }
    }

    canRecoverUnknown() {
      return Boolean(this.unknownSnapshot);
    }

    async recoverUnknown() {
      if (!this.unknownSnapshot) throw new api.ApiError({status: 409, code: 'NO_UNKNOWN_SUBMISSION', message: 'There is no unknown submission to recover.'});
      if (this.inFlight) return this.inFlight;
      this.inFlight = this.submitSnapshot(this.unknownSnapshot, {recovery: true}).finally(() => {
        this.inFlight = null;
      });
      return this.inFlight;
    }

    async status(jobId) {
      if (!SAFE_JOB_ID.test(String(jobId || ''))) throw new api.ApiError({status: 422, code: 'INVALID_JOB_ID', message: 'The job identifier is invalid.'});
      const response = await api.get(`/api/public/generation/jobs/${jobId}`);
      return response.data || {};
    }

    async poll(jobId, {onState, signal} = {}) {
      const started = Date.now();
      let transientFailures = 0;
      while (true) {
        if (signal && signal.aborted) throw new DOMException('Aborted', 'AbortError');
        try {
          const data = await this.status(jobId);
          transientFailures = 0;
          if (typeof onState === 'function') onState(data);
          if (data.state === 'succeeded') return data;
          if (data.state === 'failed') {
            const failure = data.error || {};
            throw new api.ApiError({status: 200, code: failure.code || 'GENERATION_FAILED', message: failure.message || 'The generation request failed.', payload: data});
          }
          if (!['preparing', 'queued', 'running'].includes(data.state)) {
            throw new api.ApiError({status: 0, code: 'INVALID_API_RESPONSE', message: 'The server returned an unknown job state.'});
          }
        } catch (error) {
          const retryable = error instanceof api.ApiError && (error.status === 0 || [408, 429, 503].includes(error.status));
          if (!retryable || transientFailures >= 3) throw error;
          transientFailures += 1;
        }
        const base = Date.now() - started >= this.slowAfterMs ? this.pollSlowMs : this.pollBaseMs;
        const jitter = Math.floor(base * 0.12 * Math.random());
        const delay = base * Math.max(1, transientFailures + 1) + jitter;
        await new Promise((resolve, reject) => {
          const timer = setTimeout(resolve, delay);
          if (signal) signal.addEventListener('abort', () => {
            clearTimeout(timer);
            reject(new DOMException('Aborted', 'AbortError'));
          }, {once: true});
        });
      }
    }

    async download(jobId, downloadPath) {
      const match = String(downloadPath || '').match(SAFE_RESULT_PATH);
      if (!match || match[1] !== jobId) throw new api.ApiError({status: 0, code: 'INVALID_API_RESPONSE', message: 'The result path is invalid.'});
      const response = await api.request(downloadPath, {method: 'GET', responseType: 'blob'});
      const mediaType = String(response.data.type || response.contentType || '').split(';', 1)[0].toLowerCase();
      if (!ALLOWED_TYPES.has(mediaType)) throw new api.ApiError({status: 0, code: 'INVALID_RESULT_TYPE', message: 'The result image type is invalid.'});
      const extension = mediaType === 'image/jpeg' ? 'jpg' : mediaType.split('/')[1];
      return {
        blob: response.data,
        mediaType,
        filename: `baolong-case25-${jobId.slice(0, 8)}.${extension}`
      };
    }

    clearUnknown() {
      this.unknownSnapshot = null;
    }
  }

  window.BaoLongGenerationClient = Object.freeze({
    CASE25_TEMPLATE_ID,
    RECOVERY_KEY,
    GenerationClient,
    validateFile,
    readRecovery,
    clearRecovery
  });
})();
