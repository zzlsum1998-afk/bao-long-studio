
    const COLOR_BOARD_BATCH = window.matchMedia && window.matchMedia('(max-width: 700px)').matches ? 18 : 36;
    const COLOR_BOARD_STEP = 24;
    let colorBoardItems = [];
    let colorBoardVisible = 0;
    let currentColorFilter = 'all';

    function escapeHTML(value){
      return String(value ?? '').replace(/[&<>"]/g, function(char){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char];
      });
    }

    function renderColorSource(item){
      return '<div class="source-row"><span class="source-name">BaoLong Lab</span><span class="source-btn disabled">Color Ref</span></div>';
    }

    function renderColorCard(item, index){
      const tags = (item.tags || []).map(function(tag){ return '<span class="pin-tag">' + escapeHTML(tag) + '</span>'; }).join('');
      const image = item.cover || item.image || '';
      const colorValues = item.colorValues || '';
      const pinDesc = '<strong>分类：</strong>' + escapeHTML((item.type || 'Color Board').replace('Color Board · ', '')) + ' / Color Board<br/><strong>主色：</strong>' + escapeHTML(colorValues);
      return '<article class="pin" data-color-type="' + escapeHTML(item.colorType || '') + '" data-color-index="' + index + '">' +
        '<div class="pin-img has-image" style="--h:' + escapeHTML(item.height || '330px') + ';--c:' + escapeHTML(item.color || '#f1eee8') + ';">' +
          '<img alt="' + escapeHTML(item.title) + '" decoding="async" loading="lazy" src="' + escapeHTML(image) + '"/>' +
          (window.BLInspirationFavorites ? window.BLInspirationFavorites.buttonHTML('color', item) : '') +
        '</div>' +
        '<div class="pin-body">' +
          '<div class="pin-tags">' + tags + '</div>' +
          '<h3>' + escapeHTML(item.title) + '</h3>' +
          '<p class="pin-desc">' + pinDesc + '</p>' +
          renderColorSource(item) +
        '</div>' +
      '</article>';
    }

    function getFilteredColorItems(){
      let items = currentColorFilter === 'all'
        ? colorBoardItems
        : colorBoardItems.filter(function(item){ return item.colorType === currentColorFilter; });
      return window.BLInspirationFavorites ? window.BLInspirationFavorites.filterItems('color', items) : items;
    }

    function bindColorCards(){
      if(window.BLInspirationFavorites) window.BLInspirationFavorites.bindButtons('#colorMasonry');
      document.querySelectorAll('#colorMasonry .pin').forEach(function(pin){
        pin.addEventListener('click', function(){
          const item = colorBoardItems[Number(pin.dataset.colorIndex)];
          if(!item) return;
          openModal(item.title, item.type || 'Color Board', item.image || item.cover || '', item.desc || '', item.sourceName || 'BaoLong Lab Color Reference', item.sourceUrl || '#', item.colorValues || '');
        });
      });
    }

    function updateColorLoadMore(){
      const btn = document.getElementById('colorLoadMoreBtn');
      const count = document.getElementById('colorLoadMoreCount');
      if(!btn || !count) return;
      const total = getFilteredColorItems().length;
      count.textContent = total ? '已显示 ' + Math.min(colorBoardVisible, total) + ' / ' + total + (window.BLInspirationFavorites && window.BLInspirationFavorites.isSavedMode('color') ? ' 张收藏' : ' 张色卡') : (window.BLInspirationFavorites && window.BLInspirationFavorites.isSavedMode('color') ? '当前分类暂无已收藏色卡' : '当前分类暂无色卡');
      btn.hidden = !total || colorBoardVisible >= total;
    }

    function renderColorBoard(reset){
      const grid = document.getElementById('colorMasonry');
      if(!grid) return;
      const filtered = getFilteredColorItems();
      if(reset){ colorBoardVisible = Math.min(COLOR_BOARD_BATCH, filtered.length); }
      const shown = filtered.slice(0, colorBoardVisible);
      grid.innerHTML = shown.map(function(item){
        const originalIndex = colorBoardItems.indexOf(item);
        return renderColorCard(item, originalIndex);
      }).join('');
      bindColorCards();
      updateColorLoadMore();
    }

    function loadMoreColorBoard(){
      const filtered = getFilteredColorItems();
      colorBoardVisible = Math.min(colorBoardVisible + COLOR_BOARD_STEP, filtered.length);
      renderColorBoard(false);
    }

    function filterColorCards(type){
      currentColorFilter = type;
      document.querySelectorAll('.color-filter-tab').forEach(function(tab){
        tab.classList.toggle('active', tab.dataset.filter === type);
      });
      renderColorBoard(true);
    }

    document.addEventListener('DOMContentLoaded', function(){
      const btn = document.getElementById('colorLoadMoreBtn');
      if(btn) btn.addEventListener('click', loadMoreColorBoard);
      if(window.BLInspirationFavorites){
        window.BLInspirationFavorites.mountControls({board:'color', gridId:'colorMasonry', onChange:function(){ renderColorBoard(true); }});
        document.addEventListener('baolong:favoriteschange', function(event){
          if(event.detail && event.detail.board === 'color' && window.BLInspirationFavorites.isSavedMode('color')) renderColorBoard(true);
        });
      }
      fetch('data/color.json')
        .then(function(res){
          if(!res.ok) throw new Error('color.json load failed');
          return res.json();
        })
        .then(function(data){
          colorBoardItems = Array.isArray(data) ? data : [];
          renderColorBoard(true);
        })
        .catch(function(err){
          const count = document.getElementById('colorLoadMoreCount');
          if(count) count.textContent = 'Color Board 数据加载失败，请检查 data/color.json 路径。';
          console.error(err);
        });
    });
  