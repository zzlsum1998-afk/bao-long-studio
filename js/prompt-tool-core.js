/* ============================================================
   Bao Long Studio · Prompt Builder — CORE LOGIC
   (extracted verbatim from original to preserve prompt corpus)
   ============================================================ */

/* ---------- Section 1: builder logic + silentLibrary ---------- */
const silentLibrary = {
            "莫兰迪配色": ["Morandi color palette, dusty blue 50%, sage green 25%, warm light gray 15%, muted terracotta 10%, low saturation colors, soft gray undertones", "Morandi color palette, dusty blue 55%, sand beige 25%, soft warm gray 10%, muted rose pink 10%, low saturation colors, calm elegant atmosphere", "Morandi color palette, sage green 50%, creamy off-white 25%, pale gray 15%, dusty blue 10%, muted tones, soft matte atmosphere", "Morandi color palette, dusty rose pink 50%, light khaki beige 25%, soft neutral gray 15%, muted lavender 10%, low saturation colors", "Morandi color palette, muted olive green 55%, warm gray 20%, soft beige 15%, dusty terracotta 10%, desaturated colors, natural calm mood", "Morandi color palette, dusty lavender 50%, creamy off-white 25%, pale neutral gray 15%, muted dusty blue 10%, soft low saturation tones", "Morandi color palette, dusty blue 55%, light khaki beige 20%, sage green 15%, muted terracotta 10%, calm and refined color harmony", "Morandi color palette, sand beige 50%, sage green 25%, pale gray 15%, dusty blue 10%, muted natural tones", "Morandi color palette, dusty blue 50%, muted rose pink 25%, warm light gray 15%, pale beige 10%, low saturation soft tones", "Morandi color palette, sage green 55%, warm gray 20%, creamy off-white 15%, muted terracotta 10%, calm elegant morandi tones"],
            "波谱风配色": ["Pop art color palette, cobalt blue 50%, bright red 25%, pure white 15%, lemon yellow 10%, high saturation colors, bold graphic contrast", "Pop art color palette, bright lemon yellow 55%, cobalt blue 20%, deep black 15%, vivid red 10%, high saturation bold colors", "Pop art color palette, hot pink 50%, electric blue 25%, pure white 15%, bright yellow 10%, vibrant pop art colors", "Pop art color palette, vivid orange 50%, royal blue 25%, pure white 15%, bright cyan 10%, bold high contrast colors", "Pop art color palette, bright violet purple 50%, lemon yellow 25%, pure white 15%, cobalt blue 10%, vivid pop art tones", "Pop art color palette, vivid red 55%, bright cyan 20%, pure white 15%, lemon yellow 10%, strong pop art contrast", "Pop art color palette, bright cyan 50%, hot pink 25%, pure white 15%, vivid yellow 10%, playful pop art colors", "Pop art color palette, electric blue 50%, bright orange 25%, pure white 15%, vivid red 10%, bold high saturation palette", "Pop art color palette, bright yellow 50%, hot pink 25%, cobalt blue 15%, deep black 10%, vibrant pop art contrast", "Pop art color palette, bright cyan 55%, vivid purple 20%, pure white 15%, lemon yellow 10%, bold graphic pop art style"],
            "复古风配色": ["Vintage color palette, terracotta red 50%, creamy beige 25%, warm brown 15%, mustard yellow 10%, warm retro atmosphere", "Vintage color palette, olive green 55%, warm beige 20%, soft brown 15%, brick red 10%, classic retro tones", "Vintage color palette, mustard yellow 50%, dark brown 25%, creamy off-white 15%, burnt orange 10%, warm vintage color scheme", "Vintage color palette, brick red 50%, sand beige 25%, warm gray 15%, olive green 10%, retro earthy tones", "Vintage color palette, caramel brown 55%, light beige 20%, muted olive green 15%, dusty orange 10%, warm nostalgic mood", "Vintage color palette, deep olive green 50%, khaki beige 25%, warm brown 15%, terracotta red 10%, earthy vintage palette", "Vintage color palette, burnt orange 50%, warm gray beige 25%, deep brown 15%, mustard yellow 10%, retro 70s color mood", "Vintage color palette, reddish brown 55%, sand beige 20%, olive green 15%, mustard yellow 10%, classic retro tones", "Vintage color palette, deep navy blue 50%, creamy beige 25%, warm gray 15%, brick red 10%, elegant vintage mood", "Vintage color palette, forest green 50%, warm beige 25%, soft brown 15%, burnt orange 10%, nostalgic retro atmosphere"],
            "极简配色": ["Minimalist color palette, deep black 50%, pure white 25%, light gray 15%, muted beige 10%, clean modern minimal aesthetic", "Minimalist color palette, warm off-white 55%, soft gray 20%, deep charcoal 15%, muted olive green 10%, calm minimal atmosphere", "Minimalist color palette, light neutral gray 50%, pure white 25%, charcoal gray 15%, muted terracotta 10%, clean architectural minimal style", "Minimalist color palette, sand beige 50%, creamy white 25%, deep graphite gray 15%, muted sage green 10%, soft minimalist palette", "Minimalist color palette, creamy off-white 55%, pale gray 20%, deep black 15%, muted blue accent 10%, modern minimal aesthetic", "Minimalist color palette, warm gray 50%, soft beige white 25%, charcoal black 15%, muted olive green 10%, calm minimalist design", "Minimalist color palette, pale beige 50%, pure white 25%, deep gray 15%, muted rust accent 10%, minimal architectural palette", "Minimalist color palette, cool gray 50%, pure white 25%, deep navy blue 15%, muted sand beige 10%, modern minimal tone", "Minimalist color palette, pure white 55%, soft gray 20%, natural wood brown 15%, muted black accent 10%, minimal Scandinavian feeling", "Minimalist color palette, stone gray 50%, warm white 25%, deep charcoal 15%, muted sage green 10%, architectural minimal palette"],
            "地中海配色": ["Mediterranean color palette, azure blue 50%, pure white 25%, sand beige 15%, terracotta accent 10%, fresh coastal atmosphere", "Mediterranean color palette, sky blue 55%, warm white 20%, sandy beige 15%, lemon yellow 10%, sunny mediterranean mood", "Mediterranean color palette, deep mediterranean blue 50%, pure white 25%, light stone gray 15%, olive green accent 10%, coastal mediterranean style", "Mediterranean color palette, turquoise blue 50%, creamy white 25%, warm sand beige 15%, terracotta red 10%, mediterranean seaside palette", "Mediterranean color palette, cobalt blue 55%, pure white 20%, light beige 15%, lemon yellow accent 10%, bright coastal mediterranean colors", "Mediterranean color palette, ocean blue 50%, warm off-white 25%, pale stone gray 15%, olive green 10%, relaxed mediterranean feeling", "Mediterranean color palette, light sky blue 50%, pure white 25%, sandy beige 15%, terracotta accent 10%, mediterranean coastal architecture palette", "Mediterranean color palette, turquoise blue 55%, pure white 20%, soft sand beige 15%, olive green accent 10%, mediterranean seaside mood", "Mediterranean color palette, deep navy blue 50%, pure white 25%, light beige 15%, lemon yellow accent 10%, mediterranean coastal vibe", "Mediterranean color palette, mediterranean sea blue 50%, creamy white 25%, warm sand beige 15%, terracotta accent 10%, mediterranean architecture colors"],
            "马卡龙配色": ["Macaron color palette, pastel pink 50%, mint green 25%, creamy white 15%, butter yellow accent 10%, soft pastel tones", "Macaron color palette, pastel lavender 50%, baby blue 25%, creamy white 15%, pastel pink accent 10%, light soft pastel palette", "Macaron color palette, mint green 55%, pastel pink 20%, soft cream white 15%, pastel lemon yellow 10%, sweet macaron tones", "Macaron color palette, baby blue 50%, pastel pink 25%, creamy white 15%, soft lavender accent 10%, gentle pastel colors", "Macaron color palette, pastel peach pink 50%, mint green 25%, warm cream white 15%, pastel yellow accent 10%, soft dessert colors", "Macaron color palette, pastel lemon yellow 50%, baby blue 25%, creamy white 15%, pastel pink accent 10%, light playful palette", "Macaron color palette, pastel lavender 50%, mint green 25%, creamy white 15%, pastel pink accent 10%, sweet pastel atmosphere", "Macaron color palette, pastel sky blue 55%, peach pink 20%, creamy white 15%, soft lemon yellow accent 10%, dreamy pastel palette", "Macaron color palette, mint green 50%, pastel lemon yellow 25%, creamy white 15%, pastel pink accent 10%, soft candy colors", "Macaron color palette, pastel pink 50%, pastel lavender 25%, baby blue 15%, butter yellow accent 10%, playful macaron palette"],
            "赛博朋克配色": ["Cyberpunk color palette, electric blue 50%, neon purple 25%, deep black 15%, hot pink accent 10%, neon glow cyberpunk atmosphere", "Cyberpunk color palette, neon pink 55%, electric blue 20%, deep black 15%, cyan accent 10%, futuristic neon lighting", "Cyberpunk color palette, bright cyan 50%, neon purple 25%, deep black 15%, neon magenta accent 10%, futuristic cyberpunk colors", "Cyberpunk color palette, electric blue 50%, hot pink 25%, dark purple 15%, cyan accent 10%, glowing cyberpunk palette", "Cyberpunk color palette, neon violet 55%, bright cyan 20%, deep black 15%, neon pink accent 10%, futuristic neon aesthetic", "Cyberpunk color palette, electric blue 50%, bright cyan 25%, deep navy 15%, neon green accent 10%, cyberpunk city colors", "Cyberpunk color palette, neon magenta 50%, bright violet 25%, deep black 15%, electric blue accent 10%, glowing neon palette", "Cyberpunk color palette, neon cyan 55%, electric blue 20%, deep black 15%, neon purple accent 10%, cyberpunk lighting colors", "Cyberpunk color palette, electric blue 50%, neon purple 25%, dark navy 15%, neon green accent 10%, futuristic neon tones", "Cyberpunk color palette, neon purple 50%, hot pink 25%, deep black 15%, bright cyan accent 10%, vibrant cyberpunk atmosphere"],
            "同色系配色": ["limited four-color palette, monochromatic sage green tones, three dominant colors: deep sage (#4F5D53), muted sage (#788176), light sage (#B7C0B5),small neutral accent color off-white, minimal color variation, color palette strictly limited, avoid additional colors", "plimited four-color palette, monochromatic olive green tones, three dominant colors: deep olive (#5E6B2E), olive green (#8F9C4F), soft olive (#C7D39A), small neutral accent color off-white, minimal color variation, color palette strictly limited, avoid additional colors", "limited four-color palette, monochromatic dusty blue tones, three dominant colors deep dusty blue (#3F4F63), muted blue (#6E859E), light dusty blue (#B8C9DA), small neutral accent color off-white, minimal color variation, color palette strictly limited, avoid additional colors", "limited four-color palette, monochromatic navy blue tones, three dominant colors deep navy (#243447), navy blue (#3B5183), light navy (#9FB4D8), small neutral accent color off-white, minimal color variation, color palette strictly limited, avoid additional colors", "limited four-color palette, monochromatic terracotta tones, three dominant colors deep terracotta (#7A2F1C), terracotta (#B25A3A), soft terracotta (#E4A88D), small neutral accent color off-white, minimal color variation, color palette strictly limited, avoid additional colors", "limited four-color palette, monochromatic rust tones, three dominant colors deep rust (#5A1F0E), rust brown (#833514), light rust (#D18A6C), small neutral accent color off-white, minimal color variation, color palette strictly limited, avoid additional colors", "limited four-color palette, monochromatic sand beige tones, three dominant colors deep sand (#8B7A5C), warm beige (#CBB999), light beige (#E9DFCC), small neutral accent color off-white, minimal color variation, color palette strictly limited, avoid additional colors", "limited four-color palette, monochromatic brown tones, three dominant colors deep chocolate (#3A2B22), warm brown (#5E4637), soft brown (#BFA99B), small neutral accent color off-white, minimal color variation, color palette strictly limited, avoid additional colors", "limited four-color palette, monochromatic warm gray tones, three dominant colors dark gray (#5A5A5A), neutral gray (#8E8E8E), light gray (#D6D6D6), small neutral accent color off-white, minimal color variation, color palette strictly limited, avoid additional colors", "limited four-color palette, monochromatic muted purple tones, three dominant colors deep purple (#4E3D5C), muted purple (#7A6A8F), soft purple (#C5BBD2), small neutral accent color off-white, minimal color variation, color palette strictly limited, avoid additional colors"],
            "随机风格配色": ["minimal color palette illustration, dominated by rust brown (#833514), butter yellow (#F5E283), and navy blue (#3B5183), balanced color blocking, modern design composition, soft lighting, clean visual aesthetic", "soft pastel color palette, dominated by buttermilk cream (#FFF1B5), pastel blue (#C1DBE8), and old burgundy (#43302E), calm balanced tones, minimal composition, modern aesthetic, soft ambient lighting", "earth tone color palette, dominated by sage green (#788176), warm rusk beige (#CCB999), and deep pipe red (#5E1803), natural muted tones, harmonious color balance, contemporary visual composition", "nature-inspired color palette, dominated by olivine green (#9BAD50), columbia light blue (#B6CFE4), and van dyke brown (#393027), soft natural tones, balanced color harmony, modern visual composition", "neutral minimalist color palette, dominated by cadet gray (#92A0A1), soft isabelline off-white (#EEEAE7), and deep bistre brown (#3A2B22), subtle elegant tones, calm modern aesthetic", "people drinking coffee", "Fresh natural palette, lime green and soft pink accents, deep dark forest green base, vibrant yet balanced atmosphere.", "Earthy Morandi palette, olive and reseda green tones, sandy dun beige, organic muted colors, wabi-sabi aesthetic.", "High-contrast warm palette, burnt rust orange, buttery yellow, deep navy blue, bold graphic color blocks, retro feel", "Warm afternoon mood, rich caramel brown, creamy papaya whip, soft baby blue, cozy and inviting architectural lighting", "vivid safety orange, clean flash white, dark slate teal, sleek contemporary materials, high energy", "obsidian black base, seashell off-white, denim blue textures, elegant minimalist design", "mossy bistre brown, white chocolate cream, deep red-violet, luxurious and moody atmosphere", "Yinmn blue, warm old lace, vibrant scarlet red, traditional and authoritative color scheme", "Spring garden palette, periwinkle and zaffre blue, bright citron yellow, floral-inspired colors, airy and luminous", "Quiet depth palette, moss green, soft old lace, vibrant iris purple, dreamy landscape lighting, mysterious and calm"],
            "日常人物活动": ["people walking along the path", "people strolling in the park", "people sitting and chatting", "people resting on benches", "people reading books", "people drinking coffee", "people talking with friends", "people enjoying the sunshine", "people walking dogs", "people relaxing in the public space"],
            "社交互动类": ["people having conversations", "people gathering together", "neighbors greeting each other", "people interacting in the plaza", "people sharing moments"],
            "儿童活动": ["children playing on playground equipment", "kids running and laughing", "children climbing structures", "children sliding down slides", "kids playing with toys", "children drawing on the ground", "children exploring the playground"],
            "运动类活动": ["people jogging", "people cycling", "people exercising", "people stretching", "people practicing yoga", "people playing ball games", "people skating"],
            "休闲娱乐活动": ["people picnicking on the grass", "people lying on the lawn", "people listening to music", "people watching performances", "people taking photos", "people painting outdoors"],
            "场地体验活动": ["people exploring the space", "people walking through the plaza", "people gathering under trees", "people enjoying the landscape", "people observing the surroundings", "people experiencing the architecture"]
        };

          let currentRandomPicks = {};
        let currentSelectedColor = "";

        function go(id) {
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({behavior:'smooth'});
                document.querySelectorAll('.nav-item').forEach(n => {
                    n.classList.toggle('active', n.getAttribute('onclick').includes(`'${id}'`));
                });
            }
        }

        function showL5(id, btn) {
            document.querySelectorAll('.l5-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('#l5-content .sub-group').forEach(g => g.style.display = 'none');
            document.getElementById(id).style.display = 'block';
        }

        function openL3(id) {
            const box = document.getElementById(id);
            const isVisible = box.style.display === 'block';
            document.querySelectorAll('.l3-box').forEach(b => b.style.display = 'none');
            if (!isVisible) box.style.display = 'block';
        }

        function resetAll() {
            document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
            document.querySelector('.ar-card').classList.add('active'); 
            currentRandomPicks = {};
            currentSelectedColor = "";
            document.getElementById('manualInput').value = "";
            update();
        }

        function randomGenerate() {
            resetAll();
            ['s1', 's2', 's3', 's4', 's5', 's6', 's7'].forEach(sid => {
                const section = document.getElementById(sid);
                const cards = Array.from(section.querySelectorAll('.card:not(.nested-trigger)'));
                if (cards.length > 0) {
                    const randomCard = cards[Math.floor(Math.random() * cards.length)];
                    randomCard.click();
                }
            });
        }

        document.addEventListener('click', e => {
            const c = e.target.closest('.card');
            if (!c || c.classList.contains('nested-trigger')) return;
            const label = c.innerText.trim();
            const section = c.closest('.section');

            if (c.classList.contains('multi')) {
                c.classList.toggle('active');
            } else if (c.classList.contains('random-color')) {
                const wasActive = c.classList.contains('active');
                section.querySelectorAll('.card').forEach(x => x.classList.remove('active'));
                if (!wasActive) {
                    c.classList.add('active');
                    const lib = silentLibrary[label];
                    currentSelectedColor = lib[Math.floor(Math.random() * lib.length)];
                } else {
                    currentSelectedColor = "";
                }
            } else if (c.classList.contains('random')) {
                c.classList.toggle('active');
                if (c.classList.contains('active')) {
                    const lib = silentLibrary[label];
                    currentRandomPicks[label] = lib[Math.floor(Math.random() * lib.length)];
                } else {
                    delete currentRandomPicks[label];
                }
            } else if (c.classList.contains('ar-card')) {
                section.querySelectorAll('.card').forEach(x => x.classList.remove('active'));
                c.classList.add('active');
            } else {
                section.querySelectorAll('.card').forEach(x => x.classList.remove('active'));
                c.classList.add('active');
            }
            update();
        });

        function update() {
            const s1 = document.querySelector('#s1 .card.active')?.dataset.val || "";
            const s2 = document.querySelector('#s2 .card.active')?.dataset.val || "";
            const s3 = currentSelectedColor;
            const s4 = document.querySelector('#s4 .card.active')?.dataset.val || "";
            const s5 = Array.from(document.querySelectorAll('#s5 .card.active')).map(el => el.dataset.val).filter(v => v).join(', ');
            const s6 = Object.values(currentRandomPicks).join(', ');
            const s7 = document.querySelector('#s7 .card.active')?.dataset.val || "";
            const ar = document.querySelector('#s-ar .card.active')?.dataset.val || "--ar 16:9";
            const manual = document.getElementById('manualInput').value.trim();

            let core = [s1, s2, s3, s4, s5, s6, s7, manual].filter(v => v !== "").join(', ');
            
            if(core) {
                const suffix = `, \nrealistic site layout, low saturation, white space, diffuse lighting, \n--v 6 ${ar} --style raw --s 750`;
                document.getElementById('result').innerText = core + suffix;
            } else {
                document.getElementById('result').innerText = "等待操作...";
            }
        }

        function copy() {
            const text = document.getElementById('result').innerText;
            if(text.includes("等待")) return;
            navigator.clipboard.writeText(text).then(() => alert("已复制完整指令！"));
        }

        document.getElementById('manualInput').addEventListener('input', update);

        // ── AI Generate ──
        async function aiGenerate() {
            const apiKey = document.getElementById('aiApiKey').value.trim();
            const intent = document.getElementById('aiIntent').value.trim();
            const btn = document.getElementById('btnAiGenerate');
            const status = document.getElementById('aiStatus');

            // ── API Key 检查（上线后取消此注释）──
            // if (!apiKey) {
            //     status.textContent = '请先填入 DeepSeek API Key';
            //     status.className = 'ai-status error';
            //     return;
            // }

            // 收集当前已选维度
            const s1label = document.querySelector('#s1 .card.active')?.innerText.replace(/[✎×]/g,'').trim() || '';
            const s2label = document.querySelector('#s2 .card.active')?.innerText.replace(/[✎×]/g,'').trim() || '';
            const s3label = currentSelectedColor ? document.querySelector('#s3 .card.active')?.innerText.replace(/[✎×]/g,'').trim() || '' : '';
            const s4label = document.querySelector('#s4 .card.active')?.innerText.replace(/[✎×]/g,'').trim() || '';
            const s5labels = Array.from(document.querySelectorAll('#s5 .card.active')).map(el => el.innerText.replace(/[✎×]/g,'').trim()).join('、');
            const s6labels = Array.from(document.querySelectorAll('#s6 .card.active')).map(el => el.innerText.replace(/[✎×]/g,'').trim()).join('、');
            const s7label = document.querySelector('#s7 .card.active')?.innerText.replace(/[✎×]/g,'').trim() || '';
            const arVal = document.querySelector('#s-ar .card.active')?.dataset.val || '--ar 16:9';
            const manual = document.getElementById('manualInput').value.trim();

            const selections = [
                s1label && `图面风格：${s1label}`,
                s2label && `构图角度：${s2label}`,
                s3label && `色彩风格：${s3label}`,
                s4label && `建筑要素：${s4label}`,
                s5labels && `景观要素：${s5labels}`,
                s6labels && `人物活动：${s6labels}`,
                s7label && `光影氛围：${s7label}`,
                manual && `补充关键词：${manual}`,
                intent && `设计意图：${intent}`,
            ].filter(Boolean).join('\n');

            if (!selections) {
                status.textContent = '请至少选择一个维度，或填写设计意图';
                status.className = 'ai-status error';
                return;
            }

            // 进入 loading 状态
            btn.disabled = true;
            btn.classList.add('loading');
            btn.querySelector('span').nextSibling.textContent = ' 生成中...';
            status.textContent = '正在调用 AI...';
            status.className = 'ai-status';

            const systemPrompt = `你是一位专业的 Midjourney prompt 工程师，擅长景观建筑效果图和插画风格的图像生成。
用户会给你一组设计维度选择，你需要生成一条高质量的 Midjourney prompt。

规则：
1. 输出纯英文 prompt，不含任何中文、解释或前缀
2. 关键词用逗号分隔，保持专业且精炼
3. 末尾固定加上：realistic site layout, low saturation, white space, diffuse lighting, \n--v 6 ${arVal} --style raw --s 750
4. 整体风格参考：landscape architecture visualization, architectural rendering, design illustration
5. 不要重复相同含义的关键词`;

            const userMsg = `根据以下设计选择生成 Midjourney prompt：
${selections}`;

            try {
                // ── DeepSeek API 调用（上线后启用，替换 PLACEHOLDER_KEY）──
                // const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
                // const KEY = apiKey || 'PLACEHOLDER_KEY';
                // const response = await fetch(DEEPSEEK_API_URL, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': `Bearer ${KEY}`
                //     },
                //     body: JSON.stringify({
                //         model: 'deepseek-chat',
                //         max_tokens: 400,
                //         temperature: 0.85,
                //         messages: [
                //             { role: 'system', content: systemPrompt },
                //             { role: 'user', content: userMsg }
                //         ]
                //     })
                // });
                // if (!response.ok) {
                //     const err = await response.json().catch(() => ({}));
                //     throw new Error(err.error?.message || `HTTP ${response.status}`);
                // }
                // const data = await response.json();
                // const aiPrompt = data.choices?.[0]?.message?.content?.trim();

                // ── 占位模拟（上线前使用，模拟 AI 返回）──
                await new Promise(r => setTimeout(r, 1200));
                const mockBase = [
                    s1label && 'modern flat illustration, simplified geometric forms, clean vector aesthetic',
                    s2label === '鸟瞰' ? "bird's-eye view, aerial perspective" : s2label === '轴测' ? 'isometric view' : s2label === '平视' ? 'eye-level perspective' : '',
                    s3label ? 'low saturation color palette, muted tones, refined color balance' : '',
                    s4label ? 'contemporary architectural elements, refined structural details' : '',
                    s5labels ? 'lush greenery, layered planting, naturalistic landscape design' : '',
                    s6labels ? 'human figures engaged in leisure activities, vibrant community life' : '',
                    s7label === '黄金时段' ? 'golden hour lighting, warm soft sunlight, long atmospheric shadows' : s7label === '蓝调时刻' ? 'blue hour, twilight ambient glow' : 'soft diffused daylight',
                    manual,
                    intent,
                ].filter(Boolean).join(', ');
                const aiPrompt = mockBase + `, landscape architecture visualization, architectural rendering, white space composition\n--v 6 ${arVal} --style raw --s 750`;
                // ── 占位模拟结束 ──

                if (!aiPrompt) throw new Error('AI 返回内容为空');

                document.getElementById('result').innerText = aiPrompt;
                status.textContent = '✓ AI 生成完成，可直接复制使用';
                status.className = 'ai-status success';

            } catch(err) {
                status.textContent = `生成失败：${err.message}`;
                status.className = 'ai-status error';
            } finally {
                btn.disabled = false;
                btn.classList.remove('loading');
                btn.querySelector('span').nextSibling.textContent = ' ✦ AI 生成 Prompt';
            }
        }

/* ---------- Section 2: edit mode + persistence ---------- */
const STORAGE_KEY = 'promptTool_customData_v1';
let editMode = false;
let modalTarget = null;   // { type: 'simple'|'random', cardEl, sectionId }
let tempCorpus = [];       // working copy while modal open

// ── Data Layer ──
// Each section's cards stored as array of {name, val, type}
// type: 'simple' | 'random-color' | 'random' | 'multi' | 'ar-card'
// silentLibrary entries stored separately as customLibrary

function getCustomData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch(e) { return {}; }
}

