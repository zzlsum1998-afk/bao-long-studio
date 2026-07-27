
    let currentColorValues = "";

    function extractColorValueBlock(text){
      const rawText = String(text || "");
      const match = rawText.match(/主色参考：(.+?)。适合用于/);
      return match ? match[1].trim() : "";
    }


    /* v358-fixed: lock the background page without fixing the body.
       Fixed-body restoration briefly exposed the page top before scroll recovery,
       producing a visible upward slide on desktop Color Board modal close. */
    let __baolongModalScrollY = 0;
    let __baolongModalPreviousBodyStyle = null;
    let __baolongModalPreviousDocStyle = null;
    function lockPageScroll(){
      if(document.body.classList.contains('modal-scroll-locked')) return;
      const docEl = document.documentElement;
      __baolongModalScrollY = window.pageYOffset || docEl.scrollTop || document.body.scrollTop || 0;
      __baolongModalPreviousBodyStyle = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
        overscrollBehavior: document.body.style.overscrollBehavior,
        scrollBehavior: document.body.style.scrollBehavior
      };
      __baolongModalPreviousDocStyle = {
        overflow: docEl.style.overflow,
        overscrollBehavior: docEl.style.overscrollBehavior,
        scrollBehavior: docEl.style.scrollBehavior
      };
      const scrollbarGap = Math.max(0, window.innerWidth - docEl.clientWidth);
      document.body.classList.add('modal-scroll-locked');
      docEl.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
      docEl.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      docEl.style.overscrollBehavior = 'none';
      document.body.style.overscrollBehavior = 'none';
      if(scrollbarGap > 0){
        document.body.style.paddingRight = scrollbarGap + 'px';
      }
    }
    function unlockPageScroll(){
      if(!document.body.classList.contains('modal-scroll-locked')) return;
      const docEl = document.documentElement;
      const targetScrollY = __baolongModalScrollY || 0;
      document.body.classList.remove('modal-scroll-locked');
      const previousBody = __baolongModalPreviousBodyStyle || {};
      const previousDoc = __baolongModalPreviousDocStyle || {};
      docEl.style.overflow = previousDoc.overflow || '';
      docEl.style.overscrollBehavior = previousDoc.overscrollBehavior || '';
      docEl.style.scrollBehavior = previousDoc.scrollBehavior || '';
      document.body.style.overflow = previousBody.overflow || '';
      document.body.style.paddingRight = previousBody.paddingRight || '';
      document.body.style.overscrollBehavior = previousBody.overscrollBehavior || '';
      document.body.style.scrollBehavior = previousBody.scrollBehavior || '';
      window.requestAnimationFrame(function(){
        const currentScrollY = window.pageYOffset || docEl.scrollTop || document.body.scrollTop || 0;
        if(Math.abs(currentScrollY - targetScrollY) > 2){
          const previousInlineScrollBehavior = docEl.style.scrollBehavior;
          docEl.style.scrollBehavior = 'auto';
          window.scrollTo(0, targetScrollY);
          docEl.style.scrollBehavior = previousInlineScrollBehavior;
        }
      });
      __baolongModalPreviousBodyStyle = null;
      __baolongModalPreviousDocStyle = null;
    }



    /* v376-fixed3: stop wheel/touch scroll chaining from an open modal back to the page.
       Keep the modal's own scrollable copy area usable, including at desktop and mobile sizes. */
    let __baolongModalTouchY = null;
    function getScrollableModalArea(target, modal){
      let node = target instanceof Element ? target : null;
      while(node && node !== modal){
        const style = window.getComputedStyle(node);
        const overflowY = style.overflowY;
        if(/auto|scroll|overlay/.test(overflowY) && node.scrollHeight > node.clientHeight + 1){
          return node;
        }
        node = node.parentElement;
      }
      return null;
    }
    function canModalAreaConsumeScroll(area, deltaY){
      if(!area || !deltaY) return false;
      const atTop = area.scrollTop <= 0;
      const atBottom = area.scrollTop + area.clientHeight >= area.scrollHeight - 1;
      if(deltaY < 0 && atTop) return false;
      if(deltaY > 0 && atBottom) return false;
      return true;
    }
    function guardModalWheel(event){
      const modal = document.getElementById('modal');
      if(!modal || !modal.classList.contains('open')) return;
      const area = getScrollableModalArea(event.target, modal);
      if(!canModalAreaConsumeScroll(area, event.deltaY)) event.preventDefault();
      event.stopPropagation();
    }
    function rememberModalTouch(event){
      if(event.touches && event.touches.length === 1){
        __baolongModalTouchY = event.touches[0].clientY;
      }
    }
    function guardModalTouch(event){
      const modal = document.getElementById('modal');
      if(!modal || !modal.classList.contains('open') || !event.touches || event.touches.length !== 1) return;
      const currentY = event.touches[0].clientY;
      if(__baolongModalTouchY === null){
        __baolongModalTouchY = currentY;
        return;
      }
      const deltaY = __baolongModalTouchY - currentY;
      __baolongModalTouchY = currentY;
      if(Math.abs(deltaY) < 1) return;
      const area = getScrollableModalArea(event.target, modal);
      if(!canModalAreaConsumeScroll(area, deltaY)) event.preventDefault();
      event.stopPropagation();
    }
    function clearModalTouch(){
      __baolongModalTouchY = null;
    }
    function bindModalScrollGuard(modal){
      if(!modal || modal.dataset.scrollGuardBound === 'true') return;
      modal.dataset.scrollGuardBound = 'true';
      modal.addEventListener('wheel', guardModalWheel, {passive:false});
      modal.addEventListener('touchstart', rememberModalTouch, {passive:true});
      modal.addEventListener('touchmove', guardModalTouch, {passive:false});
      modal.addEventListener('touchend', clearModalTouch, {passive:true});
      modal.addEventListener('touchcancel', clearModalTouch, {passive:true});
    }

    function openModal(title, type, imageOrColor, desc, exactColorValues){
      document.getElementById("modalTitle").textContent = title;
      document.getElementById("modalType").textContent = type;
      document.getElementById("modalDesc").textContent = desc;
      currentColorValues = exactColorValues || extractColorValueBlock(desc);
      document.getElementById("modalColorValues").textContent = currentColorValues ? "色值/色号：" + currentColorValues : "色值/色号：待补充";
      const copyBtn = document.getElementById("copyColorBtn");
      if(copyBtn){
        copyBtn.textContent = "复制色值";
        copyBtn.classList.remove("copied");
        copyBtn.disabled = !currentColorValues;
      }
      const modalImg = document.getElementById("modalImg");
      if(imageOrColor && /\.(png|jpe?g|webp|gif)$/i.test(imageOrColor)){
        modalImg.classList.add("has-image");
        modalImg.style.background = "#f7f6f2";
        modalImg.innerHTML = '<img src="' + imageOrColor + '" alt="' + title + '" loading="lazy" decoding="async">';
      }else{
        modalImg.classList.remove("has-image");
        modalImg.innerHTML = "";
        modalImg.style.background = imageOrColor || "#e6e3dc";
      }
      document.getElementById("modal").classList.add("open");
      lockPageScroll();
    }

    async function copyModalColorValues(event){
      if(event) event.stopPropagation();
      if(!currentColorValues) return;
      const button = document.getElementById("copyColorBtn");
      try{
        await navigator.clipboard.writeText(currentColorValues);
        if(button){
          button.textContent = "已复制";
          button.classList.add("copied");
        }
      }catch(error){
        const textarea = document.createElement("textarea");
        textarea.value = currentColorValues;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        if(button){
          button.textContent = "已复制";
          button.classList.add("copied");
        }
      }
    }

    function closeModal(event){
      if(event && event.target !== document.getElementById("modal")) return;
      document.getElementById("modal").classList.remove("open");
      unlockPageScroll();
    }

    function bindColorReferenceModalEvents(){
      const modal = document.getElementById('modal');
      const modalCard = document.getElementById('modalCard');
      const closeButton = document.getElementById('modalCloseBtn');
      const copyButton = document.getElementById('copyColorBtn');

      if(modal){
        modal.addEventListener('click', closeModal);
        bindModalScrollGuard(modal);
      }
      if(modalCard){
        modalCard.addEventListener('click', function(event){
          event.stopPropagation();
        });
      }
      if(closeButton) closeButton.addEventListener('click', function(){ closeModal(); });
      if(copyButton) copyButton.addEventListener('click', copyModalColorValues);
    }

    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', bindColorReferenceModalEvents);
    }else{
      bindColorReferenceModalEvents();
    }
