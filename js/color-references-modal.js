
    let currentColorValues = "";

    function extractColorValueBlock(text){
      const rawText = String(text || "");
      const match = rawText.match(/主色参考：(.+?)。适合用于/);
      return match ? match[1].trim() : "";
    }


    /* v136: lock the background page while detail modals are open. */
    let __baolongModalScrollY = 0;
    let __baolongModalPreviousBodyStyle = null;
    function lockPageScroll(){
      if(document.body.classList.contains('modal-scroll-locked')) return;
      __baolongModalScrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      __baolongModalPreviousBodyStyle = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        right: document.body.style.right,
        width: document.body.style.width,
        overflow: document.body.style.overflow
      };
      document.body.classList.add('modal-scroll-locked');
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + __baolongModalScrollY + 'px';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }
    function unlockPageScroll(){
      if(!document.body.classList.contains('modal-scroll-locked')) return;
      document.body.classList.remove('modal-scroll-locked');
      const previous = __baolongModalPreviousBodyStyle || {};
      document.body.style.position = previous.position || '';
      document.body.style.top = previous.top || '';
      document.body.style.left = previous.left || '';
      document.body.style.right = previous.right || '';
      document.body.style.width = previous.width || '';
      document.body.style.overflow = previous.overflow || '';
      window.scrollTo(0, __baolongModalScrollY || 0);
      __baolongModalPreviousBodyStyle = null;
    }

    function openModal(title, type, imageOrColor, desc, source, url, exactColorValues){
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
  