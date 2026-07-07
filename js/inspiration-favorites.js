/* BaoLong Lab v219 Inspiration Board local favorites.
   Static-site only: saves cards in localStorage on the visitor's current browser. */
(function(){
  'use strict';

  var STORAGE_KEY = 'baolong.inspirationFavorites.v1';
  var modeByBoard = Object.create(null);
  var changeHandlers = Object.create(null);

  function readStore(){
    try{
      var raw = window.localStorage ? window.localStorage.getItem(STORAGE_KEY) : null;
      if(!raw) return {};
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    }catch(err){
      console.warn('[BaoLong Favorites] Unable to read local favorites.', err);
      return {};
    }
  }

  function writeStore(store){
    try{
      if(window.localStorage){
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store || {}));
      }
    }catch(err){
      console.warn('[BaoLong Favorites] Unable to save local favorites.', err);
    }
  }

  function normalizeBoard(board){
    return String(board || 'inspiration').toLowerCase();
  }

  function itemKey(board, item){
    var safeBoard = normalizeBoard(board);
    var itemId = item && (item.id != null ? item.id : (item.number != null ? item.number : ''));
    var fallback = item && (item.cover || item.image || item.title || 'item');
    return safeBoard + ':' + String(itemId || fallback);
  }

  function getCover(item){
    if(!item) return '';
    if(item.cover) return item.cover;
    if(item.image) return item.image;
    if(Array.isArray(item.images) && item.images.length) return item.images[0];
    return '';
  }

  function createPayload(board, item){
    item = item || {};
    return {
      key: itemKey(board, item),
      board: normalizeBoard(board),
      id: item.id != null ? item.id : (item.number != null ? item.number : ''),
      title: item.title || 'Untitled Inspiration',
      type: item.type || '',
      cover: getCover(item),
      desc: item.desc || '',
      tags: Array.isArray(item.tags) ? item.tags.slice(0, 12) : [],
      page: location.pathname.split('/').pop() || 'index.html',
      sourceName: item.sourceName || '',
      sourceUrl: item.sourceUrl || '',
      savedAt: new Date().toISOString()
    };
  }

  function escapeAttr(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(char){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char];
    });
  }

  function encodePayload(payload){
    try{
      return encodeURIComponent(JSON.stringify(payload));
    }catch(err){
      return '';
    }
  }

  function decodePayload(raw){
    try{
      return JSON.parse(decodeURIComponent(raw || ''));
    }catch(err){
      return null;
    }
  }

  function isSaved(board, itemOrKey){
    var key = typeof itemOrKey === 'string' ? itemOrKey : itemKey(board, itemOrKey || {});
    return !!readStore()[key];
  }

  function count(board){
    var safeBoard = normalizeBoard(board);
    var store = readStore();
    return Object.keys(store).filter(function(key){
      return store[key] && store[key].board === safeBoard;
    }).length;
  }

  function buttonHTML(board, item){
    var payload = createPayload(board, item);
    var saved = isSaved(board, payload.key);
    var label = saved ? '已收藏 / Saved' : '收藏 / Save';
    return '<button class="pin-favorite-btn' + (saved ? ' saved' : '') + '" type="button" ' +
      'aria-label="' + escapeAttr(label) + '" title="' + escapeAttr(label) + '" ' +
      'data-favorite-key="' + escapeAttr(payload.key) + '" ' +
      'data-favorite-board="' + escapeAttr(normalizeBoard(board)) + '" ' +
      'data-favorite-payload="' + escapeAttr(encodePayload(payload)) + '">' +
      '<span aria-hidden="true">' + (saved ? '♥' : '♡') + '</span>' +
    '</button>';
  }

  function syncButton(btn){
    if(!btn) return;
    var saved = isSaved(btn.dataset.favoriteBoard, btn.dataset.favoriteKey || '');
    var label = saved ? '已收藏 / Saved' : '收藏 / Save';
    btn.classList.toggle('saved', saved);
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
    var icon = btn.querySelector('span');
    if(icon) icon.textContent = saved ? '♥' : '♡';
  }

  function syncAllButtons(root){
    (root || document).querySelectorAll('.pin-favorite-btn').forEach(syncButton);
  }

  function toggleFromButton(event){
    if(event){
      event.preventDefault();
      event.stopPropagation();
    }
    var btn = event && event.currentTarget;
    if(!btn) return;
    var payload = decodePayload(btn.dataset.favoritePayload) || {
      key: btn.dataset.favoriteKey,
      board: btn.dataset.favoriteBoard
    };
    if(!payload.key) return;
    var store = readStore();
    var wasSaved = !!store[payload.key];
    if(wasSaved){
      delete store[payload.key];
    }else{
      payload.savedAt = new Date().toISOString();
      store[payload.key] = payload;
    }
    writeStore(store);
    syncAllButtons(document);
    updateControlCounts(payload.board);
    document.dispatchEvent(new CustomEvent('baolong:favoriteschange', {
      detail: {board: payload.board, key: payload.key, saved: !wasSaved}
    }));
  }

  function bindButtons(root){
    var scope = typeof root === 'string' ? document.querySelector(root) : root;
    if(!scope) return;
    scope.querySelectorAll('.pin-favorite-btn:not([data-favorite-bound="true"])').forEach(function(btn){
      btn.dataset.favoriteBound = 'true';
      btn.addEventListener('click', toggleFromButton);
      syncButton(btn);
    });
  }

  function isSavedMode(board){
    return modeByBoard[normalizeBoard(board)] === 'saved';
  }

  function setMode(board, mode){
    var safeBoard = normalizeBoard(board);
    modeByBoard[safeBoard] = mode === 'saved' ? 'saved' : 'all';
    updateControlState(safeBoard);
    var handler = changeHandlers[safeBoard];
    if(typeof handler === 'function') handler(modeByBoard[safeBoard]);
  }

  function filterItems(board, items){
    if(!Array.isArray(items)) return [];
    if(!isSavedMode(board)) return items;
    return items.filter(function(item){ return isSaved(board, item); });
  }

  function installStyles(){
    if(document.getElementById('baolong-inspiration-favorites-style')) return;
    var style = document.createElement('style');
    style.id = 'baolong-inspiration-favorites-style';
    style.textContent = [
      '.favorite-filter-bar{display:flex;justify-content:space-between;align-items:center;gap:14px;margin:0 0 22px;padding:13px 16px;border:1px solid rgba(17,17,17,.09);border-radius:999px;background:rgba(255,255,255,.72);box-shadow:0 18px 46px rgba(0,0,0,.045);backdrop-filter:blur(16px)}',
      '.favorite-filter-copy{font-size:12px;letter-spacing:.03em;color:rgba(17,17,17,.54);white-space:nowrap}',
      '.favorite-filter-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:flex-end}',
      '.favorite-filter-btn{border:1px solid rgba(17,17,17,.14);background:#fff;color:#111;border-radius:999px;padding:8px 13px;font-size:12px;line-height:1;cursor:pointer;transition:background .18s ease,color .18s ease,border-color .18s ease,transform .18s ease}',
      '.favorite-filter-btn:hover,.favorite-filter-btn.active{background:#111;color:#fff;border-color:#111;transform:translateY(-1px)}',
      '.pin-img{position:relative}',
      '.pin-favorite-btn{position:absolute;right:12px;top:12px;z-index:5;width:34px;height:34px;border-radius:999px;border:1px solid rgba(17,17,17,.12);background:rgba(255,255,255,.86);color:#111;display:inline-flex;align-items:center;justify-content:center;font-size:18px;line-height:1;cursor:pointer;box-shadow:0 12px 28px rgba(0,0,0,.12);backdrop-filter:blur(12px);transition:background .18s ease,color .18s ease,border-color .18s ease,transform .18s ease}',
      '.pin-favorite-btn:hover,.pin-favorite-btn.saved{background:#111;color:#fff;border-color:#111;transform:translateY(-1px)}',
      '.pin-favorite-btn:focus-visible,.favorite-filter-btn:focus-visible{outline:2px solid #111;outline-offset:3px}',
      '@media(max-width:720px){.favorite-filter-bar{border-radius:22px;align-items:flex-start;flex-direction:column;padding:14px;margin-bottom:18px}.favorite-filter-copy{white-space:normal}.favorite-filter-actions{justify-content:flex-start}.pin-favorite-btn{width:36px;height:36px;right:10px;top:10px}}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function updateControlState(board){
    var bar = document.querySelector('[data-favorite-controls="' + normalizeBoard(board) + '"]');
    if(!bar) return;
    var mode = modeByBoard[normalizeBoard(board)] || 'all';
    bar.querySelectorAll('.favorite-filter-btn').forEach(function(btn){
      btn.classList.toggle('active', btn.dataset.favoriteMode === mode);
      btn.setAttribute('aria-pressed', btn.dataset.favoriteMode === mode ? 'true' : 'false');
    });
    updateControlCounts(board);
  }

  function updateControlCounts(board){
    var safeBoard = normalizeBoard(board);
    var bar = document.querySelector('[data-favorite-controls="' + safeBoard + '"]');
    if(!bar) return;
    var countEl = bar.querySelector('[data-favorite-count]');
    if(countEl){
      var savedCount = count(safeBoard);
      countEl.textContent = savedCount ? '已收藏 ' + savedCount + ' 项 / ' + savedCount + ' saved' : '本地收藏 / Local saved';
    }
  }

  function mountControls(options){
    options = options || {};
    var board = normalizeBoard(options.board);
    var grid = document.getElementById(options.gridId || '');
    if(!grid || document.querySelector('[data-favorite-controls="' + board + '"]')) return;
    installStyles();
    changeHandlers[board] = typeof options.onChange === 'function' ? options.onChange : null;
    if(!modeByBoard[board]) modeByBoard[board] = 'all';
    var bar = document.createElement('div');
    bar.className = 'favorite-filter-bar';
    bar.setAttribute('data-favorite-controls', board);
    bar.innerHTML = '<div class="favorite-filter-copy" data-favorite-count>本地收藏 / Local saved</div>' +
      '<div class="favorite-filter-actions">' +
        '<button class="favorite-filter-btn active" type="button" data-favorite-mode="all" aria-pressed="true">全部 / All</button>' +
        '<button class="favorite-filter-btn" type="button" data-favorite-mode="saved" aria-pressed="false">已收藏 / Saved</button>' +
      '</div>';
    grid.parentNode.insertBefore(bar, grid);
    bar.querySelectorAll('.favorite-filter-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ setMode(board, btn.dataset.favoriteMode); });
    });
    updateControlState(board);
  }

  window.BLInspirationFavorites = {
    buttonHTML: buttonHTML,
    bindButtons: bindButtons,
    isSaved: isSaved,
    isSavedMode: isSavedMode,
    filterItems: filterItems,
    mountControls: mountControls,
    updateControlCounts: updateControlCounts,
    syncAllButtons: syncAllButtons
  };
})();
