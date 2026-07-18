(function(){
  function bindSiteMobileMenuEvents(){
    const mobileMenuToggle = document.querySelector('.site-header .mobile-menu-toggle');
    if(mobileMenuToggle){
      mobileMenuToggle.addEventListener('click', function(){
        if(typeof window.toggleMobileMenu === 'function') window.toggleMobileMenu();
      });
    }

    document.querySelectorAll('#mobileMenuPanel a').forEach(function(link){
      link.addEventListener('click', function(){
        if(typeof window.closeMobileMenu === 'function') window.closeMobileMenu();
      });
    });
  }

  bindSiteMobileMenuEvents();
})();
