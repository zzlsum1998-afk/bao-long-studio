(() => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  // v252 security boundary:
  // Static client contains public preview builders only.
  // Full production prompts live exclusively in the offline private vault referenced by privateScriptRef.

  const sharedTranslations = {
    zh: {
      workflowLabel:'Prompt 工作流', templateKicker:'IMAGE TEMPLATE', backToPrompt:'返回 Prompt 灵感', caseKicker:'模板案例', scopeToggle:'查看适用范围', bestForTitle:'适合', notForTitle:'暂不适合', inputKicker:'项目输入', inputTitle:'上传与参数', uploadTitle:'上传项目原图', uploadCopy:'拖入 PNG / JPG / WebP，或点击选择文件', uploadLimit:'仅在本地浏览器预览，不会上传服务器', replaceImage:'点击或拖入新图替换', useDemo:'使用示例原图', notesLabel:'补充要求 <span>（选填）</span>', notesPlaceholder:'例如：保留左侧大树，弱化土层，不改变屋顶结构。', notesHint:'最多 120 字', advancedSettings:'高级设置', advancedSettingsHint:'仅在需要时调整生态与人物处理。', settingsUnit:'项', estimateLabel:'公开状态', publicStatusValue:'公网生图暂未开放', creditUnit:'张图片', generate:'生图功能开发中', resultKicker:'内部测试示例', resultTitle:'示例结果与参数预览', emptyTitle:'当前展示内部测试示例', emptyCopy:'上传图片仅用于本地预览参数，不会生成新图片。', loadingCopy:'当前不会向服务器提交生成任务。', mockResult:'内部测试示例结果', download:'查看示例大图', regenerate:'重置参数', reset:'重置', detailKicker:'PUBLIC PROMPT PREVIEW', detailTitle:'公开摘要 Prompt', promptTitle:'可复制公开摘要', copy:'复制', copied:'已复制', generationInfoTitle:'演示信息', templateNameLabel:'模板', inputMode:'输入方式', twoImages:'本地项目图 + 模板参考图', outputMode:'示例输出', viewDetail:'查看公开摘要'
    },
    en: {
      workflowLabel:'Prompt Workflow', templateKicker:'IMAGE TEMPLATE', backToPrompt:'Back to Prompt Inspiration', caseKicker:'TEMPLATE CASE', scopeToggle:'View use cases', bestForTitle:'Recommended', notForTitle:'Not yet recommended', inputKicker:'PROJECT INPUT', inputTitle:'Upload & Parameters', uploadTitle:'Upload project image', uploadCopy:'Drop PNG / JPG / WebP here, or click to choose', uploadLimit:'Local browser preview only. The image is not uploaded to a server.', replaceImage:'Click or drop a new image to replace', useDemo:'Use demo source', notesLabel:'Additional Notes <span>(Optional)</span>', notesPlaceholder:'Example: keep the large tree, soften the soil layer, and preserve the roof structure.', notesHint:'Up to 120 characters', advancedSettings:'Advanced Settings', advancedSettingsHint:'Adjust ecology and people handling only when needed.', settingsUnit:'settings', estimateLabel:'PUBLIC STATUS', publicStatusValue:'Public generation not available', creditUnit:'image', generate:'Generation In Development', resultKicker:'INTERNAL TEST SAMPLE', resultTitle:'Sample Result & Parameter Preview', emptyTitle:'Internal test sample shown', emptyCopy:'Uploaded images are used only for local parameter preview and will not generate a new image.', loadingCopy:'No generation task is sent to a server.', mockResult:'Internal test sample', download:'View Sample', regenerate:'Reset Parameters', reset:'Reset', detailKicker:'PUBLIC PROMPT PREVIEW', detailTitle:'Public Prompt Summary', promptTitle:'Copy-ready public summary', copy:'Copy', copied:'Copied', generationInfoTitle:'Demo Information', templateNameLabel:'Template', inputMode:'Input', twoImages:'Local project image + template reference', outputMode:'Sample Output', viewDetail:'View Public Summary'
    }
  };

  const templateConfigs = {
    'ecological-architectural-section-v1': {
      sourceCaseId:'case17',
      privateScriptRef:'BaoLong_Lab_Hidden_Prompt_Vault_v1/case17_ecological_section/seedream_case17_final.py', // Offline index only; never loaded by the static client.
      title: { zh:'生态景观建筑剖面', en:'Ecological Architectural Section' },
      summary: { zh:'保留建筑剖面结构，增强低饱和植物、地表与土壤生态层次。', en:'Preserve the architectural section while enhancing muted planting, ground, and soil ecology layers.' },
      caption: { zh:'目标风格：精细线稿、低饱和淡彩、建筑与生态系统一体表达', en:'Target style: precise linework, muted soft color, and integrated architecture-ecology presentation.' },
      imageAlt: { zh:'生态景观建筑剖面参考图', en:'Ecological architectural section reference' },
      tags: {
        zh:['生态剖面','结构优先','植物层次'],
        en:['Ecological section','Structure first','Planting layers']
      },
      priorityTitle: { zh:'结构保护：', en:'Structure guard: ' },
      priorityCopy: { zh:'以上传原图为唯一结构依据，只处理原图中实际存在的建筑、空间、地形与场地元素。', en:'Use the uploaded image as the sole structural source and only process architecture, space, terrain, and site elements that actually exist in it.' },
      bestFor: {
        zh:['建筑剖面、建筑景观综合剖面与基础线稿','希望保留结构，只增强植物与生态表达','需要低饱和竞赛图纸与作品集质感'],
        en:['Architectural and architecture-landscape sections or clean line drawings','Projects that must preserve structure while enhancing ecology','Presentation boards needing muted competition-style graphics']
      },
      notFor: {
        zh:['要求 CAD 级逐像素锁定的施工剖面','需要改变建筑体块、楼层或空间布局的任务'],
        en:['Construction sections requiring CAD-level pixel locking','Tasks that require changes to massing, levels, or spatial layout']
      },
      assets: {
        source:'images/template-p0/source-demo.webp',
        display:'images/template-p0/result-demo.webp',
        displayFallback:'images/template-p0/style-reference.webp',
        reference:'images/template-p0/style-reference.webp',
        result:'images/template-p0/result-demo.webp',
        sourceName:'ecological-section-source-demo.png',
        downloadName:'baolong-ecological-architectural-section-demo.png'
      },
      parameters: [
        {
          id:'colorIntensity', type:'segmented', label:{zh:'色彩浓度',en:'Color Intensity'}, default:'standard',
          options:[
            {value:'light',label:{zh:'淡',en:'Light'}},
            {value:'standard',label:{zh:'标准',en:'Standard'}},
            {value:'strong',label:{zh:'强化',en:'Enhanced'}}
          ]
        },
        {
          id:'ecologyTreatment', type:'segmented', advanced:true, label:{zh:'生态处理',en:'Ecology Treatment'}, default:'follow',
          options:[
            {value:'follow',label:{zh:'跟随原图',en:'Follow Source'}},
            {value:'light',label:{zh:'轻度补充',en:'Light Supplement'}}
          ]
        },
        {
          id:'peopleHandling', type:'segmented', advanced:true, label:{zh:'人物处理',en:'People Handling'}, default:'follow',
          options:[
            {value:'follow',label:{zh:'跟随原图',en:'Follow Source'}},
            {value:'remove',label:{zh:'去除人物',en:'Remove People'}}
          ]
        }
      ],
      loading: {
        zh:['内部测试：分析项目原图','内部测试：应用模板参数','内部测试：示例结果'],
        en:['Internal test: project image analysis','Internal test: template parameters','Internal test: sample result']
      },
      outputSpec:'1 image · PNG · 2K',
      visiblePromptBuilder: buildEcologicalVisiblePrompt,
    },
    'forest-garden-ecological-section-v1': {
      sourceCaseId:'case18',
      privateScriptRef:'BaoLong_Lab_Hidden_Prompt_Vault_v1/case18_forest_garden/seedream_case18_final.py', // Offline index only; never loaded by the static client.
      title: { zh:'森林花园生态剖面', en:'Forest Garden Ecological Section' },
      summary: { zh:'保留建筑或景观剖面关系，转化为带横向细纹、土层根系与克制生态层次的研究型图面。', en:'Preserve architectural or landscape section relationships while adding horizontal line texture, soil-root articulation, and restrained ecological layers.' },
      caption: { zh:'目标风格：明显横向细纹、精细灰白线稿、土层根系与少量暗红生态点缀', en:'Target style: visible horizontal line texture, fine grayscale linework, soil-root articulation, and restrained dark-red ecological accents.' },
      imageAlt: { zh:'森林花园生态剖面参考图', en:'Forest garden ecological section reference' },
      tags: {
        zh:['森林花园','研究型剖面','土层根系'],
        en:['Forest garden','Research section','Soil and roots']
      },
      priorityTitle: { zh:'原图保护：', en:'Source guard: ' },
      priorityCopy: { zh:'以上传原图为唯一结构与场地依据，只改变图面表达和所选生态强度。', en:'Use the uploaded image as the sole structural and site source; change only graphic expression and the selected ecology intensity.' },
      bestFor: {
        zh:['建筑剖面、景观剖面与场地线稿','希望突出植物—地表—土壤—根系关系','需要安静、克制的生态研究图与作品集图面'],
        en:['Architectural, landscape, and site section line drawings','Projects emphasizing planting-ground-soil-root relationships','Calm ecological research graphics and portfolio presentation']
      },
      notFor: {
        zh:['要求 CAD 级逐像素锁定的施工剖面','透视效果图、实景照片或需要重新设计场地的任务'],
        en:['Construction sections requiring CAD-level pixel locking','Perspective renders, photographs, or tasks requiring site redesign']
      },
      assets: {
        source:'images/template-forest-garden/source-demo.webp',
        display:'images/template-forest-garden/result-demo.webp',
        displayFallback:'images/template-forest-garden/style-reference.webp',
        reference:'images/template-forest-garden/style-reference.webp',
        result:'images/template-forest-garden/result-demo.webp',
        sourceName:'forest-garden-section-source-demo.png',
        downloadName:'baolong-forest-garden-ecological-section-demo.png'
      },
      parameters: [
        {
          id:'ecologyIntensity', type:'segmented', label:{zh:'生态表达',en:'Ecology Intensity'}, default:'standard',
          options:[
            {value:'light',label:{zh:'轻',en:'Light'}},
            {value:'standard',label:{zh:'标准',en:'Standard'}},
            {value:'strong',label:{zh:'强化',en:'Enhanced'}}
          ]
        }
      ],
      loading: {
        zh:['内部测试：分析项目原图','内部测试：应用生态参数','内部测试：示例结果'],
        en:['Internal test: project image analysis','Internal test: ecology parameters','Internal test: sample result']
      },
      outputSpec:'1 image · PNG · 2K',
      visiblePromptBuilder: buildForestGardenVisiblePrompt,
    },
    'urban-birdview-landscape-diagram-v1': {
      sourceCaseId:'case19',
      privateScriptRef:'BaoLong_Lab_Hidden_Prompt_Vault_v1/case19_urban_birdview/seedream_case19_final.py', // Offline index only; never loaded by the static client.
      title: { zh:'城市鸟瞰景观图解', en:'Urban Birdview Landscape Diagram' },
      summary: { zh:'保留城市鸟瞰结构，以低饱和图解式平涂表达，并在“跟随原图 / 受控延展”之间选择景观策略。', en:'Preserve the urban birdview structure, apply muted diagrammatic flat color, and choose between following the source or controlled landscape extension.' },
      caption: { zh:'目标风格：灰白建筑线稿、低饱和面状绿地、图解式树群与清晰城市空间层级', en:'Target style: pale architectural linework, muted area-based greenery, diagrammatic tree groups, and clear urban spatial hierarchy.' },
      imageAlt: { zh:'城市鸟瞰景观图解参考图', en:'Urban birdview landscape diagram reference' },
      tags: {
        zh:['城市鸟瞰','景观图解','受控介入'],
        en:['Urban birdview','Landscape diagram','Controlled intervention']
      },
      priorityTitle: { zh:'结构保护：', en:'Structure guard: ' },
      priorityCopy: { zh:'以上传原图为唯一城市结构依据；建筑、道路、广场与主要硬质空间不因景观策略而改变。', en:'Use the uploaded image as the sole urban-structure source; buildings, roads, plazas, and primary hardscape remain unchanged by the landscape strategy.' },
      bestFor: {
        zh:['城市鸟瞰、轴测图、城市设计与景观总图','需要保留建筑与道路，只优化景观图解表达','需要在原图绿化范围与合理景观延展之间选择'],
        en:['Urban birdviews, axonometric diagrams, urban design, and landscape masterplans','Projects preserving buildings and roads while improving landscape graphics','Projects choosing between source-bound planting and controlled landscape extension']
      },
      notFor: {
        zh:['要求 CAD 级逐像素锁定的施工图','实景照片、透视效果图或需要重新设计建筑与道路的任务'],
        en:['Construction drawings requiring CAD-level pixel locking','Photographs, perspective renders, or tasks requiring redesigned buildings and roads']
      },
      assets: {
        source:'images/template-urban-birdview/source-demo.webp',
        display:'images/template-urban-birdview/result-demo.webp',
        displayFallback:'images/template-urban-birdview/style-reference.jpg',
        reference:'images/template-urban-birdview/style-reference.jpg',
        result:'images/template-urban-birdview/result-demo.webp',
        sourceName:'urban-birdview-source-demo.png',
        downloadName:'baolong-urban-birdview-landscape-diagram-demo.png'
      },
      parameters: [
        {
          id:'landscapeStrategy', type:'segmented', label:{zh:'景观策略',en:'Landscape Strategy'}, default:'controlled',
          options:[
            {value:'follow',label:{zh:'跟随原图',en:'Follow Source'}},
            {value:'controlled',label:{zh:'受控延展',en:'Controlled Extension'}}
          ]
        }
      ],
      loading: {
        zh:['内部测试：分析城市结构','内部测试：应用景观策略','内部测试：示例结果'],
        en:['Internal test: urban structure','Internal test: landscape strategy','Internal test: sample result']
      },
      outputSpec:'1 image · PNG · 2K',
      visiblePromptBuilder: buildUrbanBirdviewVisiblePrompt,
    },
    'urban-axonometric-program-diagram-v1': {
      sourceCaseId:'case20',
      privateScriptRef:'BaoLong_Lab_Hidden_Prompt_Vault_v1/case20_urban_program_diagram/seedream_case20_final.py', // Offline index only; never loaded by the static client.
      title: { zh:'城市功能分区轴测图解', en:'Urban Axonometric Program Diagram' },
      summary: { zh:'严格保留城市轴测结构，以锁定色板、白色建筑线稿和地面白色圆点纹理强化功能分区表达。', en:'Strictly preserve the urban axonometric structure while using a locked palette, white architectural linework, and ground-only white dot texture to clarify program zones.' },
      caption: { zh:'目标风格：灰白城市背景、玫红与青蓝重点建筑、白色立面线稿、橙绿场地分区与地面白色圆点纹理', en:'Target style: pale urban context, magenta and cyan key buildings, white façade linework, orange-green site zones, and white dot texture on ground surfaces only.' },
      imageAlt: { zh:'城市功能分区轴测图解参考图', en:'Urban axonometric program diagram reference' },
      tags: {
        zh:['城市轴测','功能分区','白线锁色'],
        en:['Urban axonometric','Program zoning','White linework']
      },
      priorityTitle: { zh:'严格结构保护：', en:'Strict structure guard: ' },
      priorityCopy: { zh:'以上传原图为唯一结构与场地依据，逐一保留建筑、附属体量、场地设施、绿化边界、水体与项目边界；只清理文字框、引线等标注层。', en:'Use the uploaded image as the sole structural and site source. Preserve every building, attached mass, site object, planting boundary, water edge, and project boundary; remove only annotation layers such as text boxes and leader lines.' },
      bestFor: {
        zh:['城市设计轴测图、街区鸟瞰与功能分区分析图','希望保留原方案，只增强功能层级与竞赛图表达','需要鲜明锁色、白色建筑线稿与克制地面纹理'],
        en:['Urban-design axonometrics, block birdviews, and program-zoning diagrams','Projects that preserve the design while strengthening hierarchy and competition-board graphics','Presentations needing a vivid locked palette, white architectural linework, and restrained ground texture']
      },
      notFor: {
        zh:['要求 CAD 级逐像素锁定的施工图','实景照片、透视效果图或需要重新设计建筑与场地的任务','需要模型自动生成准确文字、标签或流线箭头的任务'],
        en:['Construction drawings requiring CAD-level pixel locking','Photographs, perspective renders, or tasks requiring building and site redesign','Tasks requiring automatically generated accurate labels, text, or circulation arrows']
      },
      assets: {
        source:'images/template-urban-program-diagram/source-demo.webp',
        display:'images/template-urban-program-diagram/result-demo.webp',
        displayFallback:'images/template-urban-program-diagram/style-reference.webp',
        reference:'images/template-urban-program-diagram/style-reference.webp',
        result:'images/template-urban-program-diagram/result-demo.webp',
        sourceName:'urban-program-diagram-source-demo.png',
        downloadName:'baolong-urban-axonometric-program-diagram-demo.png'
      },
      parameters: [],
      loading: {
        zh:['内部测试：分析城市轴测结构','内部测试：应用锁色与白线图解','内部测试：示例结果'],
        en:['Internal test: urban axonometric structure','Internal test: locked color and white linework','Internal test: sample result']
      },
      outputSpec:'1 image · PNG · 2K',
      visiblePromptBuilder: buildUrbanProgramDiagramVisiblePrompt
    },
    'architectural-analysis-base-diagram-v1': {
      sourceCaseId:'case21',
      privateScriptRef:'BaoLong_Lab_Hidden_Prompt_Vault_v1/case21_architectural_analysis_base_diagram/seedream_case21_final.py', // Offline index only; the private vault will be updated separately and is never loaded by the static client.
      title: { zh:'四类建筑分析图底图', en:'Four-Panel Architectural Diagram Base' },
      summary: { zh:'严格保留项目结构并统一白模线稿，生成区域高亮、重点体量、屋顶露台和节点四类无文字图解底图。', en:'Strictly preserve the project structure, unify pale massing and linework, and generate four text-free diagram bases for area, massing, roof/terrace, and node emphasis.' },
      caption: { zh:'目标风格：统一白模、浅灰细线、低饱和高亮、四宫格一致性与后期标注留白', en:'Target style: unified pale massing, fine gray linework, muted highlights, consistent four-panel layout, and space for later annotation.' },
      imageAlt: { zh:'四类建筑分析图底图工作流示例', en:'Four-panel architectural diagram base workflow sample' },
      tags: {
        zh:['四宫格','分析底图','后期标注'],
        en:['Four panels','Diagram bases','Post annotation']
      },
      priorityTitle: { zh:'表达边界：', en:'Expression boundary: ' },
      priorityCopy: { zh:'AI 只负责结构保护、白模化与图解底图；准确文字、箭头和专业结论由用户后期添加。', en:'AI handles structure preservation, pale-massing conversion, and diagram bases only. Accurate labels, arrows, and professional conclusions are added later by the user.' },
      bestFor: {
        zh:['建筑轴测、城市设计鸟瞰与体量分析图','需要四张结构一致、可继续编辑的图解底图','计划在 PPT、Figma、Illustrator 等工具中补充标签与箭头'],
        en:['Architectural axonometrics, urban-design birdviews, and massing diagrams','Projects needing four structurally consistent bases for further editing','Workflows that add labels and arrows later in PPT, Figma, or Illustrator']
      },
      notFor: {
        zh:['要求 AI 自动给出可靠专业分析结论的任务','要求自动生成准确文字、图例或流线箭头的任务','要求 CAD 级逐像素锁定的施工图'],
        en:['Tasks requiring AI to provide reliable professional conclusions automatically','Tasks requiring accurate automatic labels, legends, or circulation arrows','Construction drawings requiring CAD-level pixel locking']
      },
      assets: {
        source:'images/template-architectural-analysis-base/source-demo.webp',
        display:'images/template-architectural-analysis-base/result-demo.webp',
        displayFallback:'images/template-architectural-analysis-base/style-reference.jpg',
        reference:'images/template-architectural-analysis-base/style-reference.jpg',
        result:'images/template-architectural-analysis-base/result-demo.webp',
        sourceName:'architectural-analysis-source-demo.png',
        downloadName:'baolong-four-panel-architectural-diagram-base-demo.png'
      },
      notesPlaceholder: {
        zh:'例如：区域图高亮中心开放空间；重点体量图突出主塔楼；屋顶图强调共享露台；节点图保留 3 个点位。',
        en:'Example: highlight the central open space, emphasize the main tower, mark shared terraces, and keep three node locations.'
      },
      parameters: [
        {
          id:'panelTopLeft', type:'select', uniqueGroup:'analysisPanelTypes', label:{zh:'左上分析',en:'Top Left'}, default:'area',
          options:[
            {value:'area',label:{zh:'区域高亮图',en:'Area Highlight'}},
            {value:'mass',label:{zh:'重点体量图',en:'Key Massing'}},
            {value:'roof',label:{zh:'屋顶露台高亮图',en:'Roof / Terrace'}},
            {value:'node',label:{zh:'节点图',en:'Node Diagram'}}
          ]
        },
        {
          id:'panelTopRight', type:'select', uniqueGroup:'analysisPanelTypes', label:{zh:'右上分析',en:'Top Right'}, default:'mass',
          options:[
            {value:'area',label:{zh:'区域高亮图',en:'Area Highlight'}},
            {value:'mass',label:{zh:'重点体量图',en:'Key Massing'}},
            {value:'roof',label:{zh:'屋顶露台高亮图',en:'Roof / Terrace'}},
            {value:'node',label:{zh:'节点图',en:'Node Diagram'}}
          ]
        },
        {
          id:'panelBottomLeft', type:'select', uniqueGroup:'analysisPanelTypes', label:{zh:'左下分析',en:'Bottom Left'}, default:'roof',
          options:[
            {value:'area',label:{zh:'区域高亮图',en:'Area Highlight'}},
            {value:'mass',label:{zh:'重点体量图',en:'Key Massing'}},
            {value:'roof',label:{zh:'屋顶露台高亮图',en:'Roof / Terrace'}},
            {value:'node',label:{zh:'节点图',en:'Node Diagram'}}
          ]
        },
        {
          id:'panelBottomRight', type:'select', uniqueGroup:'analysisPanelTypes', label:{zh:'右下分析',en:'Bottom Right'}, default:'node',
          options:[
            {value:'area',label:{zh:'区域高亮图',en:'Area Highlight'}},
            {value:'mass',label:{zh:'重点体量图',en:'Key Massing'}},
            {value:'roof',label:{zh:'屋顶露台高亮图',en:'Roof / Terrace'}},
            {value:'node',label:{zh:'节点图',en:'Node Diagram'}}
          ]
        }
      ],
      loading: {
        zh:['内部测试：锁定项目结构','内部测试：四类图解底图','内部测试：四宫格排版'],
        en:['Internal test: project structure','Internal test: four diagram bases','Internal test: four-panel composition']
      },
      outputSpec:'1 board · 4 panels · PNG · 2K',
      visiblePromptBuilder: buildArchitecturalAnalysisBaseVisiblePrompt
    },
    'architectural-landscape-narrative-collage-v1': {
      sourceCaseId:'case22',
      privateScriptRef:'BaoLong_Lab_Hidden_Prompt_Vault_v1/case22_narrative_collage/seedream_case22_final.py', // Offline index only; the private vault will be updated separately and is never loaded by the static client.
      title: { zh:'建筑与景观综合叙事拼贴', en:'Architectural + Landscape Narrative Collage' },
      summary: { zh:'将多张建筑、景观与场地素材组织成一张低饱和、错落分层、可继续标注的前期叙事拼贴底图。', en:'Organize multiple architecture, landscape, and site images into one muted, layered narrative collage base ready for later annotation.' },
      caption: { zh:'目标风格：建筑与景观综合叙事、选择性轻描边、错落遮挡、连续浅色网格与克制留白', en:'Target style: integrated architecture-landscape narrative, selective light outlines, staggered overlaps, continuous pale grids, and restrained negative space.' },
      imageAlt: { zh:'建筑与景观综合叙事拼贴工作流示例', en:'Architectural and landscape narrative collage workflow sample' },
      tags: {
        zh:['多图融合','叙事拼贴','后期标注'],
        en:['Multi-image','Narrative collage','Post annotation']
      },
      priorityTitle: { zh:'视觉边界：', en:'Visual boundary: ' },
      priorityCopy: { zh:'AI 只根据上传内容进行视觉组织与自动要素选择，不预设具体对象，不生成事实判断、专业结论或文字说明。', en:'AI only organizes the uploaded visual content and selects suitable elements automatically. It does not preset specific objects or generate factual judgments, professional conclusions, or labels.' },
      bestFor: {
        zh:['建筑与景观前期分析、场地叙事与概念拼贴','拥有 3–6 张相关项目、场地、环境或细节图片','计划在 PPT、Figma、Illustrator 中继续添加标题与说明'],
        en:['Early architecture-landscape analysis, site narrative, and concept collage','Projects with 3–6 related site, environment, project, or detail images','Workflows that add titles and notes later in PPT, Figma, or Illustrator']
      },
      notFor: {
        zh:['要求模型自动完成可靠事实分析或历史判断的任务','只上传一张图片却要求稳定多层拼贴的任务','要求自动生成准确文字、时间线或专业结论的任务'],
        en:['Tasks requiring reliable factual or historical analysis from the model','Single-image inputs that still require stable multi-layer collage','Tasks requiring accurate automatic text, timelines, or professional conclusions']
      },
      assets: {
        source:'images/template-narrative-collage/source-demo.webp',
        demoSources:[
          'images/template-narrative-collage/source-01.webp',
          'images/template-narrative-collage/source-02.webp',
          'images/template-narrative-collage/source-03.webp',
          'images/template-narrative-collage/source-04.webp',
          'images/template-narrative-collage/source-05.webp'
        ],
        display:'images/template-narrative-collage/result-demo.webp',
        displayFallback:'images/template-narrative-collage/style-reference.webp',
        reference:'images/template-narrative-collage/style-reference.webp',
        result:'images/template-narrative-collage/result-demo.webp',
        sourceName:{zh:'5 张项目图片',en:'5 project images'},
        downloadName:'baolong-architectural-landscape-narrative-collage-demo.png'
      },
      multiSource:true,
      sourceLimit:6,
      uploadText: {
        title:{zh:'上传 3–6 张项目图片',en:'Upload 3–6 project images'},
        copy:{zh:'拖入多张 PNG / JPG / WebP，或点击批量选择',en:'Drop multiple PNG / JPG / WebP files, or click to select'},
        limit:{zh:'当前仅做前端预览，图片不会上传',en:'This prototype only previews locally. Images are not uploaded.'}
      },
      inputDescription:{zh:'多张项目图 + 模板参考图',en:'Multiple project images + template reference'},
      advancedHint:{zh:'仅在需要时调整整体图面色调。',en:'Adjust the overall board tone only when needed.'},
      notesPlaceholder: {
        zh:'例如：整体更克制，网格更明显，减少前景焦点数量，保留更多顶部留白。',
        en:'Example: use a quieter composition, strengthen the grid, reduce foreground focal elements, and retain more top space.'
      },
      parameters: [
        {
          id:'collageLayering', type:'segmented', label:{zh:'拼贴层次',en:'Collage Layering'}, default:'standard',
          options:[
            {value:'light',label:{zh:'克制',en:'Restrained'}},
            {value:'standard',label:{zh:'标准',en:'Standard'}},
            {value:'strong',label:{zh:'增强',en:'Enhanced'}}
          ]
        },
        {
          id:'foregroundFocus', type:'segmented', label:{zh:'前景提取',en:'Foreground Focus'}, default:'standard',
          options:[
            {value:'light',label:{zh:'轻',en:'Light'}},
            {value:'standard',label:{zh:'标准',en:'Standard'}},
            {value:'clear',label:{zh:'明显',en:'Clear'}}
          ]
        },
        {
          id:'outlineIntensity', type:'segmented', label:{zh:'描边强度',en:'Outline Intensity'}, default:'light',
          options:[
            {value:'none',label:{zh:'无',en:'None'}},
            {value:'light',label:{zh:'轻',en:'Light'}},
            {value:'medium',label:{zh:'中',en:'Medium'}}
          ]
        },
        {
          id:'gridStrength', type:'segmented', label:{zh:'网格强度',en:'Grid Strength'}, default:'enhanced',
          options:[
            {value:'light',label:{zh:'轻',en:'Light'}},
            {value:'standard',label:{zh:'标准',en:'Standard'}},
            {value:'enhanced',label:{zh:'增强',en:'Enhanced'}}
          ]
        },
        {
          id:'boardTone', type:'segmented', advanced:true, label:{zh:'图面色调',en:'Board Tone'}, default:'warmgray',
          options:[
            {value:'gray',label:{zh:'灰白',en:'Gray'}},
            {value:'warmgray',label:{zh:'暖灰',en:'Warm Gray'}},
            {value:'dustyrose',label:{zh:'灰粉',en:'Dusty Rose'}}
          ]
        }
      ],
      loading: {
        zh:['内部测试：读取多张项目图片','内部测试：组织建筑与景观片段','内部测试：叙事拼贴示例'],
        en:['Internal test: project images','Internal test: architecture and landscape fragments','Internal test: narrative collage sample']
      },
      outputSpec:'1 image · PNG · 2K',
      visiblePromptBuilder: buildNarrativeCollageVisiblePrompt
    }
  };

  const requestedTemplateId = new URLSearchParams(window.location.search).get('template');
  const defaultTemplateId = 'ecological-architectural-section-v1';
  const activeTemplateId = templateConfigs[requestedTemplateId] ? requestedTemplateId : defaultTemplateId;
  const activeTemplate = templateConfigs[activeTemplateId];

  const state = {
    lang:'zh',
    sourceReady:false,
    sourceObjectUrl:null,
    sourceObjectUrls:[],
    parameterValues:{},
    timerIds:[],
    loadingStep:0
  };

  const uploadCard = $('#uploadCard');
  const sourceInput = $('#sourceInput');
  const uploadEmpty = $('#uploadEmpty');
  const uploadPreview = $('#uploadPreview');
  const sourcePreview = $('#sourcePreview');
  const sourcePreviewGrid = $('#sourcePreviewGrid');
  const sourceFilename = $('#sourceFilename');
  const generateButton = $('#generateButton');
  const resultEmpty = $('#resultEmpty');
  const resultLoading = $('#resultLoading');
  const resultSuccess = $('#resultSuccess');
  const resultActions = $('#resultActions');
  const progressBar = $('#progressBar');
  const loadingTitle = $('#loadingTitle');
  const notes = $('#notes');
  const promptPreview = $('#promptPreview');

  

  function buildEcologicalVisiblePrompt({lang, values, notesText}) {
    const colorMap = {
      light:{zh:'淡色彩',en:'light color'},
      standard:{zh:'标准色彩',en:'standard color'},
      strong:{zh:'强化色彩',en:'enhanced color'}
    };
    const ecologyMap = {
      follow:{zh:'跟随原图',en:'follow the source'},
      light:{zh:'轻度补充',en:'light supplementation'}
    };
    const peopleMap = {
      follow:{zh:'跟随原图',en:'follow the source'},
      remove:{zh:'去除人物',en:'remove people'}
    };
    const color = colorMap[values.colorIntensity]?.[lang] || colorMap.standard[lang];
    const ecology = ecologyMap[values.ecologyTreatment]?.[lang] || ecologyMap.follow[lang];
    const people = peopleMap[values.peopleHandling]?.[lang] || peopleMap.follow[lang];
    if (lang === 'zh') {
      return `生态景观建筑剖面，${color}，以上传的项目原图为唯一结构依据，保留原图中实际存在的建筑轮廓、空间关系、地形与主要场地元素，不新增原图中不存在的地下空间、车辆、交通构件或其他大型元素。生态处理：${ecology}；人物处理：${people}。白色或暖白色背景，精细技术线稿，低饱和淡彩，整体干净、专业、留白充足。${notesText ? `\n\n补充要求：${notesText}` : ''}`;
    }
    return `Ecological architectural section, ${color}, using the uploaded project image as the sole structural source. Preserve the architecture, spatial relationships, terrain, and major site elements that actually exist in the source, and do not add absent underground spaces, vehicles, circulation elements, or other large elements. Ecology treatment: ${ecology}; people handling: ${people}. White or warm-white background, fine technical linework, muted soft color, clean professional composition, and generous white space.${notesText ? `\n\nAdditional note: ${notesText}` : ''}`;
  }

  

  function buildForestGardenVisiblePrompt({lang, values, notesText}) {
    const ecologyMap = {
      light:{zh:'轻生态表达',en:'light ecology'},
      standard:{zh:'标准生态表达',en:'standard ecology'},
      strong:{zh:'强化生态表达',en:'enhanced ecology'}
    };
    const ecology = ecologyMap[values.ecologyIntensity]?.[lang] || ecologyMap.standard[lang];
    if (lang === 'zh') {
      return `森林花园生态剖面，${ecology}。以上传的项目原图为唯一结构与场地依据，保留原图中实际存在的建筑、平台、步道、水体、地形、植物、人物与剖切关系，不新增原图中不存在的空间、交通构件或大型场地元素。采用连续清晰的浅灰横向细纹背景、精细灰白技术线稿、少量低饱和灰粉与暗红点缀，以及克制的土层和根系说明，整体专业、安静、研究型且留白充分。${notesText ? `\n\n补充要求：${notesText}` : ''}`;
    }
    return `Forest Garden ecological section with ${ecology}. Use the uploaded project image as the sole structural and site source. Preserve existing architecture, platforms, paths, water, terrain, planting, people, and section relationships, and do not add absent spaces, circulation elements, or large site features. Use clearly visible pale-gray horizontal background lines, fine grayscale technical linework, restrained dusty-pink and dark-red accents, and controlled soil-root articulation for a quiet research-oriented graphic with generous negative space.${notesText ? `\n\nAdditional note: ${notesText}` : ''}`;
  }

  

  function buildUrbanBirdviewVisiblePrompt({lang, values, notesText}) {
    const strategyMap = {
      follow:{zh:'跟随原图',en:'Follow Source'},
      controlled:{zh:'受控延展',en:'Controlled Extension'}
    };
    const strategy = strategyMap[values.landscapeStrategy]?.[lang] || strategyMap.controlled[lang];
    if (lang === 'zh') {
      return `城市鸟瞰景观图解，景观策略：${strategy}。以上传的项目原图为唯一城市结构依据，保留原图中的建筑体量、屋顶、道路、广场、铺地、人物、车辆与主要空间关系，不复制风格参考图中的具体城市内容。采用灰白建筑细线、低饱和图解式平涂、面状绿地与统一树群表达；景观变化遵循所选策略，整体专业、安静、层级清楚。${notesText ? `

补充要求：${notesText}` : ''}`;
    }
    return `Urban birdview landscape diagram with the ${strategy} strategy. Use the uploaded project image as the sole urban-structure source. Preserve building massing, roofs, roads, plazas, paving, people, vehicles, and primary spatial relationships, and do not copy specific city content from the style reference. Use pale architectural linework, muted diagrammatic flat color, area-based greenery, and consistent tree groups. Apply landscape changes only according to the selected strategy, with a quiet professional hierarchy.${notesText ? `

Additional note: ${notesText}` : ''}`;
  }

  // Public preview only. The production instruction set is intentionally not shipped in the static client.
  function buildUrbanProgramDiagramVisiblePrompt({lang, notesText}) {
    if (lang === 'zh') {
      return `城市功能分区轴测图解。以上传的项目原图为唯一结构与场地依据，严格保留建筑数量、位置、体量、屋顶、场地边界、道路、水体、纪念物、座椅、线性设施与原有绿化范围。采用灰白城市背景、玫红与青蓝重点建筑、彩色体块上的白色立面线稿、橙绿场地分区，以及只出现在地面的克制白色圆点纹理。清理文字框和引线，不自动生成文字、标签、图例或箭头。${notesText ? `

补充要求：${notesText}` : ''}`;
    }
    return `Urban axonometric program diagram. Use the uploaded project image as the sole structural and site source. Strictly preserve building count, position, massing, roofs, site boundaries, roads, water, monuments, seating, linear facilities, and existing planting limits. Use a pale urban context, magenta and cyan key buildings, white façade linework over colored masses, orange-green site zoning, and restrained white dot texture on ground surfaces only. Remove text boxes and leader lines, and do not generate labels, legends, text, or arrows automatically.${notesText ? `

Additional note: ${notesText}` : ''}`;
  }

  // Public preview only. Full production instructions remain outside the static client.
  function buildArchitecturalAnalysisBaseVisiblePrompt({lang, values, notesText}) {
    const typeMap = {
      area:{zh:'区域高亮图',en:'Area Highlight'},
      mass:{zh:'重点体量图',en:'Key Massing'},
      roof:{zh:'屋顶露台高亮图',en:'Roof / Terrace Highlight'},
      node:{zh:'节点图',en:'Node Diagram'}
    };
    const ordered = [values.panelTopLeft, values.panelTopRight, values.panelBottomLeft, values.panelBottomRight]
      .map((value) => typeMap[value]?.[lang] || typeMap.area[lang]);
    if (lang === 'zh') {
      return `四类建筑分析图底图。以上传的项目原图为唯一结构依据，严格保留建筑体量、相对位置、道路、场地边界、轴测视角和整体构图；统一为白色或近白色体块、浅灰细线与低饱和图解风格。四宫格顺序：左上 ${ordered[0]}；右上 ${ordered[1]}；左下 ${ordered[2]}；右下 ${ordered[3]}。只生成无文字图解底图，不自动给出专业结论、准确标签或流线箭头，最终文字与箭头由用户后期添加。${notesText ? `

补充要求：${notesText}` : ''}`;
    }
    return `Four-panel architectural diagram bases. Use the uploaded project image as the sole structural source and strictly preserve massing, relative positions, roads, site boundaries, axonometric view, and overall composition. Convert the drawing into pale or near-white masses, fine gray linework, and muted diagram graphics. Panel order: top left ${ordered[0]}; top right ${ordered[1]}; bottom left ${ordered[2]}; bottom right ${ordered[3]}. Generate text-free diagram bases only; do not provide professional conclusions, accurate labels, or circulation arrows automatically. The user adds final labels and arrows later.${notesText ? `

Additional note: ${notesText}` : ''}`;
  }

  // Public preview only. Full production instructions remain in the private offline vault.
  function buildNarrativeCollageVisiblePrompt({lang, values, notesText}) {
    const layeringMap = {
      light:{zh:'克制拼贴层次',en:'restrained collage layering'},
      standard:{zh:'标准拼贴层次',en:'standard collage layering'},
      strong:{zh:'增强拼贴层次',en:'enhanced collage layering'}
    };
    const focusMap = {
      light:{zh:'轻前景提取',en:'light foreground extraction'},
      standard:{zh:'标准前景提取',en:'standard foreground extraction'},
      clear:{zh:'明显前景提取',en:'clear foreground extraction'}
    };
    const outlineMap = {
      none:{zh:'不使用描边',en:'no outlines'},
      light:{zh:'轻量选择性描边',en:'light selective outlines'},
      medium:{zh:'中等选择性描边',en:'medium selective outlines'}
    };
    const gridMap = {
      light:{zh:'轻网格',en:'light grid'},
      standard:{zh:'标准网格',en:'standard grid'},
      enhanced:{zh:'增强浅色网格',en:'enhanced pale grid'}
    };
    const toneMap = {
      gray:{zh:'灰白色调',en:'gray-white tone'},
      warmgray:{zh:'暖灰色调',en:'warm-gray tone'},
      dustyrose:{zh:'灰粉色调',en:'dusty-rose tone'}
    };
    const layering = layeringMap[values.collageLayering]?.[lang] || layeringMap.standard[lang];
    const focus = focusMap[values.foregroundFocus]?.[lang] || focusMap.standard[lang];
    const outline = outlineMap[values.outlineIntensity]?.[lang] || outlineMap.light[lang];
    const grid = gridMap[values.gridStrength]?.[lang] || gridMap.enhanced[lang];
    const tone = toneMap[values.boardTone]?.[lang] || toneMap.warmgray[lang];
    if (lang === 'zh') {
      return `建筑与景观综合叙事拼贴，输入为多张相关项目与场地图片。仅根据实际上传内容组织一个稳定中景主底板、少量前景焦点与辅助片段，不预设具体对象，不生成事实判断或专业结论。图面参数：${layering}；${focus}；${outline}；${grid}；${tone}。采用低饱和分析板语言、错落遮挡、不规则片段与后期标注留白；不生成文字、标题、时间线或箭头。${notesText ? `

补充要求：${notesText}` : ''}`;
    }
    return `Architectural and landscape narrative collage using multiple related project and site images. Organize one stable midground base, a small number of foreground focal fragments, and restrained supporting fragments from the uploaded content only. Do not preset specific objects or generate factual or professional conclusions. Settings: ${layering}; ${focus}; ${outline}; ${grid}; ${tone}. Use a muted analytical-board language with staggered overlaps, irregular fragments, and space for later annotation. Do not generate text, titles, timelines, or arrows.${notesText ? `

Additional note: ${notesText}` : ''}`;
  }

  function t(value) {
    if (typeof value === 'string') return value;
    return value?.[state.lang] || value?.zh || '';
  }

  function setList(element, items) {
    element.innerHTML = '';
    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      element.appendChild(li);
    });
  }

  function setImageWithFallback(image, primarySrc, fallbackSrc) {
    image.onerror = () => {
      image.onerror = null;
      if (fallbackSrc && image.src !== new URL(fallbackSrc, window.location.href).href) image.src = fallbackSrc;
    };
    image.src = primarySrc;
  }

  function renderTemplateStaticContent() {
    const title = t(activeTemplate.title);
    document.title = `${title} · BaoLong Lab`; 
    $('#headerTemplateTitle').textContent = title;
    $('#caseTemplateTitle').textContent = title;
    $('#templateSummary').textContent = t(activeTemplate.summary);
    $('#caseCaption').textContent = t(activeTemplate.caption);
    setImageWithFallback($('#styleReferenceImage'), activeTemplate.assets.display || activeTemplate.assets.reference, activeTemplate.assets.displayFallback || activeTemplate.assets.reference);
    $('#styleReferenceImage').alt = t(activeTemplate.imageAlt);
    $('#resultImage').src = activeTemplate.assets.result;
    const downloadButton = $('#downloadButton');
    if (downloadButton) {
      downloadButton.href = activeTemplate.assets.result;
      downloadButton.download = activeTemplate.assets.downloadName;
    }
    $('#priorityTitle').textContent = t(activeTemplate.priorityTitle);
    $('#priorityCopy').textContent = t(activeTemplate.priorityCopy);
    $('#templateNameOutput').textContent = title;
    $('#outputSpec').textContent = activeTemplate.outputSpec;
    $('#inputModeOutput').textContent = activeTemplate.inputDescription ? t(activeTemplate.inputDescription) : sharedTranslations[state.lang].twoImages;
    sourceInput.multiple = Boolean(activeTemplate.multiSource);
    if (activeTemplate.uploadText) {
      $('#uploadTitleText').textContent = t(activeTemplate.uploadText.title);
      $('#uploadCopyText').textContent = t(activeTemplate.uploadText.copy);
      $('#uploadLimitText').textContent = t(activeTemplate.uploadText.limit);
    }
    if (activeTemplate.advancedHint) $('#advancedSettingsPanel .advanced-settings-hint').textContent = t(activeTemplate.advancedHint);

    const tags = $('#templateTags');
    tags.innerHTML = '';
    activeTemplate.tags[state.lang].forEach((item) => {
      const span = document.createElement('span');
      span.className = 'template-tag';
      span.textContent = item;
      tags.appendChild(span);
    });

    setList($('#bestForList'), activeTemplate.bestFor[state.lang]);
    setList($('#notForList'), activeTemplate.notFor[state.lang]);
  }

  function renderParameters({preserveValues = true} = {}) {
    const primaryContainer = $('#dynamicParameters');
    const advancedContainer = $('#advancedParameters');
    const advancedPanel = $('#advancedSettingsPanel');
    const previousValues = preserveValues ? {...state.parameterValues} : {};
    state.parameterValues = {};
    primaryContainer.innerHTML = '';
    advancedContainer.innerHTML = '';

    const advancedParameters = activeTemplate.parameters.filter((parameter) => parameter.advanced);
    advancedPanel.hidden = advancedParameters.length === 0;
    $('#advancedSettingsCount').textContent = state.lang === 'zh'
      ? `${advancedParameters.length} ${sharedTranslations.zh.settingsUnit}`
      : `${advancedParameters.length} ${sharedTranslations.en.settingsUnit}`;

    activeTemplate.parameters.forEach((parameter) => {
      const fieldset = document.createElement('fieldset');
      const legend = document.createElement('legend');
      legend.textContent = t(parameter.label);
      fieldset.appendChild(legend);

      const selectedValue = previousValues[parameter.id] || parameter.default;
      state.parameterValues[parameter.id] = selectedValue;

      if (parameter.type === 'select') {
        const wrap = document.createElement('div');
        wrap.className = 'select-wrap';
        const select = document.createElement('select');
        select.id = parameter.id;
        select.dataset.parameterId = parameter.id;
        parameter.options.forEach((option) => {
          const node = document.createElement('option');
          node.value = option.value;
          node.textContent = t(option.label);
          node.selected = option.value === selectedValue;
          select.appendChild(node);
        });
        select.addEventListener('change', () => {
          const previousValue = state.parameterValues[parameter.id];
          const nextValue = select.value;
          if (parameter.uniqueGroup) {
            const conflict = activeTemplate.parameters.find((item) =>
              item.id !== parameter.id &&
              item.uniqueGroup === parameter.uniqueGroup &&
              state.parameterValues[item.id] === nextValue
            );
            if (conflict) {
              state.parameterValues[conflict.id] = previousValue;
              const conflictSelect = document.querySelector(`select[data-parameter-id="${conflict.id}"]`);
              if (conflictSelect) conflictSelect.value = previousValue;
            }
          }
          state.parameterValues[parameter.id] = nextValue;
          updatePrompt();
        });
        wrap.appendChild(select);
        fieldset.appendChild(wrap);
      }

      if (parameter.type === 'segmented') {
        const group = document.createElement('div');
        group.className = `segmented segmented-${parameter.options.length}`;
        group.dataset.parameterId = parameter.id;
        parameter.options.forEach((option) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.dataset.value = option.value;
          button.textContent = t(option.label);
          if (option.value === selectedValue) button.classList.add('is-active');
          button.addEventListener('click', () => {
            group.querySelectorAll('button').forEach((item) => item.classList.remove('is-active'));
            button.classList.add('is-active');
            state.parameterValues[parameter.id] = option.value;
            updatePrompt();
          });
          group.appendChild(button);
        });
        fieldset.appendChild(group);
      }

      const target = parameter.advanced ? advancedContainer : primaryContainer;
      target.appendChild(fieldset);
    });
  }


  function updateGenerateState() {
    generateButton.disabled = true;
    generateButton.setAttribute('aria-disabled', 'true');
  }

  function clearSourceObjectUrls() {
    if (state.sourceObjectUrl) URL.revokeObjectURL(state.sourceObjectUrl);
    state.sourceObjectUrl = null;
    state.sourceObjectUrls.forEach((url) => URL.revokeObjectURL(url));
    state.sourceObjectUrls = [];
  }

  function showSource(src, filename) {
    sourcePreviewGrid.innerHTML = '';
    sourcePreviewGrid.hidden = true;
    sourcePreview.hidden = false;
    sourcePreview.src = src;
    sourceFilename.textContent = filename;
    uploadEmpty.hidden = true;
    uploadPreview.hidden = false;
    state.sourceReady = true;
    updateGenerateState();
  }

  function showMultipleSources(items, filename) {
    sourcePreview.hidden = true;
    sourcePreviewGrid.innerHTML = '';
    items.forEach((item) => {
      const image = document.createElement('img');
      image.src = item.src;
      image.alt = item.name || '';
      sourcePreviewGrid.appendChild(image);
    });
    sourcePreviewGrid.hidden = false;
    sourceFilename.textContent = filename;
    uploadEmpty.hidden = true;
    uploadPreview.hidden = false;
    state.sourceReady = items.length >= 3;
    updateGenerateState();
  }

  function useFiles(fileList) {
    const files = Array.from(fileList || []).filter((file) => file.type.startsWith('image/'));
    if (!files.length) return;
    clearSourceObjectUrls();
    if (activeTemplate.multiSource) {
      const limited = files.slice(0, activeTemplate.sourceLimit || 6);
      state.sourceObjectUrls = limited.map((file) => URL.createObjectURL(file));
      showMultipleSources(limited.map((file, index) => ({src:state.sourceObjectUrls[index], name:file.name})), state.lang === 'zh' ? `${limited.length} 张图片` : `${limited.length} images`);
      return;
    }
    const file = files[0];
    state.sourceObjectUrl = URL.createObjectURL(file);
    showSource(state.sourceObjectUrl, file.name);
  }

  function promptText() {
    const builder = activeTemplate.visiblePromptBuilder;
    if (typeof builder !== 'function') return '';
    return builder({
      lang:state.lang,
      values:state.parameterValues,
      notesText:notes.value.trim()
    });
  }

  function updatePrompt() {
    promptPreview.textContent = promptText();
  }

  function clearTimers() {
    state.timerIds.forEach(clearTimeout);
    state.timerIds = [];
  }

  function setLoadingStep(index) {
    state.loadingStep = index;
    loadingTitle.textContent = activeTemplate.loading[state.lang][index];
  }

  function resetPrototype() {
    clearTimers();
    clearSourceObjectUrls();
    state.sourceReady = false;
    sourceInput.value = '';
    uploadEmpty.hidden = false;
    uploadPreview.hidden = true;
    sourcePreviewGrid.innerHTML = '';
    sourcePreviewGrid.hidden = true;
    sourcePreview.hidden = false;
    resultEmpty.hidden = true;
    resultLoading.hidden = true;
    resultSuccess.hidden = false;
    resultActions.hidden = false;
    progressBar.style.width = '0';
    notes.value = '';
    $('#notesCount').textContent = '0';
    renderParameters({preserveValues:false});
    updateGenerateState();
    updatePrompt();
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
    $$('[data-i18n]').forEach((node) => {
      const key = node.dataset.i18n;
      if (!(key in sharedTranslations[state.lang])) return;
      if (key === 'notesLabel') node.innerHTML = sharedTranslations[state.lang][key];
      else node.textContent = sharedTranslations[state.lang][key];
    });
    $$('[data-i18n-placeholder]').forEach((node) => {
      node.placeholder = sharedTranslations[state.lang][node.dataset.i18nPlaceholder];
    });
    if (activeTemplate.notesPlaceholder) notes.placeholder = t(activeTemplate.notesPlaceholder);
    $('#langToggle').textContent = state.lang === 'zh' ? 'EN' : '中';
    renderTemplateStaticContent();
    renderParameters({preserveValues:true});
    updatePrompt();
    if (!resultLoading.hidden) setLoadingStep(state.loadingStep);
  }

  uploadCard.addEventListener('click', () => sourceInput.click());
  uploadCard.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      sourceInput.click();
    }
  });
  sourceInput.addEventListener('change', () => useFiles(sourceInput.files));
  ['dragenter','dragover'].forEach((name) => uploadCard.addEventListener(name, (event) => {
    event.preventDefault();
    uploadCard.classList.add('is-dragover');
  }));
  ['dragleave','drop'].forEach((name) => uploadCard.addEventListener(name, (event) => {
    event.preventDefault();
    uploadCard.classList.remove('is-dragover');
  }));
  uploadCard.addEventListener('drop', (event) => useFiles(event.dataTransfer.files));

  $('#useDemoButton').addEventListener('click', () => {
    clearSourceObjectUrls();
    if (activeTemplate.multiSource && Array.isArray(activeTemplate.assets.demoSources)) {
      showMultipleSources(activeTemplate.assets.demoSources.map((src, index) => ({src, name:`demo-${index + 1}`})), t(activeTemplate.assets.sourceName));
      return;
    }
    showSource(activeTemplate.assets.source, t(activeTemplate.assets.sourceName));
  });

  notes.addEventListener('input', () => {
    $('#notesCount').textContent = notes.value.length;
    updatePrompt();
  });

  $('#resetButton').addEventListener('click', resetPrototype);

  const detailDialog = $('#detailDialog');
  $('#detailButton').addEventListener('click', () => {
    updatePrompt();
    if (typeof detailDialog.showModal === 'function') detailDialog.showModal();
    else detailDialog.setAttribute('open', '');
  });
  $('#detailClose').addEventListener('click', () => detailDialog.close());
  detailDialog.addEventListener('click', (event) => {
    if (event.target === detailDialog) detailDialog.close();
  });

  $('#copyPromptButton').addEventListener('click', async () => {
    const button = $('#copyPromptButton');
    try {
      await navigator.clipboard.writeText(promptPreview.textContent);
      button.textContent = sharedTranslations[state.lang].copied;
      setTimeout(() => button.textContent = sharedTranslations[state.lang].copy, 1200);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(promptPreview);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });


  const backButton = $('#backToPromptButton');
  if (backButton) {
    backButton.addEventListener('click', (event) => {
      event.preventDefault();
      try {
        const ref = document.referrer ? new URL(document.referrer) : null;
        if (ref && /prompt-generator\.html$/i.test(ref.pathname)) {
          window.history.back();
          return;
        }
      } catch {}
      window.location.href = backButton.getAttribute('href');
    });
  }

  $('#langToggle').addEventListener('click', () => {
    state.lang = state.lang === 'zh' ? 'en' : 'zh';
    applyLanguage();
  });

  renderParameters({preserveValues:false});
  applyLanguage();
  updateGenerateState();
})();
