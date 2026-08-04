(() => {
  'use strict';

  const api = window.BaoLongPublicApi;
  if (!api) throw new Error('BaoLongPublicApi must load before BaoLongAuthSession.');

  const state = {
    status: 'unknown',
    user: null,
    csrfToken: null
  };

  function readCookie(name) {
    const prefix = `${encodeURIComponent(name)}=`;
    const item = document.cookie.split(';').map((value) => value.trim()).find((value) => value.startsWith(prefix));
    return item ? decodeURIComponent(item.slice(prefix.length)) : null;
  }

  function emit() {
    window.dispatchEvent(new CustomEvent('baolong:auth-state', {
      detail: {status: state.status, user: state.user ? {...state.user} : null}
    }));
  }

  function clear() {
    state.status = 'anonymous';
    state.user = null;
    state.csrfToken = null;
    emit();
  }

  function csrfCookieToken() {
    return readCookie('__Host-baolong_csrf');
  }

  function currentCsrfToken() {
    return csrfCookieToken() || state.csrfToken || null;
  }

  async function login({email, password}) {
    const normalizedEmail = String(email || '').trim();
    const secret = String(password || '');
    if (!normalizedEmail || !secret) {
      throw new api.ApiError({status: 422, code: 'LOGIN_INPUT_REQUIRED', message: 'Email and password are required.'});
    }
    const response = await api.postJson('/api/public/auth/login', {
      email: normalizedEmail,
      password: secret,
      remember: false
    });
    state.status = 'authenticated';
    state.user = response.data && response.data.user ? response.data.user : null;
    state.csrfToken = response.data && response.data.csrfToken ? response.data.csrfToken : readCookie('__Host-baolong_csrf');
    emit();
    return response.data || {};
  }

  async function me({quiet = false} = {}) {
    try {
      const response = await api.get('/api/public/auth/me');
      state.status = 'authenticated';
      state.user = response.data && response.data.user ? response.data.user : null;
      state.csrfToken = response.data && response.data.csrfToken ? response.data.csrfToken : currentCsrfToken();
      emit();
      return state.user;
    } catch (error) {
      if (error instanceof api.ApiError && error.status === 401) {
        clear();
        if (quiet) return null;
      }
      throw error;
    }
  }

  async function quotaStatus() {
    const response = await api.get('/api/public/quota/status');
    return response.data || {};
  }

  async function logout() {
    const csrf = currentCsrfToken();
    if (!csrf) {
      clear();
      return;
    }
    try {
      await api.request('/api/public/auth/logout', {
        method: 'POST',
        headers: {'X-CSRF-Token': csrf}
      });
    } finally {
      clear();
    }
  }

  function snapshot() {
    return {status: state.status, user: state.user ? {...state.user} : null};
  }

  window.BaoLongAuthSession = Object.freeze({
    login,
    me,
    quotaStatus,
    logout,
    clear,
    snapshot,
    currentCsrfToken,
    csrfCookieToken
  });
})();
