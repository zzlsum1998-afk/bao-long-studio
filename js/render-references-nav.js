
    function navFilter(category){
      location.href = 'assets.html?filter=' + encodeURIComponent(category) + '#products';
      return false;
    }

    function bindHeaderNavigation(){
      document.querySelectorAll('.site-header [data-nav-filter]').forEach(function(link){
        link.addEventListener('click', function(event){
          if(typeof window.navFilter === 'function' && window.navFilter(link.dataset.navFilter) === false){
            event.preventDefault();
          }
        });
      });

      const loginEntry = document.querySelector('.site-header .login-entry-btn');
      if(loginEntry){
        loginEntry.addEventListener('click', function(){
          window.location.href = 'login.html';
        });
      }

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

    bindHeaderNavigation();
