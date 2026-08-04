(() => {
  'use strict';

  const METRICS_KEY = 'baolong.noai.metrics.v2';
  const EMPTY_METRICS = {
    apiRequests: 0,
    submitCalls: 0,
    providerInvocations: 0,
    productionApiRequests: 0,
    realAiRequests: 0,
    lastSubmitRequestId: null,
    requestLog: []
  };

  function restoreMetrics() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(METRICS_KEY) || 'null');
      return saved && typeof saved === 'object'
        ? {...EMPTY_METRICS, ...saved, requestLog: Array.isArray(saved.requestLog) ? saved.requestLog : []}
        : {...EMPTY_METRICS};
    } catch {
      return {...EMPTY_METRICS};
    }
  }

  const metrics = restoreMetrics();
  function persistMetrics() {
    sessionStorage.setItem(METRICS_KEY, JSON.stringify(metrics));
  }

  window.__BAOLONG_NO_AI_METRICS = metrics;
  window.__BAOLONG_NO_AI_METRICS_KEY = METRICS_KEY;
  window.__BAOLONG_NO_AI_PERSIST_METRICS = persistMetrics;
  window.BAOLONG_PREVIEW_NO_AI = true;

  const originalFetch = window.fetch.bind(window);
  window.__BAOLONG_ORIGINAL_FETCH = originalFetch;

  function apiTarget(value) {
    try {
      const url = new URL(value instanceof Request ? value.url : value, window.location.href);
      const productionHost = /^(www\.)?baolonglab\.com$/i.test(url.hostname);
      return (productionHost && url.pathname.startsWith('/api/')) || url.pathname.startsWith('/api/public/');
    } catch {
      return false;
    }
  }

  function recordBlocked() {
    metrics.productionApiRequests += 1;
    persistMetrics();
  }

  window.fetch = function guardedFetch(input, init) {
    if (apiTarget(input)) {
      recordBlocked();
      throw new TypeError('NO_AI_PREVIEW_BLOCKED_API_REQUEST');
    }
    return originalFetch(input, init);
  };

  const OriginalXHR = window.XMLHttpRequest;
  class GuardedXHR extends OriginalXHR {
    open(method, url, ...rest) {
      if (apiTarget(url)) {
        recordBlocked();
        throw new DOMException('NO_AI_PREVIEW_BLOCKED_API_REQUEST', 'SecurityError');
      }
      return super.open(method, url, ...rest);
    }
  }
  window.XMLHttpRequest = GuardedXHR;

  const originalBeacon = navigator.sendBeacon ? navigator.sendBeacon.bind(navigator) : null;
  if (originalBeacon) {
    navigator.sendBeacon = (url, data) => {
      if (apiTarget(url)) {
        recordBlocked();
        return false;
      }
      return originalBeacon(url, data);
    };
  }

  window.BaoLongNoAiBoundary = Object.freeze({
    metrics,
    persistMetrics,
    assertClean() {
      return metrics.productionApiRequests === 0 && metrics.realAiRequests === 0;
    }
  });
})();
