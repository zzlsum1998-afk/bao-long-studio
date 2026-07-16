
    function scrollToTop(){
      window.scrollTo({top:0, behavior:'smooth'});
    }
  
    const indexScrollTopButton = document.querySelector('.floating-gift');
    if(indexScrollTopButton){
      indexScrollTopButton.addEventListener('click', scrollToTop);
    }
