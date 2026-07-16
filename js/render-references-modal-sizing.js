
  /* v103 Inspiration modal image sizing */
  (function(){
    function tuneModalImage(img){
      if(!img) return;
      function apply(){
        const w = img.naturalWidth || 0;
        const h = img.naturalHeight || 0;
        img.classList.remove('is-long-image','is-small-image');
        if(w && h){
          const ratio = h / w;
          if(ratio > 1.35){
            img.classList.add('is-long-image');
          }
          if(w < 900 && h < 900){
            img.classList.add('is-small-image');
          }
        }
      }
      if(img.complete) apply();
      else img.addEventListener('load', apply, {once:true});
    }

    const observer = new MutationObserver(function(){
      document.querySelectorAll('.modal-img.has-image img').forEach(tuneModalImage);
      const modal = document.querySelector('.modal');
      if(modal && modal.classList.contains('open')) modal.scrollTop = 0;
    });

    observer.observe(document.body, {childList:true, subtree:true});
    document.querySelectorAll('.modal-img.has-image img').forEach(tuneModalImage);
  })();
