/* BaoLong Lab v254 Prompt case local favorites + content-type filtering.
   Static-site only: saves cards in localStorage on the visitor's current browser. */
(function(){
  'use strict';

  var STORAGE_KEY = 'baolong.promptFavorites.v1';
  var mode = 'all';
  var typeMode = 'all';

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

  function getCardType(caseId){
    var item = getCase(caseId) || {};
    return item.workflowTemplate ? 'workflow' : 'prompt';
  }

  function createPayload(caseId){
    var item = getCase(caseId) || {};
    return {
      key: itemKey(caseId),
      type: getCardType(caseId),
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
    var isWorkflow = getCardType(caseId) === 'workflow';
    var label;
    if(isWorkflow){
      label = saved ? '已收藏工作流 / Saved workflow' : '收藏工作流 / Save workflow';
    }else{
      label = saved ? '已收藏 Prompt / Saved prompt' : '收藏 Prompt / Save prompt';
    }
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

  function ensureTypeBadge(card){
    if(!card || card.querySelector('.prompt-type-badge')) return;
    var caseId = card.getAttribute('data-prompt-id');
    if(!caseId) return;
    var cardType = getCardType(caseId);
    var badge = document.createElement('span');
    badge.className = 'prompt-type-badge';
    badge.setAttribute('data-prompt-card-type', cardType);
    badge.textContent = cardType === 'workflow' ? '工作流 / Workflow' : '提示词 / Prompt';
    card.appendChild(badge);
  }

  function classifyCard(card){
    if(!card) return 'prompt';
    var caseId = card.getAttribute('data-prompt-id');
    var cardType = getCardType(caseId);
    card.setAttribute('data-prompt-type', cardType);
    return cardType;
  }

  function openCard(card){
    if(!card) return;
    var caseId = card.getAttribute('data-prompt-id');
    if(caseId && typeof window.openPromptCase === 'function'){
      window.openPromptCase(caseId);
    }
  }

  function bindCards(){
    document.querySelectorAll('.prompt-case-card[data-prompt-id]').forEach(function(card){
      classifyCard(card);
      ensureSaveButton(card);
      ensureTypeBadge(card);
      if(card.getAttribute('data-prompt-favorite-bound') === 'true') return;
      card.setAttribute('data-prompt-favorite-bound', 'true');
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

  function mountTypeControls(grid){
    if(!grid || document.querySelector('[data-prompt-type-controls]')) return;
    var bar = document.createElement('div');
    bar.className = 'prompt-type-filter-bar';
    bar.setAttribute('data-prompt-type-controls', 'true');
    bar.innerHTML =
      '<div class="prompt-type-filter-copy">内容类型 / Content type</div>' +
      '<div class="prompt-type-filter-actions">' +
        '<button class="prompt-type-filter-btn active" type="button" data-prompt-type-filter="all" aria-pressed="true">全部 / All</button>' +
        '<button class="prompt-type-filter-btn" type="button" data-prompt-type-filter="prompt" aria-pressed="false">Prompt 灵感 / Prompts</button>' +
        '<button class="prompt-type-filter-btn" type="button" data-prompt-type-filter="workflow" aria-pressed="false">图片工作流 / Workflows</button>' +
      '</div>';
    grid.parentNode.insertBefore(bar, grid);

    bar.querySelectorAll('[data-prompt-type-filter]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var next = btn.getAttribute('data-prompt-type-filter');
        typeMode = next === 'prompt' || next === 'workflow' ? next : 'all';
        updateControls();
        applyFilter();
      });
    });
  }

  function mountFavoriteControls(grid){
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

    bar.querySelectorAll('[data-prompt-filter]').forEach(function(btn){
      btn.addEventListener('click', function(){
        mode = btn.getAttribute('data-prompt-filter') === 'saved' ? 'saved' : 'all';
        updateControls();
        applyFilter();
      });
    });
  }

  function mountControls(){
    var grid = document.querySelector('.prompt-case-grid');
    if(!grid) return;
    mountTypeControls(grid);
    mountFavoriteControls(grid);

    if(!document.querySelector('[data-prompt-favorite-empty]')){
      var empty = document.createElement('div');
      empty.className = 'prompt-favorite-empty';
      empty.setAttribute('data-prompt-favorite-empty', 'true');
      empty.hidden = true;
      empty.textContent = '没有符合当前筛选的卡片 / No cards match the current filters.';
      grid.parentNode.insertBefore(empty, grid.nextSibling);
    }
    updateControls();
  }

  function updateControls(){
    var favoriteBar = document.querySelector('[data-prompt-favorite-controls]');
    if(favoriteBar){
      var countEl = favoriteBar.querySelector('[data-prompt-favorite-count]');
      if(countEl){
        var total = savedCount();
        countEl.textContent = total ? '已收藏 ' + total + ' 个卡片 / ' + total + ' saved cards' : '本地收藏 / Local saved';
      }
      favoriteBar.querySelectorAll('[data-prompt-filter]').forEach(function(btn){
        var active = btn.getAttribute('data-prompt-filter') === mode;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }

    var typeBar = document.querySelector('[data-prompt-type-controls]');
    if(typeBar){
      typeBar.querySelectorAll('[data-prompt-type-filter]').forEach(function(btn){
        var active = btn.getAttribute('data-prompt-type-filter') === typeMode;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }
  }

  function applyFilter(){
    var cards = Array.prototype.slice.call(document.querySelectorAll('.prompt-case-card[data-prompt-id]'));
    var visible = 0;
    cards.forEach(function(card){
      var caseId = card.getAttribute('data-prompt-id');
      var cardType = card.getAttribute('data-prompt-type') || classifyCard(card);
      var matchesType = typeMode === 'all' || cardType === typeMode;
      var matchesSaved = mode !== 'saved' || isSaved(caseId);
      var show = matchesType && matchesSaved;
      card.hidden = !show;
      if(show) visible += 1;
    });
    var empty = document.querySelector('[data-prompt-favorite-empty]');
    if(empty){
      empty.hidden = visible !== 0;
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
    syncAllButtons: syncAllButtons,
    getTypeMode: function(){ return typeMode; },
    setTypeMode: function(next){
      typeMode = next === 'prompt' || next === 'workflow' ? next : 'all';
      updateControls();
      applyFilter();
    }
  };
})();
