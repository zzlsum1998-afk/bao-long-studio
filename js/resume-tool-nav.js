    function navFilter(category){
      location.href = 'assets.html?filter=' + encodeURIComponent(category) + '#products';
      return false;
    }

    function bindResumeToolNavEvents(){
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
    }

    bindResumeToolNavEvents();
  