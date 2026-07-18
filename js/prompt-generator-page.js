
    /* v178: Prompt Generator page navigation i18n bridge.
       Uses the page html lang as source of truth first, then localStorage fallback.
       It does not touch Prompt content, modal logic, CSS, JSON data, or other pages. */
    (function(){
      const navLabels = {
        zh: {
          all: '全部',
          assets: '素材库 ▼',
          moduleAssets: '模块素材',
          peopleAssets: '人物素材',
          plantAssets: '植物素材',
          animalAssets: '动物素材',
          textures: '纹理',
          free: '免费素材',
          prompt: 'Prompt 工具',
          interaction: '交互实验室',
          resume: '简历模板',
          inspiration: '灵感板 ▼',
          plan: '平面灵感',
          section: '剖面灵感',
          other: '综合灵感',
          color: '色彩灵感',
          login: '登录',
          menu: '菜单',
          toolsGroup: '工具',
          inspirationGroup: '灵感板',
          accountGroup: '账户'
        },
        en: {
          all: 'All',
          assets: 'Assets ▼',
          moduleAssets: 'Module Assets',
          peopleAssets: 'People Assets',
          plantAssets: 'Plant Assets',
          animalAssets: 'Animal Assets',
          textures: 'Textures',
          free: 'Free',
          prompt: 'Prompt Generator',
          interaction: 'Interaction',
          resume: 'Resume',
          inspiration: 'Inspiration Board ▼',
          plan: 'Plan Board',
          section: 'Section Board',
          other: 'Other Board',
          color: 'Color Board',
          login: 'Log in',
          menu: 'Menu',
          toolsGroup: 'Tools',
          inspirationGroup: 'Inspiration Board',
          accountGroup: 'Account'
        }
      };

      function getSavedLang(){
        const htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
        const dataLang = (document.documentElement.getAttribute('data-lang') || '').toLowerCase();
        if(htmlLang.startsWith('zh') || dataLang.startsWith('zh')) return 'zh';
        if(htmlLang.startsWith('en') || dataLang.startsWith('en')) return 'en';
        const keys = ['baolongLanguage', 'baolongLabLang', 'baolongLang', 'siteLang', 'preferredLang', 'language'];
        for(const key of keys){
          try{
            const value = (localStorage.getItem(key) || '').toLowerCase();
            if(value.startsWith('zh')) return 'zh';
            if(value.startsWith('en')) return 'en';
          }catch(err){}
        }
        return 'zh';
      }

      function setText(el, value){
        if(el && typeof value === 'string') el.textContent = value;
      }

      function findLink(root, match){
        if(!root) return null;
        return Array.from(root.querySelectorAll('a')).find(function(a){
          const href = a.getAttribute('href') || '';
          const onclick = a.getAttribute('onclick') || '';
          return match(href, onclick, a);
        });
      }

      function applyPromptNavLang(){
        const lang = getSavedLang();
        const t = navLabels[lang] || navLabels.zh;
        document.documentElement.setAttribute('data-prompt-nav-lang', lang);

        const nav = document.querySelector('.site-header .nav');
        if(nav){
          setText(findLink(nav, function(href){ return href === 'index.html'; }), t.all);
          setText(findLink(nav, function(href){ return href === 'assets.html'; }), t.assets);
          setText(findLink(nav, function(href, onclick){ return href.includes('Module%20Diagrams') || onclick.includes('Module Diagrams'); }), t.moduleAssets);
          setText(findLink(nav, function(href, onclick){ return href.includes('People%20Assets') || onclick.includes('People Assets'); }), t.peopleAssets);
          setText(findLink(nav, function(href, onclick){ return href.includes('Plant%20Assets') || onclick.includes('Plant Assets'); }), t.plantAssets);
          setText(findLink(nav, function(href, onclick){ return href.includes('Animal%20Assets') || onclick.includes('Animal Assets'); }), t.animalAssets);
          setText(findLink(nav, function(href, onclick){ return href.includes('Textures') || onclick.includes('Textures'); }), t.textures);
          setText(findLink(nav, function(href, onclick){ return href.includes('Free') || onclick.includes('Free'); }), t.free);
          setText(findLink(nav, function(href){ return href === 'prompt-generator.html'; }), t.prompt);
          setText(findLink(nav, function(href){ return href === 'interaction.html'; }), t.interaction);
          setText(findLink(nav, function(href){ return href === 'resume.html'; }), t.resume);
          const navDropdowns = nav.querySelectorAll('.nav-dropdown');
          const inspirationDropdown = navDropdowns[1] || null;
          const inspirationMenu = inspirationDropdown ? inspirationDropdown.querySelector('.dropdown-content') : null;
          setText(inspirationDropdown ? inspirationDropdown.querySelector(':scope > a') : null, t.inspiration);
          setText(findLink(inspirationMenu, function(href){ return href === 'plan-references.html'; }), t.plan);
          setText(findLink(inspirationMenu, function(href){ return href === 'section-references.html'; }), t.section);
          setText(findLink(inspirationMenu, function(href){ return href === 'render-references.html'; }), t.other);
          setText(findLink(inspirationMenu, function(href){ return href === 'color-references.html'; }), t.color);
        }

        const loginBtn = document.querySelector('.login-entry-btn');
        setText(loginBtn, t.login);

        const menuBtn = document.querySelector('.mobile-menu-toggle');
        setText(menuBtn, t.menu);
        if(menuBtn) menuBtn.setAttribute('aria-label', lang === 'zh' ? '打开菜单' : 'Open menu');

        const panel = document.getElementById('mobileMenuPanel');
        if(panel){
          setText(findLink(panel, function(href){ return href === 'index.html'; }), t.all);
          const groups = panel.querySelectorAll('.mobile-menu-group');
          setText(groups[0], lang === 'zh' ? '素材库' : t.assets.replace(' ▼',''));
          setText(groups[1], t.toolsGroup);
          setText(groups[2], t.inspirationGroup);
          setText(groups[3], t.accountGroup);
          setText(findLink(panel, function(href){ return href.includes('Module%20Diagrams'); }), t.moduleAssets);
          setText(findLink(panel, function(href){ return href.includes('People%20Assets'); }), t.peopleAssets);
          setText(findLink(panel, function(href){ return href.includes('Plant%20Assets'); }), t.plantAssets);
          setText(findLink(panel, function(href){ return href.includes('Animal%20Assets'); }), t.animalAssets);
          setText(findLink(panel, function(href){ return href.includes('Textures'); }), t.textures);
          setText(findLink(panel, function(href){ return href.includes('Free'); }), t.free);
          setText(findLink(panel, function(href){ return href === 'prompt-generator.html'; }), t.prompt);
          setText(findLink(panel, function(href){ return href === 'interaction.html'; }), t.interaction);
          setText(findLink(panel, function(href){ return href === 'resume.html'; }), t.resume);
          setText(findLink(panel, function(href){ return href === 'plan-references.html'; }), t.plan);
          setText(findLink(panel, function(href){ return href === 'section-references.html'; }), t.section);
          setText(findLink(panel, function(href){ return href === 'render-references.html'; }), t.other);
          setText(findLink(panel, function(href){ return href === 'color-references.html'; }), t.color);
          setText(findLink(panel, function(href){ return href === 'login.html'; }), t.login);
        }
      }

      if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', applyPromptNavLang);
      }else{
        applyPromptNavLang();
      }
      window.addEventListener('storage', applyPromptNavLang);
      new MutationObserver(applyPromptNavLang).observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'data-lang'] });
    })();
  




  function scrollCurrentPageTop(event){
    if(event){
      event.preventDefault();
      event.stopPropagation();
    }
    window.scrollTo({top:0, behavior:'smooth'});
  }

  /* v320: Prompt Generator static event-attribute migration.
     Keeps navigation, Prompt Tool entry, modal actions, and back-to-top behavior unchanged. */
  (function(){
    function bindPromptGeneratorStaticEvents(){
      document.querySelectorAll('[data-nav-filter]').forEach(function(link){
        link.addEventListener('click', function(event){
          const category = link.getAttribute('data-nav-filter') || '';
          const result = navFilter(category);
          if(result === false) event.preventDefault();
        });
      });

      const loginEntry = document.querySelector('[data-login-entry]');
      if(loginEntry){
        loginEntry.addEventListener('click', function(){
          location.href = 'login.html';
        });
      }

      document.querySelectorAll('[data-prompt-tool-link]').forEach(function(element){
        element.addEventListener('click', function(){
          location.href = 'prompt-tool.html?v=233';
        });
      });

      const categoriesButton = document.querySelector('[data-scroll-to-categories]');
      if(categoriesButton){
        categoriesButton.addEventListener('click', function(){
          const categories = document.getElementById('categories');
          if(categories) categories.scrollIntoView({behavior:'smooth'});
        });
      }

      document.querySelectorAll('[data-close-prompt-case]').forEach(function(button){
        button.addEventListener('click', closePromptCase);
      });

      const copyButton = document.querySelector('[data-copy-prompt-case]');
      if(copyButton){
        copyButton.addEventListener('click', copyPromptCase);
      }

      const topButton = document.querySelector('[data-scroll-current-page-top]');
      if(topButton){
        topButton.addEventListener('click', scrollCurrentPageTop);
      }
    }

    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', bindPromptGeneratorStaticEvents);
    }else{
      bindPromptGeneratorStaticEvents();
    }
  })();

