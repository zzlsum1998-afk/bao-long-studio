
    let modalImages = [];
    let modalIndex = 0;

    function renderModalImage(){
      const modalImg = document.getElementById("modalImg");
      const title = document.getElementById("modalTitle").textContent;
      if(modalImages.length){
        const current = modalImages[modalIndex];
        modalImg.classList.add("has-image");
        modalImg.style.background = "#f7f6f2";
        let controls = "";
        if(modalImages.length > 1){
          controls = '<button class="modal-nav prev" onclick="event.stopPropagation();changeModalImage(-1)">‹</button>' +
                     '<button class="modal-nav next" onclick="event.stopPropagation();changeModalImage(1)">›</button>' +
                     '<div class="modal-counter">' + (modalIndex + 1) + ' / ' + modalImages.length + '</div>';
        }
        modalImg.innerHTML = '<img src="' + current + '" alt="' + title + '" loading="lazy" decoding="async">' + controls;
      }else{
        modalImg.classList.remove("has-image");
        modalImg.innerHTML = "";
        modalImg.style.background = "#e6e3dc";
      }
    }

    function changeModalImage(step){
      if(!modalImages.length) return;
      modalIndex = (modalIndex + step + modalImages.length) % modalImages.length;
      renderModalImage();
    }


    /* v161: lock the background page while detail modals are open, without fixing the body.
       The previous fixed-body lock restored scroll after close, which caused a visible page slide/jump. */
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
          window.scrollTo(0, targetScrollY);
        }
      });
      __baolongModalPreviousBodyStyle = null;
      __baolongModalPreviousDocStyle = null;
    }

    function openModal(title, type, images, desc, source, url, isPinterest){
      document.getElementById("modalTitle").textContent = title;
      document.getElementById("modalType").textContent = type;
      document.getElementById("modalDesc").textContent = desc;
      const noteLines = ["来源：" + source];
      if(isPinterest){ noteLines.push("原始来源：未核实"); }
      noteLines.push("仅作灵感参考，版权归原作者所有。");
      noteLines.push("如涉及版权问题，请联系删除。");
      document.getElementById("modalSource").textContent = noteLines.join("\n");

      modalImages = Array.isArray(images) ? images : (images ? [images] : []);
      modalIndex = 0;
      renderModalImage();

      const link = document.getElementById("modalLink");
      if(url && url !== "#"){
        link.href = url;
        link.textContent = "View Source Link";
        link.classList.remove("disabled");
      }else{
        link.href = "#";
        link.textContent = "Source Pending Link";
        link.classList.add("disabled");
      }
      preparePromptReference(title, type, images, desc);
      const promptBtn = document.getElementById("modalPromptBtn");
      if(promptBtn) promptBtn.textContent = "生成 Prompt";
      document.getElementById("modal").classList.add("open");
      lockPageScroll();
    }
    function closeModal(event){
      if(event && event.target !== document.getElementById("modal")) return;
      document.getElementById("modal").classList.remove("open");
      unlockPageScroll();
    }
    document.addEventListener("keydown", function(event){
      if(!document.getElementById("modal").classList.contains("open")) return;
      if(event.key === "Escape") closeModal();
      if(event.key === "ArrowLeft") changeModalImage(-1);
      if(event.key === "ArrowRight") changeModalImage(1);
    });


    let currentPromptReference = null;
    let currentPromptResult = null;

    function getBoardPreset(type, text){
      const lower = (type + ' ' + text).toLowerCase();
      const isSection = lower.includes('section');
      const isRender = lower.includes('render');
      const isPlan = lower.includes('plan');
      let preset = {
        style: 'landscape design inspiration, refined portfolio presentation',
        colorTone: 'soft neutral palette, low saturation, warm white background',
        composition: 'clean visual hierarchy, generous white space, balanced layout',
        lighting: 'soft diffused light, gentle shadow, no harsh highlight',
        mood: 'calm, professional, elegant, design-focused',
        visualLanguage: 'minimal annotation, clear spatial storytelling, refined graphic expression',
        prompt: 'landscape design visual, refined portfolio presentation, soft neutral palette, low saturation, clean visual hierarchy, generous white space, calm professional atmosphere, minimal annotation, refined graphic expression --ar 3:4 --raw --stylize 500'
      };
      if(isPlan){
        preset = {
          style: 'landscape masterplan, site plan, portfolio board graphic',
          colorTone: 'muted green, sand beige, soft grey, off-white background',
          composition: 'top-down plan view, clear zoning, readable circulation, balanced negative space',
          lighting: 'flat clean graphic lighting, matte paper texture',
          mood: 'rational, fresh, ecological, calm and organized',
          visualLanguage: 'fine linework, soft planting textures, subtle annotations, diagrammatic clarity',
          prompt: 'landscape masterplan, site plan, top-down plan view, muted green and sand beige palette, soft grey, off-white background, clear zoning, readable circulation, balanced negative space, fine linework, soft planting textures, subtle annotations, ecological calm atmosphere, matte paper texture --ar 3:4 --raw --stylize 500'
        };
      }
      if(isSection){
        preset = {
          style: 'architectural landscape section, sectional perspective, portfolio diagram',
          colorTone: 'warm beige, soft grey-green, cream white, low saturation',
          composition: 'horizontal cutaway composition, layered terrain, human-scale spatial sequence',
          lighting: 'soft ambient light, gentle depth, matte drawing texture',
          mood: 'analytical, quiet, delicate, narrative',
          visualLanguage: 'section cut line, terrain layers, planting silhouettes, subtle scale figures, clean labels',
          prompt: 'architectural landscape section, sectional perspective, horizontal cutaway composition, layered terrain, human-scale spatial sequence, warm beige and soft grey-green palette, cream white background, matte drawing texture, planting silhouettes, subtle scale figures, clean labels, quiet analytical atmosphere --ar 3:4 --raw --stylize 500'
        };
      }
      if(isRender){
        preset = {
          style: 'landscape architectural rendering, editorial visualization, atmospheric scene',
          colorTone: 'natural muted green, warm stone beige, soft daylight, low saturation',
          composition: 'eye-level or aerial perspective, strong foreground-midground-background depth, clear focal point',
          lighting: 'soft diffused daylight, gentle shadows, realistic material response',
          mood: 'immersive, peaceful, premium, lived-in but clean',
          visualLanguage: 'realistic planting, architectural massing, human activity, refined material texture',
          prompt: 'landscape architectural rendering, editorial visualization, atmospheric scene, natural muted green and warm stone beige palette, soft diffused daylight, gentle shadows, eye-level or aerial perspective, clear focal point, realistic planting, architectural massing, human activity, refined material texture, peaceful premium atmosphere --ar 3:4 --raw --stylize 500'
        };
      }
      if(lower.includes('watercolor') || lower.includes('hand-drawn') || lower.includes('sketch')){
        preset.style += ', hand-drawn watercolor texture';
        preset.visualLanguage += ', soft pigment edges, paper grain';
        preset.prompt = preset.prompt.replace('--ar', 'hand-drawn watercolor texture, soft pigment edges, paper grain, --ar');
      }
      if(lower.includes('axon') || lower.includes('axonometric')){
        preset.composition = 'axonometric composition, layered spatial structure, readable depth and hierarchy';
        preset.prompt = preset.prompt.replace(/(top-down plan view|horizontal cutaway composition|eye-level or aerial perspective)/, 'axonometric composition');
      }
      if(lower.includes('forest') || lower.includes('green') || lower.includes('ecological')){
        preset.colorTone = 'muted botanical green, moss green, warm beige, off-white, low saturation';
      }
      if(lower.includes('pink') || lower.includes('pastel')){
        preset.colorTone = 'soft pastel pink, cream white, muted green, warm beige, low saturation';
      }
      if(lower.includes('waterfront') || lower.includes('water')){
        preset.mood = 'open, breezy, calm, waterfront atmosphere';
        preset.visualLanguage += ', reflective water surface, open horizon';
      }
      return preset;
    }

    async function analyzeImageForPrompt(reference){
      // API hook reserved: replace this local mapping with fetch('/api/analyze-image') later.
      // return fetch('/api/analyze-image', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(reference) }).then(res => res.json());
      return getBoardPreset(reference.type, [reference.title, reference.desc, reference.imageUrl || ''].join(' '));
    }

    function preparePromptReference(title, type, images, desc){
      currentPromptReference = {
        title: title,
        type: type,
        imageUrl: Array.isArray(images) ? images[0] : images,
        desc: desc
      };
      currentPromptResult = null;
      const panel = document.getElementById('promptExtractPanel');
      const grid = document.getElementById('promptParamGrid');
      const preview = document.getElementById('promptPreviewText');
      if(panel) panel.classList.remove('open');
      if(grid) grid.innerHTML = '';
      if(preview) preview.textContent = '';
    }

    async function generatePromptFromReference(event){
      if(event) event.stopPropagation();
      if(!currentPromptReference) return;
      const btn = document.getElementById('modalPromptBtn');
      const panel = document.getElementById('promptExtractPanel');
      const grid = document.getElementById('promptParamGrid');
      const preview = document.getElementById('promptPreviewText');
      if(btn) btn.textContent = '提取中...';
      currentPromptResult = await analyzeImageForPrompt(currentPromptReference);
      const rows = [
        ['Style', currentPromptResult.style],
        ['Color Tone', currentPromptResult.colorTone],
        ['Composition', currentPromptResult.composition],
        ['Lighting', currentPromptResult.lighting],
        ['Mood', currentPromptResult.mood],
        ['Visual Language', currentPromptResult.visualLanguage]
      ];
      if(grid){
        grid.innerHTML = rows.map(function(row){
          return '<div class="prompt-param"><b>' + row[0] + '</b><span>' + row[1] + '</span></div>';
        }).join('');
      }
      if(preview) preview.textContent = currentPromptResult.prompt;
      if(panel) panel.classList.add('open');
      if(btn) btn.textContent = '重新生成 Prompt';
    }

    function applyPromptToTool(event){
      if(event) event.stopPropagation();
      if(!currentPromptResult) return;
      const payload = {
        source: 'inspiration-board',
        title: currentPromptReference ? currentPromptReference.title : '',
        type: currentPromptReference ? currentPromptReference.type : '',
        imageUrl: currentPromptReference ? currentPromptReference.imageUrl : '',
        promptData: currentPromptResult
      };
      try{ localStorage.setItem('baolongPromptSeed', JSON.stringify(payload)); }catch(err){}
      window.location.href = 'prompt-tool.html?from=inspiration&v=233';
    }

    function copyExtractedPrompt(event){
      if(event) event.stopPropagation();
      if(!currentPromptResult) return;
      const text = currentPromptResult.prompt;
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text);
      }
      const note = document.getElementById('promptExtractNote');
      if(note) note.textContent = '已复制 Prompt，可继续粘贴到图像生成工具中调整。';
    }

    function injectPromptButtons(){
      document.querySelectorAll('.pin .pin-body').forEach(function(body){
        if(body.querySelector('.pin-prompt-btn')) return;
        const btn = document.createElement('button');
        btn.className = 'pin-prompt-btn';
        btn.type = 'button';
        btn.textContent = '生成 Prompt';
        btn.addEventListener('click', function(event){
          event.stopPropagation();
          const pin = body.closest('.pin');
          if(pin) pin.click();
          setTimeout(function(){ generatePromptFromReference(); }, 80);
        });
        const tags = body.querySelector('.pin-tags');
        if(tags && tags.nextSibling){
          body.insertBefore(btn, tags.nextSibling);
        }else{
          body.insertBefore(btn, body.firstChild);
        }
      });
    }

    document.addEventListener('DOMContentLoaded', injectPromptButtons);
  