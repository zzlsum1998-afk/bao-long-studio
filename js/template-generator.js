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
        display:'images/prompt-cases/prompt-case-16.webp',
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
