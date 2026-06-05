// Bao Long Studio v63 common header/nav behavior: no post-load visual mutation for desktop nav
(function(){
  window.toggleMobileMenu=function(){var p=document.getElementById('mobileMenuPanel');if(p)p.classList.toggle('open');};
  window.closeMobileMenu=function(){var p=document.getElementById('mobileMenuPanel');if(p)p.classList.remove('open');};
  if(typeof window.navFilter!=='function'){window.navFilter=function(filter){var target='assets.html?filter='+encodeURIComponent(filter)+'#products'; window.location.href=target; return false;};}
  document.addEventListener('click',function(e){if(!e.target.closest('.site-header'))closeMobileMenu();});
})();
