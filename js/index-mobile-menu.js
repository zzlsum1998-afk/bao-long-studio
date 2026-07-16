
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
  