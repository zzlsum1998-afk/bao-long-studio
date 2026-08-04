(() => {
  'use strict';
  const adapter = window.BaoLongNoAiAdapter;
  if (!adapter) throw new Error('no-AI adapter failed to load.');

  const ids = ['productionApiRequests', 'realAiRequests', 'providerInvocations', 'submitCalls'];
  const scenario = document.getElementById('scenario');
  const status = document.getElementById('status');
  const requestLog = document.getElementById('requestLog');

  function render() {
    ids.forEach((id) => {
      document.getElementById(id).textContent = String(adapter.metrics[id] || 0);
    });
    scenario.value = adapter.getScenario();
    requestLog.textContent = JSON.stringify(adapter.metrics.requestLog || [], null, 2);
    document.getElementById('boundaryCard').dataset.clean = String(
      adapter.metrics.productionApiRequests === 0 && adapter.metrics.realAiRequests === 0
    );
  }

  document.getElementById('applyScenario').addEventListener('click', () => {
    adapter.setScenario(scenario.value);
    status.textContent = `已保存场景：${scenario.value}`;
    render();
  });

  document.getElementById('resetPreview').addEventListener('click', () => {
    adapter.reset();
    status.textContent = 'fake 会话、任务和浏览器证据已清空。';
    render();
  });

  render();
})();