function saveCustomData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── On load: apply any saved customizations ──
function applyCustomData() {
  const data = getCustomData();

  // Apply card edits per section
  if (data.sections) {
    Object.entries(data.sections).forEach(([sid, cards]) => {
      const section = document.getElementById(sid);
      if (!section) return;
      const grid = section.querySelector('.grid');
      if (!grid) return;

      // Rebuild grid from saved data
      // Keep nested-triggers (they are structural, not user-editable cards)
      const nestedTriggers = Array.from(grid.querySelectorAll('.nested-trigger, .l3-box'));
      grid.innerHTML = '';
      nestedTriggers.forEach(el => grid.appendChild(el));

      cards.forEach(cardData => {
        const el = makeCardEl(cardData, sid);
        // Insert before nested-triggers if any
        const firstNested = grid.querySelector('.nested-trigger');
        if (firstNested) grid.insertBefore(el, firstNested);
        else grid.appendChild(el);
      });

      addPlusButton(grid, sid);
    });
  }

  // Apply library edits
  if (data.library) {
    Object.entries(data.library).forEach(([key, arr]) => {
      silentLibrary[key] = arr;
    });
  }
}

function makeCardEl(cardData, sectionId) {
  const el = document.createElement('div');
  el.className = 'card' + (cardData.type ? ' ' + cardData.type : '');
  el.textContent = cardData.name;
  if (cardData.val) el.dataset.val = cardData.val;

  // Edit buttons overlay
  const btns = document.createElement('div');
  btns.className = 'card-edit-btns';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn-card-edit';
  editBtn.textContent = '✎';
  editBtn.title = '编辑';
  editBtn.addEventListener('click', e => {
    e.stopPropagation();
    openEditModal(el, sectionId);
  });

  const delBtn = document.createElement('button');
  delBtn.className = 'btn-card-del';
  delBtn.textContent = '×';
  delBtn.title = '删除';
  delBtn.addEventListener('click', e => {
    e.stopPropagation();
    deleteCard(el, sectionId);
  });

  btns.appendChild(editBtn);
  btns.appendChild(delBtn);
  el.appendChild(btns);
  return el;
}

