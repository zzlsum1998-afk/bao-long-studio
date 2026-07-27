
    let currentColorValues = "";

    function extractColorValueBlock(text){
      const rawText = String(text || "");
      const match = rawText.match(/主色参考：(.+?)。适合用于/);
      return match ? match[1].trim() : "";
    }


    /* v376-fixed3-fixed: freeze the page at its exact viewport position while the detail modal is open.
       This restores fixed-body locking, but closes synchronously with scroll-behavior forced to auto,
       so the page cannot move behind the modal and does not visibly slide before returning. */
    let __baolongModalScrollY = 0;
    let __baolongModalPreviousBodyStyle = null;
    let __baolongModalPreviousDocStyle = null;
    function lockPageScroll(){
      if(document.body.classList.contains('modal-scroll-locked')) return;
      const docEl = document.documentElement;
      const body = document.body;
      __baolongModalScrollY = window.pageYOffset || docEl.scrollTop || body.scrollTop || 0;
      __baolongModalPreviousBodyStyle = {
        position: body.style.position,
        top: body.style.top,
        left: body.style.left,
        right: body.style.right,
        width: body.style.width,
        overflow: body.style.overflow,
        paddingRight: body.style.paddingRight,
        overscrollBehavior: body.style.overscrollBehavior,
        scrollBehavior: body.style.scrollBehavior
      };
      __baolongModalPreviousDocStyle = {
        overflow: docEl.style.overflow,
        overscrollBehavior: docEl.style.overscrollBehavior,
        scrollBehavior: docEl.style.scrollBehavior
      };
      const scrollbarGap = Math.max(0, window.innerWidth - docEl.clientWidth);
      const currentPaddingRight = parseFloat(window.getComputedStyle(body).paddingRight) || 0;

      body.classList.add('modal-scroll-locked');
      docEl.style.scrollBehavior = 'auto';
      body.style.scrollBehavior = 'auto';
      docEl.style.overflow = 'hidden';
      docEl.style.overscrollBehavior = 'none';
      body.style.position = 'fixed';
      body.style.top = '-' + __baolongModalScrollY + 'px';
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      body.style.overscrollBehavior = 'none';
      if(scrollbarGap > 0){
        body.style.paddingRight = (currentPaddingRight + scrollbarGap) + 'px';
      }
    }
    function unlockPageScroll(){
      if(!document.body.classList.contains('modal-scroll-locked')) return;
      const docEl = document.documentElement;
      const body = document.body;
      const targetScrollY = __baolongModalScrollY || 0;
      const previousBody = __baolongModalPreviousBodyStyle || {};
      const previousDoc = __baolongModalPreviousDocStyle || {};

      body.classList.remove('modal-scroll-locked');

      /* Keep restoration instant even though common.css sets html { scroll-behavior:smooth }. */
      docEl.style.scrollBehavior = 'auto';
      body.style.scrollBehavior = 'auto';

      body.style.position = previousBody.position || '';
      body.style.top = previousBody.top || '';
      body.style.left = previousBody.left || '';
      body.style.right = previousBody.right || '';
      body.style.width = previousBody.width || '';
      body.style.overflow = previousBody.overflow || '';
      body.style.paddingRight = previousBody.paddingRight || '';
      body.style.overscrollBehavior = previousBody.overscrollBehavior || '';
      docEl.style.overflow = previousDoc.overflow || '';
      docEl.style.overscrollBehavior = previousDoc.overscrollBehavior || '';

      /* Restore in the same task: there is no frame in which the page can flash at the top. */
      window.scrollTo({left: 0, top: targetScrollY, behavior: 'auto'});

      docEl.style.scrollBehavior = previousDoc.scrollBehavior || '';
      body.style.scrollBehavior = previousBody.scrollBehavior || '';
      __baolongModalPreviousBodyStyle = null;
      __baolongModalPreviousDocStyle = null;
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

      if(modal) modal.addEventListener('click', closeModal);
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
