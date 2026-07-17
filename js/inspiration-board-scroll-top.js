function scrollCurrentPageTop(event){
  if(event){
    event.preventDefault();
    event.stopPropagation();
  }
  window.scrollTo({top:0, behavior:'smooth'});
}

function bindInspirationBoardScrollTopEvent(){
  const button = document.getElementById('floatingTopBtn');
  if(button) button.addEventListener('click', scrollCurrentPageTop);
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', bindInspirationBoardScrollTopEvent);
}else{
  bindInspirationBoardScrollTopEvent();
}
