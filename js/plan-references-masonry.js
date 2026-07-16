
    /* v160 desktop masonry sizing: keep the waterfall look, but avoid visible reflow jumps on Load More.
       v159 briefly cleared every card's masonry span before measuring, so the whole board collapsed and re-expanded.
       This version measures cards in place, throttles image-load recalculation, and exposes a stable scroll helper. */
    (function(){
      let masonryResizeTimer = null;
      let masonryFrame = null;
      let masonrySettleTimer = null;
      function isSingleColumnMasonry(){
        return window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
      }
      window.resizeInspirationMasonry = function(){
        document.querySelectorAll('.masonry').forEach(function(grid){
          const pins = Array.prototype.slice.call(grid.querySelectorAll('.pin'));
          if(!pins.length) return;
          if(isSingleColumnMasonry()){
            pins.forEach(function(pin){
              pin.style.gridRowEnd = '';
              pin.style.removeProperty('--masonry-span');
            });
            return;
          }
          const style = window.getComputedStyle(grid);
          const rowHeight = parseFloat(style.getPropertyValue('grid-auto-rows')) || 8;
          const rowGap = parseFloat(style.getPropertyValue('row-gap')) || 0;
          pins.forEach(function(pin){
            const height = pin.getBoundingClientRect().height;
            const span = Math.max(1, Math.ceil((height + rowGap) / (rowHeight + rowGap)));
            pin.style.setProperty('--masonry-span', span);
            pin.style.gridRowEnd = 'span ' + span;
          });
        });
      };
      window.scheduleInspirationMasonry = function(){
        if(masonryFrame) return;
        masonryFrame = window.requestAnimationFrame(function(){
          masonryFrame = null;
          window.resizeInspirationMasonry();
          window.clearTimeout(masonrySettleTimer);
          masonrySettleTimer = window.setTimeout(window.resizeInspirationMasonry, 220);
        });
      };
      window.withStableInspirationScroll = function(callback){
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft || 0;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const docEl = document.documentElement;
        const body = document.body;
        const prevDocScrollBehavior = docEl.style.scrollBehavior;
        const prevBodyScrollBehavior = body.style.scrollBehavior;
        const prevDocOverflowAnchor = docEl.style.overflowAnchor;
        const prevBodyOverflowAnchor = body.style.overflowAnchor;
        docEl.style.scrollBehavior = 'auto';
        body.style.scrollBehavior = 'auto';
        docEl.style.overflowAnchor = 'none';
        body.style.overflowAnchor = 'none';
        if(typeof callback === 'function') callback();
        window.scrollTo(scrollX, scrollY);
        window.requestAnimationFrame(function(){
          window.scrollTo(scrollX, scrollY);
          window.setTimeout(function(){
            window.scrollTo(scrollX, scrollY);
            docEl.style.scrollBehavior = prevDocScrollBehavior;
            body.style.scrollBehavior = prevBodyScrollBehavior;
            docEl.style.overflowAnchor = prevDocOverflowAnchor;
            body.style.overflowAnchor = prevBodyOverflowAnchor;
          }, 260);
        });
      };
      window.addEventListener('resize', function(){
        window.clearTimeout(masonryResizeTimer);
        masonryResizeTimer = window.setTimeout(window.scheduleInspirationMasonry, 120);
      });
      document.addEventListener('load', function(event){
        if(event.target && event.target.matches && event.target.matches('.masonry img')){
          window.scheduleInspirationMasonry();
        }
      }, true);
      document.addEventListener('DOMContentLoaded', window.scheduleInspirationMasonry);
    })();
  