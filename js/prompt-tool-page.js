/* PROMPT_TOOL_MOBILE_MENU_SCROLL_LOCK_v216
   Keeps Prompt Tool mobile navigation isolated:
   menu open locks the page behind it, panel itself can still scroll. */
var promptToolMobileMenuScrollY=0;

function getPromptToolMobileMenuPanels(){
  return Array.prototype.slice.call(document.querySelectorAll('.mobile-menu-panel'));
}
function getPromptToolPrimaryMobileMenu(){
  return document.querySelector('.site-header .mobile-menu-panel') || document.getElementById('mobileMenuPanel') || document.querySelector('.mobile-menu-panel');
}
function setPromptToolMenuButtonState(isOpen){
  var btn=document.querySelector('.mobile-menu-toggle');
  if(btn) btn.setAttribute('aria-expanded',isOpen ? 'true' : 'false');
}
function lockPromptToolMobileScroll(){
  var body=document.body;
  if(!body || body.classList.contains('mobile-menu-open')) return;
  promptToolMobileMenuScrollY=window.scrollY || document.documentElement.scrollTop || 0;
  body.dataset.promptToolScrollY=String(promptToolMobileMenuScrollY);
  body.style.position='fixed';
  body.style.top=(-promptToolMobileMenuScrollY)+'px';
  body.style.left='0';
  body.style.right='0';
  body.style.width='100%';
  body.style.overflow='hidden';
  document.documentElement.style.overflow='hidden';
  body.classList.add('mobile-menu-open');
}
function unlockPromptToolMobileScroll(){
  var body=document.body;
  if(!body) return;
  var saved=parseInt(body.dataset.promptToolScrollY || String(promptToolMobileMenuScrollY || 0),10) || 0;
  body.classList.remove('mobile-menu-open');
  body.style.position='';
  body.style.top='';
  body.style.left='';
  body.style.right='';
  body.style.width='';
  body.style.overflow='';
  document.documentElement.style.overflow='';
  delete body.dataset.promptToolScrollY;
  window.scrollTo(0,saved);
}
function closeMobileMenu(){
  var panels=getPromptToolMobileMenuPanels();
  panels.forEach(function(panel){ panel.classList.remove('open'); });
  setPromptToolMenuButtonState(false);
  unlockPromptToolMobileScroll();
}
function openPromptToolMobileMenu(){
  var primary=getPromptToolPrimaryMobileMenu();
  if(!primary) return;
  getPromptToolMobileMenuPanels().forEach(function(panel){ panel.classList.remove('open'); });
  primary.classList.add('open');
  setPromptToolMenuButtonState(true);
  lockPromptToolMobileScroll();
}
function toggleMobileMenu(){
  var primary=getPromptToolPrimaryMobileMenu();
  if(!primary) return;
  if(primary.classList.contains('open')) closeMobileMenu();
  else openPromptToolMobileMenu();
}
function navFilter(filter){
  var target='assets.html?filter=' + encodeURIComponent(filter) + '#products';
  window.location.href=target;
  return false;
}
document.addEventListener('click',function(event){
  var target=event.target;
  if(!target || !document.body.classList.contains('mobile-menu-open')) return;
  if(target.closest && (target.closest('.mobile-menu-panel') || target.closest('.mobile-menu-toggle'))) return;
  closeMobileMenu();
});
document.addEventListener('keydown',function(event){
  if(event.key==='Escape') closeMobileMenu();
});
document.addEventListener('click',function(event){
  var link=event.target && event.target.closest ? event.target.closest('.mobile-menu-panel a') : null;
  if(link) closeMobileMenu();
});
window.addEventListener('resize',function(){
  if(window.innerWidth>1080) closeMobileMenu();
});


/* PROMPT_TOOL_NAV_BILINGUAL_BRIDGE_v266
   Fixes only Prompt Tool page header/nav labels after the bundled page renders.
   Keeps Prompt Tool logic, CSS, JS, JSON, images, favicon, sitemap and robots untouched. */
