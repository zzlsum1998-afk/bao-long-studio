
  (function(){
    const slider = document.querySelector('[data-notes-slider]');
    if(!slider) return;

    const cards = Array.from(slider.querySelectorAll('.note-card'));
    const prev = slider.querySelector('[data-notes-prev]');
    const next = slider.querySelector('[data-notes-next]');
    if(!cards.length) return;

    let index = cards.findIndex(card => card.classList.contains('is-active'));
    if(index < 0) index = 0;

    let notesTimer = null;

    function show(nextIndex){
      cards[index].classList.remove('is-active');
      index = (nextIndex + cards.length) % cards.length;
      cards[index].classList.add('is-active');
    }

    function nextNote(){
      show(index + 1);
    }

    function startNotesAutoPlay(){
      if(notesTimer || cards.length <= 1) return;
      notesTimer = setInterval(nextNote, 6200);
    }

    function stopNotesAutoPlay(){
      if(!notesTimer) return;
      clearInterval(notesTimer);
      notesTimer = null;
    }

    if(prev) prev.addEventListener('click', function(){
      show(index - 1);
      stopNotesAutoPlay();
      startNotesAutoPlay();
    });

    if(next) next.addEventListener('click', function(){
      show(index + 1);
      stopNotesAutoPlay();
      startNotesAutoPlay();
    });

    slider.addEventListener('mouseenter', stopNotesAutoPlay);
    slider.addEventListener('mouseleave', startNotesAutoPlay);
    startNotesAutoPlay();
  })();
