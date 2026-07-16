
    const langBtn = document.getElementById('langBtn');
    const toast = document.getElementById('toast');

    function getLang(){ return localStorage.getItem('baolongLanguage') || 'zh'; }
    function setLang(lang){ localStorage.setItem('baolongLanguage', lang); applyLang(lang); }
    function applyLang(lang){
      document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
      document.title = lang === 'zh' ? '登录 | BaoLong Lab' : 'Log in | BaoLong Lab';
      document.querySelectorAll('[data-zh][data-en]').forEach(el => { el.textContent = el.dataset[lang]; });
      const heroTitle = document.querySelector('.hero-title');
      if(heroTitle){ heroTitle.setAttribute('aria-label', lang === 'zh' ? '进入你的 BaoLong Lab' : 'Enter your BaoLong Lab'); }
      langBtn.textContent = '中文 / EN';
      langBtn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
    }

    langBtn.addEventListener('click', () => setLang(getLang() === 'zh' ? 'en' : 'zh'));

    function showToast(type){
      const lang = getLang();
      const textMap = {
        login: { zh:'账号入口暂未开放。', en:'Account access is not open yet.' },
        signup: { zh:'账号入口暂未开放，暂时无法创建账号。', en:'Account access is not open yet. Sign-up is not available at the moment.' },
        reset: { zh:'账号入口暂未开放，暂时无法找回密码。', en:'Account access is not open yet. Password reset is not available at the moment.' }
      };
      toast.textContent = textMap[type][lang];
      toast.classList.add('show');
      window.clearTimeout(window.__toastTimer);
      window.__toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
    }

    document.getElementById('loginForm').addEventListener('submit', function(e){
      e.preventDefault();
      showToast('login');
    });

    applyLang(getLang());
  