(function(){
  var navLabels={
    zh:{
      all:'全部',assets:'素材库 ▼',moduleAssets:'模块素材',peopleAssets:'人物素材',plantAssets:'植物素材',animalAssets:'动物素材',textures:'纹理',free:'免费素材',prompt:'Prompt 工具',interaction:'交互实验室',inspiration:'灵感板 ▼',plan:'平面灵感',section:'剖面灵感',other:'综合灵感',color:'色彩灵感',login:'登录',menu:'菜单',assetsGroup:'素材库',toolsGroup:'工具',inspirationGroup:'灵感板',accountGroup:'账户'
    },
    en:{
      all:'All',assets:'Assets ▼',moduleAssets:'Module Assets',peopleAssets:'People Assets',plantAssets:'Plant Assets',animalAssets:'Animal Assets',textures:'Textures',free:'Free',prompt:'Prompt Generator',interaction:'Interaction',inspiration:'Inspiration Board ▼',plan:'Plan Board',section:'Section Board',other:'Other Board',color:'Color Board',login:'Log in',menu:'Menu',assetsGroup:'Assets',toolsGroup:'Tools',inspirationGroup:'Inspiration Board',accountGroup:'Account'
    }
  };

  function readLang(){
    try{
      if(typeof window.getBaoLongLanguage==='function'){
        var apiLang=String(window.getBaoLongLanguage()||'').toLowerCase();
        if(apiLang.indexOf('en')===0) return 'en';
        if(apiLang.indexOf('zh')===0) return 'zh';
      }
    }catch(err){}
    var keys=['baolongLanguage','baolongLabLang','baolongLang','siteLang','preferredLang','language'];
    for(var i=0;i<keys.length;i++){
      try{
        var saved=String(localStorage.getItem(keys[i])||'').toLowerCase();
        if(saved.indexOf('en')===0) return 'en';
        if(saved.indexOf('zh')===0) return 'zh';
      }catch(err){}
    }
    var htmlLang=String(document.documentElement.getAttribute('lang')||document.documentElement.getAttribute('data-lang')||'').toLowerCase();
    if(htmlLang.indexOf('en')===0) return 'en';
    return 'zh';
  }

  function setText(el,value){ if(el && typeof value==='string') el.textContent=value; }
  function findLink(root,matcher){
    if(!root) return null;
    var links=root.querySelectorAll('a');
    for(var i=0;i<links.length;i++){
      var a=links[i], href=a.getAttribute('href')||'', onclick=a.getAttribute('onclick')||'';
      if(matcher(href,onclick,a)) return a;
    }
    return null;
  }

  function applyDesktopNav(t){
    var nav=document.querySelector('.site-header .nav');
    if(!nav) return;
    setText(findLink(nav,function(href){return href==='index.html';}),t.all);
    setText(findLink(nav,function(href){return href==='assets.html';}),t.assets);
    setText(findLink(nav,function(href,onclick){return href.indexOf('Module%20Diagrams')>-1 || onclick.indexOf('Module Diagrams')>-1;}),t.moduleAssets);
    setText(findLink(nav,function(href,onclick){return href.indexOf('People%20Assets')>-1 || onclick.indexOf('People Assets')>-1;}),t.peopleAssets);
    setText(findLink(nav,function(href,onclick){return href.indexOf('Plant%20Assets')>-1 || onclick.indexOf('Plant Assets')>-1;}),t.plantAssets);
    setText(findLink(nav,function(href,onclick){return href.indexOf('Animal%20Assets')>-1 || onclick.indexOf('Animal Assets')>-1;}),t.animalAssets);
    setText(findLink(nav,function(href,onclick){return href.indexOf('Textures')>-1 || onclick.indexOf('Textures')>-1;}),t.textures);
    setText(findLink(nav,function(href,onclick){return href.indexOf('Free')>-1 || onclick.indexOf('Free')>-1;}),t.free);
    setText(findLink(nav,function(href){return href==='prompt-generator.html';}),t.prompt);
    setText(findLink(nav,function(href){return href==='interaction.html';}),t.interaction);
    var dropdowns=nav.querySelectorAll('.nav-dropdown');
    var board=dropdowns.length>1?dropdowns[1]:null;
    setText(board?board.querySelector(':scope > a'):null,t.inspiration);
    var boardMenu=board?board.querySelector('.dropdown-content'):null;
    setText(findLink(boardMenu,function(href){return href==='plan-references.html';}),t.plan);
    setText(findLink(boardMenu,function(href){return href==='section-references.html';}),t.section);
    setText(findLink(boardMenu,function(href){return href==='render-references.html';}),t.other);
    setText(findLink(boardMenu,function(href){return href==='color-references.html';}),t.color);
    setText(board?board.querySelector(':scope > a'):null,t.inspiration);
  }

  function applyMobilePanel(panel,t){
    setText(findLink(panel,function(href){return href==='index.html';}),t.all);
    var groups=panel.querySelectorAll('.mobile-menu-group');
    setText(groups[0],t.assetsGroup); setText(groups[1],t.toolsGroup); setText(groups[2],t.inspirationGroup); setText(groups[3],t.accountGroup);
    setText(findLink(panel,function(href){return href.indexOf('Module%20Diagrams')>-1;}),t.moduleAssets);
    setText(findLink(panel,function(href){return href.indexOf('People%20Assets')>-1;}),t.peopleAssets);
    setText(findLink(panel,function(href){return href.indexOf('Plant%20Assets')>-1;}),t.plantAssets);
    setText(findLink(panel,function(href){return href.indexOf('Animal%20Assets')>-1;}),t.animalAssets);
    setText(findLink(panel,function(href){return href.indexOf('Textures')>-1;}),t.textures);
    setText(findLink(panel,function(href){return href.indexOf('Free')>-1;}),t.free);
    setText(findLink(panel,function(href){return href==='prompt-generator.html';}),t.prompt);
    setText(findLink(panel,function(href){return href==='interaction.html';}),t.interaction);
    setText(findLink(panel,function(href){return href==='plan-references.html';}),t.plan);
    setText(findLink(panel,function(href){return href==='section-references.html';}),t.section);
    setText(findLink(panel,function(href){return href==='render-references.html';}),t.other);
    setText(findLink(panel,function(href){return href==='color-references.html';}),t.color);
    setText(findLink(panel,function(href){return href==='login.html';}),t.login);
  }

  function applyPromptToolNavLang(){
    var lang=readLang();
    var t=navLabels[lang]||navLabels.zh;
    document.documentElement.setAttribute('data-prompt-tool-nav-lang',lang);
    applyDesktopNav(t);
    setText(document.querySelector('.login-entry-btn'),t.login);
    var menuBtn=document.querySelector('.mobile-menu-toggle');
    setText(menuBtn,t.menu);
    if(menuBtn) menuBtn.setAttribute('aria-label',lang==='zh'?'打开菜单':'Open menu');
    var panels=document.querySelectorAll('#mobileMenuPanel,.mobile-menu-panel');
    for(var i=0;i<panels.length;i++) applyMobilePanel(panels[i],t);
  }

  function scheduleApply(){
    applyPromptToolNavLang();
    setTimeout(applyPromptToolNavLang,0);
    setTimeout(applyPromptToolNavLang,80);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',scheduleApply); else scheduleApply();
  window.addEventListener('storage',scheduleApply);
  document.addEventListener('click',function(e){ if(e.target && e.target.closest && e.target.closest('.language-toggle')) setTimeout(scheduleApply,0); },true);
  try{ new MutationObserver(scheduleApply).observe(document.documentElement,{attributes:true,attributeFilter:['lang','data-lang']}); }catch(err){}
  setTimeout(function(){
    if(typeof window.setBaoLongLanguage==='function' && !window.setBaoLongLanguage.__promptToolNavWrapped){
      var originalSetLang=window.setBaoLongLanguage;
      window.setBaoLongLanguage=function(lang){ var result=originalSetLang.apply(this,arguments); scheduleApply(); return result; };
      window.setBaoLongLanguage.__promptToolNavWrapped=true;
    }
  },0);
})();