function addEditButtonsToExistingCards() {
  // Called once when edit mode is first toggled on
  // Only add if not already added
  document.querySelectorAll('.card:not(.nested-trigger)').forEach(card => {
    if (card.querySelector('.card-edit-btns')) return;
    const sid = card.closest('.section')?.id;
    if (!sid) return;

    const btns = document.createElement('div');
    btns.className = 'card-edit-btns';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn-card-edit';
    editBtn.textContent = '✎';
    editBtn.title = '编辑';
    editBtn.addEventListener('click', e => {
      e.stopPropagation();
      openEditModal(card, sid);
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-card-del';
    delBtn.textContent = '×';
    delBtn.title = '删除';
    delBtn.addEventListener('click', e => {
      e.stopPropagation();
      deleteCard(card, sid);
    });

    btns.appendChild(editBtn);
    btns.appendChild(delBtn);
    card.appendChild(btns);
  });

  // Add + buttons to every grid (except s-ar which is fixed)
  document.querySelectorAll('.section').forEach(section => {
    const sid = section.id;
    if (sid === 's-ar') return; // don't allow editing AR ratios
    const grid = section.querySelector('.grid');
    if (!grid) return;
    if (grid.querySelector('.btn-add-card')) return;
    addPlusButton(grid, sid);
  });
}

function addPlusButton(grid, sectionId) {
  if (sectionId === 's-ar') return;
  const plusBtn = document.createElement('button');
  plusBtn.className = 'btn-add-card';
  plusBtn.textContent = '+';
  plusBtn.title = '添加卡片';
  plusBtn.addEventListener('click', () => openAddModal(sectionId));
  grid.appendChild(plusBtn);
}

// ── Edit Mode Toggle ──
function toggleEditMode() {
  editMode = !editMode;
  document.body.classList.toggle('edit-mode', editMode);
  const btn = document.getElementById('editToggleBtn');
  btn.classList.toggle('active', editMode);
  btn.textContent = editMode ? '✓ 退出编辑' : '✏️ 编辑语料';

  if (editMode) {
    addEditButtonsToExistingCards();
  }
}

// ── Modal ──
function openEditModal(cardEl, sectionId) {
  const isRandom = cardEl.classList.contains('random') || cardEl.classList.contains('random-color');
  const cardName = cardEl.childNodes[0]?.nodeType === 3
    ? cardEl.childNodes[0].textContent.trim()
    : cardEl.textContent.replace(/[✎×]/g, '').trim();

  modalTarget = { type: isRandom ? 'random' : 'simple', cardEl, sectionId };

  document.getElementById('modalTitle').textContent = '编辑卡片';
  document.getElementById('modalSub').textContent = isRandom
    ? '编辑随机候选词条池，点击卡片时将随机抽取其中一条'
    : '修改卡片名称和对应的 Prompt 片段';

  if (isRandom) {
    document.getElementById('modalSimple').style.display = 'none';
    document.getElementById('modalCorpus').style.display = 'block';
    document.getElementById('modalSaveBtn').style.display = 'none';
    tempCorpus = [...(silentLibrary[cardName] || [])];
    renderCorpusList();
  } else {
    document.getElementById('modalSimple').style.display = 'block';
    document.getElementById('modalCorpus').style.display = 'none';
    document.getElementById('modalSaveBtn').style.display = 'inline-flex';
    document.getElementById('modalName').value = cardName;
    document.getElementById('modalValue').value = cardEl.dataset.val || '';
  }

  document.getElementById('editModalOverlay').classList.add('open');
}

function openAddModal(sectionId) {
  modalTarget = { type: 'add', sectionId };
  document.getElementById('modalTitle').textContent = '新增卡片';
  document.getElementById('modalSub').textContent = '添加一张新的选项卡片到此分类';
  document.getElementById('modalSimple').style.display = 'block';
  document.getElementById('modalCorpus').style.display = 'none';
  document.getElementById('modalSaveBtn').style.display = 'inline-flex';
  document.getElementById('modalName').value = '';
  document.getElementById('modalValue').value = '';
  document.getElementById('editModalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('editModalOverlay').classList.remove('open');
  modalTarget = null;
  tempCorpus = [];
}

function saveModal() {
  if (!modalTarget) return;
  const { type, cardEl, sectionId } = modalTarget;

  if (type === 'add') {
    const name = document.getElementById('modalName').value.trim();
    const val = document.getElementById('modalValue').value.trim();
    if (!name || !val) { alert('请填写卡片名称和 Prompt 内容'); return; }

    const section = document.getElementById(sectionId);
    const grid = section.querySelector('.grid');
    const cardData = { name, val, type: 'simple' };
    const el = makeCardEl(cardData, sectionId);
    const plusBtn = grid.querySelector('.btn-add-card');
    if (plusBtn) grid.insertBefore(el, plusBtn);
    else grid.appendChild(el);

    saveSection(sectionId);

  } else if (type === 'simple') {
    const name = document.getElementById('modalName').value.trim();
    const val = document.getElementById('modalValue').value.trim();
    if (!name || !val) { alert('请填写卡片名称和 Prompt 内容'); return; }

    // Update text node
    cardEl.childNodes[0].textContent = name;
    cardEl.dataset.val = val;

    saveSection(sectionId);
    update();
  }

  closeModal();
}

function renderCorpusList() {
  const list = document.getElementById('corpusList');
  list.innerHTML = '';
  if (tempCorpus.length === 0) {
    list.innerHTML = '<div style="padding:10px;color:#aaa;font-size:12px;text-align:center;">暂无词条</div>';
    return;
  }
  tempCorpus.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'corpus-item';
    const span = document.createElement('span');
    span.textContent = item;
    const del = document.createElement('button');
    del.textContent = '×';
    del.title = '删除此词条';
    del.addEventListener('click', () => {
      tempCorpus.splice(idx, 1);
      const cardName = modalTarget.cardEl.childNodes[0]?.nodeType === 3
        ? modalTarget.cardEl.childNodes[0].textContent.trim()
        : modalTarget.cardEl.textContent.replace(/[✎×]/g, '').trim();
      silentLibrary[cardName] = [...tempCorpus];
      saveLibraryKey(cardName);
      renderCorpusList();
    });
    row.appendChild(span);
    row.appendChild(del);
    list.appendChild(row);
  });
}

function addCorpusItem() {
  const input = document.getElementById('corpusNewItem');
  const val = input.value.trim();
  if (!val) return;
  tempCorpus.push(val);
  const cardName = modalTarget.cardEl.childNodes[0]?.nodeType === 3
    ? modalTarget.cardEl.childNodes[0].textContent.trim()
    : modalTarget.cardEl.textContent.replace(/[✎×]/g, '').trim();
  silentLibrary[cardName] = [...tempCorpus];
  saveLibraryKey(cardName);
  input.value = '';
  renderCorpusList();
}

function deleteCard(cardEl, sectionId) {
  if (!confirm('确认删除这张卡片？')) return;
  cardEl.remove();
  saveSection(sectionId);
  update();
}

// ── Persistence helpers ──
function saveSection(sectionId) {
  const section = document.getElementById(sectionId);
  const grid = section.querySelector('.grid');
  const cards = Array.from(grid.querySelectorAll('.card:not(.nested-trigger)')).map(card => {
    const name = card.childNodes[0]?.nodeType === 3
      ? card.childNodes[0].textContent.trim()
      : card.textContent.replace(/[✎×]/g, '').trim();
    const types = ['random-color','random','multi','ar-card'].filter(t => card.classList.contains(t));
    return { name, val: card.dataset.val || '', type: types[0] || 'simple' };
  });

  const data = getCustomData();
  if (!data.sections) data.sections = {};
  data.sections[sectionId] = cards;
  saveCustomData(data);
}

function saveLibraryKey(key) {
  const data = getCustomData();
  if (!data.library) data.library = {};
  data.library[key] = silentLibrary[key];
  saveCustomData(data);
}

function restoreDefaults() {
  if (!confirm('确认恢复所有默认语料？你的所有修改将被清除。')) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// Click outside modal to close
document.getElementById('editModalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Apply on load
applyCustomData();
