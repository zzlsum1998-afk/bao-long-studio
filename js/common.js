// Bao Long Studio v70 common header/nav + language toggle
(function(){
  window.toggleMobileMenu=function(){var p=document.getElementById('mobileMenuPanel');if(p)p.classList.toggle('open');};
  window.closeMobileMenu=function(){var p=document.getElementById('mobileMenuPanel');if(p)p.classList.remove('open');};
  if(typeof window.navFilter!=='function'){window.navFilter=function(){return true;};}
  function normalizePath(href){try{var u=new URL(href,location.href);return (u.pathname.split('/').pop()||'index.html');}catch(e){return href;}}
  function markActiveNav(){var current=normalizePath(location.href);document.querySelectorAll('.site-header .nav a').forEach(function(a){var target=normalizePath(a.getAttribute('href')||'');if(target===current)a.classList.add('is-active');});}

  var zhMap={
    // common navigation
    'All':'全部','Assets ▼':'素材库 ▼','Module Assets':'模块素材','People Assets':'人物素材','Plant Assets':'植物素材','Animal Assets':'动物素材','Textures':'纹理','Free':'免费素材','Prompt Generator':'Prompt 工具','Interaction':'交互实验室','Resume':'简历模板','Inspiration Board ▼':'灵感板 ▼','Inspiration Board':'灵感板','Plan Board':'平面灵感','Section Board':'剖面灵感','Other Board':'综合灵感','Color Board':'色彩灵感','Tools':'工具','Shop Preview':'商品预览','Quick Links':'快捷入口','Menu':'菜单',
    // common buttons
    'View on Taobao':'去淘宝查看','See Details':'查看详情','View Resume Templates':'查看简历模板','Buy Template':'购买模板','Explore Board':'进入灵感板','Open Prompt Generator':'打开 Prompt 工具','View Workflow':'查看流程','View More':'查看更多','Open Resume Tool':'打开简历工具','Go to Taobao':'去淘宝','Back to Products':'返回商品','View All Assets':'查看全部素材','View Free':'查看免费素材','Try Prompt Builder':'试用 Prompt 工具','View Categories':'查看分类','Open Tool':'打开工具','Build Your Prompt':'生成你的 Prompt','Copy Prompt':'复制 Prompt','Close':'关闭','Try Resume Tool':'试用简历工具','View Templates':'查看模板','Other Board':'综合灵感',
    // home page
    'Design Assets Creator Bundle.':'设计素材与创作工具集合。','Editable Resume Templates.':'可编辑简历模板。','Plan, Section & Other Board.':'平面、剖面与综合灵感板。','Architectural Prompt Builder.':'建筑景观 Prompt 工具。','Browse by Category':'按场景浏览',"Editor's Picks":'精选素材','Studio Tools':'工作室工具','Bao Long Studio':'Bao Long Studio',
    '适合设计表达、作品集排版与视觉展示的素材包。用于快速搭建设计分析图、场景图、展示图与拼贴内容。':'适合设计表达、作品集排版与视觉展示的素材包。用于快速搭建设计分析图、场景图、展示图与拼贴内容。',
    '固定排版、一页导出、AI 优化经历内容。适合求职、转岗、作品集申请等场景。':'固定排版、一页导出、AI 优化经历内容。适合求职、转岗、作品集申请等场景。',
    '把平面图、剖面图、效果图整理为灵感索引：低清缩略图、来源标注、风格标签与原链接跳转，不提供下载。':'把平面图、剖面图、综合图面整理为灵感索引：低清缩略图、来源标注、风格标签与原链接跳转，不提供下载。',
    '把构图、建筑风格、色彩、细节、氛围和非 AI 感关键词组合成可直接复制的 MidJourney Prompt。':'把构图、建筑风格、色彩、细节、氛围和非 AI 感关键词组合成可直接复制的 MidJourney Prompt。',
    '从素材整理、Prompt 生成、交互实验、简历制作到灵感参考，按照不同任务场景进入对应模块。':'从素材整理、Prompt 生成、交互实验、简历制作到灵感参考，按照不同任务场景进入对应模块。',
    '首页先展示 16 个精选素材，更多分类与完整商品可以进入 Assets 页面查看。':'首页先展示 16 个精选素材，更多分类与完整商品可以进入素材库页面查看。',
    'Assets':'素材库','设计素材 / 商品资源':'设计素材 / 商品资源','Prompt Generator':'Prompt 工具','提示词生成 / 图面风格':'提示词生成 / 图面风格','Interaction':'交互实验室','交互实验 / 可玩 Demo':'交互实验 / 可玩 Demo','Resume':'简历模板','简历模板 / 在线工具':'简历模板 / 在线工具','Inspiration Board':'灵感板','灵感参考 / 图面案例':'灵感参考 / 图面案例',
    'Resume Templates':'简历模板','Visual Kit Library':'视觉素材库','Custom Service':'定制服务',
    '简历模板展示、AI 优化入口与 PDF 导出工具。':'简历模板展示、AI 优化入口与 PDF 导出工具。','建筑插画、拼贴风、儿童空间、活动分析图提示词。':'建筑插画、拼贴风、儿童空间、活动分析图提示词。','小红书封面、产品展示、设计表达资源库。':'小红书封面、产品展示、设计表达资源库。','简历精修、作品集页面、小红书视觉策划。':'简历精修、作品集页面、小红书视觉策划。',
    // assets page
    'Assets Library.':'素材库。','All Assets':'全部素材','Design Assets':'设计素材',
    '集中浏览 Bao Long Studio 的设计素材商品。这里对应导航栏 Assets 下拉框的 6 个分类，可按 Module、People、Plant、Animal、Textures 和 Free 快速筛选。':'集中浏览 Bao Long Studio 的设计素材商品。这里对应导航栏素材库下拉框的 6 个分类，可按模块、人物、植物、动物、纹理和免费素材快速筛选。',
    '集中浏览 Bao Long Studio 的设计素材商品，可按导航栏下拉分类继续筛选。':'集中浏览 Bao Long Studio 的设计素材商品，可按导航栏下拉分类继续筛选。',
    // prompt page
    'Landscape & Architecture Prompt Builder.':'景观建筑 Prompt 生成器。','Prompt Categories':'Prompt 分类','Prompt Inspiration':'Prompt 灵感','How It Works':'使用流程','✦ Based on your prompt system':'✦ 基于你的 Prompt 系统',
    '把图面风格、构图角度、色彩、建筑要素、景观要素、人物活动和画幅比例组合成可复制的 MidJourney 指令。':'把图面风格、构图角度、色彩、建筑要素、景观要素、人物活动和画幅比例组合成可复制的 MidJourney 指令。',
    '把复杂选择变成资源卡片，用户先理解这个工具能做什么，再进入真正的 Prompt Builder。':'把复杂选择变成资源卡片，让用户先理解工具能做什么，再进入真正的 Prompt Builder。',
    '查看不同图面风格的生成效果，点开卡片即可看到完整提示词，并一键复制到 MidJourney 继续测试。':'查看不同图面风格的生成效果，点开卡片即可看到完整提示词，并一键复制到 MidJourney 继续测试。',
    '从风格选择到最终 Prompt 输出，保持清晰的工具路径。':'从风格选择到最终 Prompt 输出，保持清晰的工具路径。',
    'Structured Prompt':'结构化 Prompt','Random Inspiration':'随机灵感','Landscape Elements':'景观元素','Copy-ready Output':'可复制输出',
    'Choose Style':'选择风格','Add Elements':'添加元素','Generate Prompt':'生成 Prompt','Copy & Test':'复制测试',
    '选择图面风格、构图角度和色彩方向。':'选择图面风格、构图角度和色彩方向。','叠加建筑、景观、人物活动和氛围关键词。':'叠加建筑、景观、人物活动和氛围关键词。','右侧自动组合成完整英文提示词。':'右侧自动组合成完整英文提示词。','复制到 MidJourney 后继续调整风格和画幅。':'复制到 MidJourney 后继续调整风格和画幅。',
    // interaction page
    'Interactive Tools & Creative Experiments.':'交互工具与创意实验。',
    '这里会集中放可直接体验的视觉交互 Demo，例如手势识别、景观生长、生成式图形和网页互动实验，让用户可以在网站上玩起来。':'这里会集中放可直接体验的视觉交互 Demo，例如手势识别、景观生长、生成式图形和网页互动实验，让用户可以在网站上玩起来。',
    // resume page
    'Editable Resume Templates + AI Polish.':'可编辑简历模板 + AI 优化。','12 Templates':'12 套模板','AI Polish':'AI 优化','One-page Export':'一页导出','JD Match':'岗位匹配','Fill Once':'填写一次','Choose Template':'选择模板','Export PDF':'导出 PDF','✦ Free AI Uses Today: 3 / 3':'✦ 今日免费 AI 次数：3 / 3',
    '填写一次信息，切换多套模板，使用 AI 优化经历、生成简介、翻译简历，并一键导出 PDF。':'填写一次信息，切换多套模板，使用 AI 优化经历、生成简介、翻译简历，并一键导出 PDF。',
    '后续可上传旧简历图片或文件，自动识别文字并填入简历表单。前端先保留入口，后端接入后支持 JPEG / JPG / PNG / Word / PDF。':'后续可上传旧简历图片或文件，自动识别文字并填入简历表单。前端先保留入口，后端接入后支持 JPEG / JPG / PNG / Word / PDF。',
    '像 Toffu 的商品卡片一样展示模板，使用真实简历成品图快速预览不同风格。':'像 Toffu 的商品卡片一样展示模板，使用真实简历成品图快速预览不同风格。',
    '把简历工具包装成清晰的使用流程，而不是让用户一进来就面对复杂表单。':'把简历工具包装成清晰的使用流程，而不是让用户一进来就面对复杂表单。',
    // inspiration board pages
    'Plan Inspiration Board':'平面灵感板','Section Inspiration Board':'剖面灵感板','Other Inspiration Board':'综合灵感板','Color Inspiration Board':'色彩灵感板','Inspiration':'灵感参考',
    '平面图灵感索引：用于收集总平面、景观平面、城市更新图面、场地策略和作品集板式参考。':'平面图灵感索引：用于收集总平面、景观平面、城市更新图面、场地策略和作品集板式参考。',
    '剖面图灵感索引：用于收集建筑剖面、剖透视、爆炸轴测、结构关系与作品集板式参考。':'剖面图灵感索引：用于收集建筑剖面、剖透视、爆炸轴测、结构关系与作品集板式参考。',
    '综合灵感索引：用于收集建筑渲染、轴测、拼贴、展板、概念图、分析图等视觉参考。':'综合灵感索引：用于收集建筑渲染、轴测、拼贴、展板、概念图、分析图等视觉参考。',
    '配色灵感索引：用于整理低饱和色彩、主辅色关系、图面氛围和高级感视觉搭配。':'配色灵感索引：用于整理低饱和色彩、主辅色关系、图面氛围和高级感视觉搭配。',
    // footers
    'Bao Long Studio · Prompt Generator':'Bao Long Studio · Prompt 工具','Bao Long Studio · Resume Templates':'Bao Long Studio · 简历模板','Bao Long Studio · Plan Inspiration Board':'Bao Long Studio · 平面灵感板','Bao Long Studio · Inspiration Board':'Bao Long Studio · 灵感板',
    '© 2026 Bao Long Studio. All rights reserved. All design assets, templates and visual materials are original works by Bao Long Studio.':'© 2026 Bao Long Studio. 保留所有权利。所有设计素材、模板与视觉内容均为 Bao Long Studio 原创作品。'
  };
  var titleMap={
    'Bao Long Studio | Design Assets Library':'Bao Long Studio | 设计素材与创作工具集合','Assets | Bao Long Studio':'素材库 | Bao Long Studio','Prompt Generator | Bao Long Studio':'Prompt 工具 | Bao Long Studio','Interaction | Bao Long Studio':'交互实验室 | Bao Long Studio','Resume Templates | Bao Long Studio':'简历模板 | Bao Long Studio','Plan Board | Bao Long Studio':'平面灵感板 | Bao Long Studio','Section Board | Bao Long Studio':'剖面灵感板 | Bao Long Studio','Other Board | Bao Long Studio':'综合灵感板 | Bao Long Studio','Color Board | Bao Long Studio':'色彩灵感板 | Bao Long Studio','Prompt Builder · Bao Long Studio':'Prompt Builder · Bao Long Studio','Resume Studio｜设计感简历生成器':'Resume Studio｜设计感简历生成器'
  };

  function getLang(){return localStorage.getItem('baolongLanguage') || 'zh';}
  function setLang(lang){localStorage.setItem('baolongLanguage',lang);applyLanguage(lang);}
  function shouldSkip(el){return !!(el.closest('.pin') || el.closest('.product-card') || el.closest('.product-modal') || el.closest('.prompt-case-card') || el.closest('.prompt-modal') || el.closest('.resume-sheet') || el.closest('.template-card') || el.closest('.template-preview'));}
  function normalizeText(t){return (t||'').replace(/\s+/g,' ').trim();}
  function collectTargets(){
    var selectors=[
      '.site-header .nav a','.dropdown-content a','.mobile-menu-panel a','.mobile-menu-group','.mobile-menu-toggle','.header-actions .pill-btn',
      '.hero h1','.hero p','.copy .eyebrow','.copy h1','.copy p','.section-title','.section-title-main','.section-desc','.eyebrow','.tabs .tab',
      '.primary-btn','.secondary-btn','.category-feature-copy h3','.category-feature-copy p','.tool-card h3','.tool-card p','.feature strong','.feature span','.step h3','.step p','.tagline','.ai-badge','.card h3','.card p','.footer','footer'
    ];
    return Array.prototype.slice.call(document.querySelectorAll(selectors.join(','))).filter(function(el){return !shouldSkip(el);});
  }
  function applyLanguage(lang){
    document.documentElement.setAttribute('lang',lang==='zh'?'zh-CN':'en');
    collectTargets().forEach(function(el){
      if(!el.dataset.blOriginalText){el.dataset.blOriginalText=normalizeText(el.textContent);}
      var original=el.dataset.blOriginalText;
      if(lang==='zh' && Object.prototype.hasOwnProperty.call(zhMap,original)){el.textContent=zhMap[original];}
      if(lang==='en'){el.textContent=original;}
    });
    if(!document.documentElement.dataset.blOriginalTitle){document.documentElement.dataset.blOriginalTitle=document.title;}
    var originalTitle=document.documentElement.dataset.blOriginalTitle;
    if(lang==='zh' && titleMap[originalTitle]) document.title=titleMap[originalTitle];
    if(lang==='en') document.title=originalTitle;
    document.querySelectorAll('.language-toggle').forEach(function(btn){btn.textContent='中文 / EN';btn.setAttribute('aria-label',lang==='zh'?'Switch to English':'切换到中文');btn.dataset.currentLang=lang;});
  }
  function injectLanguageToggle(){
    if(document.querySelector('.language-toggle')) return;
    var action=document.querySelector('.site-header .header-actions');
    if(action){
      var btn=document.createElement('button');btn.type='button';btn.className='language-toggle pill-btn';btn.textContent='中文 / EN';btn.onclick=function(e){e.preventDefault();setLang(getLang()==='zh'?'en':'zh');};
      action.appendChild(btn);
    }
    var panel=document.getElementById('mobileMenuPanel');
    if(panel){
      var mobileBtn=document.createElement('button');mobileBtn.type='button';mobileBtn.className='language-toggle mobile-language-toggle';mobileBtn.textContent='中文 / EN';mobileBtn.onclick=function(e){e.preventDefault();setLang(getLang()==='zh'?'en':'zh');};
      panel.appendChild(mobileBtn);
    }
  }
  document.addEventListener('DOMContentLoaded',function(){markActiveNav();injectLanguageToggle();applyLanguage(getLang());});
  document.addEventListener('click',function(e){if(!e.target.closest('.site-header'))closeMobileMenu();});
  window.setBaoLongLanguage=setLang;
  window.getBaoLongLanguage=getLang;
})();
