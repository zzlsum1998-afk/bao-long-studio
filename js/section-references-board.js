
    const SECTION_BOARD_BATCH = window.matchMedia && window.matchMedia('(max-width: 700px)').matches ? 18 : 36;
    const SECTION_BOARD_STEP = 24;
    let sectionBoardItems = [];
    let sectionBoardVisible = 0;

    function escapeHTML(value){
      return String(value ?? '').replace(/[&<>"]/g, function(char){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char];
      });
    }

    function renderSectionSource(item){
      const sourceName = escapeHTML(item.sourceName || 'Source Pending');
      const sourceUrl = item.sourceUrl || '#';
      const sourceLink = sourceUrl && sourceUrl !== '#'
        ? '<a class="source-link" href="' + escapeHTML(sourceUrl) + '" rel="noopener noreferrer" target="_blank">来源：' + sourceName + '</a>'
        : '<span>来源：' + sourceName + '</span>';
      const pinterestNote = item.isPinterest ? '<span>原始来源：未核实</span>' : '';
      return '<div class="source-block">' + sourceLink + pinterestNote + '<span>仅作灵感参考，版权归原作者所有。</span><span>如涉及版权问题，请联系删除。</span></div>';
    }

    function getFilteredSectionItems(){
      const items = Array.isArray(sectionBoardItems) ? sectionBoardItems : [];
      return window.BLInspirationFavorites ? window.BLInspirationFavorites.filterItems('section', items) : items;
    }

    function renderSectionCard(item, index){
      const images = Array.isArray(item.images) ? item.images : [];
      const cover = item.cover || images[0] || '';
      const tags = (item.tags || []).map(function(tag){ return '<span class="pin-tag">' + escapeHTML(tag) + '</span>'; }).join('');
      const multiBadge = images.length > 1 ? '<span class="multi-badge"><span class="desktop-multi-label">' + images.length + ' Images</span><span class="mobile-multi-label" data-mobile-image-count>1 / ' + images.length + '</span></span>' : '';
      const mobileCarousel = images.length > 1 ? '<button class="pin-mobile-image-nav prev" type="button" aria-label="上一张图片 / Previous image" data-image-step="-1">‹</button><button class="pin-mobile-image-nav next" type="button" aria-label="下一张图片 / Next image" data-image-step="1">›</button>' : '';
      return '<article class="pin" data-section-index="' + index + '">' +
        '<div class="pin-img has-image' + (images.length > 1 ? ' is-carousel' : '') + '" data-mobile-image-index="0" style="--h:' + escapeHTML(item.height || '300px') + ';--c:' + escapeHTML(item.color || '#f4f1eb') + ';">' +
          '<img alt="' + escapeHTML(item.title) + '" decoding="async" loading="lazy" src="' + escapeHTML(cover) + '"/>' + multiBadge + mobileCarousel +
          (window.BLInspirationFavorites ? window.BLInspirationFavorites.buttonHTML('section', item) : '') +
        '</div>' +
        '<div class="pin-body">' +
          '<div class="pin-tags">' + tags + '</div>' +
          '<h3>' + escapeHTML(item.title) + '</h3>' +
          '<p class="pin-desc">' + escapeHTML(item.desc || '') + '</p>' +
          renderSectionSource(item) +
        '</div>' +
      '</article>';
    }


    function changeSectionCardImage(pin, step){
      if(!pin) return;
      const item = sectionBoardItems[Number(pin.dataset.sectionIndex)];
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

    function bindSectionCards(){
      if(window.BLInspirationFavorites) window.BLInspirationFavorites.bindButtons('#sectionMasonry');
      document.querySelectorAll('#sectionMasonry .pin-mobile-image-nav:not([data-carousel-bound="true"])').forEach(function(btn){
        btn.dataset.carouselBound = 'true';
        btn.addEventListener('click', function(event){
          event.preventDefault();
          event.stopPropagation();
          const step = Number(btn.dataset.imageStep || 1);
          changeSectionCardImage(btn.closest('.pin'), step);
        });
      });
      document.querySelectorAll('#sectionMasonry .pin:not([data-card-bound="true"])').forEach(function(pin){
        pin.dataset.cardBound = 'true';
        pin.addEventListener('click', function(){
          const item = sectionBoardItems[Number(pin.dataset.sectionIndex)];
          if(!item) return;
          openModal(item.title, item.type || 'Section Inspiration', item.images || [], item.desc || '', item.sourceName || '', item.sourceUrl || '', !!item.isPinterest);
        });
      });
      document.querySelectorAll('#sectionMasonry .source-link:not([data-source-bound="true"])').forEach(function(link){
        link.dataset.sourceBound = 'true';
        link.addEventListener('click', function(event){ event.stopPropagation(); });
      });
      if(typeof injectPromptButtons === 'function') injectPromptButtons();
      if(typeof scheduleInspirationMasonry === 'function') scheduleInspirationMasonry();
    }

    function updateSectionLoadMore(){
      const btn = document.getElementById('sectionLoadMoreBtn');
      const count = document.getElementById('sectionLoadMoreCount');
      if(!btn || !count) return;
      const total = getFilteredSectionItems().length;
      count.textContent = total ? '已显示 ' + Math.min(sectionBoardVisible, total) + ' / ' + total + (window.BLInspirationFavorites && window.BLInspirationFavorites.isSavedMode('section') ? ' 张收藏' : ' 张参考') : (window.BLInspirationFavorites && window.BLInspirationFavorites.isSavedMode('section') ? '暂无已收藏 Section 参考' : '暂无 Section Board 数据');
      btn.hidden = !total || sectionBoardVisible >= total;
    }

    function appendSectionCards(fromIndex, toIndex){
      const grid = document.getElementById('sectionMasonry');
      if(!grid || toIndex <= fromIndex) return;
      const filteredItems = getFilteredSectionItems();
      const html = filteredItems.slice(fromIndex, toIndex).map(function(item){
        return renderSectionCard(item, sectionBoardItems.indexOf(item));
      }).join('');
      grid.insertAdjacentHTML('beforeend', html);
    }

    function renderSectionBoard(reset){
      const grid = document.getElementById('sectionMasonry');
      if(!grid) return;
      if(reset){
        grid.innerHTML = '';
        sectionBoardVisible = 0;
      }
      const targetVisible = reset
        ? Math.min(SECTION_BOARD_BATCH, getFilteredSectionItems().length)
        : Math.min(sectionBoardVisible, getFilteredSectionItems().length);
      appendSectionCards(sectionBoardVisible, targetVisible);
      sectionBoardVisible = targetVisible;
      bindSectionCards();
      updateSectionLoadMore();
    }

    function loadMoreSectionBoard(event){
      /* v160: append the next batch without letting browser scroll anchoring or
         masonry recalculation pull the viewport up/down. */
      if(event) event.preventDefault();
      const btn = document.getElementById('sectionLoadMoreBtn');
      if(btn) btn.blur();

      const runAppend = function(){
        const targetVisible = Math.min(sectionBoardVisible + SECTION_BOARD_STEP, getFilteredSectionItems().length);
        appendSectionCards(sectionBoardVisible, targetVisible);
        sectionBoardVisible = targetVisible;
        bindSectionCards();
        updateSectionLoadMore();
      };

      if(typeof window.withStableInspirationScroll === 'function'){
        window.withStableInspirationScroll(runAppend);
      }else{
        runAppend();
      }
    }

    document.addEventListener('DOMContentLoaded', function(){
      const btn = document.getElementById('sectionLoadMoreBtn');
      if(btn) {
        btn.addEventListener('mousedown', function(event){ event.preventDefault(); });
        btn.addEventListener('click', loadMoreSectionBoard);
      }
      if(window.BLInspirationFavorites){
        window.BLInspirationFavorites.mountControls({board:'section', gridId:'sectionMasonry', onChange:function(){ renderSectionBoard(true); }});
        document.addEventListener('baolong:favoriteschange', function(event){
          if(event.detail && event.detail.board === 'section' && window.BLInspirationFavorites.isSavedMode('section')) renderSectionBoard(true);
        });
      }
      fetch('data/section.json')
        .then(function(res){
          if(!res.ok) throw new Error('section.json load failed');
          return res.json();
        })
        .then(function(data){
          sectionBoardItems = Array.isArray(data) ? data : [];
          renderSectionBoard(true);
        })
        .catch(function(err){
          const count = document.getElementById('sectionLoadMoreCount');
          if(count) count.textContent = 'Section Board 数据加载失败，请检查 data/section.json 路径。';
          console.error(err);
        });
    });
  