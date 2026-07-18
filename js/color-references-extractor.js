
  (function(){
    let extractorColors = [];
    let extractorReady = false;
    let extractorScrollTop = 0;

    function $(id){ return document.getElementById(id); }

    function lockColorExtractorScroll(){
      if(document.body.classList.contains('color-extractor-scroll-lock')) return;
      extractorScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      document.documentElement.classList.add('color-extractor-scroll-lock');
      document.body.classList.add('color-extractor-scroll-lock');
      document.body.style.top = '-' + extractorScrollTop + 'px';
    }

    function unlockColorExtractorScroll(){
      if(!document.body.classList.contains('color-extractor-scroll-lock')) return;
      document.documentElement.classList.remove('color-extractor-scroll-lock');
      document.body.classList.remove('color-extractor-scroll-lock');
      document.body.style.top = '';
      window.scrollTo(0, extractorScrollTop);
    }

    function initColorExtractor(){
      if(extractorReady) return;
      const fileInput = $('colorFileInput');
      const uploadZone = $('colorUploadZone');
      if(!fileInput || !uploadZone) return;
      extractorReady = true;

      uploadZone.addEventListener('dragover', function(event){
        event.preventDefault();
        uploadZone.classList.add('drag-over');
      });
      uploadZone.addEventListener('dragleave', function(){
        uploadZone.classList.remove('drag-over');
      });
      uploadZone.addEventListener('drop', function(event){
        event.preventDefault();
        uploadZone.classList.remove('drag-over');
        const file = event.dataTransfer && event.dataTransfer.files ? event.dataTransfer.files[0] : null;
        if(file && file.type && file.type.startsWith('image/')) processExtractorFile(file);
      });
      fileInput.addEventListener('change', function(event){
        const file = event.target.files ? event.target.files[0] : null;
        if(file) processExtractorFile(file);
      });
    }

    window.openColorExtractor = function(){
      initColorExtractor();
      const modal = $('colorExtractorModal');
      if(modal){
        lockColorExtractorScroll();
        modal.classList.add('open');
      }
    };

    window.closeColorExtractor = function(event){
      const modal = $('colorExtractorModal');
      if(event && event.target !== modal) return;
      if(modal) modal.classList.remove('open');
      unlockColorExtractorScroll();
    };

    document.addEventListener('keydown', function(event){
      if(event.key !== 'Escape') return;
      const modal = $('colorExtractorModal');
      if(modal && modal.classList.contains('open')){
        modal.classList.remove('open');
        unlockColorExtractorScroll();
      }
    });

    function processExtractorFile(file){
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = function(){
        const preview = $('colorPreviewImg');
        const canvas = $('colorExtractorCanvas');
        if(preview) preview.src = url;
        if(canvas){
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d', { willReadFrequently:true });
          ctx.drawImage(img, 0, 0);
          extractorColors = extractColorsFromCanvas(canvas, 7);
          renderExtractorResults(extractorColors);
        }
        const upload = $('colorUploadZone');
        const previewWrap = $('colorPreviewWrap');
        if(upload) upload.style.display = 'none';
        if(previewWrap) previewWrap.style.display = 'block';
      };
      img.src = url;
    }

    function extractColorsFromCanvas(canvas, count){
      const w = canvas.width;
      const h = canvas.height;
      const sampleW = Math.min(w, 120);
      const sampleH = Math.min(h, 120);
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = sampleW;
      tempCanvas.height = sampleH;
      const tempCtx = tempCanvas.getContext('2d', { willReadFrequently:true });
      tempCtx.drawImage(canvas, 0, 0, sampleW, sampleH);
      const data = tempCtx.getImageData(0, 0, sampleW, sampleH).data;
      let pixels = [];
      for(let i = 0; i < data.length; i += 4){
        const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
        if(a < 128) continue;
        const brightness = (r + g + b) / 3;
        const sat = getExtractorSaturation(r, g, b);
        if(brightness > 246 || brightness < 10) continue;
        if(sat < 0.035 && brightness > 235) continue;
        pixels.push([r, g, b]);
      }
      if(pixels.length < 20){
        pixels = [];
        for(let i = 0; i < data.length; i += 4){
          if(data[i+3] >= 128) pixels.push([data[i], data[i+1], data[i+2]]);
        }
      }
      return kMeansExtractor(pixels, count).map(function(rgb){ return rgbToHexExtractor(rgb[0], rgb[1], rgb[2]).toUpperCase(); });
    }

    function getExtractorSaturation(r, g, b){
      const max = Math.max(r, g, b) / 255;
      const min = Math.min(r, g, b) / 255;
      if(max === 0) return 0;
      return (max - min) / max;
    }

    function kMeansExtractor(pixels, k){
      if(!pixels.length) return [];
      const centers = [];
      const step = Math.max(1, Math.floor(pixels.length / k));
      for(let i = 0; i < k; i++) centers.push([].concat(pixels[Math.min(i * step, pixels.length - 1)]));
      for(let iter = 0; iter < 22; iter++){
        const clusters = Array.from({length:k}, function(){ return []; });
        pixels.forEach(function(pixel){
          let best = 0;
          let bestDistance = Infinity;
          centers.forEach(function(center, index){
            const d = colorDistance(pixel, center);
            if(d < bestDistance){ bestDistance = d; best = index; }
          });
          clusters[best].push(pixel);
        });
        clusters.forEach(function(cluster, index){
          if(!cluster.length) return;
          centers[index] = [
            Math.round(cluster.reduce(function(sum, p){ return sum + p[0]; }, 0) / cluster.length),
            Math.round(cluster.reduce(function(sum, p){ return sum + p[1]; }, 0) / cluster.length),
            Math.round(cluster.reduce(function(sum, p){ return sum + p[2]; }, 0) / cluster.length)
          ];
        });
      }
      const unique = [];
      centers.forEach(function(center){
        if(!unique.some(function(item){ return colorDistance(center, item) < 28; })) unique.push(center);
      });
      while(unique.length < Math.min(k, centers.length)) unique.push(centers[unique.length]);
      return unique.slice(0, k);
    }

    function colorDistance(a, b){
      return Math.sqrt(Math.pow(a[0]-b[0],2) + Math.pow(a[1]-b[1],2) + Math.pow(a[2]-b[2],2));
    }

    function rgbToHexExtractor(r, g, b){
      return '#' + [r, g, b].map(function(value){ return Math.max(0, Math.min(255, value)).toString(16).padStart(2, '0'); }).join('');
    }

    function hexToRgbExtractor(hex){
      return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
    }

    function hexToHslExtractor(hex){
      let rgb = hexToRgbExtractor(hex).map(function(v){ return v / 255; });
      let r = rgb[0], g = rgb[1], b = rgb[2];
      const max = Math.max(r,g,b), min = Math.min(r,g,b);
      let h = 0, s = 0, l = (max + min) / 2;
      if(max !== min){
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if(max === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if(max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h /= 6;
      }
      return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    }

    function hslToHexExtractor(h, s, l){
      s /= 100;
      l /= 100;
      const k = function(n){ return (n + h / 30) % 12; };
      const a = s * Math.min(l, 1 - l);
      const f = function(n){
        return Math.round((l - a * Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n), 1)))) * 255);
      };
      return rgbToHexExtractor(f(0), f(8), f(4)).toUpperCase();
    }

    function generateExtractorSchemes(hex){
      const hsl = hexToHslExtractor(hex);
      const h = hsl[0], s = hsl[1], l = hsl[2];
      return {
        '同色系 Monochromatic': [
          hslToHexExtractor(h, Math.max(8, s - 12), Math.min(92, l + 28)),
          hslToHexExtractor(h, s, l),
          hslToHexExtractor(h, Math.min(100, s + 8), Math.max(18, l - 18)),
          hslToHexExtractor(h, Math.max(8, s - 22), Math.max(14, l - 32))
        ],
        '互补色 Complementary': [
          hslToHexExtractor(h, s, l),
          hslToHexExtractor(h, Math.max(8, s - 20), Math.min(88, l + 24)),
          hslToHexExtractor((h + 180) % 360, Math.max(18, s - 10), Math.min(86, l + 12)),
          hslToHexExtractor((h + 180) % 360, s, Math.max(18, l - 10))
        ],
        '分裂互补 Split': [
          hslToHexExtractor(h, s, l),
          hslToHexExtractor((h + 150) % 360, Math.max(18, s - 8), Math.min(86, l + 8)),
          hslToHexExtractor((h + 210) % 360, Math.max(18, s - 8), Math.min(86, l + 8)),
          hslToHexExtractor(h, Math.max(8, s - 25), Math.min(92, l + 26))
        ]
      };
    }

    function renderExtractorResults(colors){
      const empty = $('colorResultEmpty');
      const area = $('colorResultArea');
      const swatches = $('colorMainSwatches');
      const rows = $('colorSchemeRows');
      if(empty) empty.style.display = 'none';
      if(area) area.style.display = 'block';
      if(swatches){
        swatches.innerHTML = colors.map(function(hex){
          return '<button class="color-main-swatch" type="button" style="background:' + hex + '" title="复制 ' + hex + '" data-extractor-copy-color="' + hex + '"><span>' + hex + '</span></button>';
        }).join('');
      }
      const main = colors[0] || '#8A8378';
      const schemes = generateExtractorSchemes(main);
      if(rows){
        rows.innerHTML = Object.keys(schemes).map(function(name){
          const chips = schemes[name].map(function(hex){
            return '<button class="color-scheme-chip" type="button" style="background:' + hex + '" title="复制 ' + hex + '" data-extractor-copy-color="' + hex + '"></button>';
          }).join('');
          return '<div class="color-scheme-row"><div class="color-scheme-name">' + name + '</div><div class="color-scheme-chips">' + chips + '</div></div>';
        }).join('');
      }
    }

    window.copyExtractorText = async function(text){
      try{
        await navigator.clipboard.writeText(text);
      }catch(error){
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showExtractorToast(text.length > 12 ? '已复制全部色值' : '已复制 ' + text);
    };

    window.copyExtractorColors = function(){
      if(!extractorColors.length) return;
      copyExtractorText(extractorColors.join('\n'));
    };

    window.resetColorExtractor = function(){
      extractorColors = [];
      const fileInput = $('colorFileInput');
      const upload = $('colorUploadZone');
      const previewWrap = $('colorPreviewWrap');
      const preview = $('colorPreviewImg');
      const empty = $('colorResultEmpty');
      const area = $('colorResultArea');
      if(fileInput) fileInput.value = '';
      if(upload) upload.style.display = 'flex';
      if(previewWrap) previewWrap.style.display = 'none';
      if(preview) preview.removeAttribute('src');
      if(empty) empty.style.display = 'flex';
      if(area) area.style.display = 'none';
    };

    window.exportExtractorCard = function(){
      if(!extractorColors.length) return;
      const schemes = generateExtractorSchemes(extractorColors[0]);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = 920;
      const pad = 46;
      const sw = 96;
      const gap = 12;
      canvas.width = width;
      canvas.height = 560;
      ctx.fillStyle = '#F7F6F2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1C1C1C';
      ctx.font = '24px sans-serif';
      ctx.fillText('BaoLong Lab Color Palette', pad, 58);
      ctx.fillStyle = '#77736B';
      ctx.font = '13px sans-serif';
      ctx.fillText('Extracted colors', pad, 86);
      extractorColors.forEach(function(hex, index){
        const x = pad + index * (sw + gap);
        const y = 112;
        drawRoundRect(ctx, x, y, sw, 100, 20, hex);
        ctx.fillStyle = '#5C5750';
        ctx.font = '12px monospace';
        ctx.fillText(hex, x + 10, y + 124);
      });
      let y = 282;
      Object.keys(schemes).forEach(function(name){
        ctx.fillStyle = '#77736B';
        ctx.font = '13px sans-serif';
        ctx.fillText(name, pad, y + 18);
        schemes[name].forEach(function(hex, index){
          drawRoundRect(ctx, pad + 170 + index * 126, y, 112, 38, 14, hex);
        });
        y += 70;
      });
      const link = document.createElement('a');
      link.download = 'baolong-color-palette.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      showExtractorToast('色卡已导出');
    };

    function drawRoundRect(ctx, x, y, w, h, r, color){
      ctx.fillStyle = color;
      ctx.beginPath();
      if(ctx.roundRect){
        ctx.roundRect(x, y, w, h, r);
      }else{
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
      }
      ctx.fill();
    }

    function showExtractorToast(message){
      const toast = $('colorExtractorToast');
      if(!toast) return;
      toast.textContent = message;
      toast.classList.add('show');
      window.clearTimeout(showExtractorToast.timer);
      showExtractorToast.timer = window.setTimeout(function(){ toast.classList.remove('show'); }, 1800);
    }

    function handleExtractorColorCopy(event){
      const button = event.target.closest('[data-extractor-copy-color]');
      if(!button || !event.currentTarget.contains(button)) return;
      const color = button.getAttribute('data-extractor-copy-color');
      if(color) window.copyExtractorText(color);
    }

    function bindColorExtractorStaticEvents(){
      const openButton = $('colorToolOpenBtn');
      const modal = $('colorExtractorModal');
      const modalCard = $('colorExtractorCard');
      const closeButton = $('colorExtractorCloseBtn');
      const copyButton = $('copyExtractorColorsBtn');
      const exportButton = $('exportExtractorCardBtn');
      const resetButton = $('resetColorExtractorBtn');

      if(openButton) openButton.addEventListener('click', window.openColorExtractor);
      if(modal) modal.addEventListener('click', window.closeColorExtractor);
      if(modalCard){
        modalCard.addEventListener('click', function(event){
          event.stopPropagation();
        });
        modalCard.addEventListener('click', handleExtractorColorCopy);
      }
      if(closeButton) closeButton.addEventListener('click', function(){ window.closeColorExtractor(); });
      if(copyButton) copyButton.addEventListener('click', window.copyExtractorColors);
      if(exportButton) exportButton.addEventListener('click', window.exportExtractorCard);
      if(resetButton) resetButton.addEventListener('click', window.resetColorExtractor);
    }

    function initializeColorExtractorPage(){
      initColorExtractor();
      bindColorExtractorStaticEvents();
    }

    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', initializeColorExtractorPage);
    }else{
      initializeColorExtractorPage();
    }
  })();
