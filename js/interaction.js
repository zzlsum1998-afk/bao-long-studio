
    function navFilter(category){
      location.href = 'assets.html?filter=' + encodeURIComponent(category) + '#products';
      return false;
    }


    function toggleMobileMenu(){
      const panel = document.getElementById('mobileMenuPanel');
      if(panel) panel.classList.toggle('open');
    }

    function closeMobileMenu(){
      const panel = document.getElementById('mobileMenuPanel');
      if(panel) panel.classList.remove('open');
    }

    document.addEventListener('click', function(event){
      const panel = document.getElementById('mobileMenuPanel');
      const toggle = document.querySelector('.mobile-menu-toggle');
      if(!panel || !toggle) return;
      if(panel.contains(event.target) || toggle.contains(event.target)) return;
      panel.classList.remove('open');
    });


  function scrollCurrentPageTop(event){
    if(event){
      event.preventDefault();
      event.stopPropagation();
    }
    window.scrollTo({top:0, behavior:'smooth'});
  }


  function bindInteractionPageEvents(){
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

    const floatingTopButton = document.querySelector('.floating-top-btn');
    if(floatingTopButton){
      floatingTopButton.addEventListener('click', scrollCurrentPageTop);
    }
  }

  bindInteractionPageEvents();
