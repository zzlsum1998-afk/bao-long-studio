
    /* Other Board data loader: reads static JSON from /data so future backend API can keep the same structure. */
    const OTHER_BOARD_BATCH = window.matchMedia && window.matchMedia('(max-width: 680px)').matches ? 18 : 36;
    const OTHER_BOARD_STEP = window.matchMedia && window.matchMedia('(max-width: 680px)').matches ? 18 : 24;
    let otherBoardItems = [];
    let otherBoardVisible = 0;

    function escapeHTML(value){
      return String(value ?? '').replace(/[&<>"]/g, function(char){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char];
      });
    }

    function renderOtherSource(item){
      const sourceName = escapeHTML(item.sourceName || 'Source Pending');
      const sourceUrl = item.sourceUrl || '#';
      const sourceLink = sourceUrl && sourceUrl !== '#'
        ? '<a class="source-link" href="' + escapeHTML(sourceUrl) + '" rel="noopener noreferrer" target="_blank">来源：' + sourceName + '</a>'
        : '<span>来源：' + sourceName + '</span>';
      const pinterestNote = item.isPinterest ? '<span>原始来源：未核实</span>' : '';
      return '<div class="source-block">' + sourceLink + pinterestNote + '<span>仅作灵感参考，版权归原作者所有。</span><span>如涉及版权问题，请联系删除。</span></div>';
    }

    function getFilteredOtherItems(){
      const items = Array.isArray(otherBoardItems) ? otherBoardItems : [];
      return window.BLInspirationFavorites ? window.BLInspirationFavorites.filterItems('other', items) : items;
    }

    function renderOtherCard(item, index){
      const images = Array.isArray(item.images) ? item.images : [];
      const cover = item.cover || images[0] || '';
      const tags = (item.tags || []).map(function(tag){ return '<span class="pin-tag">' + escapeHTML(tag) + '</span>'; }).join('');
      const multiBadge = images.length > 1 ? '<span class="multi-badge"><span class="desktop-multi-label">' + images.length + ' Images</span><span class="mobile-multi-label" data-mobile-image-count>1 / ' + images.length + '</span></span>' : '';
      const mobileCarousel = images.length > 1 ? '<button class="pin-mobile-image-nav prev" type="button" aria-label="上一张图片 / Previous image" data-image-step="-1">‹</button><button class="pin-mobile-image-nav next" type="button" aria-label="下一张图片 / Next image" data-image-step="1">›</button>' : '';
      return '<article class="pin" data-other-index="' + index + '">' +
        '<div class="pin-img has-image' + (images.length > 1 ? ' is-carousel' : '') + '" data-mobile-image-index="0" style="--h:' + escapeHTML(item.height || '300px') + ';--c:' + escapeHTML(item.color || '#f4f1eb') + ';">' +
          '<img alt="' + escapeHTML(item.title) + '" decoding="async" loading="lazy" src="' + escapeHTML(cover) + '"/>' + multiBadge + mobileCarousel +
          (window.BLInspirationFavorites ? window.BLInspirationFavorites.buttonHTML('other', item) : '') +
        '</div>' +
        '<div class="pin-body">' +
          '<div class="pin-tags">' + tags + '</div>' +
          '<h3>' + escapeHTML(item.title) + '</h3>' +
          '<p class="pin-desc">' + escapeHTML(item.desc || '') + '</p>' +
          renderOtherSource(item) +
        '</div>' +
      '</article>';
    }


    function changeOtherCardImage(pin, step){
      if(!pin) return;
      const item = otherBoardItems[Number(pin.dataset.otherIndex)];
      const images = Array.isArray(item && item.images) ? item.images : [];
      if(images.length < 2) return;
      const imgWrap = pin.querySelector('.pin-img');
      const img = imgWrap ? imgWrap.querySelector('img') : null;
      if(!imgWrap || !img) return;
      const current = Number(imgWrap.dataset.mobileImageIndex || 0);
      const next = (current + step + images.length) % images.length;
      imgWrap.dataset.mobileImageIndex = String(next);
      img.src = images[next];
      img.alt = (item.title || 'Inspiration image') + ' ' + (next + 1);
      const counter = pin.querySelector('[data-mobile-image-count]');
      if(counter) counter.textContent = (next + 1) + ' / ' + images.length;
    }

    function bindOtherCards(){
      if(window.BLInspirationFavorites) window.BLInspirationFavorites.bindButtons('#otherMasonry');
      document.querySelectorAll('#otherMasonry .pin-mobile-image-nav:not([data-carousel-bound="true"])').forEach(function(btn){
        btn.dataset.carouselBound = 'true';
        btn.addEventListener('click', function(event){
          event.preventDefault();
          event.stopPropagation();
          const step = Number(btn.dataset.imageStep || 1);
          changeOtherCardImage(btn.closest('.pin'), step);
        });
      });
      document.querySelectorAll('#otherMasonry .pin:not([data-card-bound="true"])').forEach(function(pin){
        pin.dataset.cardBound = 'true';
        pin.addEventListener('click', function(){
          const item = otherBoardItems[Number(pin.dataset.otherIndex)];
          if(!item) return;
          openModal(item.title, item.type || 'Other Inspiration', item.images || [], item.desc || '', item.sourceName || '', item.sourceUrl || '', !!item.isPinterest);
        });
      });
      document.querySelectorAll('#otherMasonry .source-link:not([data-source-bound="true"])').forEach(function(link){
        link.dataset.sourceBound = 'true';
        link.addEventListener('click', function(event){ event.stopPropagation(); });
      });
      if(typeof injectPromptButtons === 'function') injectPromptButtons();
      if(typeof scheduleInspirationMasonry === 'function') scheduleInspirationMasonry();
    }

    function updateOtherLoadMore(){
      const btn = document.getElementById('otherLoadMoreBtn');
      const count = document.getElementById('otherLoadMoreCount');
      if(!btn || !count) return;
      const total = getFilteredOtherItems().length;
      count.textContent = total ? '已显示 ' + Math.min(otherBoardVisible, total) + ' / ' + total + (window.BLInspirationFavorites && window.BLInspirationFavorites.isSavedMode('other') ? ' 张收藏' : ' 张参考') : (window.BLInspirationFavorites && window.BLInspirationFavorites.isSavedMode('other') ? '暂无已收藏 Other 参考' : '暂无 Other Board 数据');
      btn.hidden = !total || otherBoardVisible >= total;
    }

    function appendOtherCards(fromIndex, toIndex){
      const grid = document.getElementById('otherMasonry');
      if(!grid || toIndex <= fromIndex) return;
      const filteredItems = getFilteredOtherItems();
      const html = filteredItems.slice(fromIndex, toIndex).map(function(item){
        return renderOtherCard(item, otherBoardItems.indexOf(item));
      }).join('');
      grid.insertAdjacentHTML('beforeend', html);
    }

    function renderOtherBoard(reset){
      const grid = document.getElementById('otherMasonry');
      if(!grid) return;
      if(reset){
        grid.innerHTML = '';
        otherBoardVisible = 0;
      }
      const targetVisible = reset
        ? Math.min(OTHER_BOARD_BATCH, getFilteredOtherItems().length)
        : Math.min(otherBoardVisible, getFilteredOtherItems().length);
      appendOtherCards(otherBoardVisible, targetVisible);
      otherBoardVisible = targetVisible;
      bindOtherCards();
      updateOtherLoadMore();
    }

    function loadMoreOtherBoard(event){
      /* v160: Other Board only. Append the next batch without letting browser
         scroll anchoring or masonry recalculation pull the viewport up/down. */
      if(event) event.preventDefault();
      const btn = document.getElementById('otherLoadMoreBtn');
      if(btn) btn.blur();

      const runAppend = function(){
        const targetVisible = Math.min(otherBoardVisible + OTHER_BOARD_STEP, getFilteredOtherItems().length);
        appendOtherCards(otherBoardVisible, targetVisible);
        otherBoardVisible = targetVisible;
        bindOtherCards();
        updateOtherLoadMore();
      };

      if(typeof window.withStableInspirationScroll === 'function'){
        window.withStableInspirationScroll(runAppend);
      }else{
        runAppend();
      }
    }

    document.addEventListener('DOMContentLoaded', function(){
      const btn = document.getElementById('otherLoadMoreBtn');
      if(btn) {
        btn.addEventListener('mousedown', function(event){ event.preventDefault(); });
        btn.addEventListener('click', loadMoreOtherBoard);
      }
      if(window.BLInspirationFavorites){
        window.BLInspirationFavorites.mountControls({board:'other', gridId:'otherMasonry', onChange:function(){ renderOtherBoard(true); }});
        document.addEventListener('baolong:favoriteschange', function(event){
          if(event.detail && event.detail.board === 'other' && window.BLInspirationFavorites.isSavedMode('other')) renderOtherBoard(true);
        });
      }
      fetch('data/other.json')
        .then(function(res){
          if(!res.ok) throw new Error('other.json load failed');
          return res.json();
        })
        .then(function(data){
          otherBoardItems = Array.isArray(data) ? data : [];
          renderOtherBoard(true);
        })
        .catch(function(err){
          const count = document.getElementById('otherLoadMoreCount');
          if(count) count.textContent = 'Other Board 数据加载失败，请检查 data/other.json 路径。';
          console.error(err);
        });
    });
  