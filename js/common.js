// Bao Long Studio v68 common header/nav behavior
(function(){
  window.toggleMobileMenu=function(){var p=document.getElementById('mobileMenuPanel');if(p)p.classList.toggle('open');};
  window.closeMobileMenu=function(){var p=document.getElementById('mobileMenuPanel');if(p)p.classList.remove('open');};
  if(typeof window.navFilter!=='function'){window.navFilter=function(){return true;};}
  function normalizePath(href){try{var u=new URL(href,location.href);return (u.pathname.split('/').pop()||'index.html');}catch(e){return href;}}
  function markActiveNav(){var current=normalizePath(location.href);document.querySelectorAll('.site-header .nav a').forEach(function(a){var target=normalizePath(a.getAttribute('href')||'');if(target===current)a.classList.add('is-active');});}
  document.addEventListener('DOMContentLoaded',markActiveNav);
  document.addEventListener('click',function(e){if(!e.target.closest('.site-header'))closeMobileMenu();});
})();
