
    function navFilter(category){
      location.href = 'assets.html?filter=' + encodeURIComponent(category) + '#products';
      return false;
    }

    const promptCases = {
  "case01": {
    "id": "case01",
    "img": "images/prompt-cases/prompt-case-01.webp",
    "kicker": "Collage Landscape",
    "title": "马卡龙拼贴景观场景",
    "scene": "适用：作品集封面 / 景观场景 / 小红书展示",
    "tags": [
      "拼贴感",
      "马卡龙色",
      "景观场景"
    ],
    "prompt": "collage-style composition, cut-out fragments from different images, layered and overlapping elements, mixed-scale objects, fragmented visual arrangement, flat spatial layout, heterogeneous imagery sources, assembled scene, stage-like composition, visual storytelling collage, eye-level perspective, Macaron color palette, pastel lavender 50%, mint green 25%, creamy white 15%, pastel pink accent 10%, sweet pastel atmosphere, modernist architecture style, minimalist buildings, clean lines, functional design, glass and steel structures, open floor plans, simple geometric forms, flat ground, terraces, slopes, lush trees, flowering shrubs, grass lawn, flower beds, cascading waterfall, natural pond, timber decking, public seating, design lighting, people sitting and chatting, children exploring the playground, people picnicking on the grass, overcast day, soft diffused lighting, clear site organization, readable spatial hierarchy, balanced composition, professional landscape architecture presentation, --ar 3:4 --raw --stylize 750 --v 6"
  },
  "case02": {
    "id": "case02",
    "img": "images/prompt-cases/prompt-case-02.webp",
    "kicker": "Watercolor Scene",
    "title": "莫兰迪水彩景观场景",
    "scene": "适用：柔和效果图 / 概念表达 / 作品集图面",
    "tags": [
      "水彩",
      "莫兰迪",
      "柔和纸感"
    ],
    "prompt": "hand-painted watercolor illustration, soft pigment diffusion, wet-on-wet technique, transparent watercolor washes, bleeding edges, delicate brush strokes, textured watercolor paper, fluid pigment flow, eye-level perspective, Morandi color palette, dusty blue 55%, sand beige 25%, soft warm gray 10%, muted rose pink 10%, low saturation colors, calm elegant atmosphere, modernist architecture style, minimalist buildings, clean lines, functional design, glass and steel structures, open floor plans, simple geometric forms, flat ground, terraces, slopes, lush trees, flowering shrubs, grass lawn, flower beds, cascading waterfall, natural pond, timber decking, public seating, design lighting, people sitting and chatting, children exploring the playground, people picnicking on the grass, overcast day, soft diffused lighting, clear site organization, readable spatial hierarchy, balanced composition, professional landscape architecture presentation, --ar 3:4 --raw --stylize 750 --v 6"
  },
  "case03": {
    "id": "case03",
    "img": "images/prompt-cases/prompt-case-03.webp",
    "kicker": "Plan Collage",
    "title": "极简拼贴总平表达",
    "scene": "适用：总平面表达 / 竞赛图面 / 策略分析",
    "tags": [
      "总平面",
      "极简色",
      "拼贴分析"
    ],
    "prompt": "collage-style composition, cut-out fragments from different images, layered and overlapping elements, mixed-scale objects, fragmented visual arrangement, flat spatial layout, heterogeneous imagery sources, assembled scene, stage-like composition, visual storytelling collage, isometric view, Minimalist color palette, pale beige 50%, pure white 25%, deep gray 15%, muted rust accent 10%, minimal architectural palette, postmodern architecture style, playful forms, bold colors, historical references, decorative elements mixed with modern structures, ironic and expressive architectural design, flat ground, terraces, slopes, lush trees, flower beds, groundcover, reflecting pool, fountain spray, stone paving, permeable concrete, design lighting, people interacting in the plaza, people observing the surroundings, people watching performances, overcast day, soft diffused lighting, clear site organization, readable spatial hierarchy, balanced composition, professional landscape architecture presentation, --ar 3:4 --raw --stylize 750 --v 6"
  },
  "case04": {
    "id": "case04",
    "img": "images/prompt-cases/prompt-case-04.webp",
    "kicker": "Watercolor Cover",
    "title": "粉彩水彩空间封面",
    "scene": "适用：封面图 / 活动场景 / 氛围表达",
    "tags": [
      "粉彩",
      "水彩质感",
      "活动场景"
    ],
    "prompt": "watercolor texture, soft edges, eye-level perspective, Macaron color palette, pastel pink 50%, pastel lavender 25%, baby blue 15%, butter yellow accent 10%, playful macaron palette, postmodern architecture style, playful forms, bold colors, historical references, decorative elements mixed with modern structures, ironic and expressive architectural design, terraces, lush trees, flowering shrubs, hedges, pond, fountain, people gathering together, people having conversations, people sharing moments, people taking photos, people painting outdoors, people watching performances, people talking with friends, people sitting and chatting, people resting on benches, for real landscape design, realistic site layout, public space use, avoid cartoon fantasy style, not a game scene, clear site organization, readable spatial hierarchy, balanced composition, professional landscape architecture presentation, rough surface, no strong highlights, grain paper, sketch rendering , --no AI, digital look, watermark, text --ar 3:4 --raw --stylize 750 --v 6"
  },
  "case05": {
    "id": "case05",
    "img": "images/prompt-cases/prompt-case-05.webp",
    "kicker": "Pastel Urban Renewal",
    "title": "淡彩城市更新公共建筑",
    "scene": "适用：城市更新 / 竞赛表现 / 公共建筑",
    "tags": [
      "城市更新",
      "淡彩竞赛",
      "新旧融合"
    ],
    "prompt": "生成一张淡彩建筑竞赛风格的城市更新公共建筑表现图。建筑由历史建筑与现代新建体块组成，整体为低层横向展开的复合建筑群，中部有略高的方形塔楼，两侧为连续低矮体块，屋顶设置玻璃温室、露台花园和种植平台。现代部分采用浅米白、奶油白、暖灰白立面，带细腻竖向线性肌理、大面积玻璃、淡绿色金属构架和轻盈栏杆。局部保留老建筑坡屋顶、古典立面和历史街区背景，体现城市更新与新旧融合。\n\n画面为正面偏轻微透视的街景视角，前景是开阔浅色城市广场，有树木、花境、长椅、少量行人和街道家具。背景城市建筑弱化为浅灰色远景，天空浅蓝灰，带柔和白云和飞鸟。整体风格为欧洲建筑竞赛效果图、手绘线稿、水彩拼贴、低饱和淡彩、纸张肌理、柔和日光，氛围安静、明亮、轻盈、精致。"
  },
  "case06": {
    "id": "case06",
    "img": "images/prompt-cases/prompt-case-06.webp",
    "kicker": "Pastel Architecture",
    "title": "淡彩建筑插画渲染",
    "scene": "适用：建筑底图优化 / 淡彩渲染 / 作品集",
    "tags": [
      "淡彩插画",
      "建筑底图",
      "纸张肌理"
    ],
    "prompt": "基于上传的建筑底图进行风格化渲染，严格保留原图的建筑结构、体块关系、透视角度、构图、比例关系和空间布局，不要重新设计建筑，不要改变原始视角，只对画面进行表现风格优化。\n\n整体风格为淡彩建筑插画 / 建筑竞赛图风格 / 手绘建筑表现图。\n画面呈现柔和、安静、低饱和、轻盈、克制的视觉效果，具有精致的建筑线稿感与淡淡的纸张肌理。色彩以浅木色、米白色、暖灰白、雾蓝灰、浅灰绿、淡粉米色为主，整体明亮通透，不厚重，不艳丽。\n\n保留清晰细腻的线条表达，建筑主体可采用轻柔的浅色铺陈与薄透的淡彩渲染，局部加入克制的明暗层次与轻微阴影，使画面更完整但仍保持轻盈。景观与背景采用水彩植物拼贴感的表现方式，树木、灌木、草丛和地被以柔和的蓝灰色、浅灰绿色、淡粉灰色轻轻点染，具有雾感、诗意和空气感。\n\n整体氛围应像一张高质量的建筑作品集插画、轴测/透视建筑分析图、建筑学院竞赛展板效果图：\n安静、温柔、极简、雅致、富有设计感。\n重点是：保留原图内容，只提升为统一的淡彩建筑表现风格。"
  },
  "case07": {
    "id": "case07",
    "img": "images/prompt-cases/prompt-case-07.webp",
    "kicker": "Soft Green Rendering",
    "title": "浅绿手绘建筑表现",
    "scene": "适用：建筑风格化 / 手绘淡彩 / 景观氛围",
    "tags": [
      "浅灰绿",
      "手绘感",
      "低饱和"
    ],
    "prompt": "基于上传的建筑图进行风格化渲染，严格保留原图的建筑结构、空间关系、透视角度、构图、比例关系和设计内容，不要重新设计建筑，不要改变原始体块与结构逻辑，只对整体画面表现风格进行优化。\n\n将画面转换为一种柔和、低饱和、手绘感的建筑插画风格。整体呈现淡彩建筑表现图、建筑竞赛插画、轻盈线稿渲染的视觉效果，具有克制、安静、自然、富有生活气息的氛围。\n\n色彩以浅灰绿、雾绿色、浅米白、暖灰白、浅卡其色、淡木色、浅橙棕色为主，整体明亮通透，不过分艳丽。植物采用疏松轻盈的手绘笔触，树冠表现为柔和的浅绿色与灰绿色层次，树干带有淡淡的暖橙棕色，地被和草地以低对比度的细腻纹理表现。天空和背景保持浅灰白、淡灰绿色调，具有安静柔和的空气感。\n\n线条应清晰但不过重，保留建筑图本身的结构可读性，同时加入细腻的淡彩铺陈、轻微纸张肌理和柔和阴影。整体画面像一张高质量的建筑作品集插画、建筑学院竞赛图、手绘淡彩效果图，氛围温柔、自然、松弛、克制、精致。\n\n可以适度加入少量人物、植物和环境氛围作为点景，但都需要保持简洁、轻描淡写、不喧宾夺主。\n重点是：保留用户原图本身，只将其转化为统一的淡彩手绘建筑表现风格。\n\nNegative Prompt\n\n不要改变建筑结构，不要改变透视角度，不要改变构图，不要改变空间关系，不要重新设计建筑，不要超写实摄影，不要商业地产效果图，不要高饱和，不要强烈对比，不要厚重阴影，不要夜景，不要赛博朋克，不要复杂杂乱背景，不要过度写实植物，不要夸张人物，不要文字，不要水印，不要 logo。"
  },
  "case08": {
    "id": "case08",
    "img": "images/prompt-cases/prompt-case-08.webp",
    "kicker": "Paper Collage",
    "title": "手工纸质拼贴建筑",
    "scene": "适用：拼贴风格 / 纸质肌理 / 建筑表达",
    "tags": [
      "纸质拼贴",
      "手工感",
      "低饱和"
    ],
    "prompt": "基于上传的建筑图进行风格化渲染，严格保留原图的建筑结构、体块关系、空间布局、透视角度、构图比例、剖切关系和设计内容，不要重新设计建筑，不要改变原始建筑原型，只对整体表现风格进行优化。\n\n将画面转换为强烈的手工拼贴建筑插画风格。整体效果应具有明显的纸张拼贴感、剪贴感、拼接感和手工制作感：画面由不同材质、不同颜色、不同纹理的纸片层层叠加组成，边缘可带有轻微撕纸痕迹、不规则切边、拼贴接缝和纸张重叠关系。不要只是普通上色，要让画面明确看起来像由纸片、纹理纸、旧纸、半透明纸和彩色剪纸拼贴而成。\n\n色彩以低饱和暖中性色和自然色系为主，例如米白、奶油色、浅褐色、暖灰、陶土粉、橄榄绿、鼠尾草绿、灰绿色、浅木色、褐棕色。整体氛围温暖、安静、柔和、复古、自然，具有生活感和艺术感。\n\n建筑主体保持原图可读性，线条清晰但不过重。建筑表面、地面、天空、植物、室内家具或环境元素，都可采用不同纹理纸进行拼贴表达：\n\n墙面可表现为粗糙纤维纸、旧纸、暖色手工纸\n植物可表现为剪纸叶片、拼贴树冠、半透明纸叠层\n地面与土壤可表现为深浅不同的纸片拼接\n背景可使用浅色纸张铺底，带轻微纹理与层次\n局部可加入轻微手绘线条、铅笔线稿、水彩晕染或印刷颗粒感，增强艺术拼贴气质\n\n整体效果应像一张建筑作品集中的艺术拼贴效果图，具有明显的手工感、材料感和层次感，而不是普通写实渲染图。\n重点是：保留用户原图建筑，只把它转化为强拼贴感、手工纸质感、低饱和艺术化的建筑拼贴表现图。\n\nNegative Prompt\n\n不要改变建筑结构，不要重新设计建筑，不要改变透视角度，不要改变构图，不要变成普通写实效果图，不要变成商业地产渲染图，不要只是简单上色，不要高饱和，不要强烈对比，不要过度光影，不要赛博朋克，不要夜景，不要厚重写实材质，不要复杂杂乱背景，不要过多人物，不要过度精细照片感，不要文字，不要水印，不要 logo。"
  },
  "case09": {
    "id": "case09",
    "img": "images/prompt-cases/prompt-case-09.webp",
    "kicker": "Pink Section Collage",
    "title": "粉色单色拼贴剖面",
    "scene": "适用：剖面立面 / 单色图面 / 作品集",
    "tags": [
      "粉色单色",
      "剖面表达",
      "纸张拼贴"
    ],
    "prompt": "基于上传的建筑图进行风格化渲染，严格保留原图的建筑结构、空间关系、剖切关系、透视角度、构图比例、图纸信息层级和设计内容，不要重新设计建筑，不要改变原始建筑原型，只对整体画面表现风格进行统一转换。\n\n将画面转化为一种单色系建筑拼贴插画风格，整体以柔和粉红色、玫瑰红、浅粉灰、淡米白、低饱和红棕色为主要色调。画面应具有建筑竞赛图纸、建筑作品集表现图、纸张拼贴插画的质感，整体干净、克制、平面化、艺术化。\n\n保留建筑原有线稿的清晰度，使结构、墙体、楼板、柱子、屋顶、门窗、楼梯、人物尺度和室内空间仍然清楚可读。在线稿基础上加入低饱和粉红色的半透明色块、纸张纹理、轻微折痕、淡淡颗粒感和拼贴层次。不同空间、植物、背景和地面可以用深浅不同的粉色纸片进行区分，但整体保持统一色系，不要变得花哨。\n\n植物和背景采用图形化、剪影化、拼贴化的方式表达：树冠可以是圆润的色块、半透明叠层、柔和纹理纸或颗粒状印刷质感；地形和前景可以用大面积单色色块、轻微纸张纹理和简洁线条处理。背景保持留白感，纸张底纹明显但不脏乱。\n\n整体效果应像一张粉色系建筑剖面/立面竞赛表现图：线条精细，色彩统一，纸感明显，拼贴感轻盈，画面有留白，有设计感，有作品集质感。\n重点是：保留用户原图建筑与图纸关系，只将其转换为粉色单色纸质拼贴建筑表现风格。"
  },
  "case10": {
    "id": "case10",
    "img": "images/prompt-cases/prompt-case-10.webp",
    "kicker": "Blue Line Analysis",
    "title": "蓝线生态建筑分析图",
    "scene": "适用：剖面分析 / 生态图纸 / 竞赛展板",
    "tags": [
      "蓝色线稿",
      "生态分析",
      "清爽图纸"
    ],
    "prompt": "基于上传的建筑图进行风格化渲染，严格保留原图的建筑结构、空间关系、剖切关系、透视角度、构图比例、线稿层级和设计内容，不要重新设计建筑，不要改变原始建筑原型，不要改变建筑体块、楼板、屋顶、柱子、楼梯、门窗和室内空间关系。\n\n将画面转化为一种清爽的建筑分析图 / 建筑竞赛图纸风格。整体以淡奶油黄色、浅米白、柔和暖白作为背景基调，搭配细腻的蓝色线稿作为主要建筑表达，局部使用浅绿色、淡黄绿色、浅灰绿表现植物、景观、室内绿植和生态元素。整体画面干净、明亮、轻盈、克制，具有建筑作品集和竞赛展板的专业感。\n\n保留原图的线稿清晰度，使建筑结构、剖面关系、空间层次和尺度人物仍然清楚可读。建筑线条应精细、理性、轻盈，以蓝色或灰蓝色细线表现；建筑内部可以加入极浅的奶油色、浅黄色或半透明暖白色填充，增强空间层次，但不要厚重渲染。\n\n植物和景观元素使用低饱和浅绿色点缀，表达自然、生态、轻盈的氛围。背景环境可以弱化为浅色线稿或淡淡色块，保持留白感。整体可以带有轻微纸张纹理、淡淡颗粒感和柔和空气感，但不要过度做旧。\n\n画面效果应像一张高质量建筑学院作品集图纸、剖面分析图、生态建筑竞赛表现图：\n清透、理性、温柔、精致，有图纸感，也有轻微插画感。\n重点是：保留用户上传的原始建筑图，只将其转换为淡黄背景、蓝色线稿、浅绿色点缀的清爽建筑分析表现风格。\nNegative Prompt\n\n不要改变建筑结构，不要改变剖切关系，不要改变透视角度，不要改变构图比例，不要重新设计建筑，不要生成完全不同的建筑，不要写实摄影，不要商业地产效果图，不要厚重渲染，不要强烈阴影，不要高饱和，不要深色背景，不要复杂杂乱配色，不要赛博朋克，不要夜景，不要过度写实植物，不要过多人群，不要文字，不要水印，不要 logo，不要破坏原图的图纸可读性。"
  },
  "case11": {
    "id": "case11",
    "img": "images/prompt-cases/prompt-case-11.webp",
    "kicker": "Sage Green Section",
    "title": "浅绿色生态剖面插画",
    "scene": "适用：生态剖面 / 绿色图面 / 平面插画",
    "tags": [
      "浅绿色",
      "生态剖面",
      "平面植物"
    ],
    "prompt": "基于上传的建筑图进行风格化渲染，严格保留原图的建筑结构、剖切关系、空间布局、透视角度、构图比例、图纸信息层级和设计内容，不要重新设计建筑，不要改变原始建筑原型，不要改变建筑体块、屋顶、楼板、柱子、楼梯、门窗、人物尺度和室内空间关系。\n\n将画面转化为一种低饱和浅绿色建筑插画 / 建筑竞赛图纸风格。整体以浅灰绿、鼠尾草绿、橄榄灰绿、淡黄绿、米白色、暖白色为主要色调，画面干净、柔和、平面化、低对比度，具有建筑作品集和竞赛展板的清爽表达感。\n\n保留原图清晰的线稿结构，使建筑剖面、空间层次、结构关系和室内细节依然清楚可读。建筑主体使用深灰绿或橄榄黑色线条强调轮廓，内部空间采用浅米白、淡黄绿、半透明灰绿色块进行轻微填充，避免厚重写实渲染。\n\n植物和背景需要采用平面化色块表达，不要写实。树冠以大面积低饱和灰绿色、橄榄绿、浅鼠尾草绿色块铺陈为主，像图形化剪影、纸片拼贴或半透明色块叠加。边缘可以略带手绘感，但不要出现过多真实叶片细节。植物内部只保留少量白色线稿、浅色纹理线或简单轮廓线，整体保持干净、克制、图形化。\n\n天空和背景可加入淡淡的浅绿色云朵、飞鸟、远景树影或轻微横向纹理，整体保持留白和空气感。人物、家具、植物和小物件可以适度保留，但应以简洁线稿和低饱和色块处理，不要喧宾夺主。\n\n整体效果应像一张建筑学院作品集中的生态建筑剖面表现图、平面化建筑插画、低饱和绿色竞赛图纸：清爽、理性、温柔、自然、轻盈，有图纸感，也有插画感。\n\n重点是：保留用户上传的原始建筑图，只将其转换为浅绿色、低饱和、平面化、图形化的建筑插画表现风格。\n\nNegative Prompt\n\n不要改变建筑结构，不要改变剖切关系，不要改变透视角度，不要改变构图比例，不要重新设计建筑，不要生成完全不同的建筑，不要写实摄影，不要商业地产效果图，不要厚重渲染，不要强烈阴影，不要高饱和，不要深色背景，不要复杂杂乱配色，不要赛博朋克，不要夜景，不要写实树木，不要真实叶片细节，不要复杂树枝，不要水彩写实植物，不要高细节森林背景，不要过多人群，不要文字，不要水印，不要 logo，不要破坏原图的图纸可读性。"
  },
  "case12": {
    "id": "case12",
    "img": "images/prompt-cases/prompt-case-12.webp",
    "kicker": "Blue Grey Collage",
    "title": "蓝灰淡彩拼贴剖面",
    "scene": "适用：蓝灰图面 / 淡彩拼贴 / 建筑剖面",
    "tags": [
      "蓝灰淡彩",
      "半透明",
      "拼贴剖面"
    ],
    "prompt": "基于上传的建筑图进行风格化渲染，严格保留原图的建筑结构、剖切关系、空间布局、透视角度、构图比例、线稿层级和设计内容，不要重新设计建筑，不要改变原始建筑原型，不要改变建筑体块、屋顶、楼板、柱子、楼梯、门窗、人物尺度和室内空间关系。\n\n将画面转化为一种蓝灰淡彩建筑拼贴表现风格。整体以雾蓝色、灰蓝色、浅青灰、淡灰绿、米白色、半透明白色为主要色调，画面清冷、安静、轻盈、低饱和，具有建筑作品集和竞赛展板中的淡彩拼贴质感。\n\n参考目标风格时，只提取其色彩方式、画面浓度、纸张质感、半透明叠层、淡彩背景和氛围表达，不要复制参考图中的具体物体、人物、船只、水面、历史场景或特殊叙事元素。\n\n保留原图清晰的建筑线稿，使剖面关系、结构细节、空间层次和室内内容仍然清楚可读。建筑主体以白色、浅灰色或细腻灰线为主，局部加入半透明蓝灰色块和淡灰绿色块，增强空间层次，但不要厚重渲染。\n\n背景可以使用柔和蓝灰色水彩铺底、半透明纸片叠加、浅色植物剪影、淡淡云雾感、轻微颗粒感和纸张纹理。植物与环境元素应保持轻盈、低饱和、半透明，不要写实，不要过度细节化。整体背景应服务于建筑主体，不要喧宾夺主。\n\n画面应有一定的拼贴层次和纸质感：可以出现轻微纸张纹理、淡淡水彩晕染、透明色块边界、柔和渐变和颗粒感，但整体仍保持干净、克制、专业。最终效果像一张建筑作品集中的蓝灰淡彩拼贴表现图 / 建筑竞赛展板视觉图 / 叙事型建筑插画。\n\n重点是：保留用户上传的原始建筑图，只将其转换为蓝灰低饱和、半透明淡彩、纸质拼贴感的建筑表现风格。\nNegative Prompt\n\n不要改变建筑结构，不要改变剖切关系，不要改变透视角度，不要改变构图比例，不要重新设计建筑，不要生成完全不同的建筑，不要复制参考图中的具体物体，不要复制船只、水面、历史人物或特殊叙事场景，不要添加与原图无关的大量前景元素，不要写实摄影，不要商业地产效果图，不要厚重渲染，不要强烈阴影，不要高饱和，不要深色背景，不要赛博朋克，不要夜景，不要过度写实植物，不要复杂杂乱背景，不要文字，不要水印，不要 logo，不要破坏原图的图纸可读性。"
  },
  "case13": {
    "id": "case13",
    "img": "images/prompt-cases/prompt-case-13.webp",
    "kicker": "Material Collage",
    "title": "柔和材质拼贴剖面",
    "scene": "适用：材质表达 / 概念渲染 / 剖面可视化",
    "tags": [
      "材质拼贴",
      "柔和光影",
      "非水彩"
    ],
    "prompt": "基于上传的建筑图进行风格化渲染，严格保留原图的建筑结构、剖切关系、空间布局、透视角度、构图比例、线稿层级和设计内容，不要重新设计建筑，不要改变原始建筑原型，不要改变建筑体块、屋顶、楼板、柱子、楼梯、门窗、人物尺度和室内空间关系。\n\n将画面转化为一种柔和真实材质拼贴建筑表现风格。整体不是水彩风格，而是更接近建筑作品集中的概念渲染图 / 材质拼贴效果图 / 柔和建筑可视化剖面图。画面应保留清晰的建筑线稿，同时加入克制的真实材质、柔和光影、细腻纸面纹理和低饱和环境氛围。\n\n色彩以暖白色、米灰色、浅米色、柔和木色、浅砖色、灰蓝天空、低饱和绿色植物、自然土壤棕色为主。整体氛围温暖、安静、自然、柔和，不要高饱和，不要过度写实，不要商业效果图的强烈光影。\n\n建筑主体需要保持图纸可读性：\n墙体、屋顶、楼板、梁柱、门窗、楼梯和家具可以加入轻微材质表达，例如浅色抹灰、细腻砖纹、木质纹理、玻璃反射、金属边框、室内暖色材质，但所有材质都要克制、轻薄、低对比度，不要覆盖原有线稿。\n\n背景可以加入柔和灰蓝天空、轻薄云朵、浅色远景建筑或植物环境，但不要喧宾夺主。植物可以有一定真实感，但需要低饱和、柔和、自然，不要过度水彩化，也不要变成照片级写实。地面、土壤、基础和剖切区域可以用轻微颗粒、纸面肌理和自然材质表现，增强画面厚度。\n\n整体效果应像一张高质量建筑剖面概念渲染图：\n有图纸的精确线稿，有真实材质的温度，有柔和拼贴的层次，有轻微纸张颗粒质感。\n重点是：保留用户上传的原始建筑图，只将其转换为柔和、低饱和、真实材质拼贴感的建筑表现风格，而不是水彩插画。\nNegative Prompt\n\n不要改变建筑结构，不要改变剖切关系，不要改变透视角度，不要改变构图比例，不要重新设计建筑，不要生成完全不同的建筑，不要水彩风格，不要明显水彩晕染，不要手绘儿童插画感，不要商业地产效果图，不要过度写实摄影，不要高饱和，不要强烈明暗，不要厚重阴影，不要夜景，不要赛博朋克，不要复杂杂乱背景，不要过度写实植物，不要过多人群，不要文字，不要水印，不要 logo，不要破坏原图的图纸可读性。"
  },
  "case14": {
    "id": "case14",
    "img": "images/prompt-cases/prompt-case-14.webp",
    "kicker": "Photoreal Landscape",
    "title": "景观线稿实景渲染",
    "scene": "适用：景观线稿 / 实景效果 / 公共空间",
    "tags": [
      "实景渲染",
      "景观线稿",
      "真实材质"
    ],
    "prompt": "参照上传的黑白线稿景观设计图，将其渲染成真实建成后的城市公共空间实景效果图。\n\n保留原图的整体构图、视角关系、空间布局和主要设计元素，包括：树阵、铺装边界、座椅、树池、种植区域、广场开敞空间、远处建筑或地标、行人尺度等。不要改变原方案的空间逻辑，只将线稿转化为真实材质、真实光影和真实环境氛围。\n\n画面风格为高质量建筑景观实景渲染，接近真实摄影效果。树木自然茂盛但不过度杂乱，地面铺装具有真实石材、砖石或混凝土质感，树池与绿化带细节清晰，座椅、灯杆、栏杆等城市家具材质真实。人物只作为尺度参考，数量适中，动作自然，不要抢主体。\n\n光线采用柔和自然日光，可为晴朗午后或清晨阳光，画面干净、通透、有空气感。整体色彩自然低饱和，避免过度鲜艳，避免AI感，避免过度商业效果图感。保持景观设计表达的专业感、真实感和空间秩序感。\n\nRender the uploaded black-and-white landscape architecture sketch into a photorealistic built environment scene, preserving the original perspective, composition, spatial layout, tree placement, paving pattern, benches, planting beds, open plaza, background buildings, and pedestrian scale. Convert the line drawing into a realistic architectural landscape visualization with natural daylight, realistic materials, lush but controlled greenery, stone paving textures, subtle shadows, and calm urban public-space atmosphere. High-end landscape architecture rendering, realistic photography style, clean composition, natural colors, soft daylight, believable people as small scale figures, no sketch lines, no watercolor, no cartoon style.\n不要保留黑白线稿效果，不要水彩风，不要卡通风，不要插画风，不要手绘感，不要过度梦幻，不要过度锐化，不要塑料感材质，不要树木杂乱失控，不要人物过多，不要人物抢镜，不要改变原始构图，不要改变主要空间布局，不要随意新增大型建筑，不要赛博朋克，不要夜景，不要浓重滤镜，不要低清晰度，不要AI油腻感。"
  },
  "case15": {
    "id": "case15",
    "img": "images/prompt-cases/prompt-case-15.webp",
    "kicker": "Photoreal Perspective",
    "title": "建筑景观线稿实景",
    "scene": "适用：建筑景观 / 透视线稿 / 实景转化",
    "tags": [
      "透视线稿",
      "实景效果",
      "自然光影"
    ],
    "prompt": "参照上传的黑白线稿建筑景观透视图，将其渲染成真实建成后的实景效果图。\n\n保留原图的整体构图、透视关系、空间层次和主要设计元素，包括：左侧建筑构架或廊架、连续竖向构件、入口台阶、步道、低矮挡墙、平台空间、种植区域、右侧树木、远处自然景观以及人物尺度。不要改变原方案的空间逻辑，不要随意新增大型建筑或改变主体结构，只将线稿转化为真实材质、真实光影和真实场景氛围。\n\n画面风格为高质量建筑景观实景渲染，接近真实摄影效果。建筑构架可表现为浅色木材、清水混凝土、石材或金属材质，竖向构件形成有节奏的光影。地面采用真实石材、混凝土或浅色铺装材质，台阶、平台、挡墙和边界线清晰。绿化自然但克制，包含草坪、低矮灌木、观赏草、乔木和远景植被。\n\n光线采用柔和自然日光，可以是清晨或傍晚前的暖光，产生细腻阴影和空间层次。人物只作为尺度参考，数量适中，姿态自然，不要抢主体。整体色彩自然、低饱和、干净克制，具有专业景观建筑事务所效果图的质感。\n\nRender the uploaded black-and-white architectural landscape perspective sketch into a photorealistic built environment scene. Preserve the original composition, camera angle, perspective, spatial hierarchy, architectural structure, vertical colonnade or pergola elements, entrance steps, walkway, low retaining walls, terraces, planting areas, trees, distant landscape, and human scale figures. Do not alter the main design layout or spatial logic.\n\nCreate a high-quality professional architectural landscape visualization with realistic materials, natural daylight, soft shadows, clean paving textures, subtle planting details, and a calm contemporary public-space atmosphere. The architectural structure should feel realistic, made of light wood, concrete, stone, or metal, with rhythmic vertical elements and elegant shadows. The landscape should include restrained greenery, grass, low shrubs, ornamental grasses, mature trees, and a soft distant view.\n\nPhotorealistic rendering, professional landscape architecture visualization, realistic photography style, soft daylight, natural low-saturation colors, clean composition, believable materials, calm atmosphere, high detail, no sketch lines, no watercolor, no cartoon style, no excessive dramatization.\n不要保留黑白线稿，不要手绘线条，不要水彩风，不要插画风，不要卡通风，不要漫画感，不要概念草图感，不要过度梦幻，不要赛博朋克，不要夜景，不要强烈滤镜，不要过度饱和，不要塑料感材质，不要粗糙低清，不要人物过多，不要人物抢镜，不要改变原始构图，不要改变主体建筑结构，不要随意新增大型建筑，不要让植物杂乱失控，不要过度商业地产效果图感，不要明显AI感。"
  },
  "case16": {
    "id": "case16",
    "img": "images/prompt-cases/prompt-case-16.webp",
    "kicker": "Ecological Section",
    "title": "生态景观建筑剖面",
    "scene": "适用：生态剖面 / 植物表达 / 分析图纸",
    "tags": [
      "生态剖面",
      "植物层次",
      "根系土壤"
    ],
    "prompt": "参照上传的参考风格图，将目标建筑剖面线稿转化为一张精致的生态景观建筑剖面表达图。\n\n保留目标图的主体构图、剖面关系、建筑结构、屋顶形式、墙体节点、楼板、门窗、柱子、室内人物尺度、地面线和技术逻辑。不要改变原始建筑剖面的基本几何关系，不要随意新增主体建筑结构，只对图面风格、植物表达、色彩层次和场地氛围进行优化。\n\n整体效果参考高端景观建筑竞赛图纸与生态剖面图表达：画面以白色背景为主，线条轻盈细腻，色彩低饱和，使用淡绿色、浅米色、灰绿色、浅蓝灰和柔和土黄色。建筑部分保持清晰的技术线稿感，植物部分更加丰富、轻盈、半透明，形成自然的层次。\n\n在建筑外侧增加生态种植表达，包括乔木、灌木、观赏草、藤本植物、野花、草本植物和自然式植被群落。植物线条细致、有植物学插画感，但不要过度写实。地面以下可加入土壤剖面、根系、渗水层、地下水纹理、点状肌理和浅色剖面填充，使图面具有生态系统剖析感。\n\n画面可以保留或重新组织少量编号标注、细线引线、虚线、光线箭头、材料说明和图例文字，使其具有专业建筑图纸与景观分析图的气质。文字应小号、浅棕色或浅灰色，不要喧宾夺主。人物只作为尺度参考，采用浅灰色轮廓线或淡色剪影，不要抢主体。\n\n整体氛围应轻盈、安静、理性、自然，像国际景观建筑事务所方案文本中的生态剖面展示图。强调建筑与植物、土壤、光线、水分和人之间的关系。高清、干净、留白充足、构图优雅、图面精致。\n\nTransform the uploaded architectural section line drawing into a refined ecological landscape architecture section illustration, using the reference image as the visual style guide. Preserve the original building section geometry, roof form, wall assembly, floor slabs, doors, windows, columns, human scale figures, ground line, and technical logic. Do not alter the main architectural structure.\n\nCreate a high-end competition-board style ecological section drawing with a clean white background, delicate linework, pale desaturated colors, soft sage green, beige, grey-green, light blue-grey, and subtle ochre tones. Keep the architectural section precise and readable, while enriching the surrounding landscape with layered botanical planting.\n\nAdd elegant ecological planting around the building edge, including trees, shrubs, ornamental grasses, wildflowers, climbing plants, herbaceous plants, and naturalistic vegetation. Include a subtle underground soil section with roots, soil textures, drainage layers, water infiltration patterns, dotted hatching, and soft earth-tone fills. The vegetation should feel botanical, airy, translucent, and hand-drawn, not overly realistic.\n\nUse fine annotation lines, small numbered callouts, dashed construction lines, light arrows, material notes, and a discreet legend if suitable. Typography should be small, refined, and pale brown or light grey. Human figures should remain minimal and semi-transparent for scale only.\n\nOverall style: refined ecological architectural section, landscape architecture presentation board, delicate botanical line drawing, pale watercolor diagram style, soft translucent vegetation, technical yet poetic, minimal white background, low saturation, precise architecture, layered planting, root systems, soil section, calm professional atmosphere, high detail, elegant composition.\n不要做成实景渲染，不要照片感，不要厚重水彩，不要卡通风，不要漫画感，不要黑白线稿原样保留，不要粗黑线，不要高饱和色彩，不要强烈阴影，不要塑料感，不要过度装饰，不要植物杂乱失控，不要遮挡建筑剖面，不要改变原始建筑结构，不要随意新增大型建筑，不要人物过多，不要文字过大，不要图面拥挤，不要AI感，不要低清晰度。"
  },
  "case17": {
    "id": "case17",
    "workflowTemplate": "ecological-architectural-section-v1",
    "img": "images/template-p0/result-demo.webp",
    "kicker": "Template Workflow",
    "title": "生态景观建筑剖面工作流",
    "scene": "适用：项目原图上传 / 风格参考 / 参数控制",
    "tags": [
      "工作流模板",
      "生态剖面",
      "淡彩控制"
    ],
    "prompt": "生态景观建筑剖面，以上传的项目原图为唯一结构依据，保留原图中实际存在的建筑轮廓、空间关系、地形与主要场地元素，不新增原图中不存在的地下空间、车辆、交通构件或其他大型元素。使用白色或暖白色背景、精细技术线稿与低饱和淡彩，生态与人物处理可在模板页按需调整，整体干净、专业、留白充足。"
  },
  "case18": {
    "id": "case18",
    "workflowTemplate": "forest-garden-ecological-section-v1",
    "img": "images/template-forest-garden/result-demo.webp",
    "kicker": "Template Workflow",
    "title": "森林花园生态剖面工作流",
    "scene": "适用：建筑与景观剖面 / 土层根系 / 研究型图面",
    "tags": [
      "工作流模板",
      "森林花园",
      "生态层次"
    ],
    "prompt": "森林花园生态剖面，以上传的项目原图为唯一结构与场地依据，保留原图中实际存在的建筑、平台、步道、水体、地形、植物、人物与剖切关系，不复制风格参考图中的具体内容。采用连续清晰的浅灰横向细纹背景、精细灰白技术线稿、少量低饱和灰粉与暗红点缀，以及克制的土层和根系说明。生态表达可在模板页选择轻、标准或强化，整体专业、安静、研究型且留白充分。"
  },
  "case19": {
    "id": "case19",
    "workflowTemplate": "urban-birdview-landscape-diagram-v1",
    "img": "images/template-urban-birdview/result-demo.webp",
    "kicker": "Template Workflow",
    "title": "城市鸟瞰景观图解工作流",
    "scene": "适用：城市鸟瞰 / 轴测总图 / 景观策略",
    "tags": [
      "工作流模板",
      "城市鸟瞰",
      "受控介入"
    ],
    "prompt": "城市鸟瞰景观图解，以上传的项目原图为唯一城市结构依据，保留原图中的建筑体量、屋顶、道路、广场、铺地、人物、车辆与主要空间关系，不复制风格参考图中的具体城市内容。采用灰白建筑细线、低饱和图解式平涂、面状绿地与统一树群表达；模板页可选择“跟随原图”或“受控延展”两种景观策略，整体专业、安静、层级清楚。"
  },
  "case20": {
    "id": "case20",
    "workflowTemplate": "urban-axonometric-program-diagram-v1",
    "img": "images/template-urban-program-diagram/result-demo.webp",
    "kicker": "Template Workflow",
    "title": "城市功能分区轴测图解工作流",
    "scene": "适用：城市轴测 / 功能分区 / 竞赛图解",
    "tags": [
      "工作流模板",
      "功能分区",
      "白线锁色"
    ],
    "prompt": "城市功能分区轴测图解，以上传的项目原图为唯一结构与场地依据，保留建筑数量、位置、体量、屋顶、场地边界、道路、水体、纪念物、座椅与线性设施。采用灰白城市背景、玫红与青蓝重点建筑、彩色体块上的白色立面线稿、橙绿场地分区，以及只出现在地面的白色圆点纹理；不自动生成文字、标签或箭头。"
  },
  "case21": {
    "id": "case21",
    "workflowTemplate": "architectural-analysis-base-diagram-v1",
    "img": "images/template-architectural-analysis-base/result-demo.webp",
    "kicker": "Template Workflow",
    "title": "四类建筑分析图底图工作流",
    "scene": "适用：建筑轴测 / 四宫格底图 / 后期标注",
    "tags": [
      "工作流模板",
      "分析底图",
      "四宫格"
    ],
    "prompt": "四类建筑分析图底图工作流。以上传的项目原图为唯一结构依据，统一转化为白色或近白色建筑体块、浅灰细线与低饱和图解风格，并生成区域高亮、重点体量、屋顶露台和节点四类无文字底图。AI 只负责结构保护与视觉表达，不自动生成专业结论、准确文字或流线箭头；最终标签、箭头与说明由用户后期添加。"
  },
  "case22": {
    "id": "case22",
    "workflowTemplate": "architectural-landscape-narrative-collage-v1",
    "img": "images/template-narrative-collage/result-demo.webp",
    "kicker": "Template Workflow",
    "title": "建筑与景观综合叙事拼贴工作流",
    "scene": "适用：前期分析 / 多图拼贴 / 建筑景观叙事",
    "tags": [
      "工作流模板",
      "叙事拼贴",
      "多图融合"
    ],
    "prompt": "建筑与景观综合叙事拼贴工作流。上传多张项目与场地图片，由系统在不预设具体对象的前提下组织建筑、景观和环境片段，生成带低饱和图像层次、选择性轻描边、错落遮挡、连续浅色网格与后期标注留白的无文字拼贴底图。AI 只负责视觉组织，不自动生成事实判断、专业结论或文字说明。"
  }
};

    window.BaoLongPromptCases = promptCases;

    /* v176: lock the background page while prompt case modal is open, without fixing the body.
       The previous fixed-body lock restored scroll on close, which could create a visible page slide/jump. */
    let __baolongModalScrollY = 0;
    let __baolongModalPreviousBodyStyle = null;
    let __baolongModalPreviousDocStyle = null;
    function lockPageScroll(){
      if(document.body.classList.contains('modal-scroll-locked')) return;
      const docEl = document.documentElement;
      __baolongModalScrollY = window.pageYOffset || docEl.scrollTop || document.body.scrollTop || 0;
      __baolongModalPreviousBodyStyle = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
        overscrollBehavior: document.body.style.overscrollBehavior,
        scrollBehavior: document.body.style.scrollBehavior
      };
      __baolongModalPreviousDocStyle = {
        overflow: docEl.style.overflow,
        overscrollBehavior: docEl.style.overscrollBehavior,
        scrollBehavior: docEl.style.scrollBehavior
      };
      const scrollbarGap = Math.max(0, window.innerWidth - docEl.clientWidth);
      document.body.classList.add('modal-scroll-locked');
      docEl.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
      docEl.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      docEl.style.overscrollBehavior = 'none';
      document.body.style.overscrollBehavior = 'none';
      if(scrollbarGap > 0){
        document.body.style.paddingRight = scrollbarGap + 'px';
      }
    }
    function unlockPageScroll(){
      if(!document.body.classList.contains('modal-scroll-locked')) return;
      const docEl = document.documentElement;
      const targetScrollY = __baolongModalScrollY || 0;
      document.body.classList.remove('modal-scroll-locked');
      const previousBody = __baolongModalPreviousBodyStyle || {};
      const previousDoc = __baolongModalPreviousDocStyle || {};
      docEl.style.overflow = previousDoc.overflow || '';
      docEl.style.overscrollBehavior = previousDoc.overscrollBehavior || '';
      docEl.style.scrollBehavior = previousDoc.scrollBehavior || '';
      document.body.style.overflow = previousBody.overflow || '';
      document.body.style.paddingRight = previousBody.paddingRight || '';
      document.body.style.overscrollBehavior = previousBody.overscrollBehavior || '';
      document.body.style.scrollBehavior = previousBody.scrollBehavior || '';
      window.requestAnimationFrame(function(){
        const currentScrollY = window.pageYOffset || docEl.scrollTop || document.body.scrollTop || 0;
        if(Math.abs(currentScrollY - targetScrollY) > 2){
          window.scrollTo(0, targetScrollY);
        }
      });
      __baolongModalPreviousBodyStyle = null;
      __baolongModalPreviousDocStyle = null;
    }

    function setPromptMobileModalOffset(){
      const modal = document.getElementById('promptCaseModal');
      const header = document.querySelector('.site-header');
      if(!modal || !header || window.innerWidth > 760) return;
      const headerBottom = header.getBoundingClientRect().bottom || 0;
      const topOffset = Math.max(124, Math.ceil(headerBottom + 24));
      modal.style.setProperty('--prompt-mobile-modal-top', topOffset + 'px');
    }

    function openPromptCase(caseId){
      const item = promptCases[caseId];
      const modal = document.getElementById('promptCaseModal');
      if(!item || !modal) return;
      setPromptMobileModalOffset();
      document.getElementById('promptCaseImg').src = item.img;
      document.getElementById('promptCaseImg').alt = item.title;
      document.getElementById('promptCaseKicker').textContent = item.kicker;
      document.getElementById('promptCaseTitle').textContent = item.title;
      document.getElementById('promptCaseScene').textContent = item.scene;
      document.getElementById('promptCaseText').textContent = item.prompt;
      document.getElementById('promptCopyStatus').textContent = '';

      const workflowButton = document.getElementById('promptWorkflowButton');
      const copyButton = document.getElementById('promptCopyButton');
      if(workflowButton){
        if(item.workflowTemplate){
          workflowButton.hidden = false;
          workflowButton.href = 'template-generator.html?template=' + encodeURIComponent(item.workflowTemplate);
          workflowButton.setAttribute('aria-label', '使用此模板 / Use this template');
          if(copyButton){
            copyButton.classList.remove('primary-btn');
            copyButton.classList.add('secondary-btn');
          }
        }else{
          workflowButton.hidden = true;
          workflowButton.removeAttribute('href');
          if(copyButton){
            copyButton.classList.remove('secondary-btn');
            copyButton.classList.add('primary-btn');
          }
        }
      }

      const tagBox = document.getElementById('promptCaseTags');
      tagBox.innerHTML = '';
      item.tags.forEach(function(tag){
        const span = document.createElement('span');
        span.textContent = tag;
        tagBox.appendChild(span);
      });
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      lockPageScroll();
    }

    function closePromptCase(){
      const modal = document.getElementById('promptCaseModal');
      if(!modal) return;
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      unlockPageScroll();
    }

    function copyPromptCase(){
      const text = document.getElementById('promptCaseText')?.textContent || '';
      const status = document.getElementById('promptCopyStatus');
      if(!text) return;
      if(navigator.clipboard && window.isSecureContext){
        navigator.clipboard.writeText(text).then(function(){
          if(status) status.textContent = 'Prompt copied.';
        }).catch(function(){
          fallbackCopyPrompt(text, status);
        });
      }else{
        fallbackCopyPrompt(text, status);
      }
    }

    function fallbackCopyPrompt(text, status){
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try{
        document.execCommand('copy');
        if(status) status.textContent = 'Prompt copied.';
      }catch(err){
        if(status) status.textContent = 'Copy failed. Please select the prompt manually.';
      }
      document.body.removeChild(textarea);
    }

    document.addEventListener('keydown', function(event){
      if(event.key === 'Escape') closePromptCase();
    });

    document.addEventListener('click', function(event){
      const modal = document.getElementById('promptCaseModal');
      if(!modal || !modal.classList.contains('open')) return;
      if(event.target === modal) closePromptCase();
    });
  