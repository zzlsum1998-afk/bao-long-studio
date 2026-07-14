// BaoLong Lab v258 common header/nav + language toggle
(function(){
  window.toggleMobileMenu=function(){var p=document.getElementById('mobileMenuPanel');if(p)p.classList.toggle('open');};
  window.closeMobileMenu=function(){var p=document.getElementById('mobileMenuPanel');if(p)p.classList.remove('open');};
  if(typeof window.navFilter!=='function'){window.navFilter=function(){return true;};}
  function normalizePath(href){try{var u=new URL(href,location.href);return (u.pathname.split('/').pop()||'index.html');}catch(e){return href;}}
  function markActiveNav(){var current=normalizePath(location.href);document.querySelectorAll('.site-header .nav a').forEach(function(a){var target=normalizePath(a.getAttribute('href')||'');if(target===current)a.classList.add('is-active');});}

  var zhMap={
    // common navigation
    'All':'全部','Assets ▼':'素材库 ▼','Module Assets':'模块素材','People Assets':'人物素材','Plant Assets':'植物素材','Animal Assets':'动物素材','Textures':'纹理','Free':'免费素材','Prompt Generator':'Prompt 工具','Interaction':'交互实验室','Resume':'简历模板','Inspiration Board ▼':'灵感板 ▼','Inspiration Board':'灵感板','Plan Board':'平面灵感','Section Board':'剖面灵感','Other Board':'综合灵感','Color Board':'色彩灵感','Tools':'工具','Shop Preview':'商品预览','Quick Links':'快捷入口','Menu':'菜单','Log in':'登录',
    // common buttons
    'View on Taobao':'去淘宝查看','See Details':'查看详情','View Resume Templates':'查看简历模板','Buy Template':'购买模板','Explore Board':'进入灵感板','Open Prompt Generator':'打开 Prompt 工具','View Workflow':'查看流程','View More':'查看更多','Open Resume Tool':'打开简历工具','Go to Taobao':'去淘宝','Back to Products':'返回商品','View All Assets':'查看全部素材','View Free':'查看免费素材','Try Prompt Builder':'试用 Prompt 工具','View Categories':'查看分类','Open Tool':'打开工具','Build Your Prompt':'生成你的 Prompt','Copy Prompt':'复制 Prompt','Close':'关闭','Try Resume Tool':'试用简历工具','View Templates':'查看模板','Other Board':'综合灵感','Ready to build your prompt?':'开始生成你的 Prompt','Use the full Prompt Builder after entering the tool page.':'进入工具页后，可以使用完整的 Prompt Builder 交互功能。','Ready to build your resume?':'准备好生成你的简历了吗？','Use the full resume generator after entering the tool page.':'进入工具页后，可以继续使用完整的简历生成器功能。',
    // home page
    'Design Assets Creator Bundle.':'设计素材与创作工具集合','Editable Resume Templates.':'可编辑简历模板','Plan, Section & Other Board.':'平面、剖面与综合灵感板','Architectural Prompt Builder.':'建筑景观 Prompt 工具','Browse by Category':'按场景浏览',"Editor's Picks":'精选素材','Studio Tools':'工作室工具','Design assets, resume templates and visual content tools.':'设计素材、简历工具与视觉内容工具。','ABOUT BAOLONG LAB':'关于 BaoLong Lab','A creative lab for design references, prompts and lightweight tools.':'BaoLong Lab 简介','BaoLong Lab focuses on reference organization, prompt systems and lightweight tool experiments for landscape design, visual expression and AI-assisted creation. Rather than offering fixed answers, it turns inspiration, methods and tools into clearer, reusable creative workflows.':'BaoLong Lab 关注建筑景观、视觉表达与 AI 创作中的参考整理、Prompt 组织和轻量工具实验。这里不追求一次性给出标准答案，而是把灵感、方法和工具整理成更清晰、可复用的创作流程。','BaoLong Lab':'BaoLong Lab','Studio Notes & Trends':'工作室笔记与趋势','Studio Method Notes':'工作室方法笔记','Method Notes & Tool Observations':'方法笔记与工具观察','A space for BaoLong Lab’s notes on reference systems, prompt organization, AI tools and creative workflows. Instead of only linking to tools, this section records the methods and decisions behind them.':'记录 BaoLong Lab 在参考整理、Prompt 组织、AI 工具和创作流程中的判断。这里不只是展示工具入口，也沉淀设计方法、使用经验与可复用的创作思路。','Workflow System':'工作流系统','Reference System':'参考系统','Prompt System':'Prompt 系统','Tool System':'工具系统','Organized Creation':'有组织的创作','01 / DESIGN METHOD':'01 / DESIGN METHOD','02 / PROMPT SYSTEM':'02 / PROMPT SYSTEM','03 / TOOL SYSTEM':'03 / TOOL SYSTEM','Design Method':'设计方法','From References to Original Expression':'从参考图到原创表达','References help read composition, hierarchy, color and information structure. The goal is to extract methods and turn them into a new visual language, rather than copy the image itself.':'参考图可以帮助判断构图、层级、色彩和信息组织方式。真正重要的是提取方法，再转化成新的视觉语言，而不是复制图像本身。','AI Creation Needs Clear Structure':'AI 创作需要清晰组织','Prompt tools should help organize style, keywords, references and output logic, so ideas can move from generation to adjustment, preview and reuse.':'Prompt 工具不只是生成一段文字，而是帮助整理风格、关键词、参考方向和输出逻辑，让想法可以从生成进入调整、预览和复用。','Turning Ideas into Usable Outcomes':'把想法变成可用成果','Tool workflows should make the path from input to preview and export clear. Resume Tool is one concrete example: fill in content, preview the layout, then export a usable PDF.':'工具型流程应该让输入、预览和导出的路径足够清楚。以 Resume Tool 为例，从填写内容到预览版式，再到导出可使用的 PDF。','View Related Tool':'查看相关工具','View Inspiration Board':'查看灵感板','Open Prompt Library':'打开 Prompt 灵感库','Open Prompt Tool':'打开 Prompt 工具','View Resume Tool':'查看 Resume Tool',
    '适合设计表达、作品集排版与视觉展示的素材包。用于快速搭建设计分析图、场景图、展示图与拼贴内容。':'适合设计表达、作品集排版与视觉展示的素材包。用于快速搭建设计分析图、场景图、展示图与拼贴内容。',
    '固定排版、一页导出、AI 优化经历内容。适合求职、转岗、作品集申请等场景。':'固定排版、一页导出、AI 优化经历内容。适合求职、转岗、作品集申请等场景。',
    '把平面图、剖面图、效果图整理为灵感索引：低清缩略图、来源标注、风格标签与原链接跳转，不提供下载。':'把平面图、剖面图、综合图面整理为灵感索引：低清缩略图、来源标注、风格标签与原链接跳转，不提供下载。',
    '把构图、建筑风格、色彩、细节、氛围和非 AI 感关键词组合成可直接复制的 MidJourney Prompt。':'把构图、建筑风格、色彩、细节、氛围和非 AI 感关键词组合成可直接复制的 MidJourney Prompt。',
    '从素材整理、Prompt 生成、交互实验、简历制作到灵感参考，按照不同任务场景进入对应模块。':'从素材整理、Prompt 生成、交互实验、简历制作到灵感参考，按照不同任务场景进入对应模块。',
    '这里精选展示部分素材，更多分类与完整内容可进入素材库页面查看。':'这里精选展示部分素材，更多分类与完整内容可进入素材库页面查看。',
    'Assets':'素材库','设计素材 / 商品资源':'设计素材 / 商品资源','Prompt Generator':'Prompt 工具','提示词生成 / 图面风格':'提示词生成 / 图面风格','Interaction':'交互实验室','交互实验 / 视觉工具':'交互实验 / 视觉工具','Resume':'简历模板','简历模板 / 在线工具':'简历模板 / 在线工具','Inspiration Board':'灵感板','灵感参考 / 图面案例':'灵感参考 / 图面案例',
    'Resume Templates':'简历模板','Resume Tool':'简历生成器','Prompt Tool':'Prompt 工具','Interaction Lab':'交互实验室','Visual Kit Library':'视觉素材库','Visual Asset Library':'视觉素材库',
    'Basic information input, layout preview and PDF export.':'基础信息填写、版式预览与 PDF 导出。','Prompt references for architectural illustration, collage style, children’s space and activity diagrams.':'建筑插画、拼贴风、儿童空间、活动分析图提示词。','Lightweight interaction experiments such as plant calendars, emotion radars and timeline tools.':'植物日历、情绪雷达、时间轴等轻量交互实验。','Visual references for covers, product displays, design expression and inspiration boards.':'封面、产品展示、设计表达与灵感参考整理。','简历模板展示、AI 优化入口与 PDF 导出工具。':'简历模板展示、AI 优化入口与 PDF 导出工具。','建筑插画、拼贴风、儿童空间、活动分析图提示词。':'建筑插画、拼贴风、儿童空间、活动分析图提示词。','小红书封面、产品展示、设计表达资源库。':'小红书封面、产品展示、设计表达资源库。','简历精修、作品集页面、小红书视觉策划。':'简历精修、作品集页面、小红书视觉策划。',

    // v204 English-source mappings for homepage and main entry pages
    "All":"全部",
    "Assets ▼":"素材库 ▼",
    "Assets":"素材库",
    "Module Assets":"模块素材",
    "People Assets":"人物素材",
    "Plant Assets":"植物素材",
    "Animal Assets":"动物素材",
    "Textures":"纹理",
    "Free":"免费素材",
    "Interaction":"交互实验室",
    "Resume":"简历模板",
    "Inspiration Board ▼":"灵感板 ▼",
    "Inspiration Board":"灵感板",
    "Plan Board":"平面灵感",
    "Section Board":"剖面灵感",
    "Other Board":"综合灵感",
    "Color inspiration":"色彩灵感",
    "Log in":"登录",
    "Menu":"菜单",
    "Tools":"工具",
    "Account":"账户",
    "A design asset bundle for visual expression, portfolio layouts and presentation graphics. Built for quick diagrams, scene visuals, boards and collage content.":"适合设计表达、作品集排版与视觉展示的素材包。用于快速搭建设计分析图、场景图、展示图与拼贴内容。",
    "Fixed layouts, one-page export and AI-assisted experience polishing for job applications, career changes and portfolio submissions.":"固定排版、一页导出、AI 优化经历内容。适合求职、转岗、作品集申请等场景。",
    "Plan, section and visual references organized as an inspiration index, with source links, style tags and original links instead of downloadable assets.":"把平面图、剖面图、效果图整理为灵感索引：低清缩略图、来源标注、风格标签与原链接跳转，不提供下载。",
    "Combine composition, architectural style, color, detail, mood and natural-looking keywords into copy-ready MidJourney prompts.":"把构图、建筑风格、色彩、细节、氛围和非 AI 感关键词组合成可直接复制的 MidJourney Prompt。",
    "Enter different modules based on the task: assets, prompts, interaction experiments, resume tools and inspiration references.":"从素材整理、Prompt 生成、交互实验、简历制作到灵感参考，按照不同任务场景进入对应模块。",
    "A curated selection is shown here. More categories and complete assets are available in the Assets Library.":"这里精选展示部分素材，更多分类与完整内容可进入素材库页面查看。",
    "Design assets / product resources":"设计素材 / 商品资源",
    "A collection of module diagrams, people, plants, animals, textures and free resources for portfolio layouts, presentation boards, product displays and everyday asset organization.":"集合模块图、人物、植物、动物、纹理与免费素材，适合做作品集图面、汇报版面、商品展示和日常素材归档。",
    "Best for:":"适合：",
    "Architecture and landscape students, designers, portfolio makers and anyone looking for transparent PNGs and visual assets.":"建筑 / 景观学生、设计师、作品集准备者、需要快速找透明 PNG 与图面素材的人。",

    "Best for: Architecture and landscape students, designers, portfolio makers and anyone looking for transparent PNGs and visual assets.":"适合建筑、景观、作品集制作和视觉表达场景，方便快速查找透明 PNG 与常用素材。",
    "Best for: AI image beginners, creators who need a consistent visual style, and anyone turning references into prompt logic.":"适合 AI 出图新手、需要统一画面风格的人，以及想把参考图转化为提示词逻辑的创作者。",
    "Best for: Designers showing interaction skills, people moving toward UX or front-end work, and portfolio makers who need a highlight project.":"适合想展示交互能力的设计师、准备转 UX / 前端方向的人，以及需要作品集亮点项目的创作者。",
    "Best for: New graduates, career changers, design / operations / product applicants, and anyone who needs to organize a resume quickly.":"适合应届生、转行求职者、设计 / 运营 / 产品方向求职者，以及想快速整理简历的人。",
    "Best for: People doing early research, looking for visual directions, building moodboards or preparing a portfolio style.":"适合前期调研、图面方向寻找、Moodboard 整理和作品集视觉风格准备。",
    "Portfolio assets":"作品集素材",
    "Board layout":"图面排版",
    "Transparent PNG":"透明 PNG",
    "Prompt generation / visual styles":"提示词生成 / 图面风格",
    "Turn composition, style, scene, color and atmosphere keywords into reusable prompts for architectural, landscape and portfolio visuals.":"把构图、风格、场景、色彩与氛围关键词拆成可组合的 Prompt，帮助更稳定地生成建筑、景观与作品集视觉图。",
    "AI image beginners, creators who need a consistent visual style, and anyone turning references into prompt logic.":"AI 出图新手、需要统一画面风格的人、想把参考图转化为提示词逻辑的创作者。",
    "AI imaging":"AI 出图",
    "Prompt templates":"提示词模板",
    "Style breakdown":"风格拆解",
    "Interaction experiments / playable tools":"交互实验 / 可体验工具",
    "Collects gestures, animation, cursor feedback and web interactions that turn static design into playable, presentable experiences.":"收录手势、动画、鼠标反馈与网页互动，把静态设计延展成可体验、可演示的互动场景。",
    "Designers showing interaction skills, people moving toward UX or front-end work, and portfolio makers who need a highlight project.":"想展示交互能力的设计师、准备转 UX / 前端方向的人、需要作品集亮点项目的人。",
    "Interactive experience":"互动体验",
    "Experience design":"体验设计",
    "Portfolio highlight":"作品集亮点",
    "Resume templates / online tool":"简历模板 / 在线工具",
    "Provides resume template previews and an online editing entrance for content input, layout preview and export, helping turn job information into a cleaner one-page resume.":"提供简历模板展示与在线编辑入口，支持内容填写、排版预览和导出，帮助把求职信息整理成更干净的一页式简历。",
    "New graduates, career changers, design / operations / product applicants, and anyone who needs to organize a resume quickly.":"应届生、转行求职者、设计 / 运营 / 产品方向求职者，以及想快速整理简历的人。",
    "Online editing":"在线编辑",
    "One-page resume":"一页简历",
    "Job preparation":"求职准备",
    "Inspiration references / visual cases":"灵感参考 / 图面案例",
    "Organizes plans, sections, renderings and color references with a focus on composition, mood, color and expression methods rather than copying a single image.":"整理平面图、剖面图、效果图与色彩参考，重点看构图、氛围、色彩和表达方法，而不是直接复制单张参考图。",
    "People doing early research, looking for visual directions, building moodboards or preparing a portfolio style.":"做前期调研、寻找图面方向、整理 Moodboard、准备作品集视觉风格的人。",
    "Visual references":"图面参考",
    "Expression methods":"表达方法",
    "For purchases or collaboration enquiries, please use the linked Taobao, Xiaohongshu or contact entrances.":"如需购买素材或咨询合作，请前往对应的淘宝、小红书或联系入口。",
    "Browse BaoLong Lab design assets in one place. The six filters match the Assets dropdown: Module, People, Plant, Animal, Textures and Free.":"集中浏览 BaoLong Lab 的设计素材商品。这里对应导航栏 Assets 下拉框的 6 个分类，可按 Module、People、Plant、Animal、Textures 和 Free 快速筛选。",
    "Browse BaoLong Lab design assets and filter by category from the Assets dropdown.":"集中浏览 BaoLong Lab 的设计素材商品，可按导航栏下拉分类继续筛选。",
    "All Assets":"全部素材",
    "Combine visual style, composition angle, color, architecture, landscape elements, human activities and aspect ratio into copy-ready MidJourney prompts.":"把图面风格、构图角度、色彩、建筑要素、景观要素、人物活动和画幅比例组合成可复制的 MidJourney 指令。",
    "Combine visual language, composition angle, color, design style, scene elements, human activities, lighting and aspect ratio into copy-ready MidJourney prompts.":"把视觉语言、构图角度、色彩、设计风格、场景元素、人物活动、光影和画幅比例组合成可直接复制的 MidJourney Prompt。",
    "Break down prompts by visual style, composition, color, architecture, landscape, people and ratio.":"按图面风格、构图、色彩、建筑、景观、人物和比例拆解。",
    "Break down prompts by visual language, composition, color, design style, scene elements, people, lighting and ratio.":"按视觉语言、构图、色彩、设计风格、场景元素、人物、光影和画幅比例拆解 Prompt。",
    "Generate random combinations for fast style-direction testing.":"一键随机生成灵感组合，适合快速测试风格方向。",
    "Includes terrain, planting, water, paving, site furniture and other landscape categories.":"内置地形、植物、水景、铺装、小品等景观分类。",
    "The right panel combines a full prompt that can be copied directly to MidJourney.":"右侧自动组合完整指令，可直接复制到 MidJourney。",
    "Break style, composition, color and elements into clear cards for step-by-step prompt building.":"将风格、构图、色彩和元素拆成清晰卡片，便于按创作需求逐步组合 Prompt。",
    "Flat illustration, watercolor, pen linework, Chinese ink, collage and 3D-model aesthetics.":"扁平插画、水彩、钢笔线稿、中式水墨、拼贴和 3D 建模感。",
    "Isometric, aerial, top view, eye-level, section, low-angle and other visual angles.":"轴测、鸟瞰、顶视、平视、剖面、仰视等图面角度。",
    "Morandi, vintage, minimalist, Mediterranean, macaron, cyberpunk and other palettes.":"莫兰迪、复古、极简、地中海、马卡龙、赛博朋克等配色。",
    "Terrain, planting, water features, paving paths and site furniture, with multi-select combinations.":"地形、植物、水景、铺装路径、景观小品，多选组合。",
    "Baroque, neoclassical, modernist, postmodern, deconstructivist and other architectural styles.":"巴洛克、新古典、现代主义、后现代、解构主义等建筑风格。",
    "Daily activities, social interaction, children’s play, sports, leisure and site experience.":"日常活动、社交互动、儿童活动、运动、休闲和场地体验。",
    "Golden hour, blue hour, overcast soft light and other atmosphere keywords.":"黄金时段、蓝调时刻、阴天柔光等氛围关键词。",
    "16:9, 3:4, 9:16 and 1:1 ratios for portfolios, Xiaohongshu and presentation visuals.":"16:9、3:4、9:16、1:1，适配作品集、小红书和展示图。",
    "Browse generated results in different visual styles. Open a card to view the full prompt and copy it to MidJourney for testing.":"查看不同图面风格的生成效果，点开卡片即可看到完整提示词，并一键复制到 MidJourney 继续测试。",
    "Keep a clear tool path from style selection to final prompt output.":"从风格选择到最终 Prompt 输出，保持清晰的工具路径。",
    "Choose visual style, composition angle and color direction.":"选择图面风格、构图角度和色彩方向。",
    "Add architecture, landscape, human activity and atmosphere keywords.":"叠加建筑、景观、人物活动和氛围关键词。",
    "Automatically combine a full English prompt on the right.":"右侧自动组合成完整英文提示词。",
    "Copy it to MidJourney and continue adjusting style and aspect ratio.":"复制到 MidJourney 后继续调整风格和画幅。",
    "A collection of playable visual interaction experiments, including gesture recognition, landscape growth, generative graphics and web interactions, so ideas do not stay only on static pages.":"这里收录可直接体验的视觉交互实验，涵盖手势识别、景观生长、生成式图形与网页互动，让灵感不只停留在静态页面。",
    "Upload a landscape image and trigger grass, flower borders, wetlands and ecological restoration patches through clicks or gestures.":"上传景观图，用点击或手势触发草地、花境、湿地和生态修复的生长效果。",
    "More than static display: users can enter web experiments and experience image changes triggered by interaction.":"不只是静态展示，用户可以直接进入网页实验，体验画面被交互触发的变化。",
    "Designed for gesture recognition, generative graphics, web projects and installation-like interaction cases.":"适合呈现手势识别、生成式图形、网页作品和装置感互动案例。",
    "Visual interaction experiments are presented as separate entrances. Click a card to enter the experience while keeping the Interaction page light and clear.":"视觉交互实验以独立入口呈现，点击卡片即可进入对应体验，保持 Interaction 首页轻量清晰。",
    "After uploading a landscape image, click or enable gestures to grow grass, flower borders, wetlands and ecological restoration patches on the image.":"上传景观图后，可通过点击或开启手势，让草地、花境、湿地与生态修复斑块在图面中生长。",
    "Gesture recognition":"手势识别",
    "Landscape growth":"景观生长",
    "Interaction experiment":"互动实验",
    "Canvas":"画布",
    "Open experience":"打开体验",
    "Allow camera access when prompted by the browser for gesture interaction.":"进入体验时，请根据浏览器提示允许摄像头权限",
    "Plant Color Calendar":"植物色彩年历",
    "Explore representative plant colors across 52 weeks, including bloom, leaf color, fruit and seasonal landscape states, then copy palette references.":"以 52 周为线索，浏览四季植物在花期、叶色、果实与景观状态中的代表色，并复制配色参考。",
    "Plant colors":"植物色彩",
    "Seasonal rhythm":"四季节奏",
    "Palette reference":"配色参考",
    "Landscape inspiration":"景观灵感",
    "Open tool":"打开工具",
    "Useful as planting, garden and landscape palette inspiration.":"适合作为花境、庭院与景观配色灵感参考",
    "Plant Mood Radar":"植物情绪雷达图",
    "Choose from 84 landscape plants and observe how combinations lean toward calm, energy, nature, romance, wildness or urban mood.":"从 84 种景观植物中选择组合，观察它们在宁静、活力、自然、浪漫、野趣与都市感之间形成的空间情绪倾向。",
    "Plant combination":"植物组合",
    "Mood radar":"情绪雷达",
    "Landscape mood":"景观气质",
    "Design inspiration":"设计灵感",
    "Results are for design inspiration only, not botanical assessment.":"结果仅作设计灵感参考，不作为严谨植物学评估",
    "Seasonal Color Simulation":"季相色彩模拟",
    "Seasonal Color Timeline":"季相色谱",
    "Brush planting zones on the canvas, switch seasons and drag the timeline to observe planting colors from early growth to maturity.":"在画布上刷出种植分区，切换春夏秋冬并拖动时间轴，观察植物配置从初栽到成境的色彩变化。",
    "Seasonal simulation":"季相推演",
    "Planting design":"种植设计",
    "Seasonal palette":"四季色谱",
    "Useful for color simulation in flower borders, gardens and planting schemes.":"适合作为花境、庭院与种植配置的色彩推演参考",
    "Upload a CSV or paste table data to generate a radial data bloom map, with focus view and PNG export.":"上传 CSV 或粘贴表格数据，自动生成径向数据花园图谱，并支持专注看图与导出 PNG。",
    "Data visualization":"数据可视化",
    "CSV upload":"CSV 上传",
    "PNG export":"导出 PNG",
    "Focus view":"专注看图",
    "Useful for infographics, presentations and data-visual experiment tools.":"适合作为信息图、汇报展示与数据视觉实验工具",
    "Bubble Timeline Chart":"气泡时间轴图",
    "Upload a CSV or use the built-in dataset to turn year, region, value and category fields into an interactive bubble timeline for trends, distribution and key projects.":"上传 CSV 或使用内置数据集，把年份、地区、数值和分类转化为可交互气泡时间轴，适合观察趋势、分布和重点项目。",
    "Timeline":"时间轴",
    "Bubble chart":"气泡图",
    "Useful for informational data displays, news graphics and interactive chart references.":"适合作为信息型数据展示、新闻图表与交互图表参考",
    "Fill in your information once, switch between templates, polish experience with AI, generate summaries, translate resume content and export a PDF in one click.":"填写一次信息，切换多套模板，使用 AI 优化经历、生成简介、翻译简历，并一键导出 PDF。",
    "Upload an old resume image or file. When recognition is available, it can extract content into the resume form. Supports common formats such as JPEG, JPG, PNG, Word and PDF.":"可上传旧简历图片或文件，识别功能开放后会自动提取内容并填入简历表单。支持 JPEG / JPG / PNG / Word / PDF 等常见格式。",
    "Recognition is being prepared. You can select a file first.":"识别功能准备中，可先选择文件。",
    "Multiple resume layouts for different roles and application scenarios.":"多种简历排版风格，适合不同岗位和求职场景。",
    "Polish work experience, project experience, awards and personal summaries.":"优化工作经历、项目经历、获奖经历和个人简介。",
    "Keep page preview and PDF export consistent to reduce manual formatting.":"页面预览与 PDF 导出保持一致，减少手动排版。",
    "Adjust resume focus and wording based on job requirements.":"可根据岗位要求优化简历重点和表达方式。",
    "Preview real finished resume examples to compare styles and layout differences quickly.":"使用真实简历成品图展示模板，快速预览不同风格与版式差异。",
    "Clear and stable, suitable for general job applications.":"清晰稳重，适合通用求职。",
    "Clear information hierarchy for design resumes.":"信息层级明确，适合设计类简历。",
    "More white space for a refined minimal style.":"留白更多，适合高级简洁风。",
    "A light business feel for content, operations and product roles.":"轻商务感，适合内容运营和产品岗位。",
    "More memorable, suitable for personal-brand expression.":"更有记忆点，适合个人品牌表达。",
    "Formal and professional for corporate applications.":"正式专业，适合企业岗位投递。",
    "Highlighted header information for title-led resumes.":"顶部信息突出，适合强标题型简历。",
    "High information density for compact one-page resumes.":"信息密度高，适合一页压缩。",
    "Editorial layout feel for visual and content roles.":"杂志排版感，适合视觉和内容岗位。",
    "Two-column linear layout for mature professional expression.":"双栏线性排版，适合成熟专业表达。",
    "Profile sidebar with experience content, stable and clean.":"头像信息栏搭配正文经历，稳重简洁。",
    "Business two-column layout highlighting core experience and personal information.":"商务双栏，突出主经历与个人信息。",
    "Complete resume creation through clear steps: fill in information, choose a template, polish and export.":"从填写信息、选择模板到优化与导出，按清晰步骤完成简历制作。",
    "Fill in basic information, education, work experience and project experience once.":"填写一次基本信息、教育经历、工作经历和项目经历。",
    "Switch templates to preview different job-application styles quickly.":"切换不同模板，快速预览不同求职风格。",
    "Use 3 free AI polish attempts per day to simplify wording and highlight results.":"每天免费 3 次 AI 优化，帮助你精简表达和突出结果。",
    "Export a PDF after confirming the layout for applications or further editing.":"确认排版后导出 PDF，用于投递或继续修改。",
    "Prompt Generator":"Prompt 工具",
    "Landscape Growth Interaction":"景观生长交互",
    // assets page
    'Assets Library.':'素材库','All Assets':'全部素材','Design Assets':'设计素材',
    '集中浏览 BaoLong Lab 的设计素材商品。这里对应导航栏 Assets 下拉框的 6 个分类，可按 Module、People、Plant、Animal、Textures 和 Free 快速筛选。':'集中浏览 BaoLong Lab 的设计素材商品。这里对应导航栏素材库下拉框的 6 个分类，可按模块、人物、植物、动物、纹理和免费素材快速筛选。',
    '集中浏览 BaoLong Lab 的设计素材商品，可按导航栏下拉分类继续筛选。':'集中浏览 BaoLong Lab 的设计素材商品，可按导航栏下拉分类继续筛选。',
    // prompt page
    'Landscape & Architecture Prompt Builder.':'建筑景观 Prompt 工具','Prompt Categories':'Prompt 分类','Prompt Inspiration':'Prompt 灵感','How It Works':'使用流程','✦ Based on your prompt system':'✦ 基于你的 Prompt 系统',
    '把图面风格、构图角度、色彩、建筑要素、景观要素、人物活动和画幅比例组合成可复制的 MidJourney 指令。':'把图面风格、构图角度、色彩、建筑要素、景观要素、人物活动和画幅比例组合成可复制的 MidJourney 指令。',
    '将风格、构图、色彩和元素拆成清晰卡片，便于按创作需求逐步组合 Prompt。':'将风格、构图、色彩和元素拆成清晰卡片，便于按创作需求逐步组合 Prompt。',
    '查看不同图面风格的生成效果，点开卡片即可看到完整提示词，并一键复制到 MidJourney 继续测试。':'查看不同图面风格的生成效果，点开卡片即可看到完整提示词，并一键复制到 MidJourney 继续测试。',
    '从风格选择到最终 Prompt 输出，保持清晰的工具路径。':'从风格选择到最终 Prompt 输出，保持清晰的工具路径。',
    'Structured Prompt':'结构化 Prompt','Random Inspiration':'随机灵感','Landscape Elements':'景观元素','Copy-ready Output':'可复制输出',
    'Choose Style':'选择风格','Add Elements':'添加元素','Generate Prompt':'生成 Prompt','Copy & Test':'复制测试',
    '选择图面风格、构图角度和色彩方向。':'选择图面风格、构图角度和色彩方向。','叠加建筑、景观、人物活动和氛围关键词。':'叠加建筑、景观、人物活动和氛围关键词。','右侧自动组合成完整英文提示词。':'右侧自动组合成完整英文提示词。','复制到 MidJourney 后继续调整风格和画幅。':'复制到 MidJourney 后继续调整风格和画幅。',

    'Visual Style':'视觉风格','Composition Angle':'构图角度','Color Palette':'色彩方案','Architecture Elements':'建筑元素','People Activities':'人物活动','Light & Mood':'光影氛围','Aspect Ratio':'画幅比例','Upload Existing Resume':'上传已有简历',
    'Design Assets Creator Bundle.':'设计素材与创作工具集合','Editable Resume Templates.':'可编辑简历模板','Architectural Prompt Builder.':'建筑景观 Prompt 工具','Assets Library.':'素材库',
    // interaction page
    'Interactive Tools & Creative Experiments.':'交互实验室与创意工具','Gesture Landscape Growth':'手势景观生长','Playable Visual Experience':'可体验视觉互动','Playable Visual Demo':'可体验视觉工具','Creative Interaction Lab':'创意交互实验室','Landscape Growth Demo':'景观生长交互','Interactive Lab':'交互实验室','Gesture Interaction':'手势交互',
    '这里整理可直接体验的视觉交互工具，例如手势识别、景观生长、生成式图形和网页互动实验。':'这里整理可直接体验的视觉交互工具，例如手势识别、景观生长、生成式图形和网页互动实验。',

    'Data Bloom Generator':'数据花园生成器','Upload CSV or paste table data to generate a radial data bloom map, then focus the view and export it as PNG.':'上传 CSV 或粘贴表格数据，自动生成径向数据花园图谱，并支持专注看图与导出 PNG。','Data Visualization':'数据可视化','CSV Upload':'CSV 上传','PNG Export':'导出 PNG','Focus View':'专注看图','Designed for expressive infographic experiments and presentation-ready visual maps.':'适合作为信息图、汇报展示与数据视觉实验工具',
    // resume page
    'Editable Resume Templates + AI Polish.':'可编辑简历模板 + AI 优化','12 Templates':'12 套模板','AI Polish':'AI 优化','One-page Export':'一页导出','JD Match':'岗位匹配','Fill Once':'填写一次','Choose Template':'选择模板','Export PDF':'导出 PDF','✦ Free AI Uses Today: 3 / 3':'✦ 今日免费 AI 次数：3 / 3',
    '填写一次信息，切换多套模板，使用 AI 优化经历、生成简介、翻译简历，并一键导出 PDF。':'填写一次信息，切换多套模板，使用 AI 优化经历、生成简介、翻译简历，并一键导出 PDF。',
    '可上传旧简历图片或文件，识别功能开放后会自动提取内容并填入简历表单。支持 JPEG / JPG / PNG / Word / PDF 等常见格式。':'可上传旧简历图片或文件，识别功能开放后会自动提取内容并填入简历表单。支持 JPEG / JPG / PNG / Word / PDF 等常见格式。',
    '使用真实简历成品图展示模板，快速预览不同风格与版式差异。':'使用真实简历成品图展示模板，快速预览不同风格与版式差异。',
    '从填写信息、选择模板到优化与导出，按清晰步骤完成简历制作。':'从填写信息、选择模板到优化与导出，按清晰步骤完成简历制作。',
    // inspiration board pages
    'Plan Inspiration Board':'平面灵感板','Section Inspiration Board':'剖面灵感板','Other Inspiration Board':'综合灵感板','Color Inspiration Board':'色彩灵感板','Inspiration':'灵感参考',
    '平面图灵感索引：用于收集总平面、景观平面、城市更新图面、场地策略和作品集板式参考。':'平面图灵感索引：用于收集总平面、景观平面、城市更新图面、场地策略和作品集板式参考。',
    '剖面图灵感索引：用于收集建筑剖面、剖透视、爆炸轴测、结构关系与作品集板式参考。':'剖面图灵感索引：用于收集建筑剖面、剖透视、爆炸轴测、结构关系与作品集板式参考。',
    '综合灵感索引：用于收集建筑渲染、轴测、拼贴、展板、概念图、分析图等视觉参考。':'综合灵感索引：用于收集建筑渲染、轴测、拼贴、展板、概念图、分析图等视觉参考。',
    '配色灵感索引：用于整理低饱和色彩、主辅色关系、图面氛围和高级感视觉搭配。':'配色灵感索引：用于整理低饱和色彩、主辅色关系、图面氛围和高级感视觉搭配。',
    // footers
    'BaoLong Lab · Prompt Generator':'BaoLong Lab · Prompt 工具','BaoLong Lab · Resume Templates':'BaoLong Lab · 简历模板','BaoLong Lab · Plan Inspiration Board':'BaoLong Lab · 平面灵感板','BaoLong Lab · Section Inspiration Board':'BaoLong Lab · 剖面灵感板','BaoLong Lab · Other Inspiration Board':'BaoLong Lab · 综合灵感板','BaoLong Lab · Color Inspiration Board':'BaoLong Lab · 色彩灵感板','BaoLong Lab · Inspiration Board':'BaoLong Lab · 灵感板',
    '© 2026 BaoLong Lab. All rights reserved. All design assets, templates and visual materials are original works by BaoLong Lab.':'© 2026 BaoLong Lab. 保留所有权利。BaoLong Lab 原创内容与工具版权归 BaoLong Lab 所有。灵感板块内容仅作学习参考与来源索引，版权归原作者所有；如涉及版权问题，请联系删除。',
    '© 2026 BaoLong Lab. All rights reserved.':'© 2026 BaoLong Lab. 保留所有权利。',
    'Original content and tools by BaoLong Lab.':'BaoLong Lab 原创内容与工具版权归 BaoLong Lab 所有。',
    'Inspiration references are for study and source indexing only; rights belong to their respective creators. Contact us for removal if needed.':'灵感板块内容仅作学习参考与来源索引，版权归原作者所有；如涉及版权问题，请联系删除。'
  };
  // v258: allow a page to register its own copy without bloating the shared map.
  if(window.BAOLONG_PAGE_ZH_MAP && typeof window.BAOLONG_PAGE_ZH_MAP==='object'){
    Object.assign(zhMap, window.BAOLONG_PAGE_ZH_MAP);
  }
  var titleMap={
    'BaoLong Lab | Design Assets Library':'BaoLong Lab | 设计素材与创作工具集合','Assets | BaoLong Lab':'素材库 | BaoLong Lab','Prompt Generator | BaoLong Lab':'Prompt 工具 | BaoLong Lab','Interaction | BaoLong Lab':'交互实验室 | BaoLong Lab','Resume Templates | BaoLong Lab':'简历模板 | BaoLong Lab','Plan Board | BaoLong Lab':'平面灵感板 | BaoLong Lab','Section Board | BaoLong Lab':'剖面灵感板 | BaoLong Lab','Other Board | BaoLong Lab':'综合灵感板 | BaoLong Lab','Color Board | BaoLong Lab':'色彩灵感板 | BaoLong Lab','Prompt Builder · BaoLong Lab':'Prompt Builder · BaoLong Lab','Resume Studio｜设计感简历生成器':'Resume Studio｜设计感简历生成器','Data Bloom Generator | BaoLong Lab':'数据花园生成器 | BaoLong Lab','数据花园生成器 | BaoLong Lab':'数据花园生成器 | BaoLong Lab'
  };
  if(window.BAOLONG_PAGE_TITLE_MAP && typeof window.BAOLONG_PAGE_TITLE_MAP==='object'){
    Object.assign(titleMap, window.BAOLONG_PAGE_TITLE_MAP);
  }

  function getLang(){return localStorage.getItem('baolongLanguage') || 'zh';}
  function setLang(lang){localStorage.setItem('baolongLanguage',lang);applyLanguage(lang);}
  function shouldSkip(el){return !!(el.closest('.pin') || el.closest('.product-card') || el.closest('.product-modal') || el.closest('.prompt-case-card') || el.closest('.prompt-modal') || el.closest('.resume-sheet') || el.closest('.template-card') || el.closest('.template-preview'));}
  function normalizeText(t){return (t||'').replace(/\s+/g,' ').trim();}
  function collectTargets(){
    var selectors=[
      '[data-bl-original-text]','.site-header .nav a','.dropdown-content a','.mobile-menu-panel a','.mobile-menu-group','.mobile-menu-toggle','.header-actions .pill-btn',
      '.hero h1','.hero p','.copy .eyebrow','.copy h1','.copy p','.section-title','.section-title-main','.section-desc','.eyebrow','.tabs .tab',
      '.primary-btn','.secondary-btn','.hero-product-copy p','.category-feature-copy h3','.category-feature-copy p','.category-feature-tags span','.category-feature-link','.tool-band h2','.tool-band p','.tool-card h3','.tool-card p','.notes-header h2','.notes-header p','.note-visual h3','.note-visual p','.note-content h3','.note-content p','.note-link','.cta h2','.cta p','.asset-filter-tabs .tab','.feature strong','.feature span','.step h3','.step p','.tagline','.ai-badge','.card h3','.card p','.mock-card h3','.mock-card p','.interaction-case-type','.interaction-case-body h3','.interaction-case-body > p','.case-tags span','.case-link','.case-note','.footer p','.footer','footer','.footer-line'
    ];
    return Array.prototype.slice.call(document.querySelectorAll(selectors.join(','))).filter(function(el){
      if(shouldSkip(el) || el.classList.contains('legal-footer')) return false;
      // Preserve nested links (especially footer legal/contact links). Translating a parent with
      // textContent would remove its <a href> children and make the links unclickable.
      if(el.querySelector && el.querySelector('a')) return false;
      return true;
    });
  }
  function applyLanguage(lang){
    document.documentElement.setAttribute('lang',lang==='zh'?'zh-CN':'en');
    document.documentElement.setAttribute('data-bl-lang',lang==='en'?'en':'zh');
    document.documentElement.classList.remove('bl-lang-applied');
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
    document.documentElement.classList.add('bl-lang-applied');
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
  document.addEventListener('click',function(e){var panel=document.getElementById('mobileMenuPanel'); if(panel && panel.contains(e.target)) return; if(!e.target.closest('.site-header'))closeMobileMenu();});
  window.setBaoLongLanguage=setLang;
  window.getBaoLongLanguage=getLang;
})();

// v124 mobile menu final fix: move panel to body and lock page scroll while the panel scrolls
(function(){
  var savedScrollY=0;

  function getPanel(){
    return document.getElementById('mobileMenuPanel');
  }

  function placePanel(){
    var panel=getPanel();
    if(panel && panel.parentElement!==document.body){
      document.body.appendChild(panel);
    }
    return panel;
  }

  function lockPage(){
    savedScrollY=window.scrollY || window.pageYOffset || 0;
    document.body.classList.add('bl-menu-open');
    document.body.style.position='fixed';
    document.body.style.top='-' + savedScrollY + 'px';
    document.body.style.left='0';
    document.body.style.right='0';
    document.body.style.width='100%';
  }

  function unlockPage(){
    document.body.classList.remove('bl-menu-open');
    document.body.style.position='';
    document.body.style.top='';
    document.body.style.left='';
    document.body.style.right='';
    document.body.style.width='';
    window.scrollTo(0, savedScrollY || 0);
  }

  window.toggleMobileMenu=function(){
    var panel=placePanel();
    if(!panel) return;
    var willOpen=!panel.classList.contains('open');
    if(willOpen){
      panel.classList.add('open');
      panel.scrollTop=0;
      lockPage();
    }else{
      panel.classList.remove('open');
      unlockPage();
    }
  };

  window.closeMobileMenu=function(){
    var panel=getPanel();
    if(panel && panel.classList.contains('open')){
      panel.classList.remove('open');
      unlockPage();
    }
  };

  document.addEventListener('DOMContentLoaded',function(){
    placePanel();
    var panel=getPanel();
    if(panel){
      panel.addEventListener('wheel',function(e){ e.stopPropagation(); },{passive:true});
      panel.addEventListener('touchmove',function(e){ e.stopPropagation(); },{passive:true});
    }
  });

  document.addEventListener('click',function(e){
    var panel=getPanel();
    var toggle=document.querySelector('.mobile-menu-toggle');
    if(!panel || !panel.classList.contains('open')) return;
    if(panel.contains(e.target) || (toggle && toggle.contains(e.target))) return;
    window.closeMobileMenu();
  });

  window.addEventListener('resize',function(){
    if(window.innerWidth>980){
      window.closeMobileMenu();
    }
  });
})();
