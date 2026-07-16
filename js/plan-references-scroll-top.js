
  function scrollCurrentPageTop(event){
    if(event){
      event.preventDefault();
      event.stopPropagation();
    }
    window.scrollTo({top:0, behavior:'smooth'});
  }
