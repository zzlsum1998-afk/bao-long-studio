
  const STORAGE_KEY = "resumeStudio:v1";

  const labelMap = {
    zh: {
      summary: "个人简介",
      education: "教育经历",
      experience: "工作经历",
      projects: "项目经历",
      skills: "技能工具",
      languages: "语言能力",
      awards: "证书 / 获奖",
      contact: "联系方式",
      qr: "作品集链接"
    },
    en: {
      summary: "Professional Statement",
      education: "Education",
      experience: "Work Experience",
      projects: "Project Experience",
      skills: "Expertise",
      languages: "Languages",
      awards: "Awards & Certificates",
      contact: "Contact",
      qr: "Portfolio Link"
    },
    bilingual: {
      summary: "个人简介 / Statement",
      education: "教育经历 / Education",
      experience: "工作经历 / Experience",
      projects: "项目经历 / Projects",
      skills: "技能工具 / Skills",
      languages: "语言能力 / Languages",
      awards: "证书获奖 / Awards",
      contact: "联系方式 / Contact",
      qr: "作品集链接 / Portfolio"
    }
  };

  const defaultModules = [
    { key: "summary", visible: true },
    { key: "education", visible: true },
    { key: "experience", visible: true },
    { key: "projects", visible: true },
    { key: "skills", visible: true },
    { key: "languages", visible: true },
    { key: "awards", visible: true },
    { key: "qr", visible: false }
  ];

  const templateConfig = {
    sidebar: { photo: true, note: "当前模板是头像版：线性人像款，头像在左上方，联系信息以图标纵向展示。" },
    timeline: { photo: false, note: "当前模板是无头像版：重点放在经历时间线。" },
    international: { photo: false, note: "当前模板是无头像版：更适合英文/外企投递。" },
    visual: { photo: true, note: "当前模板是头像版：适合视觉、内容、创意方向。" },
    soft: { photo: true, note: "当前模板是头像版：商务金线款，左侧为头像与联系信息，右侧突出主要经历。" },
    darkside: { photo: true, note: "当前模板是头像版：深色侧栏会承接头像。" },
    namecard: { photo: true, note: "当前模板是头像版：顶部名片区会展示头像。" },
    gold: { photo: true, note: "当前模板是头像版：头像会和暖色侧栏结合。" },
    editorial: { photo: true, note: "当前模板是可头像版：有头像时像杂志版面，没有头像时自动转为文字版头部。" },
    metroline: { photo: true, note: "当前模板是可头像版：左侧可放头像，姓名与联系信息都可微调。" },
    profileband: { photo: true, note: "当前模板是头像版：左侧信息栏搭配头像，右侧展示正文经历。" },
    portraitpanel: { photo: true, note: "当前模板是头像版：右上肖像与联系信息形成重点。" }
  };

  function templateSupportsPhoto(template) {
    return templateConfig[template]?.photo === true;
  }

  function defaultGapFor(key) {
    const defaults = { summary: 18, education: 24, experience: 26, projects: 24, skills: 22, languages: 20, awards: 20, qr: 18 };
    return defaults[key] || 22;
  }

  function normalizeModuleGaps(gaps) {
    const incoming = gaps && typeof gaps === "object" ? gaps : {};
    return Object.fromEntries(defaultModules.map(module => {
      const raw = Number(incoming[module.key]);
      const value = Number.isFinite(raw) ? Math.max(0, Math.min(120, raw)) : defaultGapFor(module.key);
      return [module.key, value];
    }));
  }

  function currentModuleGaps() {
    if (!state.templateGaps || typeof state.templateGaps !== "object") state.templateGaps = {};
    state.templateGaps[state.template] = normalizeModuleGaps(state.templateGaps[state.template]);
    return state.templateGaps[state.template];
  }

  function setCurrentModuleGap(key, value) {
    const gaps = currentModuleGaps();
    gaps[key] = Math.max(0, Math.min(120, Number(value) || 0));
    state.templateGaps[state.template] = normalizeModuleGaps(gaps);
  }


  function defaultTune() {
    return {
      avatarSize: 100,
      avatarOffsetX: 0,
      avatarOffsetY: 0,
      nameOffsetX: 0,
      nameOffsetY: 0,
      contactOffsetX: 0,
      contactOffsetY: 0,
      contactGap: 8,
      sectionTitleSize: 12,
      bodyFontSize: 11.5,
      skillRingSize: 96,
      skillOffsetY: -72
    };
  }

  function normalizeTune(input) {
    const incoming = input && typeof input === "object" ? input : {};
    return {
      avatarSize: Math.max(70, Math.min(220, Number(incoming.avatarSize) || 100)),
      avatarOffsetX: Math.max(-200, Math.min(200, Number(incoming.avatarOffsetX) || 0)),
      avatarOffsetY: Math.max(-200, Math.min(200, Number(incoming.avatarOffsetY) || 0)),
      nameOffsetX: Math.max(-200, Math.min(200, Number(incoming.nameOffsetX) || 0)),
      nameOffsetY: Math.max(-200, Math.min(200, Number(incoming.nameOffsetY) || 0)),
      contactOffsetX: Math.max(-200, Math.min(200, Number(incoming.contactOffsetX) || 0)),
      contactOffsetY: Math.max(-200, Math.min(200, Number(incoming.contactOffsetY) || 0)),
      contactGap: Math.max(0, Math.min(40, Number(incoming.contactGap) || 8)),
      sectionTitleSize: Math.max(8, Math.min(24, Number(incoming.sectionTitleSize) || 12)),
      bodyFontSize: Math.max(8, Math.min(20, Number(incoming.bodyFontSize) || 11.5)),
      skillRingSize: Math.max(56, Math.min(150, Number(incoming.skillRingSize) || 96)),
      skillOffsetY: Math.max(-240, Math.min(120, Number(incoming.skillOffsetY) || -72))
    };
  }

  function currentTune() {
    if (!state.templateTweaks || typeof state.templateTweaks !== "object") state.templateTweaks = {};
    state.templateTweaks[state.template] = normalizeTune(state.templateTweaks[state.template]);
    return state.templateTweaks[state.template];
  }

  function setCurrentTuneValue(key, value) {
    const tune = currentTune();
    tune[key] = value;
    state.templateTweaks[state.template] = normalizeTune(tune);
  }

  const els = {
    nameInput: document.getElementById("nameInput"),
    roleInput: document.getElementById("roleInput"),
    contactInput: document.getElementById("contactInput"),
    summaryInput: document.getElementById("summaryInput"),
    educationInput: document.getElementById("educationInput"),
    experienceInput: document.getElementById("experienceInput"),
    projectInput: document.getElementById("projectInput"),
    awardsInput: document.getElementById("awardsInput"),
    jobRequirementInput: document.getElementById("jobRequirementInput"),
    skillsInput: document.getElementById("skillsInput"),
    languageInput: document.getElementById("languageInput"),
    avatarInput: document.getElementById("avatarInput"),
    avatarPreview: document.getElementById("avatarPreview"),
    removeAvatarBtn: document.getElementById("removeAvatarBtn"),
    languageToggle: document.getElementById("languageToggle"),
    templateList: document.getElementById("templateList"),
    templateAvatarNote: document.getElementById("templateAvatarNote"),
    moduleList: document.getElementById("moduleList"),
    gapList: document.getElementById("gapList"),
    sectionTitleSizeRange: document.getElementById("sectionTitleSizeRange"),
    sectionTitleSizeValue: document.getElementById("sectionTitleSizeValue"),
    bodyFontSizeRange: document.getElementById("bodyFontSizeRange"),
    bodyFontSizeValue: document.getElementById("bodyFontSizeValue"),
    skillRingSizeRange: document.getElementById("skillRingSizeRange"),
    skillRingSizeValue: document.getElementById("skillRingSizeValue"),
    skillOffsetYRange: document.getElementById("skillOffsetYRange"),
    skillOffsetYValue: document.getElementById("skillOffsetYValue"),
    avatarSizeRange: document.getElementById("avatarSizeRange"),
    avatarSizeValue: document.getElementById("avatarSizeValue"),
    avatarOffsetXRange: document.getElementById("avatarOffsetXRange"),
    avatarOffsetXValue: document.getElementById("avatarOffsetXValue"),
    avatarOffsetYRange: document.getElementById("avatarOffsetYRange"),
    avatarOffsetYValue: document.getElementById("avatarOffsetYValue"),
    nameOffsetXRange: document.getElementById("nameOffsetXRange"),
    nameOffsetXValue: document.getElementById("nameOffsetXValue"),
    nameOffsetYRange: document.getElementById("nameOffsetYRange"),
    nameOffsetYValue: document.getElementById("nameOffsetYValue"),
    contactOffsetXRange: document.getElementById("contactOffsetXRange"),
    contactOffsetXValue: document.getElementById("contactOffsetXValue"),
    contactOffsetYRange: document.getElementById("contactOffsetYRange"),
    contactOffsetYValue: document.getElementById("contactOffsetYValue"),
    contactGapRange: document.getElementById("contactGapRange"),
    contactGapValue: document.getElementById("contactGapValue"),
    resumePage: document.getElementById("resumePage"),
    resumeInner: document.getElementById("resumeInner"),
    saveStatus: document.getElementById("saveStatus"),
    exportPdfBtn: document.getElementById("exportPdfBtn"),
    printBtn: document.getElementById("printBtn"),
    resetBtn: document.getElementById("resetBtn")
  };

  let state = {
    template: "sidebar",
    language: "zh",
    modules: structuredClone(defaultModules),
    moduleGaps: {},
    templateGaps: {},
    templateTweaks: {},
    avatarImage: ""
  };

  function escapeHTML(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function parseLines(text) {
    return String(text || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);
  }

  function parseRichItems(text) {
    return parseLines(text).map(line => {
      const parts = line.split(/[｜|]/).map(item => item.trim());
      return {
        title: parts[0] || "Untitled",
        time: parts[1] || "",
        role: parts[2] || "",
        desc: parts.slice(3).join("｜") || ""
      };
    });
  }

  function parseSkills(text) {
    return parseLines(text).map(line => {
      const parts = line.split(/[｜|]/).map(item => item.trim());
      return {
        name: parts[0] || "Skill",
        level: Math.max(10, Math.min(100, Number(parts[1]) || 78))
      };
    });
  }

  function getLabel(key) {
    return labelMap[state.language]?.[key] || labelMap.zh[key] || key;
  }

  function getData() {
    return {
      name: els.nameInput.value.trim() || "Your Name",
      role: els.roleInput.value.trim() || "Your Role",
      contact: els.contactInput.value.trim(),
      summary: els.summaryInput.value.trim(),
      education: els.educationInput.value,
      experience: els.experienceInput.value,
      projects: els.projectInput.value,
      awards: els.awardsInput.value,
      skills: els.skillsInput.value,
      languages: els.languageInput.value,
      avatarImage: state.avatarImage
    };
  }

  function photoHTML(data, force = false) {
    if (!data.avatarImage) return "";
    if (!force && !templateSupportsPhoto(state.template)) return "";
    return `<img class="resume-photo" src="${data.avatarImage}" alt="Profile photo" loading="lazy" decoding="async">`;
  }

  function updateAvatarNotice() {
    if (!els.templateAvatarNote) return;
    const config = templateConfig[state.template] || templateConfig.sidebar;
    const extra = state.avatarImage && !templateSupportsPhoto(state.template)
      ? " 你已经上传的头像会被保留，但在这个模板中自动隐藏。"
      : "";
    els.templateAvatarNote.textContent = config.note + extra;
  }

  function updateAvatarPreview() {
    if (!els.avatarPreview) return;
    if (state.avatarImage) {
      els.avatarPreview.src = state.avatarImage;
    } else {
      const svg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" fill="#e8e3dc"/><circle cx="80" cy="62" r="28" fill="#cfc7bd"/><path d="M34 138c8-34 84-34 92 0" fill="#cfc7bd"/></svg>`);
      els.avatarPreview.src = `data:image/svg+xml,${svg}`;
    }
  }

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function itemHTML(item) {
    const meta = [item.time, item.role].filter(Boolean).join(" · ");
    return `
      <div class="resume-item">
        <strong>${escapeHTML(item.title)}</strong>
        ${meta ? `<span>${escapeHTML(meta)}</span>` : ""}
        ${item.desc ? `<div class="resume-text">${escapeHTML(item.desc)}</div>` : ""}
      </div>
    `;
  }

  function skillsTagsHTML(text) {
    const skills = parseSkills(text);
    if (!skills.length) return `<div class="resume-text">No skills added yet.</div>`;
    return `<div class="skills-list">${skills.map(skill => `<span class="skill-tag">${escapeHTML(skill.name)}</span>`).join("")}</div>`;
  }

  function skillsBarsHTML(text) {
    const skills = parseSkills(text);
    if (!skills.length) return `<div class="resume-text">No skills added yet.</div>`;
    return `<div class="bar-list">${skills.map(skill => `
      <div class="bar-row">
        <div>${escapeHTML(skill.name)}</div>
        <div class="bar-track"><div class="bar-fill" style="--level:${skill.level}%"></div></div>
      </div>
    `).join("")}</div>`;
  }

  function simpleLinesHTML(text) {
    const lines = parseLines(text);
    if (!lines.length) return `<div class="resume-text">—</div>`;
    return `<div class="resume-text">${lines.map(escapeHTML).join("\n")}</div>`;
  }

  function stackedNameHTML(name) {
    const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "Your Name";
    return parts.map(escapeHTML).join("<br>");
  }

  function parseContactPairs(text) {
    return parseLines(text).map(line => {
      const colon = line.indexOf(":");
      const fullColon = line.indexOf("：");
      const idx = colon > -1 ? colon : fullColon;
      if (idx > -1) {
        return { label: line.slice(0, idx).trim() || "Info", value: line.slice(idx + 1).trim() || "—" };
      }
      return { label: "Info", value: line.trim() || "—" };
    });
  }

  function contactIcon(label) {
    const key = String(label || "").toLowerCase();
    if (key.includes("email") || key.includes("mail")) return "✉";
    if (key.includes("phone") || key.includes("tel") || key.includes("mobile")) return "☎";
    if (key.includes("location") || key.includes("address") || key.includes("city")) return "⌖";
    if (key.includes("portfolio") || key.includes("web") || key.includes("link")) return "↗";
    return "•";
  }

  function contactPairsHTML(text, options = {}) {
    const { showIcons = false, itemClass = "contact-pair" } = options;
    const items = parseContactPairs(text);
    if (!items.length) return `<div class="resume-text">—</div>`;
    return `<div class="contact-pairs">${items.map(item => `
      <div class="${itemClass}">
        ${showIcons ? `<span class="contact-icon">${contactIcon(item.label)}</span>` : ""}
        <div class="contact-copy">
          <strong>${escapeHTML(item.label)}</strong>
          <span>${escapeHTML(item.value)}</span>
        </div>
      </div>
    `).join("")}</div>`;
  }

  function inferLanguageLevel(line) {
    const raw = String(line || "").toLowerCase();
    if (raw.includes("native") || raw.includes("母语")) return 96;
    if (raw.includes("fluent") || raw.includes("专业") || raw.includes("professional")) return 85;
    const ielts = raw.match(/ielts\s*([0-9.]+)/i);
    if (ielts) return Math.max(40, Math.min(96, Math.round(Number(ielts[1]) * 11)));
    if (raw.includes("basic") || raw.includes("基础")) return 42;
    if (raw.includes("intermediate") || raw.includes("中级")) return 60;
    return 72;
  }

  function languageBarsHTML(text) {
    const lines = parseLines(text);
    if (!lines.length) return `<div class="resume-text">—</div>`;
    return `<div class="soft05-lang-list">${lines.map(line => {
      const label = line.split('|')[0].trim() || line.trim();
      const level = inferLanguageLevel(line);
      return `
        <div class="soft05-lang-row">
          <div class="soft05-lang-label">${escapeHTML(label)}</div>
          <div class="soft05-lang-track"><div class="soft05-lang-fill" style="--level:${level}%"></div></div>
        </div>
      `;
    }).join("")}</div>`;
  }

  function skillsDonutsHTML(text) {
    const skills = parseSkills(text);
    if (!skills.length) return `<div class="resume-text">No skills added yet.</div>`;
    return `<div class="soft05-skill-rings">${skills.slice(0, 6).map(skill => `
      <div class="soft05-skill-ring">
        <div class="soft05-ring" style="--level:${skill.level}%">
          <div class="soft05-ring-value">${skill.level}%</div>
        </div>
        <div class="soft05-ring-name">${escapeHTML(skill.name)}</div>
      </div>
    `).join("")}</div>`;
  }

  function sectionHTML(key, content) {
    const gaps = currentModuleGaps();
    const gap = gaps?.[key] ?? defaultGapFor(key);
    const extraClass = key === "contact" ? " contact-section" : "";
    return `
      <section class="resume-section${extraClass}" data-module="${key}" style="--module-gap:${gap}px">
        <h3>${escapeHTML(getLabel(key))}</h3>
        ${content}
      </section>
    `;
  }

  function moduleContent(key, data, options = {}) {
    const useBars = options.useBars || false;
    const map = {
      summary: `<div class="resume-text">${escapeHTML(data.summary)}</div>`,
      education: parseRichItems(data.education).map(itemHTML).join("") || `<div class="resume-text">—</div>`,
      experience: parseRichItems(data.experience).map(itemHTML).join("") || `<div class="resume-text">—</div>`,
      projects: parseRichItems(data.projects).map(itemHTML).join("") || `<div class="resume-text">—</div>`,
      awards: parseRichItems(data.awards).map(itemHTML).join("") || `<div class="resume-text">—</div>`,
      skills: useBars ? skillsBarsHTML(data.skills) : skillsTagsHTML(data.skills),
      languages: simpleLinesHTML(data.languages),
      qr: `<div class="qr-box">QR CODE<br>Portfolio</div>`
    };
    return map[key] || "";
  }

  function renderModulesFor(keys, data, options = {}) {
    return state.modules
      .filter(module => module.visible && keys.includes(module.key))
      .map(module => sectionHTML(module.key, moduleContent(module.key, data, options)))
      .join("");
  }

  function buildHeader(data, { allowPhoto = false, editorial = false } = {}) {
    const hasPhoto = Boolean(data.avatarImage && allowPhoto);

    if (editorial) {
      return `
        <header class="resume-header ${hasPhoto ? "" : "no-photo"}">
          ${hasPhoto ? photoHTML(data, true) : ""}
          <div>
            <div class="identity-block">
              <h1 class="resume-name">${escapeHTML(data.name)}</h1>
              <div class="resume-role">${escapeHTML(data.role)}</div>
            </div>
            <div class="resume-contact">${escapeHTML(data.contact)}</div>
          </div>
        </header>
      `;
    }

    return `
      <header class="resume-header ${hasPhoto ? "with-photo" : "no-photo"}">
        <div>
          <div class="identity-block">
            <div class="identity-block">
              <h1 class="resume-name">${escapeHTML(data.name)}</h1>
              <div class="resume-role">${escapeHTML(data.role)}</div>
            </div>
          </div>
        </div>
        <div class="resume-contact">${escapeHTML(data.contact)}</div>
      </header>
    `;
  }

  function renderPreviewRaw() {
    const data = getData();
    const templateClass = `template-${state.template}`;
    const allowPhoto = templateSupportsPhoto(state.template);
    els.resumePage.className = `resume-page ${templateClass}`;
    els.resumePage.classList.toggle("has-photo", Boolean(data.avatarImage && allowPhoto));
    els.resumePage.classList.toggle("photo-hidden", Boolean(data.avatarImage && !allowPhoto));
    const tune = currentTune();
    els.resumePage.style.setProperty("--avatar-scale", String(tune.avatarSize / 100));
    els.resumePage.style.setProperty("--avatar-offset-x", `${tune.avatarOffsetX}px`);
    els.resumePage.style.setProperty("--avatar-offset-y", `${tune.avatarOffsetY}px`);
    els.resumePage.style.setProperty("--name-offset-x", `${tune.nameOffsetX}px`);
    els.resumePage.style.setProperty("--name-offset-y", `${tune.nameOffsetY}px`);
    els.resumePage.style.setProperty("--contact-offset-x", `${tune.contactOffsetX}px`);
    els.resumePage.style.setProperty("--contact-offset-y", `${tune.contactOffsetY}px`);
    els.resumePage.style.setProperty("--contact-gap", `${tune.contactGap}px`);
    els.resumePage.style.setProperty("--section-title-size", `${tune.sectionTitleSize}px`);
    els.resumePage.style.setProperty("--body-font-size", `${tune.bodyFontSize}px`);
    els.resumePage.style.setProperty("--skill-ring-size", `${tune.skillRingSize}px`);
    els.resumePage.style.setProperty("--skill-offset-y", `${tune.skillOffsetY}px`);

    const allKeys = state.modules.map(m => m.key);
    const mainKeys = ["summary", "education", "experience", "projects", "awards"];

    if (state.template === "minimal") {
      els.resumeInner.innerHTML = `${buildHeader(data)}${renderModulesFor(allKeys, data)}`;
      updateAvatarNotice();
      return;
    }

    if (state.template === "sidebar") {
      const isVisible = key => state.modules.some(module => module.key === key && module.visible);
      const sidebarAvatar = data.avatarImage ? photoHTML(data, true) : `<div class="sidebar01-photo-placeholder"></div>`;
      els.resumeInner.innerHTML = `
        <section class="sidebar01-top">
          <aside class="sidebar01-idcol">
            <div class="sidebar01-portrait">${sidebarAvatar}</div>
            ${isVisible("contact") ? `<div class="sidebar01-contact-list">${contactPairsHTML(data.contact, { showIcons: true, itemClass: "sidebar01-contact-item" })}</div>` : ""}
          </aside>
          <div class="sidebar01-headcopy">
            <div class="identity-block">
              <h1 class="resume-name">${escapeHTML(data.name)}</h1>
              <div class="resume-role">${escapeHTML(data.role)}</div>
            </div>
            ${isVisible("summary") ? sectionHTML("summary", `<div class="resume-text">${escapeHTML(data.summary)}</div>`) : ""}
          </div>
        </section>
        <section class="sidebar01-bottom">
          <aside class="sidebar01-left">
            ${renderModulesFor(["education", "skills", "languages", "awards"], data, { useBars: true })}
          </aside>
          <main class="sidebar01-right">
            ${renderModulesFor(["experience", "projects"], data)}
          </main>
        </section>
      `;
      updateAvatarNotice();
      return;
    }

    if (state.template === "architect") {
      els.resumeInner.innerHTML = `
        <aside class="resume-left">
          <div class="identity-block">
            <div class="identity-block">
              <h1 class="resume-name">${escapeHTML(data.name)}</h1>
              <div class="resume-role">${escapeHTML(data.role)}</div>
            </div>
          </div>
          ${sectionHTML("summary", `<div class="resume-text">${escapeHTML(data.summary)}</div>`)}
          ${sectionHTML("contact", `<div class="resume-text">${escapeHTML(data.contact)}</div>`)}
          ${renderModulesFor(["skills", "languages", "qr"], data)}
        </aside>
        <main class="resume-right">
          ${renderModulesFor(["education", "awards", "experience", "projects"], data, { useBars: true })}
        </main>
      `;
      updateAvatarNotice();
      return;
    }

    if (["timeline", "international"].includes(state.template)) {
      els.resumeInner.innerHTML = `${buildHeader(data)}${renderModulesFor(allKeys, data, { useBars: state.template === "timeline" })}`;
      updateAvatarNotice();
      return;
    }

    if (state.template === "visual") {
      els.resumeInner.innerHTML = `
        <section class="resume-hero">
          <div>
            <div class="identity-block">
              <h1 class="resume-name">${escapeHTML(data.name)}</h1>
              <div class="resume-role">${escapeHTML(data.role)}</div>
            </div>
          </div>
          <div>
            ${photoHTML(data)}
            <div class="resume-contact">${escapeHTML(data.contact)}</div>
          </div>
        </section>
        <section class="resume-body">
          <main>${renderModulesFor(["summary", "experience", "projects", "education"], data)}</main>
          <aside>${renderModulesFor(["skills", "languages", "awards", "qr"], data, { useBars: true })}</aside>
        </section>
      `;
      updateAvatarNotice();
      return;
    }

    if (state.template === "soft") {
      const isVisible = key => state.modules.some(module => module.key === key && module.visible);
      const softAvatar = data.avatarImage ? photoHTML(data, true) : `<div class="soft05-photo-placeholder"></div>`;
      els.resumeInner.innerHTML = `
        <section class="soft05-layout">
          <aside class="soft05-left">
            <div class="soft05-avatar-wrap">${softAvatar}</div>
            <div class="identity-block">
              <h1 class="resume-name">${escapeHTML(data.name)}</h1>
              <div class="resume-role">${escapeHTML(data.role)}</div>
            </div>
            ${isVisible("contact") ? sectionHTML("contact", `
              <div class="soft05-contact-card">
                <div class="soft05-contact-strip">${parseContactPairs(data.contact).map(item => `<span>${contactIcon(item.label)}</span>`).join("")}</div>
                <div class="soft05-contact-copy">${contactPairsHTML(data.contact, { showIcons: true, itemClass: "soft05-contact-item" })}</div>
              </div>
            `) : ""}
            ${renderModulesFor(["awards"], data)}
            ${isVisible("languages") ? sectionHTML("languages", languageBarsHTML(data.languages)) : ""}
          </aside>
          <main class="soft05-main">
            ${renderModulesFor(["summary", "experience", "education", "projects"], data)}
            ${isVisible("skills") ? sectionHTML("skills", skillsDonutsHTML(data.skills)) : ""}
          </main>
        </section>
      `;
      updateAvatarNotice();
      return;
    }

    if (["darkside", "gold"].includes(state.template)) {
      els.resumeInner.innerHTML = `
        <aside class="resume-left">
          ${photoHTML(data)}
          <div class="identity-block">
            <div class="identity-block">
              <h1 class="resume-name">${escapeHTML(data.name)}</h1>
              <div class="resume-role">${escapeHTML(data.role)}</div>
            </div>
          </div>
          ${sectionHTML("contact", `<div class="resume-text">${escapeHTML(data.contact)}</div>`)}
          ${renderModulesFor(["skills", "languages", "qr"], data, { useBars: true })}
        </aside>
        <main class="resume-right">
          ${renderModulesFor(mainKeys, data)}
        </main>
      `;
      updateAvatarNotice();
      return;
    }

    if (state.template === "editorial") {
      els.resumeInner.innerHTML = `${buildHeader(data, { allowPhoto, editorial: true })}${renderModulesFor(allKeys, data)}`;
      updateAvatarNotice();
      return;
    }

    if (state.template === "namecard") {
      els.resumeInner.innerHTML = `
        <section class="resume-hero">
          <div>
            <div class="identity-block">
              <h1 class="resume-name">${escapeHTML(data.name)}</h1>
              <div class="resume-role">${escapeHTML(data.role)}</div>
            </div>
          </div>
          <div>
            ${photoHTML(data)}
            <div class="resume-contact">${escapeHTML(data.contact)}</div>
          </div>
        </section>
        <section class="resume-body">
          <main>${renderModulesFor(["summary", "experience", "projects"], data)}</main>
          <aside>${renderModulesFor(["education", "skills", "languages", "awards", "qr"], data, { useBars: true })}</aside>
        </section>
      `;
      updateAvatarNotice();
      return;
    }

    if (state.template === "metroline") {
      els.resumeInner.innerHTML = `
        <section class="metro-top">
          <div class="metro-id">
            ${data.avatarImage ? `<div class="metro-avatar">${photoHTML(data)}</div>` : ""}
            <div class="metro-name-block">
              <h1 class="resume-name metro-name">${escapeHTML(data.name)}</h1>
              <div class="resume-role metro-role">${escapeHTML(data.role)}</div>
            </div>
          </div>
          <div class="metro-contact-wrap">
            <div class="metro-contact-strip">
              ${parseContactPairs(data.contact).map(item => `<span>${contactIcon(item.label)}</span>`).join("")}
            </div>
            <div class="metro-contact-copy">${contactPairsHTML(data.contact, { itemClass: "metro-contact-item" })}</div>
          </div>
        </section>
        <section class="metro-body">
          <main class="metro-main">
            ${renderModulesFor(["summary", "experience", "projects"], data)}
          </main>
          <aside class="metro-side">
            ${renderModulesFor(["education", "skills", "languages", "awards", "qr"], data, { useBars: true })}
          </aside>
        </section>
      `;
      updateAvatarNotice();
      return;
    }

    if (state.template === "profileband") {
      els.resumeInner.innerHTML = `
        <section class="profileband-wrap">
          <aside class="profileband-side">
            <div class="profileband-photo">${photoHTML(data)}</div>
            ${sectionHTML("contact", `<div class="resume-text">${escapeHTML(data.contact)}</div>`)}
            ${renderModulesFor(["education", "skills", "languages"], data, { useBars: true })}
          </aside>
          <main class="profileband-main">
            <header class="profileband-head">
              <h1 class="resume-name">${escapeHTML(data.name)}</h1>
              <div class="resume-role">${escapeHTML(data.role)}</div>
            </header>
            ${renderModulesFor(["summary", "experience", "projects", "awards", "qr"], data)}
          </main>
        </section>
      `;
      updateAvatarNotice();
      return;
    }

    if (state.template === "portraitpanel") {
      els.resumeInner.innerHTML = `
        <section class="portrait12-layout">
          <div class="portrait12-rail">Resume</div>
          <main class="portrait12-left">
            <header class="portrait12-head">
              <h1 class="resume-name">${escapeHTML(data.name)}</h1>
              <div class="resume-role">${escapeHTML(data.role)}</div>
            </header>
            ${renderModulesFor(["summary", "experience", "projects", "awards", "qr"], data)}
          </main>
          <aside class="portrait12-right">
            <div class="portrait12-photo">${photoHTML(data)}</div>
            <div class="portrait12-contact-card">${contactPairsHTML(data.contact, { showIcons: true, itemClass: "portrait-contact-item" })}</div>
            <div class="portrait12-side-content">
              ${renderModulesFor(["education", "skills", "languages"], data, { useBars: false })}
            </div>
          </aside>
        </section>
      `;
      updateAvatarNotice();
      return;
    }

    els.resumeInner.innerHTML = `${buildHeader(data)}${renderModulesFor(allKeys, data)}`;
    updateAvatarNotice();
  }

  function clearBalanceMode() {
    els.resumePage.classList.remove("fit-loose", "fit-comfort", "fit-compact", "fit-dense");
  }

  function contentScore() {
    const data = getData();
    const visible = new Set(state.modules.filter(m => m.visible).map(m => m.key));
    let score = 0;
    if (visible.has("summary")) score += Math.ceil((data.summary || "").length / 80) + 2;
    if (visible.has("education")) score += parseRichItems(data.education).length * 4;
    if (visible.has("experience")) score += parseRichItems(data.experience).length * 5;
    if (visible.has("projects")) score += parseRichItems(data.projects).length * 4;
    if (visible.has("awards")) score += parseRichItems(data.awards).length * 3;
    if (visible.has("skills")) score += Math.ceil(parseSkills(data.skills).length * 0.9);
    if (visible.has("languages")) score += parseLines(data.languages).length;
    score += Math.ceil(parseLines(data.contact).length * 0.8);
    return score;
  }

  function baseBalanceClass() {
    const score = contentScore();
    if (score <= 20) return "fit-loose";
    if (score <= 34) return "fit-comfort";
    if (score <= 50) return "fit-compact";
    return "fit-dense";
  }

  function renderPreview() {
    clearBalanceMode();
    renderPreviewRaw();
    clearBalanceMode();
    els.resumePage.classList.add(baseBalanceClass());
  }

  function normalizeModules(modules) {
    const incoming = Array.isArray(modules) ? modules : [];
    const byKey = new Map(incoming.map(m => [m.key, { key: m.key, visible: m.visible !== false }]));
    const result = [];
    incoming.forEach(m => {
      if (defaultModules.some(dm => dm.key === m.key) && !result.some(x => x.key === m.key)) {
        result.push({ key: m.key, visible: m.visible !== false });
      }
    });
    defaultModules.forEach(dm => {
      if (!result.some(x => x.key === dm.key)) result.push({ ...dm });
    });
    return result;
  }


  function renderGapList() {
    if (!els.gapList) return;
    const gaps = currentModuleGaps();
    els.gapList.innerHTML = state.modules.map(module => {
      const value = gaps[module.key] ?? defaultGapFor(module.key);
      return `
        <div class="spacing-row" data-key="${module.key}">
          <div class="spacing-row-head">
            <span>${escapeHTML(getLabel(module.key))}</span>
            <span>${value}px</span>
          </div>
          <input type="range" min="0" max="120" step="1" value="${value}" aria-label="${escapeHTML(getLabel(module.key))} 间距">
        </div>
      `;
    }).join("");
  }


  function renderFineTuneControls() {
    const tune = currentTune();
    if (els.avatarSizeRange) els.avatarSizeRange.value = String(tune.avatarSize);
    if (els.avatarSizeValue) els.avatarSizeValue.textContent = `${tune.avatarSize}%`;
    if (els.avatarOffsetXRange) els.avatarOffsetXRange.value = String(tune.avatarOffsetX);
    if (els.avatarOffsetXValue) els.avatarOffsetXValue.textContent = `${tune.avatarOffsetX}px`;
    if (els.avatarOffsetYRange) els.avatarOffsetYRange.value = String(tune.avatarOffsetY);
    if (els.avatarOffsetYValue) els.avatarOffsetYValue.textContent = `${tune.avatarOffsetY}px`;
    if (els.nameOffsetXRange) els.nameOffsetXRange.value = String(tune.nameOffsetX);
    if (els.nameOffsetXValue) els.nameOffsetXValue.textContent = `${tune.nameOffsetX}px`;
    if (els.nameOffsetYRange) els.nameOffsetYRange.value = String(tune.nameOffsetY);
    if (els.nameOffsetYValue) els.nameOffsetYValue.textContent = `${tune.nameOffsetY}px`;
    if (els.contactOffsetXRange) els.contactOffsetXRange.value = String(tune.contactOffsetX);
    if (els.contactOffsetXValue) els.contactOffsetXValue.textContent = `${tune.contactOffsetX}px`;
    if (els.contactOffsetYRange) els.contactOffsetYRange.value = String(tune.contactOffsetY);
    if (els.contactOffsetYValue) els.contactOffsetYValue.textContent = `${tune.contactOffsetY}px`;
    if (els.contactGapRange) els.contactGapRange.value = String(tune.contactGap);
    if (els.contactGapValue) els.contactGapValue.textContent = `${tune.contactGap}px`;
    if (els.sectionTitleSizeRange) els.sectionTitleSizeRange.value = String(tune.sectionTitleSize);
    if (els.sectionTitleSizeValue) els.sectionTitleSizeValue.textContent = `${tune.sectionTitleSize}px`;
    if (els.bodyFontSizeRange) els.bodyFontSizeRange.value = String(tune.bodyFontSize);
    if (els.bodyFontSizeValue) els.bodyFontSizeValue.textContent = `${tune.bodyFontSize}px`;
    if (els.skillRingSizeRange) els.skillRingSizeRange.value = String(tune.skillRingSize);
    if (els.skillRingSizeValue) els.skillRingSizeValue.textContent = `${tune.skillRingSize}px`;
    if (els.skillOffsetYRange) els.skillOffsetYRange.value = String(tune.skillOffsetY);
    if (els.skillOffsetYValue) els.skillOffsetYValue.textContent = `${tune.skillOffsetY}px`;
  }

  function setTemplate(template) {
    state.template = templateConfig[template] ? template : "sidebar";
    currentTune();
    currentModuleGaps();
    document.querySelectorAll(".template-card").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.template === state.template);
    });
    updateAvatarNotice();
    renderFineTuneControls();
    renderGapList();
    renderPreview();
    saveState();
  }

  function setLanguage(language) {
    state.language = language || "zh";
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === state.language);
    });
    renderModuleList();
    renderGapList();
    renderPreview();
    saveState();
  }

  function renderModuleList() {
    els.moduleList.innerHTML = state.modules.map((module, index) => `
      <div class="module-row" data-key="${module.key}">
        <input type="checkbox" ${module.visible ? "checked" : ""} aria-label="显示${escapeHTML(getLabel(module.key))}">
        <div class="module-title">${escapeHTML(getLabel(module.key))}</div>
        <div class="move-actions">
          <button class="mini-btn" type="button" data-action="up" ${index === 0 ? "disabled" : ""}>↑</button>
          <button class="mini-btn" type="button" data-action="down" ${index === state.modules.length - 1 ? "disabled" : ""}>↓</button>
        </div>
      </div>
    `).join("");
  }

  function saveState() {
    const payload = {
      ...state,
      fields: {
        name: els.nameInput.value,
        role: els.roleInput.value,
        contact: els.contactInput.value,
        summary: els.summaryInput.value,
        education: els.educationInput.value,
        experience: els.experienceInput.value,
        projects: els.projectInput.value,
        awards: els.awardsInput.value,
        skills: els.skillsInput.value,
        languages: els.languageInput.value
      }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    els.saveStatus.textContent = "已自动保存";
    window.clearTimeout(saveState._timer);
    saveState._timer = window.setTimeout(() => {
      els.saveStatus.textContent = "已开启本地保存";
    }, 900);
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      state.template = saved.template || state.template;
      state.language = saved.language || state.language;
      state.modules = normalizeModules(saved.modules);
      state.moduleGaps = normalizeModuleGaps(saved.moduleGaps);
      state.templateGaps = {};
      if (saved.templateGaps && typeof saved.templateGaps === "object") {
        Object.keys(saved.templateGaps).forEach(template => {
          state.templateGaps[template] = normalizeModuleGaps(saved.templateGaps[template]);
        });
      } else if (saved.moduleGaps) {
        // 兼容旧版本：把旧的全局板块间距迁移到当前模板里
        state.templateGaps[state.template] = normalizeModuleGaps(saved.moduleGaps);
      }
      state.templateTweaks = {};
      if (saved.templateTweaks && typeof saved.templateTweaks === "object") {
        Object.keys(saved.templateTweaks).forEach(template => {
          state.templateTweaks[template] = normalizeTune(saved.templateTweaks[template]);
        });
      } else {
        // 兼容旧版本：把旧的全局调节值迁移到当前模板里
        state.templateTweaks[state.template] = normalizeTune({
          avatarSize: saved.avatarSize,
          avatarOffsetX: saved.avatarOffsetX,
          avatarOffsetY: saved.avatarOffsetY,
          nameOffsetX: saved.nameOffsetX,
          contactOffsetX: saved.contactOffsetX,
          contactOffsetY: saved.contactOffsetY,
          contactGap: saved.contactGap
        });
      }
      state.avatarImage = saved.avatarImage || "";
      const f = saved.fields || {};
      if (f.name !== undefined) els.nameInput.value = f.name;
      if (f.role !== undefined) els.roleInput.value = f.role;
      if (f.contact !== undefined) els.contactInput.value = f.contact;
      if (f.summary !== undefined) els.summaryInput.value = f.summary;
      if (f.education !== undefined) els.educationInput.value = f.education;
      if (f.experience !== undefined) els.experienceInput.value = f.experience;
      if (f.projects !== undefined) els.projectInput.value = f.projects;
      if (f.awards !== undefined) els.awardsInput.value = f.awards;
      if (f.skills !== undefined) els.skillsInput.value = f.skills;
      if (f.languages !== undefined) els.languageInput.value = f.languages;
    } catch (error) {
      console.warn("本地保存数据读取失败，已使用默认内容。", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function applyViewMode() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    if (mode === "view") {
      document.body.classList.add("view-mode");
      document.querySelector(".editor")?.remove();
      document.querySelector(".control-panel")?.remove();
      document.querySelector(".top-actions")?.remove();
      document.querySelector(".product-desc")?.remove();
      document.querySelector(".layout")?.style.setProperty("grid-template-columns", "1fr");
    }
  }

  function measureContentScale() {
    const page = els.resumePage;
    const inner = els.resumeInner;
    if (!page || !inner) return 1;

    const pageWidth = page.offsetWidth || 794;
    const pageHeight = page.offsetHeight || 1123;
    const contentWidth = Math.max(inner.scrollWidth, inner.offsetWidth, 1);
    const contentHeight = Math.max(inner.scrollHeight, inner.offsetHeight, 1);

    const heightScale = pageHeight / contentHeight;
    const widthScale = pageWidth / contentWidth;
    return Math.min(1, heightScale, widthScale);
  }

  function calculateOnePageScale() {
    const scale = measureContentScale();
    return Math.max(0.62, Math.floor(scale * 100) / 100);
  }

  function clearFitMode() {
    clearBalanceMode();
  }

  function applyAutoFitMode() {
    clearBalanceMode();

    const modes = [baseBalanceClass(), "fit-comfort", "fit-compact", "fit-dense"];
    const orderedModes = [...new Set(modes)];

    for (const mode of orderedModes) {
      clearBalanceMode();
      els.resumePage.classList.add(mode);
      const scale = measureContentScale();
      if (scale >= 0.995) {
        return { mode, scale: 1 };
      }
    }

    clearBalanceMode();
    els.resumePage.classList.add("fit-dense");
    const finalScale = Math.max(0.70, Math.floor(measureContentScale() * 100) / 100);
    return { mode: "fit-dense-scale", scale: finalScale };
  }

  function fitModeText(result) {
    if (result.scale < 1) return `已自动调整排版，并按 ${Math.round(result.scale * 100)}% 导出为一页 PDF`;
    return "已自动调整排版，导出为一页 PDF";
  }

  function printOnePagePDF() {
    // 保持当前预览版式导出：不再临时缩放、不再切换紧凑模式，避免 PDF 和预览不一致。
    renderPreview();

    requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--print-scale", "1");
      if (els.saveStatus) els.saveStatus.textContent = "已按当前预览样式导出 PDF";
      window.setTimeout(() => window.print(), 30);
    });
  }

  window.addEventListener("afterprint", () => {
    document.documentElement.style.removeProperty("--print-scale");
    renderPreview();
    if (els.saveStatus) els.saveStatus.textContent = "";
  });

  function bindEvents() {
    const inputs = [
      els.nameInput, els.roleInput, els.contactInput, els.summaryInput, els.educationInput,
      els.experienceInput, els.projectInput, els.awardsInput, els.skillsInput, els.languageInput
    ];

    inputs.forEach(input => {
      input.addEventListener("input", () => {
        renderPreview();
        saveState();
      });
    });

    els.templateList.addEventListener("click", event => {
      const btn = event.target.closest(".template-card");
      if (!btn) return;
      setTemplate(btn.dataset.template);
    });

    els.languageToggle.addEventListener("click", event => {
      const btn = event.target.closest(".lang-btn");
      if (!btn) return;
      setLanguage(btn.dataset.lang);
    });

    els.moduleList.addEventListener("click", event => {
      const row = event.target.closest(".module-row");
      if (!row) return;
      const key = row.dataset.key;
      const index = state.modules.findIndex(module => module.key === key);
      if (index < 0) return;

      if (event.target.matches('input[type="checkbox"]')) {
        state.modules[index].visible = event.target.checked;
      }

      if (event.target.dataset.action === "up" && index > 0) {
        [state.modules[index - 1], state.modules[index]] = [state.modules[index], state.modules[index - 1]];
      }

      if (event.target.dataset.action === "down" && index < state.modules.length - 1) {
        [state.modules[index + 1], state.modules[index]] = [state.modules[index], state.modules[index + 1]];
      }

      renderModuleList();
      renderGapList();
      renderPreview();
      saveState();
    });

    if (els.gapList) {
      els.gapList.addEventListener("input", event => {
        const row = event.target.closest(".spacing-row");
        if (!row || !event.target.matches('input[type="range"]')) return;
        const key = row.dataset.key;
        setCurrentModuleGap(key, Number(event.target.value));
        const value = currentModuleGaps()[key];
        row.querySelector(".spacing-row-head span:last-child").textContent = `${value}px`;
        renderPreview();
        saveState();
      });
    }

    els.sectionTitleSizeRange?.addEventListener("input", event => {
      setCurrentTuneValue("sectionTitleSize", Math.max(8, Math.min(24, Number(event.target.value) || 12)));
      renderFineTuneControls();
      renderPreview();
      saveState();
    });

    els.bodyFontSizeRange?.addEventListener("input", event => {
      setCurrentTuneValue("bodyFontSize", Math.max(8, Math.min(20, Number(event.target.value) || 11.5)));
      renderFineTuneControls();
      renderPreview();
      saveState();
    });

    els.skillRingSizeRange?.addEventListener("input", event => {
      setCurrentTuneValue("skillRingSize", Math.max(56, Math.min(150, Number(event.target.value) || 96)));
      renderFineTuneControls();
      renderPreview();
      saveState();
    });

    els.skillOffsetYRange?.addEventListener("input", event => {
      setCurrentTuneValue("skillOffsetY", Math.max(-240, Math.min(120, Number(event.target.value) || -72)));
      renderFineTuneControls();
      renderPreview();
      saveState();
    });

    els.avatarSizeRange?.addEventListener("input", event => {
      setCurrentTuneValue("avatarSize", Math.max(70, Math.min(220, Number(event.target.value) || 100)));
      renderFineTuneControls();
      renderPreview();
      saveState();
    });

    els.avatarOffsetXRange?.addEventListener("input", event => {
      setCurrentTuneValue("avatarOffsetX", Math.max(-200, Math.min(200, Number(event.target.value) || 0)));
      renderFineTuneControls();
      renderPreview();
      saveState();
    });

    els.avatarOffsetYRange?.addEventListener("input", event => {
      setCurrentTuneValue("avatarOffsetY", Math.max(-200, Math.min(200, Number(event.target.value) || 0)));
      renderFineTuneControls();
      renderPreview();
      saveState();
    });

    els.nameOffsetXRange?.addEventListener("input", event => {
      setCurrentTuneValue("nameOffsetX", Math.max(-200, Math.min(200, Number(event.target.value) || 0)));
      renderFineTuneControls();
      renderPreview();
      saveState();
    });

    els.nameOffsetYRange?.addEventListener("input", event => {
      setCurrentTuneValue("nameOffsetY", Math.max(-200, Math.min(200, Number(event.target.value) || 0)));
      renderFineTuneControls();
      renderPreview();
      saveState();
    });

    els.contactOffsetXRange?.addEventListener("input", event => {
      setCurrentTuneValue("contactOffsetX", Math.max(-200, Math.min(200, Number(event.target.value) || 0)));
      renderFineTuneControls();
      renderPreview();
      saveState();
    });

    els.contactOffsetYRange?.addEventListener("input", event => {
      setCurrentTuneValue("contactOffsetY", Math.max(-200, Math.min(200, Number(event.target.value) || 0)));
      renderFineTuneControls();
      renderPreview();
      saveState();
    });

    els.contactGapRange?.addEventListener("input", event => {
      setCurrentTuneValue("contactGap", Math.max(0, Math.min(40, Number(event.target.value) || 8)));
      renderFineTuneControls();
      renderPreview();
      saveState();
    });

    els.avatarInput.addEventListener("change", async event => {
      const file = event.target.files?.[0];
      if (!file) return;
      state.avatarImage = await readFileAsDataURL(file);
      updateAvatarPreview();
      renderPreview();
      saveState();
      els.avatarInput.value = "";
    });

    els.removeAvatarBtn.addEventListener("click", () => {
      state.avatarImage = "";
      updateAvatarPreview();
      renderPreview();
      saveState();
    });

    els.printBtn.addEventListener("click", () => printOnePagePDF());
    els.exportPdfBtn.addEventListener("click", () => printOnePagePDF());
    els.resetBtn.addEventListener("click", () => {
      const ok = confirm("确定要重置简历内容吗？这会清除本地保存的数据。");
      if (!ok) return;
      localStorage.removeItem(STORAGE_KEY);
      window.location.href = window.location.pathname;
    });
  }

  function init() {
    state.modules = normalizeModules(state.modules);
    state.moduleGaps = normalizeModuleGaps(state.moduleGaps);
    state.templateGaps = state.templateGaps || {};
    state.templateTweaks = state.templateTweaks || {};
    loadState();
    if (!templateConfig[state.template]) state.template = "sidebar";
    currentModuleGaps();
    updateAvatarPreview();
    renderModuleList();
    renderGapList();
    renderFineTuneControls();
    setLanguage(state.language);
    setTemplate(state.template);
    bindEvents();
    renderPreview();
    applyViewMode();
  }

  // AI功能
  let summaryTargetLang = "zh";

  document.querySelectorAll(".summary-lang-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      document.querySelectorAll(".summary-lang-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      summaryTargetLang = this.dataset.lang;
    });
  });

  async function callAI(btnEl, btnTextEl, loadingText, fn) {
    const originalText = btnTextEl.textContent;
    btnEl.disabled = true;
    btnTextEl.textContent = loadingText;
    try {
      await fn();
    } catch(e) {
      alert("网络错误，请稍后重试");
    } finally {
      btnEl.disabled = false;
      btnTextEl.textContent = originalText;
    }
  }

  function bindOptimizeButton(buttonId, textId, textareaEl, sectionType, emptyMsg) {
    const button = document.getElementById(buttonId);
    if (!button || !textareaEl) return;

    button.addEventListener("click", function() {
      const btn = this;
      const btnText = document.getElementById(textId);
      const content = textareaEl.value.trim();
      if (!content) { alert(emptyMsg); return; }

      callAI(btn, btnText, "AI优化中…", async () => {
        const res = await fetch("/.netlify/functions/optimize-experience", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content, experience: content, sectionType })
        });
        const data = await res.json();
        if (data.error) { alert(data.error); return; }
        textareaEl.value = data.result;
        renderPreview();
        saveState();
      });
    });
  }

  bindOptimizeButton("optimizeExperienceBtn", "optimizeExperienceBtnText", els.experienceInput, "工作经历", "请先填写工作经历内容");
  bindOptimizeButton("optimizeProjectBtn", "optimizeProjectBtnText", els.projectInput, "项目经历", "请先填写项目经历内容");
  bindOptimizeButton("optimizeAwardsBtn", "optimizeAwardsBtnText", els.awardsInput, "证书 / 获奖经历", "请先填写证书 / 获奖经历内容");

  document.getElementById("optimizeByJobBtn").addEventListener("click", function() {
    const btn = this;
    const btnText = document.getElementById("optimizeByJobBtnText");
    const jobRequirement = els.jobRequirementInput.value.trim();
    if (!jobRequirement) { alert("请先粘贴岗位要求 / JD"); return; }

    callAI(btn, btnText, "匹配岗位中…", async () => {
      const fields = {
        role: els.roleInput.value,
        summary: els.summaryInput.value,
        education: els.educationInput.value,
        experience: els.experienceInput.value,
        projects: els.projectInput.value,
        awards: els.awardsInput.value,
        skills: els.skillsInput.value,
        languages: els.languageInput.value
      };

      const res = await fetch("/.netlify/functions/optimize-by-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobRequirement, fields })
      });
      const data = await res.json();
      if (data.error) { alert(data.error); return; }
      const r = data.result || {};
      if (r.role !== undefined) els.roleInput.value = r.role;
      if (r.summary !== undefined) els.summaryInput.value = r.summary;
      if (r.experience !== undefined) els.experienceInput.value = r.experience;
      if (r.projects !== undefined) els.projectInput.value = r.projects;
      if (r.awards !== undefined) els.awardsInput.value = r.awards;
      if (r.skills !== undefined) els.skillsInput.value = r.skills;
      renderPreview();
      saveState();
      alert("已根据岗位要求优化个人简介、经历和技能。请再人工核对，避免出现不真实信息。");
    });
  });

  document.getElementById("generateSummaryBtn").addEventListener("click", function() {
    const btn = this;
    const btnText = document.getElementById("generateSummaryBtnText");
    callAI(btn, btnText, "AI生成中…", async () => {
      const res = await fetch("/.netlify/functions/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: els.nameInput.value,
          role: els.roleInput.value,
          education: els.educationInput.value,
          experience: els.experienceInput.value,
          skills: els.skillsInput.value,
          targetLang: summaryTargetLang
        })
      });
      const data = await res.json();
      if (data.error) { alert(data.error); return; }
      els.summaryInput.value = data.result;
      renderPreview();
      saveState();
    });
  });

  // 翻译全文
  let translateTargetLang = "en";
  document.getElementById("translateBtn").addEventListener("click", function() {
    const btn = this;
    const btnText = document.getElementById("translateBtnText");
    // 弹出语言选择
    const choice = confirm("点击【确定】翻译成英文，点击【取消】翻译成中文");
    translateTargetLang = choice ? "en" : "zh";

    callAI(btn, btnText, "翻译中…", async () => {
      const fields = {
        role: els.roleInput.value,
        summary: els.summaryInput.value,
        education: els.educationInput.value,
        experience: els.experienceInput.value,
        projects: els.projectInput.value,
        awards: els.awardsInput.value,
        skills: els.skillsInput.value,
        languages: els.languageInput.value
      };

      const res = await fetch("/.netlify/functions/translate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields, targetLang: translateTargetLang })
      });
      const data = await res.json();
      if (data.error) { alert(data.error); return; }
      const r = data.result;
      if (r.role !== undefined) els.roleInput.value = r.role;
      if (r.summary !== undefined) els.summaryInput.value = r.summary;
      if (r.education !== undefined) els.educationInput.value = r.education;
      if (r.experience !== undefined) els.experienceInput.value = r.experience;
      if (r.projects !== undefined) els.projectInput.value = r.projects;
      if (r.awards !== undefined) els.awardsInput.value = r.awards;
      if (r.skills !== undefined) els.skillsInput.value = r.skills;
      if (r.languages !== undefined) els.languageInput.value = r.languages;
      renderPreview();
      saveState();
    });
  });

  init();
