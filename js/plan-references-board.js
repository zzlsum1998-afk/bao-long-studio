
    const PLAN_BOARD_BATCH = window.matchMedia && window.matchMedia('(max-width: 700px)').matches ? 18 : 36;
    const PLAN_BOARD_STEP = 24;
    let planBoardItems = [];
    let planBoardVisible = 0;

    function escapeHTML(value){
      return String(value ?? '').replace(/[&<>"]/g, function(char){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char];
      });
    }

    function renderPlanSource(item){
      const sourceName = escapeHTML(item.sourceName || 'Source Pending');
      const sourceUrl = item.sourceUrl || '#';
      const sourceLink = sourceUrl && sourceUrl !== '#'
        ? '<a class="source-link" href="' + escapeHTML(sourceUrl) + '" rel="noopener noreferrer" target="_blank">来源：' + sourceName + '</a>'
        : '<span>来源：' + sourceName + '</span>';
      const pinterestNote = item.isPinterest ? '<span>原始来源：未核实</span>' : '';
      return '<div class="source-block">' + sourceLink + pinterestNote + '<span>仅作灵感参考，版权归原作者所有。</span><span>如涉及版权问题，请联系删除。</span></div>';
    }

    function getFilteredPlanItems(){
      const items = Array.isArray(planBoardItems) ? planBoardItems : [];
      return window.BLInspirationFavorites ? window.BLInspirationFavorites.filterItems('plan', items) : items;
    }

    function renderPlanCard(item, index){
      const images = Array.isArray(item.images) ? item.images : [];
      const cover = item.cover || images[0] || '';
      const tags = (item.tags || []).map(function(tag){ return '<span class="pin-tag">' + escapeHTML(tag) + '</span>'; }).join('');
      const multiBadge = images.length > 1 ? '<span class="multi-badge"><span class="desktop-multi-label">' + images.length + ' Images</span><span class="mobile-multi-label" data-mobile-image-count>1 / ' + images.length + '</span></span>' : '';
      const mobileCarousel = images.length > 1 ? '<button class="pin-mobile-image-nav prev" type="button" aria-label="上一张图片 / Previous image" data-image-step="-1">‹</button><button class="pin-mobile-image-nav next" type="button" aria-label="下一张图片 / Next image" data-image-step="1">›</button>' : '';
      return '<article class="pin" data-plan-index="' + index + '">' +
        '<div class="pin-img has-image' + (images.length > 1 ? ' is-carousel' : '') + '" data-mobile-image-index="0" style="--h:' + escapeHTML(item.height || '300px') + ';--c:' + escapeHTML(item.color || '#f4f1eb') + ';">' +
          '<img alt="' + escapeHTML(item.title) + '" decoding="async" loading="lazy" src="' + escapeHTML(cover) + '"/>' + multiBadge + mobileCarousel +
          (window.BLInspirationFavorites ? window.BLInspirationFavorites.buttonHTML('plan', item) : '') +
        '</div>' +
        '<div class="pin-body">' +
          '<div class="pin-tags">' + tags + '</div>' +
          '<h3>' + escapeHTML(item.title) + '</h3>' +
          '<p class="pin-desc">' + escapeHTML(item.desc || '') + '</p>' +
          renderPlanSource(item) +
        '</div>' +
      '</article>';
    }


    function changePlanCardImage(pin, step){
      if(!pin) return;
      const item = planBoardItems[Number(pin.dataset.planIndex)];
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

    function bindPlanCards(){
      if(window.BLInspirationFavorites) window.BLInspirationFavorites.bindButtons('#planMasonry');
      document.querySelectorAll('#planMasonry .pin-mobile-image-nav:not([data-carousel-bound="true"])').forEach(function(btn){
        btn.dataset.carouselBound = 'true';
        btn.addEventListener('click', function(event){
          event.preventDefault();
          event.stopPropagation();
          const step = Number(btn.dataset.imageStep || 1);
          changePlanCardImage(btn.closest('.pin'), step);
        });
      });
      document.querySelectorAll('#planMasonry .pin:not([data-card-bound="true"])').forEach(function(pin){
        pin.dataset.cardBound = 'true';
        pin.addEventListener('click', function(){
          const item = planBoardItems[Number(pin.dataset.planIndex)];
          if(!item) return;
          openModal(item.title, item.type || 'Plan Inspiration', item.images || [], item.desc || '', item.sourceName || '', item.sourceUrl || '', !!item.isPinterest);
        });
      });
      document.querySelectorAll('#planMasonry .source-link:not([data-source-bound="true"])').forEach(function(link){
        link.dataset.sourceBound = 'true';
        link.addEventListener('click', function(event){ event.stopPropagation(); });
      });
      if(typeof injectPromptButtons === 'function') injectPromptButtons();
      if(typeof scheduleInspirationMasonry === 'function') scheduleInspirationMasonry();
    }

    function updatePlanLoadMore(){
      const btn = document.getElementById('planLoadMoreBtn');
      const count = document.getElementById('planLoadMoreCount');
      if(!btn || !count) return;
      const total = getFilteredPlanItems().length;
      count.textContent = total ? '已显示 ' + Math.min(planBoardVisible, total) + ' / ' + total + (window.BLInspirationFavorites && window.BLInspirationFavorites.isSavedMode('plan') ? ' 张收藏' : ' 张参考') : (window.BLInspirationFavorites && window.BLInspirationFavorites.isSavedMode('plan') ? '暂无已收藏 Plan 参考' : '暂无 Plan Board 数据');
      btn.hidden = !total || planBoardVisible >= total;
    }

    function appendPlanCards(fromIndex, toIndex){
      const grid = document.getElementById('planMasonry');
      if(!grid || toIndex <= fromIndex) return;
      const filteredItems = getFilteredPlanItems();
      const html = filteredItems.slice(fromIndex, toIndex).map(function(item){
        return renderPlanCard(item, planBoardItems.indexOf(item));
      }).join('');
      grid.insertAdjacentHTML('beforeend', html);
    }

    function renderPlanBoard(reset){
      const grid = document.getElementById('planMasonry');
      if(!grid) return;
      if(reset){
        grid.innerHTML = '';
        planBoardVisible = 0;
      }
      const targetVisible = reset
        ? Math.min(PLAN_BOARD_BATCH, getFilteredPlanItems().length)
        : Math.min(planBoardVisible, getFilteredPlanItems().length);
      appendPlanCards(planBoardVisible, targetVisible);
      planBoardVisible = targetVisible;
      bindPlanCards();
      updatePlanLoadMore();
    }

    function loadMorePlanBoard(event){
      /* v160: append the next batch without letting browser scroll anchoring or
         masonry recalculation pull the viewport up/down. */
      if(event) event.preventDefault();
      const btn = document.getElementById('planLoadMoreBtn');
      if(btn) btn.blur();

      const runAppend = function(){
        const targetVisible = Math.min(planBoardVisible + PLAN_BOARD_STEP, getFilteredPlanItems().length);
        appendPlanCards(planBoardVisible, targetVisible);
        planBoardVisible = targetVisible;
        bindPlanCards();
        updatePlanLoadMore();
      };

      if(typeof window.withStableInspirationScroll === 'function'){
        window.withStableInspirationScroll(runAppend);
      }else{
        runAppend();
      }
    }

    document.addEventListener('DOMContentLoaded', function(){
      const btn = document.getElementById('planLoadMoreBtn');
      if(btn) {
        btn.addEventListener('mousedown', function(event){ event.preventDefault(); });
        btn.addEventListener('click', loadMorePlanBoard);
      }
      if(window.BLInspirationFavorites){
        window.BLInspirationFavorites.mountControls({board:'plan', gridId:'planMasonry', onChange:function(){ renderPlanBoard(true); }});
        document.addEventListener('baolong:favoriteschange', function(event){
          if(event.detail && event.detail.board === 'plan' && window.BLInspirationFavorites.isSavedMode('plan')) renderPlanBoard(true);
        });
      }
      fetch('data/plan.json')
        .then(function(res){
          if(!res.ok) throw new Error('plan.json load failed');
          return res.json();
        })
        .then(function(data){
          planBoardItems = Array.isArray(data) ? data : [];
          renderPlanBoard(true);
        })
        .catch(function(err){
          const count = document.getElementById('planLoadMoreCount');
          if(count) count.textContent = 'Plan Board 数据加载失败，请检查 data/plan.json 路径。';
          console.error(err);
        });
    });
  