(() => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const sharedTranslations = {
    zh: {
      workflowLabel:'Prompt 工作流', templateKicker:'IMAGE TEMPLATE', backToPrompt:'返回 Prompt 灵感', caseKicker:'模板案例', scopeToggle:'查看适用范围', bestForTitle:'适合', notForTitle:'暂不适合', inputKicker:'项目输入', inputTitle:'上传与参数', uploadTitle:'上传项目原图', uploadCopy:'拖入 PNG / JPG / WebP，或点击选择文件', uploadLimit:'当前仅做前端预览，图片不会上传', replaceImage:'点击或拖入新图替换', useDemo:'使用示例原图', notesLabel:'补充要求 <span>（选填）</span>', notesPlaceholder:'例如：保留左侧大树，弱化土层，不改变屋顶结构。', notesHint:'最多 120 字', advancedSettings:'高级设置', advancedSettingsHint:'仅在需要时调整生态与人物处理。', settingsUnit:'项', estimateLabel:'输出设置', creditUnit:'张图片', generate:'生成图片', resultKicker:'生成结果', resultTitle:'预览与操作', emptyTitle:'结果会显示在这里', emptyCopy:'上传项目图并点击生成，体验完整流程。', loadingCopy:'请稍候，生成完成后会自动显示结果。', mockResult:'流程示例图', download:'下载图片', regenerate:'重新生成', reset:'重置', detailKicker:'PROMPT PREVIEW', detailTitle:'本次 Prompt', promptTitle:'可复制 Prompt', copy:'复制', copied:'已复制', generationInfoTitle:'生成信息', templateNameLabel:'模板', inputMode:'输入方式', twoImages:'项目原图 + 模板参考图', outputMode:'输出', viewDetail:'查看 Prompt'
    },
    en: {
      workflowLabel:'Prompt Workflow', templateKicker:'IMAGE TEMPLATE', backToPrompt:'Back to Prompt Inspiration', caseKicker:'TEMPLATE CASE', scopeToggle:'View use cases', bestForTitle:'Recommended', notForTitle:'Not yet recommended', inputKicker:'PROJECT INPUT', inputTitle:'Upload & Parameters', uploadTitle:'Upload project image', uploadCopy:'Drop PNG / JPG / WebP here, or click to choose', uploadLimit:'This prototype only previews locally. The image is not uploaded.', replaceImage:'Click or drop a new image to replace', useDemo:'Use demo source', notesLabel:'Additional Notes <span>(Optional)</span>', notesPlaceholder:'Example: keep the large tree, soften the soil layer, and preserve the roof structure.', notesHint:'Up to 120 characters', advancedSettings:'Advanced Settings', advancedSettingsHint:'Adjust ecology and people handling only when needed.', settingsUnit:'settings', estimateLabel:'Output', creditUnit:'image', generate:'Generate Image', resultKicker:'RESULT', resultTitle:'Preview & Actions', emptyTitle:'Your result will appear here', emptyCopy:'Upload a project image and generate to preview the full flow.', loadingCopy:'Please wait. The result will appear automatically when generation is complete.', mockResult:'Workflow sample', download:'Download Image', regenerate:'Regenerate', reset:'Reset', detailKicker:'PROMPT PREVIEW', detailTitle:'Prompt Preview', promptTitle:'Copy-ready Prompt', copy:'Copy', copied:'Copied', generationInfoTitle:'Generation Information', templateNameLabel:'Template', inputMode:'Input', twoImages:'Project image + template reference', outputMode:'Output', viewDetail:'View Prompt'
    }
  };

  const templateConfigs = {
    'ecological-architectural-section-v1': {
      sourceCaseId:'case17',
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
        source:'images/template-p0/source-demo.png',
        display:'images/template-p0/result-demo.png',
        displayFallback:'images/template-p0/style-reference.png',
        reference:'images/template-p0/style-reference.png',
        result:'images/template-p0/result-demo.png',
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
        zh:['正在分析项目原图','正在应用模板参数','正在生成图像'],
        en:['Analyzing project image','Applying template parameters','Generating image']
      },
      outputSpec:'1 image · PNG · 2K',
      visiblePromptBuilder: buildEcologicalVisiblePrompt,
      promptBuilder: buildEcologicalSectionPrompt
    },
    'forest-garden-ecological-section-v1': {
      sourceCaseId:'case18',
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
        source:'images/template-forest-garden/source-demo.png',
        display:'images/template-forest-garden/result-demo.png',
        displayFallback:'images/template-forest-garden/style-reference.png',
        reference:'images/template-forest-garden/style-reference.png',
        result:'images/template-forest-garden/result-demo.png',
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
        zh:['正在分析项目原图','正在应用生态表达参数','正在生成图像'],
        en:['Analyzing project image','Applying ecology intensity','Generating image']
      },
      outputSpec:'1 image · PNG · 2K',
      visiblePromptBuilder: buildForestGardenVisiblePrompt,
      promptBuilder: buildForestGardenPrompt
    },
    'urban-birdview-landscape-diagram-v1': {
      sourceCaseId:'case19',
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
        source:'images/template-urban-birdview/source-demo.png',
        display:'images/template-urban-birdview/result-demo.png',
        displayFallback:'images/template-urban-birdview/style-reference.jpg',
        reference:'images/template-urban-birdview/style-reference.jpg',
        result:'images/template-urban-birdview/result-demo.png',
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
        zh:['正在分析城市结构','正在应用景观策略','正在生成图像'],
        en:['Analyzing urban structure','Applying landscape strategy','Generating image']
      },
      outputSpec:'1 image · PNG · 2K',
      visiblePromptBuilder: buildUrbanBirdviewVisiblePrompt,
      promptBuilder: buildUrbanBirdviewPrompt
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
    parameterValues:{},
    timerIds:[],
    loadingStep:0
  };

  const uploadCard = $('#uploadCard');
  const sourceInput = $('#sourceInput');
  const uploadEmpty = $('#uploadEmpty');
  const uploadPreview = $('#uploadPreview');
  const sourcePreview = $('#sourcePreview');
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

  function buildEcologicalSectionPrompt({lang, values, notesText}) {
    const colorMap = {
      light:{
        zh:'使用极淡、接近透明的浅灰绿、米白、浅蓝灰和少量柔和土黄色。整体接近轻微平涂，建筑主体保持接近白色，保留大量白色留白。',
        en:'Use very pale, nearly transparent sage green, off-white, light blue-gray, and small touches of soft ochre. Keep the image close to a light wash, preserve the building body near white, and retain generous white space.'
      },
      standard:{
        zh:'使用低饱和浅灰绿、米白、浅蓝灰和柔和土黄色，形成适度、克制且清晰的色彩层次，建筑结构始终保持清楚。',
        en:'Use muted sage green, off-white, light blue-gray, and soft ochre to create moderate, restrained, and readable color layers while keeping the architectural structure clear.'
      },
      strong:{
        zh:'仍然保持低饱和，仅通过已有区域的明度、透明度和颜色差异，加强植物、建筑、地表与土壤之间的区分。不得新增材料纹理，不得改变材料类型、构造形式、纹理方向或建筑细节，不得把屋顶、墙面、楼板或室内地面重新解释为木结构或其他新材料。',
        en:'Keep the palette low in saturation and strengthen distinction among planting, architecture, ground, and soil only through brightness, opacity, and color differences within existing regions. Do not add material textures or change material types, construction forms, texture directions, or architectural details. Do not reinterpret the roof, walls, slabs, or interior floors as timber construction or any new material.'
      }
    };
    const ecologyMap = {
      follow:{
        zh:'生态处理采用“跟随原图”：仅整理和轻度细化图1中实际存在的植物、地表、土层与根系；图1中没有出现的生态元素不得新增。',
        en:'Ecology treatment follows the source: only refine and lightly clarify planting, ground, soil, and roots that actually exist in Image 1. Do not add ecological elements that are absent from the source.'
      },
      light:{
        zh:'生态处理采用“轻度补充”：优先保留图1已有生态元素；若原图植物较少，只能在既有室外与土层边界内少量补充低矮灌木、草本、地被及合理根系线条，作为辅助表达。不得新增大型树木，不得改变地形、道路、建筑边界或剖切关系，不得遮挡建筑。',
        en:'Ecology treatment uses light supplementation: preserve existing ecological elements first. If planting is sparse, add only a small amount of low shrubs, herbaceous planting, groundcover, and plausible root lines within existing outdoor and soil boundaries as secondary expression. Do not add large trees, change terrain, roads, building boundaries, or section relationships, or obscure the architecture.'
      }
    };
    const peopleMap = {
      follow:{
        zh:'人物处理采用“跟随原图”：图1中已有的人物保持数量、位置、尺度与姿态关系；图1中没有人物时不得新增。',
        en:'People handling follows the source: preserve the number, position, scale, and pose relationships of people already present in Image 1. If the source has no people, add none.'
      },
      remove:{
        zh:'人物处理采用“去除人物”：允许仅删除图1中的人物轮廓，并自然补齐人物背后的原有界面；除此之外不得删除或改变家具、设备、空间、建筑与场地元素，也不得新增人物。',
        en:'People handling removes people: only human figures may be removed, with the original surfaces behind them restored naturally. Do not delete or alter furniture, equipment, spaces, architecture, or site elements, and do not add new people.'
      }
    };
    const color = colorMap[values.colorIntensity]?.[lang] || colorMap.standard[lang];
    const ecology = ecologyMap[values.ecologyTreatment]?.[lang] || ecologyMap.follow[lang];
    const people = peopleMap[values.peopleHandling]?.[lang] || peopleMap.follow[lang];

    if (lang === 'zh') {
      return `【图像使用规则】
图1是用户上传的项目原图，是画幅、构图、建筑结构、空间内容、地形、场地元素和剖切关系的唯一依据。
图2只用于参考精细线条、低饱和淡彩、植物表达和专业生态剖面的视觉语言。
不得复制图2中的具体建筑、道路、人物、标注、构造、材料或场景内容。

【通用结构保护】
除下方“生态处理”和“人物处理”明确允许的变化外，只保留并优化图1中实际存在的内容。完整保留图1的画幅比例、取景范围、主体位置与尺度，以及图1中真实出现的建筑轮廓、屋顶、楼层、墙体、楼板、柱子、门窗、开口、楼梯、室内空间、家具、地下空间、车库、汽车、道路、水体、地形、植物、基础、地面线和剖切关系。

图1中存在的主要元素必须保持位置、数量、尺度和相互关系不变；图1中没有出现的建筑、空间、交通与大型场地元素绝对不得自行添加。特别禁止凭空新增地下室、地下车库、汽车、楼梯、室外台阶、坡道、平台、道路、水体、楼层、房间、大型树木、大型构筑物、梁、檩条、屋架、吊顶或其他结构与交通构件。不得增加、删除、移动、替换、合并或重新设计任何主要建筑空间与场地要素。

【模板表达】
将图1转换为精致的生态景观建筑剖面表达图。保持白色或暖白色背景、细而清晰的技术线稿和充分留白。${color}

${ecology}
根系或土壤纹理只能出现在合理的既有地表与地下土层中，不得生成新的地下空间或工程构造。

${people}

【禁止项】
不要写实摄影，不要商业地产效果图，不要厚重水彩，不要强烈纸纹，不要粗黑线，不要高饱和，不要强烈阴影，不要夜景，不要赛博朋克。
不要新增文字、编号、箭头、图例、Logo 或水印。
不要改变建筑材料系统，不要新增木梁、木檩条、木屋架、木饰面、砖墙或新的材料纹理。
最终结果必须忠实于图1，只改变表达风格、色彩层次及参数明确允许的内容，不改变项目设计本身。${notesText ? `\n\n【用户补充】\n${notesText}` : ''}`;
    }

    return `[IMAGE RULES]
Image 1 is the user-uploaded project source and the sole reference for framing, composition, architectural structure, spatial content, terrain, site elements, and section relationships. Image 2 is used only as a visual reference for fine linework, muted soft color, planting expression, and professional ecological-section language. Do not copy any specific building, road, person, annotation, construction detail, material, or scene content from Image 2.

[UNIVERSAL STRUCTURE GUARD]
Except for changes explicitly allowed by Ecology Treatment and People Handling below, preserve and refine only content that actually exists in Image 1. Preserve its aspect ratio, framing, subject position and scale, and all real building outlines, roofs, levels, walls, slabs, columns, doors, windows, openings, stairs, interior spaces, furniture, underground spaces, garages, cars, roads, water, terrain, planting, foundations, ground lines, and section relationships.

Major elements present in Image 1 must retain their position, quantity, scale, and relationships. Never add architectural, spatial, circulation, or large site elements absent from the source. Especially do not invent basements, underground garages, cars, stairs, exterior steps, ramps, platforms, roads, water bodies, levels, rooms, large trees, large structures, beams, purlins, roof trusses, ceilings, or other structural and circulation elements. Do not add, remove, move, replace, merge, or redesign major architectural spaces or site elements.

[TEMPLATE EXPRESSION]
Transform Image 1 into a refined ecological landscape architectural section. Keep a white or warm-white background, fine readable technical linework, and generous white space. ${color}

${ecology}
Roots or soil textures may appear only within plausible existing ground and underground soil layers and must not create new underground spaces or engineering structures.

${people}

[NEGATIVE CONSTRAINTS]
Avoid photorealistic photography, commercial real-estate visualization, heavy watercolor, strong paper texture, thick black lines, saturated color, dramatic shadows, night scenes, and cyberpunk styling. Add no text, numbers, arrows, legends, logos, or watermarks. Do not change the building material system or add timber beams, timber purlins, timber roof trusses, timber finishes, brick walls, or new material textures. The final result must remain faithful to Image 1 and may change only visual presentation, color hierarchy, and content explicitly allowed by the selected parameters.${notesText ? `\n\n[USER NOTE]\n${notesText}` : ''}`;
  }

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

  function buildForestGardenPrompt({lang, values, notesText}) {
    const ecologyMap = {
      light:{
        zh:'生态表达采用“轻”：尽量跟随图1原有状态，只轻微整理已有植物、地表和土层关系。根系仅在必要位置少量可见，土壤剖面保持简洁，不使植物明显增密，也不遮挡主体。',
        en:'Use light ecology expression: closely follow Image 1 and only lightly clarify existing planting, ground, and soil relationships. Keep roots sparse and soil articulation simple; do not noticeably densify planting or obscure the subject.'
      },
      standard:{
        zh:'生态表达采用“标准”：在图1既有场地逻辑内，适度增强植物层次、土壤剖面和根系说明感。土层界面更清楚、根系更连贯、植物更有组织，但保持克制、通透与主体可读性。',
        en:'Use standard ecology expression: within the existing site logic of Image 1, moderately strengthen planting layers, soil section clarity, and root articulation. Keep soil interfaces clearer, roots more continuous, and planting more organized while preserving restraint and readability.'
      },
      strong:{
        zh:'生态表达采用“强化”：在图1既有场地范围内，明显增强植物—地表—土壤—根系之间的生态说明感，使土壤剖面、根系网络和低饱和生态点缀比标准档更清晰。不得遮挡主体、堆满植物或新增任何交通构件与构筑物。',
        en:'Use enhanced ecology expression: within the existing site boundaries of Image 1, clearly strengthen planting-ground-soil-root relationships so soil sections, root networks, and muted ecological accents read more strongly than the standard level. Do not obscure the subject, overcrowd planting, or add circulation elements or structures.'
      }
    };
    const ecology = ecologyMap[values.ecologyIntensity]?.[lang] || ecologyMap.standard[lang];

    if (lang === 'zh') {
      return `【图像角色】
图1是用户上传的项目原图，是画幅比例、取景范围、构图、建筑结构、空间内容、地形、场地元素和剖切关系的唯一依据。
图2只用于参考森林花园生态说明图的视觉语言，包括精细植物线稿、植物层次、土层与根系表达、浅灰横向背景纹理、灰白主色、少量暗红或灰粉点缀、研究型图面气质和充分留白。
不得复制图2中的具体建筑、植物个体与树形组合、动物、道路、地图、文字、标题、编号、箭头、分析图、图例、说明栏或版式组件。

【通用结构保护】
只保留并优化图1中实际存在的内容。完整保留图1的画幅比例、取景范围、主体位置与尺度，以及图1中真实出现的建筑轮廓、屋顶、楼层、墙体、楼板、柱子、门窗、开口、楼梯、室内空间、家具、人物、动物、地下空间、车库、汽车、道路、水体、平台、步道、地形、植物、基础、地面线和剖切关系。
图1中存在的元素必须保持位置、数量、尺度和相互关系不变；图1中没有出现的元素绝对不得自行添加。特别禁止凭空新增或删除地下空间、车库、汽车、楼梯、室外台阶、坡道、平台、道路、水体、人物、动物、楼层、房间、大型树木群、主要建筑体量、大型构筑物、梁、檩条、屋架、吊顶或其他结构与交通构件。不得增加、删除、移动、替换、合并或重新设计任何主要建筑空间与场地要素。

【森林花园固定表达】
将图1转换为精致、克制、研究型的森林花园生态建筑或景观剖面表达图。保持暖白至浅灰背景、细而清晰的技术线稿、轻柔植物轮廓、充分留白和安静的说明图气质。
在天空及大面积空白背景区域中加入连续、均匀、清晰可见的浅灰横向平行细线纹理。横线密度中等、间距稳定，从画面左侧连续延伸至右侧，在正常浏览尺寸下可明确识别；纹理灰度明显区别于纯白背景，但仍低于主体线稿。不得淡化为几乎不可见的纸纹，也不得变成网格、污渍、颗粒或随机噪点。纹理只出现在天空和空白背景，不覆盖建筑、植物、地形、土层、水体、文字或比例尺。
整体以暖白、浅灰和石墨灰为主，植物大部分保持灰白细线稿，仅使用少量低饱和灰绿、灰粉、暗酒红或红棕色作为生态信息点缀；既有土层可使用克制的深灰剖面与细密浅色根系，色彩不得遮挡主体结构。

${ecology}
所有生态变化只能发生在图1已有的植物、地表、水体和土层范围内。生态线条、植物密度和根系不得遮挡建筑轮廓、柱、楼板、开口、室内空间、平台、步道、基础和主要地形线。

【禁止项】
不要写实摄影，不要商业地产效果图，不要厚重水彩，不要浓重纸张肌理，不要粗黑线，不要高饱和，不要强烈阴影，不要戏剧性光照，不要夜景，不要赛博朋克，不要油画或三维渲染质感。
不要新增文字、标题、编号、箭头、图例、Logo、水印、地图、分析小图、圆形图表或说明栏。
不要改变建筑材料系统，不要新增木梁、木檩条、木屋架、木饰面、砖墙或新的材料纹理。
最终结果必须忠实于图1，只改变森林花园图面表达与所选生态强度，不改变项目设计本身。${notesText ? `\n\n【用户补充】\n${notesText}` : ''}`;
    }

    return `[IMAGE ROLES]
Image 1 is the user-uploaded project source and the sole reference for aspect ratio, framing, composition, architecture, spatial content, terrain, site elements, and section relationships. Image 2 is used only for Forest Garden visual language: fine botanical linework, planting layers, soil-root articulation, visible pale-gray horizontal background lines, grayscale hierarchy, restrained dark-red or dusty-pink accents, research-graphic character, and generous negative space. Do not copy specific buildings, individual plants, tree groupings, animals, roads, maps, text, titles, labels, arrows, diagrams, legends, sidebars, or layout components from Image 2.

[UNIVERSAL SOURCE GUARD]
Preserve and refine only content that actually exists in Image 1. Preserve its aspect ratio, framing, subject position and scale, and all existing architecture, roofs, levels, walls, slabs, columns, openings, stairs, interiors, furniture, people, animals, underground spaces, garages, cars, roads, water, platforms, paths, terrain, planting, foundations, ground lines, and section relationships. Elements present in Image 1 must retain their position, quantity, scale, and relationships. Never add or remove absent underground spaces, garages, cars, stairs, exterior steps, ramps, platforms, roads, water, people, animals, levels, rooms, large tree groups, major building masses, large structures, beams, purlins, roof trusses, ceilings, or circulation elements. Do not add, remove, move, replace, merge, or redesign major architectural or site elements.

[FOREST GARDEN EXPRESSION]
Transform Image 1 into a refined, restrained, research-oriented Forest Garden architectural or landscape section. Use a warm-white to pale-gray background, fine readable technical linework, soft planting outlines, ample negative space, and a quiet explanatory-graphic character.
Add continuous, uniform, clearly visible pale-gray horizontal parallel lines only across sky and broad empty background areas. Use medium density and stable spacing, extending from left to right and remaining legible at normal viewing size. The lines must read above pure white but below the main subject linework. Do not reduce them to nearly invisible paper grain or turn them into grids, stains, particles, or random noise. Do not place them over architecture, planting, terrain, soil, water, text, or scale bars.
Keep the palette warm white, pale gray, and graphite gray. Preserve most planting as grayscale linework and use only small amounts of muted gray-green, dusty pink, dark wine red, or red-brown as ecological accents. Existing soil may use restrained dark-gray section fills and fine pale roots without obscuring the subject.

${ecology}
All ecological changes must stay within planting, ground, water, and soil areas already present in Image 1. Ecology linework, planting density, and roots must not obscure architecture, columns, slabs, openings, interiors, platforms, paths, foundations, or major terrain lines.

[NEGATIVE CONSTRAINTS]
Avoid photorealism, commercial real-estate visualization, heavy watercolor, strong paper texture, thick black lines, high saturation, dramatic shadows, theatrical lighting, night scenes, cyberpunk, oil-painting, or 3D-rendered appearance. Add no text, titles, numbers, arrows, legends, logos, watermarks, maps, analysis diagrams, circular charts, or sidebars. Do not change material systems or add timber beams, purlins, roof trusses, timber finishes, brick walls, or new material textures. The final result must remain faithful to Image 1 and may change only Forest Garden graphic expression and the selected ecology intensity.${notesText ? `\n\n[USER NOTE]\n${notesText}` : ''}`;
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

  function buildUrbanBirdviewPrompt({lang, values, notesText}) {
    const strategyMap = {
      follow:{
        zh:'采用“跟随原图”策略。只处理图1中已经明确存在的树木、树池、种植盒、庭院绿地、退界绿带、屋顶绿化或其他清晰可识别的种植区域。允许在这些既有绿地内部整理植物层次、补足地被与灌木、统一树群表达，使原有绿化更完整、更协调，但不得扩大任何绿化边界。图1中没有明确绿化依据的道路边缘、背景空地、硬质铺地、广场、屋顶和开放空间必须保持原状，不新增树木、草地或种植带。即使原图绿化较少，也要保持克制；本模式的目标是尊重原图绿化范围，只做内部优化，不进行空间扩张。',
        en:'Use the Follow Source strategy. Work only within trees, tree pits, planting beds, courtyard planting, setback green strips, green roofs, or other planting areas clearly present in Image 1. Refine planting layers, groundcover, shrubs, and tree-group consistency inside those existing areas, but do not expand any planting boundary. Road edges, background voids, hardscape, plazas, roofs, and open spaces without clear planting evidence must remain unchanged. Even when planting is sparse, remain restrained; this mode improves existing planting internally without spatial expansion.'
      },
      controlled:{
        zh:'采用“受控延展”策略。先完整保留并优化图1中已经存在的树木、树池、种植盒、庭院绿地、退界绿带和其他明确绿化区域，再允许沿这些既有绿化线索，向与其直接相邻、边界清楚且具备合理景观条件的空间做小至中等范围的连续延展。可延展位置仅包括建筑退界、道路边缘的非通行带、庭院边缘、相邻开放空间和明确可景观化的灰空间；延展必须与原有绿地相连或具有清楚的场地依据。不得跨越或侵占机动车道、斑马线、主要人行通道、建筑轮廓、核心硬质广场和主要交通空间；不得在无依据的背景空地或屋顶新增孤立绿化。本模式的目标是在不改变城市结构与硬质空间秩序的前提下，形成比“跟随原图”更连续、更完整的低饱和景观网络，而不是重新设计整个场地。',
        en:'Use the Controlled Extension strategy. First preserve and refine all trees, tree pits, planting beds, courtyard planting, setback green strips, and other clear green areas already present in Image 1. Then allow small-to-moderate continuous extension only from those existing planting cues into directly adjacent, clearly bounded spaces with plausible landscape conditions. Eligible areas are limited to building setbacks, non-circulation strips along roads, courtyard edges, adjacent open spaces, and clearly landscapeable residual spaces. Every extension must connect to existing planting or have a clear site basis. Do not cross into or occupy vehicle lanes, crossings, primary pedestrian routes, building footprints, core hard plazas, or major circulation spaces, and do not add isolated planting to unsupported background voids or roofs. The goal is a more continuous muted landscape network than Follow Source without redesigning the site.'
      }
    };
    const strategy = strategyMap[values.landscapeStrategy]?.[lang] || strategyMap.controlled[lang];

    if (lang === 'zh') {
      return `【图像角色】
图1是用户上传的城市鸟瞰 / 轴测项目原图，是画幅比例、取景范围、建筑体量、屋顶轮廓、道路走向、广场边界、开放空间、水体、人物、车辆、树木与城市空间关系的唯一依据。
图2只用于参考低饱和、图解式平涂的城市鸟瞰景观表达，包括灰白建筑线稿、成片绿地组织、图解式树群、清晰色块边界、整体留白与安静的作品集图面气质。
不得复制图2中的具体城市、建筑、山体、云、道路布局、公园形状、树木组合、人物活动与整体构图。

【原图保护】
只保留并优化图1中实际存在的内容。完整保留图1的画幅比例、取景范围、视角、主体位置与尺度，以及图1中真实出现的建筑数量、建筑体量、屋顶、道路、街巷、广场、院落、开放空间、水体、人物、车辆、树木、铺地和场地边界。
图1中已有的元素必须保持位置、数量、尺度和相互关系不变；图1中没有的建筑、道路、水体、广场、桥梁、地形、人物、车辆和大型绿地不得新增。
不得移动、合并、删除或重新设计建筑体量、道路网络、街角关系、广场边界、屋顶轮廓和主要公共空间。

【标注与色块处理】
忽略图1中的文字、编号、箭头、图例、标签、彩色标注块和说明性界面元素；这些内容不得被复制、重绘或转化为新的建筑、铺地、绿地、水体或交通设施。
若图1中存在青色、粉色、黄色、蓝色等分析色块，只把它们视为原图标注，不得直接照搬为最终颜色和材质。

【城市鸟瞰景观图解表达】
将图1转换为精致、克制、低饱和、图解式平涂的城市鸟瞰景观图解 / 轴测表达。
建筑以暖白、浅灰和非常轻的细线表现，保持体量清晰、立面和屋顶层级可读；远景建筑可更淡，但不得缺失或变形。
道路、广场和硬质铺地保持浅灰白、低对比、边界清楚；人物和车辆保持少量、细小、低存在感。
景观绿化采用边界清晰的浅灰绿、鼠尾草绿、橄榄绿、浅黄绿与少量深绿点缀进行成片平涂；树冠和树群保持统一、图解化、克制，不做写实渲染。
绿化表达必须以“面状绿地 + 图解式树群”为主，而不是只零散增加单棵街树。
整体保持专业、安静、留白充足的城市设计作品集与竞赛图纸气质，不做商业地产鸟瞰效果图，不做水彩晕染。

【景观空间策略】
${strategy}
两种模式都必须保持图1建筑、道路、广场、铺地和交通关系不变；模式差异只在于是否允许绿化边界向相邻合理空间延展。
无法明确判断为绿地或可景观化空间的区域，默认保持原有硬质或中性表达，不主动填绿。

【色彩与表现控制】
整体色彩低饱和、柔和、统一。建筑保持浅灰白与极浅灰关系，绿化以低饱和灰绿、浅橄榄绿、浅黄绿为主，局部可使用更深一档绿色形成层次，但必须克制。
色块边界应干净、清晰、平涂，不出现水彩晕染、厚重纸纹、写实材质、强烈阴影或高饱和色块。
整体更像景观规划图解和城市设计鸟瞰表达，而不是写实效果图。

【禁止项】
不要写实摄影，不要商业地产效果图，不要高饱和，不要强阴影，不要戏剧性光照，不要夜景，不要厚重水彩，不要油画或三维渲染质感。
不要新增文字、标题、编号、箭头、图例、Logo、水印、地图、分析小图或说明栏。
不要改变建筑材料系统，不要新增复杂立面、玻璃幕墙、屋顶构筑物或新的交通设施。
最终结果必须忠实于图1，只改变表达方式、色彩层次与所选景观空间策略，不得改变项目设计本身。${notesText ? `

【用户补充】
${notesText}` : ''}`;
    }

    return `[IMAGE ROLES]
Image 1 is the user-uploaded urban birdview or axonometric project source and the sole reference for aspect ratio, framing, building massing, roof outlines, road alignments, plaza boundaries, open spaces, water, people, vehicles, trees, and urban spatial relationships. Image 2 is used only as a reference for muted diagrammatic flat-color urban landscape expression: pale architectural linework, area-based greenery, diagrammatic tree groups, clean color boundaries, generous negative space, and a quiet portfolio character. Do not copy the specific city, buildings, mountains, clouds, road layout, park shapes, tree groupings, activities, or composition from Image 2.

[SOURCE GUARD]
Preserve and refine only content that actually exists in Image 1. Preserve its aspect ratio, framing, viewpoint, subject position and scale, and all existing building counts, massing, roofs, roads, streets, plazas, courtyards, open spaces, water, people, vehicles, trees, paving, and site boundaries. Existing elements must retain their positions, quantities, scales, and relationships. Do not add absent buildings, roads, water, plazas, bridges, terrain, people, vehicles, or large green areas. Do not move, merge, remove, or redesign building massing, road networks, corner relationships, plaza boundaries, roof outlines, or primary public spaces.

[ANNOTATION HANDLING]
Ignore text, numbers, arrows, legends, labels, colored annotation blocks, and interface-style analytical elements in Image 1. Do not reproduce, redraw, or reinterpret them as architecture, paving, greenery, water, or transportation. Treat cyan, pink, yellow, blue, and similar analytical color blocks only as source annotations, not as final materials or colors.

[URBAN BIRDVIEW LANDSCAPE DIAGRAM]
Transform Image 1 into a refined, restrained, muted, diagrammatic flat-color urban birdview or axonometric landscape diagram. Use warm white, pale gray, and very light linework for architecture while keeping massing, façades, and roof hierarchy readable. Distant buildings may be lighter but must not disappear or deform. Keep roads, plazas, and hardscape pale gray-white, low contrast, and clearly bounded; keep people and vehicles small and low in visual presence. Use clean-edged pale gray-green, sage, olive, yellow-green, and restrained dark-green accents for area-based planting. Keep tree crowns and groups consistent, diagrammatic, and non-photorealistic. Greenery must read primarily as area-based planting plus diagrammatic tree groups rather than isolated street trees. Maintain a professional, quiet urban-design portfolio and competition-board character with generous negative space; avoid commercial visualization and watercolor bleeding.

[LANDSCAPE STRATEGY]
${strategy}
Both strategies must preserve buildings, roads, plazas, paving, and circulation relationships. The only difference is whether planting boundaries may extend into adjacent justified spaces. When a space cannot clearly be identified as planting or landscapeable area, retain its original hardscape or neutral expression rather than filling it with greenery.

[COLOR AND GRAPHIC CONTROL]
Keep the palette muted, soft, and unified. Architecture remains pale gray-white; greenery uses muted gray-green, pale olive, and yellow-green with restrained darker accents. Color boundaries must be clean, flat, and diagrammatic, without watercolor bleeding, heavy paper texture, realistic materials, dramatic shadows, or high-saturation blocks. The result should read as a landscape-planning and urban-design diagram, not a photorealistic rendering.

[NEGATIVE CONSTRAINTS]
Avoid photorealism, commercial real-estate visualization, high saturation, strong shadows, theatrical lighting, night scenes, heavy watercolor, oil-painting, or 3D-rendered appearance. Add no text, titles, numbers, arrows, legends, logos, watermarks, maps, analysis diagrams, or sidebars. Do not change material systems or add complex façades, curtain walls, roof structures, or new transportation facilities. The final result must remain faithful to Image 1 and may change only visual presentation, color hierarchy, and the selected landscape strategy.${notesText ? `

[USER NOTE]
${notesText}` : ''}`;
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
    $('#downloadButton').href = activeTemplate.assets.result;
    $('#downloadButton').download = activeTemplate.assets.downloadName;
    $('#priorityTitle').textContent = t(activeTemplate.priorityTitle);
    $('#priorityCopy').textContent = t(activeTemplate.priorityCopy);
    $('#templateNameOutput').textContent = title;
    $('#outputSpec').textContent = activeTemplate.outputSpec;

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
          state.parameterValues[parameter.id] = select.value;
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
    generateButton.disabled = !state.sourceReady;
  }

  function showSource(src, filename) {
    sourcePreview.src = src;
    sourceFilename.textContent = filename;
    uploadEmpty.hidden = true;
    uploadPreview.hidden = false;
    state.sourceReady = true;
    updateGenerateState();
  }

  function useFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    if (state.sourceObjectUrl) URL.revokeObjectURL(state.sourceObjectUrl);
    state.sourceObjectUrl = URL.createObjectURL(file);
    showSource(state.sourceObjectUrl, file.name);
  }

  function promptText() {
    const builder = activeTemplate.visiblePromptBuilder || activeTemplate.promptBuilder;
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

  function runMockGeneration() {
    if (!state.sourceReady) return;
    clearTimers();
    resultEmpty.hidden = true;
    resultSuccess.hidden = true;
    resultActions.hidden = true;
    resultLoading.hidden = false;
    generateButton.disabled = true;
    progressBar.style.width = '12%';
    setLoadingStep(0);

    state.timerIds.push(setTimeout(() => { progressBar.style.width = '42%'; setLoadingStep(1); }, 900));
    state.timerIds.push(setTimeout(() => { progressBar.style.width = '73%'; setLoadingStep(2); }, 1900));
    state.timerIds.push(setTimeout(() => { progressBar.style.width = '100%'; }, 3000));
    state.timerIds.push(setTimeout(() => {
      resultLoading.hidden = true;
      resultSuccess.hidden = false;
      resultActions.hidden = false;
      generateButton.disabled = false;
      updatePrompt();
      if (window.innerWidth < 761) $('#resultStage').scrollIntoView({behavior:'smooth', block:'center'});
    }, 3500));
  }

  function resetPrototype() {
    clearTimers();
    if (state.sourceObjectUrl) URL.revokeObjectURL(state.sourceObjectUrl);
    state.sourceObjectUrl = null;
    state.sourceReady = false;
    sourceInput.value = '';
    uploadEmpty.hidden = false;
    uploadPreview.hidden = true;
    resultEmpty.hidden = false;
    resultLoading.hidden = true;
    resultSuccess.hidden = true;
    resultActions.hidden = true;
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
  sourceInput.addEventListener('change', () => useFile(sourceInput.files[0]));
  ['dragenter','dragover'].forEach((name) => uploadCard.addEventListener(name, (event) => {
    event.preventDefault();
    uploadCard.classList.add('is-dragover');
  }));
  ['dragleave','drop'].forEach((name) => uploadCard.addEventListener(name, (event) => {
    event.preventDefault();
    uploadCard.classList.remove('is-dragover');
  }));
  uploadCard.addEventListener('drop', (event) => useFile(event.dataTransfer.files[0]));

  $('#useDemoButton').addEventListener('click', () => {
    showSource(activeTemplate.assets.source, activeTemplate.assets.sourceName);
  });

  notes.addEventListener('input', () => {
    $('#notesCount').textContent = notes.value.length;
    updatePrompt();
  });

  generateButton.addEventListener('click', runMockGeneration);
  $('#regenerateButton').addEventListener('click', runMockGeneration);
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
