/* BaoLong Lab v220 Prompt case local favorites.
   Static-site only: saves Prompt case cards in localStorage on the visitor's current browser. */
(function(){
  'use strict';

  var STORAGE_KEY = 'baolong.promptFavorites.v1';
  var mode = 'all';

  function readStore(){
    try{
      var raw = window.localStorage ? window.localStorage.getItem(STORAGE_KEY) : null;
      if(!raw) return {};
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    }catch(err){
      console.warn('[BaoLong Prompt Favorites] Unable to read local favorites.', err);
      return {};
    }
  }

  function writeStore(store){
    try{
      if(window.localStorage){
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store || {}));
      }
    }catch(err){
      console.warn('[BaoLong Prompt Favorites] Unable to save local favorites.', err);
    }
  }

  function getCases(){
    if(window.BaoLongPromptCases && typeof window.BaoLongPromptCases === 'object'){
      return window.BaoLongPromptCases;
    }
    try{
      if(typeof promptCases !== 'undefined') return promptCases;
    }catch(err){}
    return {};
  }

  function itemKey(caseId){
    return 'prompt:' + String(caseId || '').trim();
  }

  function getCase(caseId){
    return getCases()[caseId] || null;
  }

  function createPayload(caseId){
    var item = getCase(caseId) || {};
    return {
      key: itemKey(caseId),
      type: 'prompt',
      id: caseId,
      title: item.title || 'Untitled Prompt',
      kicker: item.kicker || '',
      scene: item.scene || '',
      tags: Array.isArray(item.tags) ? item.tags.slice(0, 12) : [],
      image: item.img || '',
      page: location.pathname.split('/').pop() || 'prompt-generator.html',
      savedAt: new Date().toISOString()
    };
  }

  function isSaved(caseId){
    return !!readStore()[itemKey(caseId)];
  }

  function savedCount(){
    return Object.keys(readStore()).length;
  }

  function syncButton(btn){
    if(!btn) return;
    var caseId = btn.getAttribute('data-prompt-save');
    var saved = isSaved(caseId);
    var label = saved ? '已收藏 Prompt / Saved prompt' : '收藏 Prompt / Save prompt';
    btn.classList.toggle('saved', saved);
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
    btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
    var icon = btn.querySelector('[aria-hidden="true"]');
    if(icon) icon.textContent = saved ? '♥' : '♡';
  }

  function syncAllButtons(){
    document.querySelectorAll('.prompt-save-btn[data-prompt-save]').forEach(syncButton);
  }

  function toggle(caseId){
    if(!caseId) return;
    var key = itemKey(caseId);
    var store = readStore();
    var wasSaved = !!store[key];
    if(wasSaved){
      delete store[key];
    }else{
      store[key] = createPayload(caseId);
    }
    writeStore(store);
    syncAllButtons();
    updateControls();
    applyFilter();
    document.dispatchEvent(new CustomEvent('baolong:promptfavoriteschange', {
      detail: {id: caseId, key: key, saved: !wasSaved}
    }));
  }

  function ensureSaveButton(card){
    if(!card || card.querySelector('.prompt-save-btn')) return;
    var caseId = card.getAttribute('data-prompt-id');
    if(!caseId) return;
    var btn = document.createElement('button');
    btn.className = 'prompt-save-btn';
    btn.type = 'button';
    btn.setAttribute('data-prompt-save', caseId);
    btn.setAttribute('aria-pressed', 'false');
    btn.innerHTML = '<span aria-hidden="true">♡</span>';
    btn.addEventListener('click', function(event){
      event.preventDefault();
      event.stopPropagation();
      toggle(caseId);
    });
    card.insertBefore(btn, card.firstChild);
    syncButton(btn);
  }

  function openCard(card){
    if(!card) return;
    var caseId = card.getAttribute('data-prompt-id');
    if(caseId && typeof window.openPromptCase === 'function'){
      window.openPromptCase(caseId);
    }
  }

  function bindCards(){
    document.querySelectorAll('.prompt-case-card[data-prompt-id]:not([data-prompt-favorite-bound="true"])').forEach(function(card){
      card.setAttribute('data-prompt-favorite-bound', 'true');
      ensureSaveButton(card);
      card.addEventListener('click', function(event){
        if(event.target && event.target.closest && event.target.closest('.prompt-save-btn')) return;
        openCard(card);
      });
      card.addEventListener('keydown', function(event){
        if(event.target && event.target.closest && event.target.closest('.prompt-save-btn')) return;
        if(event.key === 'Enter' || event.key === ' '){
          event.preventDefault();
          openCard(card);
        }
      });
    });
  }

  function mountControls(){
    var grid = document.querySelector('.prompt-case-grid');
    if(!grid || document.querySelector('[data-prompt-favorite-controls]')) return;
    var bar = document.createElement('div');
    bar.className = 'prompt-favorite-filter-bar';
    bar.setAttribute('data-prompt-favorite-controls', 'true');
    bar.innerHTML =
      '<div class="prompt-favorite-copy" data-prompt-favorite-count>本地收藏 / Local saved</div>' +
      '<div class="prompt-favorite-actions">' +
        '<button class="prompt-favorite-filter-btn active" type="button" data-prompt-filter="all" aria-pressed="true">全部 / All</button>' +
        '<button class="prompt-favorite-filter-btn" type="button" data-prompt-filter="saved" aria-pressed="false">已收藏 / Saved</button>' +
      '</div>';
    grid.parentNode.insertBefore(bar, grid);

    var empty = document.createElement('div');
    empty.className = 'prompt-favorite-empty';
    empty.setAttribute('data-prompt-favorite-empty', 'true');
    empty.hidden = true;
    empty.textContent = '还没有收藏 Prompt。点击卡片右上角的心形按钮后，会出现在这里 / No saved prompts yet.';
    grid.parentNode.insertBefore(empty, grid.nextSibling);

    bar.querySelectorAll('[data-prompt-filter]').forEach(function(btn){
      btn.addEventListener('click', function(){
        mode = btn.getAttribute('data-prompt-filter') === 'saved' ? 'saved' : 'all';
        updateControls();
        applyFilter();
      });
    });
    updateControls();
  }

  function updateControls(){
    var bar = document.querySelector('[data-prompt-favorite-controls]');
    if(!bar) return;
    var countEl = bar.querySelector('[data-prompt-favorite-count]');
    if(countEl){
      var total = savedCount();
      countEl.textContent = total ? '已收藏 ' + total + ' 个 Prompt / ' + total + ' saved prompts' : '本地收藏 / Local saved';
    }
    bar.querySelectorAll('[data-prompt-filter]').forEach(function(btn){
      var active = btn.getAttribute('data-prompt-filter') === mode;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function applyFilter(){
    var cards = Array.prototype.slice.call(document.querySelectorAll('.prompt-case-card[data-prompt-id]'));
    var visible = 0;
    cards.forEach(function(card){
      var show = mode !== 'saved' || isSaved(card.getAttribute('data-prompt-id'));
      card.hidden = !show;
      if(show) visible += 1;
    });
    var empty = document.querySelector('[data-prompt-favorite-empty]');
    if(empty){
      empty.hidden = !(mode === 'saved' && visible === 0);
    }
  }

  function init(){
    bindCards();
    mountControls();
    syncAllButtons();
    applyFilter();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }

  window.addEventListener('storage', function(event){
    if(event.key === STORAGE_KEY){
      syncAllButtons();
      updateControls();
      applyFilter();
    }
  });

  window.BLPromptFavorites = {
    isSaved: isSaved,
    toggle: toggle,
    applyFilter: applyFilter,
    syncAllButtons: syncAllButtons
  };
})();
