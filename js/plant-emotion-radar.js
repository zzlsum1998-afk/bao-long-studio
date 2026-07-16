const DIMS = ['宁静','活力','自然','浪漫','野趣','都市感'];
const DIM_COLORS = ['#6F91B8','#C9825A','#789B68','#C97E9B','#9B815C','#7D8790'];
const DIM_NOTES = ['安静、舒缓、疗愈','明亮、热烈、外向','生态、松弛、亲近土地','柔软、花感、诗意','原生、粗粝、自由','克制、线性、现代'];
function hslScore(hex, dim) {
  const r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b), d = max-min;
  let h = 0, s = 0, l = (max+min)/2;
  if (d > 0) {
    s = d / (1 - Math.abs(2*l-1));
    if (max===r) h = ((g-b)/d + 6) % 6;
    else if (max===g) h = (b-r)/d + 2;
    else h = (r-g)/d + 4;
    h *= 60;
  }
  const scores = [0,0,0,0,0,0];
  scores[0] = (h>=200&&h<=280) ? 6+s*2+(1-s)*2 : Math.max(0, 4-(Math.min(Math.abs(h-240),Math.abs(h-240+360))/60)*1.5);
  scores[0] += (1-s)*2 + l*2;
  scores[1] = ((h<=60||h>=320) ? 5+s*3 : 2) + s*2 + (1-l)*1.5;
  scores[2] = (h>=70&&h<=160) ? 5+s*2 : Math.max(0,3-(Math.min(Math.abs(h-115),360-Math.abs(h-115))/60)*1.5);
  scores[2] += (1-s)*1;
  scores[3] = (h>=290||h<=20) ? 5+l*3+(1-s)*1 : Math.max(0,3-Math.min(Math.abs(h-320),Math.abs(h-320+360))/60);
  scores[4] = (1-l)*3 + (1-s)*2 + (h>=20&&h<=80?2:0);
  scores[5] = (1-s)*4 + (h>=180&&h<=240?2:0) + (l>0.6?1:0);
  return Math.min(10, Math.max(1, parseFloat(scores[dim].toFixed(1))));
}
const PLANTS_RAW = [
  {name:'薰衣草',color:'#9888C8',adj:[3, -2, 0, 1, 0, -1]},
  {name:'睡莲（白）',color:'#F0F0F0',adj:[4, -2, 1, 1, -1, 0]},
  {name:'水杉',color:'#3A6A38',adj:[3, -2, 2, 0, 1, -1]},
  {name:'竹',color:'#4A7A3A',adj:[4, -2, 1, 0, 0, -1]},
  {name:'苔藓',color:'#5A7048',adj:[4, -2, 2, 0, 1, -1]},
  {name:'蓝雪花',color:'#A0B8E0',adj:[4, -2, 0, 0, -1, 0]},
  {name:'玉簪',color:'#D8E0D0',adj:[4, -2, 1, 1, -1, 0]},
  {name:'鸢尾（蓝）',color:'#7E9BC8',adj:[4, -1, 0, 1, 0, 0]},
  {name:'麦冬',color:'#5F7F55',adj:[4, -2, 2, 0, 0, -1]},
  {name:'白玉兰',color:'#F5F0E8',adj:[4, -2, 0, 1, -1, 0]},
  {name:'松',color:'#2A5028',adj:[3, -2, 2, 0, 1, -1]},
  {name:'枯山水白砂',color:'#E8E4D8',adj:[4, -3, 0, 0, -1, 1]},
  {name:'银叶草',color:'#C8D0C8',adj:[4, -2, 0, 0, -1, 1]},
  {name:'蓝羊茅',color:'#9BAEAE',adj:[4, -2, 1, 0, 0, 1]},
  {name:'向日葵',color:'#F0B820',adj:[-2, 4, 1, 0, 0, 0]},
  {name:'美人蕉（红）',color:'#E05820',adj:[-2, 4, 0, -1, 1, 0]},
  {name:'矮牵牛（橙）',color:'#E06030',adj:[-2, 4, 0, -1, 0, 0]},
  {name:'一串红',color:'#E02828',adj:[-2, 4, 0, -1, 0, 1]},
  {name:'石榴花',color:'#E83020',adj:[-2, 4, 0, -1, 0, 1]},
  {name:'凌霄',color:'#E05820',adj:[-2, 4, 0, 0, 1, 0]},
  {name:'月季（红）',color:'#D43858',adj:[-2, 4, 0, 1, 0, 1]},
  {name:'金鸡菊',color:'#E8A020',adj:[-2, 4, 1, 0, 0, 0]},
  {name:'百日草',color:'#E04838',adj:[-2, 4, 0, 0, 0, 0]},
  {name:'郁金香（橙）',color:'#E89030',adj:[-2, 4, 0, 0, 0, 1]},
  {name:'萱草',color:'#F0A030',adj:[-2, 4, 1, 0, 0, 0]},
  {name:'天人菊',color:'#D86828',adj:[-2, 4, 1, -1, 1, 0]},
  {name:'火炬花',color:'#D85028',adj:[-2, 4, 0, -1, 1, 1]},
  {name:'虞美人（红）',color:'#D84038',adj:[-2, 4, 0, 1, 1, 0]},
  {name:'狼尾草',color:'#C8B070',adj:[0, -2, 4, -1, 2, -1]},
  {name:'细叶芒',color:'#B8A858',adj:[0, -2, 4, -1, 2, -1]},
  {name:'芦苇',color:'#C8B870',adj:[1, -2, 4, 0, 2, -1]},
  {name:'荻',color:'#C0A858',adj:[1, -2, 4, -1, 2, -1]},
  {name:'柳树',color:'#7A9A58',adj:[1, -2, 4, 0, 1, -1]},
  {name:'马鞭草',color:'#8878C0',adj:[1, -1, 4, 0, 1, -1]},
  {name:'蒲苇',color:'#BEB08A',adj:[1, -2, 4, -1, 2, -1]},
  {name:'野花组合',color:'#D4A060',adj:[0, -1, 4, -1, 2, -1]},
  {name:'榆叶梅',color:'#D88A98',adj:[0, -1, 4, 1, 1, -1]},
  {name:'木槿',color:'#A878C8',adj:[1, -1, 4, 1, 1, -1]},
  {name:'桂花',color:'#E8B060',adj:[1, -1, 4, 1, 0, -1]},
  {name:'银杏',color:'#E8C840',adj:[1, -1, 4, 1, 0, -1]},
  {name:'鸡爪槭',color:'#E86828',adj:[0, 0, 4, 0, 1, -1]},
  {name:'合欢',color:'#F0A0B0',adj:[1, -1, 4, 2, 0, -1]},
  {name:'玫瑰（粉白）',color:'#F4C0D0',adj:[1, -1, 0, 4, -1, -1]},
  {name:'绣球（白）',color:'#F0EEE8',adj:[1, -1, 0, 4, -1, 0]},
  {name:'绣球（蓝）',color:'#80A8D8',adj:[1, -1, 0, 4, 0, 0]},
  {name:'飞燕草',color:'#7888C8',adj:[1, -1, 0, 4, 0, 0]},
  {name:'樱花',color:'#FFCCD8',adj:[1, -1, 0, 4, -1, 0]},
  {name:'栀子花',color:'#F8F4E4',adj:[1, -1, 0, 4, -1, 0]},
  {name:'铁线莲（紫）',color:'#8878B8',adj:[1, -1, 0, 4, 0, 0]},
  {name:'紫藤',color:'#9080C0',adj:[1, -1, 0, 4, 0, 0]},
  {name:'荷花（粉）',color:'#F0A8B8',adj:[1, -1, 1, 4, 0, 0]},
  {name:'牡丹（白）',color:'#F5F0E8',adj:[1, -1, 0, 4, -1, 1]},
  {name:'桃花',color:'#F4A0B0',adj:[1, -1, 0, 4, -1, 0]},
  {name:'海棠',color:'#E87898',adj:[0, 0, 0, 4, -1, 0]},
  {name:'丁香',color:'#C4A0D0',adj:[1, -1, 0, 4, 0, 0]},
  {name:'山茶（红）',color:'#C83040',adj:[0, 0, 0, 4, 0, 0]},
  {name:'蕨类',color:'#3A6030',adj:[1, -2, 2, -2, 4, -1]},
  {name:'波斯菊',color:'#E890B8',adj:[0, -1, 1, 0, 4, -1]},
  {name:'鼠尾草',color:'#7E78B8',adj:[1, -1, 1, -1, 4, -1]},
  {name:'松果菊',color:'#B85A68',adj:[0, 0, 1, -1, 4, -1]},
  {name:'蛇鞭菊',color:'#A070B0',adj:[0, -1, 1, -1, 4, -1]},
  {name:'蓍草',color:'#D8C070',adj:[0, -2, 2, -1, 4, -1]},
  {name:'滨菊',color:'#F0E8D8',adj:[1, -2, 1, 0, 4, -1]},
  {name:'狗尾草',color:'#B8A060',adj:[0, -2, 2, -1, 4, -1]},
  {name:'蓝刺头',color:'#6F86A8',adj:[1, -1, 1, -1, 4, -1]},
  {name:'醉鱼草',color:'#9A78B8',adj:[0, -1, 1, 0, 4, -1]},
  {name:'野菊',color:'#D8B848',adj:[0, -1, 2, -1, 4, -1]},
  {name:'金露梅',color:'#D8A840',adj:[0, -1, 2, -1, 4, -1]},
  {name:'紫穗狼尾草',color:'#8A6B78',adj:[0, -1, 1, -1, 4, -1]},
  {name:'山桃草',color:'#E0A0B0',adj:[0, -1, 1, 0, 4, -1]},
  {name:'大叶黄杨',color:'#3A6828',adj:[-2, 0, -1, -2, -2, 4]},
  {name:'棕榈',color:'#5A8840',adj:[-2, 1, -1, -2, -1, 4]},
  {name:'朱蕉',color:'#8A2828',adj:[-2, 1, -2, -2, -1, 4]},
  {name:'龙舌兰',color:'#788848',adj:[-2, 0, -1, -3, 1, 4]},
  {name:'修剪绿篱',color:'#3A7030',adj:[-2, 0, -2, -3, -2, 4]},
  {name:'银叶菊',color:'#C0C8C0',adj:[-1, -1, -1, -2, -2, 4]},
  {name:'南天竹',color:'#C84048',adj:[-1, 0, -1, -1, -1, 4]},
  {name:'红枫',color:'#C03020',adj:[-1, 1, -1, -1, 0, 4]},
  {name:'龟背竹',color:'#2F6B45',adj:[-2, 0, -1, -2, -1, 4]},
  {name:'蒲葵',color:'#4F7D52',adj:[-2, 0, -1, -2, -1, 4]},
  {name:'海桐球',color:'#4E6A3A',adj:[-2, 0, -2, -3, -2, 4]},
  {name:'小叶女贞',color:'#536B43',adj:[-2, 0, -2, -3, -2, 4]},
  {name:'黑松造型树',color:'#243A28',adj:[0, -1, 0, -1, 1, 4]},
  {name:'花叶芒',color:'#B8B08C',adj:[-1, -1, 0, -2, 0, 4]}
];
const PLANTS = PLANTS_RAW.map(p => { const scores = DIMS.map((_, i) => Math.min(10, Math.max(1, Math.round(hslScore(p.color, i) + (p.adj[i]||0))))); const mainDim = scores.indexOf(Math.max(...scores)); return {...p, scores, mainDim}; });
const dimGroups = DIMS.map((d, i) => ({dim:d, idx:i, plants:PLANTS.filter(p=>p.mainDim===i)}));
let activeDim = 0; let selected = new Set();
function showToast(msg){const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(showToast.t); showToast.t=setTimeout(()=>t.classList.remove('show'),1500)}
function copyText(text){navigator.clipboard.writeText(text).then(()=>showToast('已复制'))}
function getAvgScores(){const arr=[...selected].map(name=>PLANTS.find(p=>p.name===name)).filter(Boolean); if(!arr.length) return DIMS.map(()=>0); return DIMS.map((_,i)=>parseFloat((arr.reduce((s,p)=>s+p.scores[i],0)/arr.length).toFixed(1)))}
function getMoodDesc(scores){const sorted=scores.map((v,i)=>({v,i})).sort((a,b)=>b.v-a.v); const a=sorted[0], b=sorted[1]; const descs={0:'宁静感占主导，整体更适合疗愈花园、静坐空间、低刺激的入口节点。',1:'活力感更突出，色彩和形态会更外向，适合儿童活动区、节庆花境或需要吸引视线的节点。',2:'自然感更强，组合会显得松弛、生态、贴近土地，适合自然式花境和乡野风格空间。',3:'浪漫气质明显，适合婚礼花园、柔和庭院、女性向商业空间或诗意花境。',4:'野趣感突出，带有原生、粗粝和自由生长的气质，适合荒野感花园和生态修复场景。',5:'都市感更明显，形态更克制、现代，适合商业街区、城市广场和极简景观。'}; return {title:DIMS[a.i]+' × '+DIMS[b.i], desc:descs[a.i]};}
function renderTabs(){document.getElementById('dimTabs').innerHTML=dimGroups.map((g,i)=>`<button class="dim-tab${i===activeDim?' active':''}" type="button" onclick="switchDim(${i})"><span class="dot" style="background:${DIM_COLORS[i]}"></span>${g.dim}<span style="opacity:.62">${g.plants.length}</span></button>`).join('')}
function switchDim(i){activeDim=i; renderTabs(); renderGrid()}
function renderGrid(){const group=dimGroups[activeDim]; document.getElementById('activeDimLabel').textContent=group.dim+'植物'; document.getElementById('activeDimCount').textContent=group.plants.length+' plants'; const full=selected.size>=8; document.getElementById('plantGrid').innerHTML=group.plants.map(p=>{const is=selected.has(p.name); const dis=full&&!is; return `<button class="plant-chip${is?' selected':''}${dis?' disabled':''}" type="button" ${dis?'disabled':''} onclick="togglePlant('${p.name}')"><span class="chip-dot" style="background:${p.color}"></span><span>${p.name}</span></button>`}).join('')}
function togglePlant(name){if(selected.has(name)) selected.delete(name); else if(selected.size<8) selected.add(name); renderGrid(); renderSelected(); updateResult()}
function renderSelected(){document.getElementById('countHint').textContent=`已选 ${selected.size} / 8`; const bar=document.getElementById('selectedBar'); if(!selected.size){bar.innerHTML='<span class="selected-empty">还没有选择植物</span>'; return} bar.innerHTML=[...selected].map(name=>{const p=PLANTS.find(x=>x.name===name); return `<button class="sel-tag" type="button" onclick="togglePlant('${name}')"><span class="chip-dot" style="background:${p.color};width:8px;height:8px"></span>${name} ×</button>`}).join('')}
function polar(cx,cy,r,angle){const rad=(angle-90)*Math.PI/180; return [cx+r*Math.cos(rad),cy+r*Math.sin(rad)]}
function drawRadar(scores){const svg=document.getElementById('radarSvg'); const cx=160, cy=160, maxR=112; let html=''; for(let ring=2; ring<=10; ring+=2){const r=maxR*ring/10; const pts=DIMS.map((_,i)=>polar(cx,cy,r,i*60).join(',')).join(' '); html+=`<polygon points="${pts}" fill="none" stroke="rgba(30,25,18,.12)" stroke-width="1"/>`} DIMS.forEach((d,i)=>{const [x,y]=polar(cx,cy,maxR,i*60); html+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(30,25,18,.10)"/>`; const [lx,ly]=polar(cx,cy,maxR+28,i*60); html+=`<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="${DIM_COLORS[i]}">${d}</text>`}); const pts=scores.map((v,i)=>polar(cx,cy,maxR*v/10,i*60).join(',')).join(' '); html+=`<polygon points="${pts}" fill="rgba(120,155,104,.23)" stroke="#789B68" stroke-width="2.4"/>`; scores.forEach((v,i)=>{const [x,y]=polar(cx,cy,maxR*v/10,i*60); html+=`<circle cx="${x}" cy="${y}" r="4.6" fill="${DIM_COLORS[i]}" stroke="#fff" stroke-width="2"/>`}); svg.innerHTML=html}
function updateResult(){const panel=document.getElementById('resultPanel'); if(!selected.size){panel.classList.remove('visible'); return} panel.classList.add('visible'); const scores=getAvgScores(); const mood=getMoodDesc(scores); document.getElementById('selectedSummary').textContent=selected.size+' plants'; document.getElementById('moodTitle').textContent=mood.title; document.getElementById('moodDesc').textContent=mood.desc; drawRadar(scores); document.getElementById('scoreList').innerHTML=DIMS.map((d,i)=>`<div class="score-row"><span style="color:${DIM_COLORS[i]}">${d}</span><div class="score-track"><div class="score-fill" style="width:${scores[i]*10}%;background:${DIM_COLORS[i]}"></div></div><strong>${scores[i]}</strong></div><div style="margin:-4px 0 2px 58px;color:#aaa;font-size:11px;line-height:1.4">${DIM_NOTES[i]}</div>`).join('')}
document.getElementById('copyResult').onclick=()=>{if(!selected.size)return; const scores=getAvgScores(); const mood=getMoodDesc(scores); const plants=[...selected].join('、'); const scoreText=DIMS.map((d,i)=>`${d}: ${scores[i]}`).join('\n'); copyText(`植物组合：${plants}\n情绪倾向：${mood.title}\n${scoreText}\n说明：${mood.desc}`)};
document.getElementById('clearAll').onclick=()=>{selected.clear(); renderGrid(); renderSelected(); updateResult()};
renderTabs(); renderGrid(); renderSelected();

    function toggleMobileMenu(){
      const panel = document.getElementById('mobileMenuPanel');
      if(panel) panel.classList.toggle('open');
    }

    function closeMobileMenu(){
      const panel = document.getElementById('mobileMenuPanel');
      if(panel) panel.classList.remove('open');
    }

    document.addEventListener('click', function(event){
      const panel = document.getElementById('mobileMenuPanel');
      const toggle = document.querySelector('.mobile-menu-toggle');
      if(!panel || !toggle) return;
      if(panel.contains(event.target) || toggle.contains(event.target)) return;
      panel.classList.remove('open');
    });

function bindHeaderNavigation(){
  document.querySelectorAll('.site-header [data-nav-filter]').forEach(function(link){
    link.addEventListener('click', function(event){
      if(typeof window.navFilter === 'function' && window.navFilter(link.dataset.navFilter) === false){
        event.preventDefault();
      }
    });
  });

  const loginEntry = document.querySelector('.site-header .login-entry-btn');
  if(loginEntry){
    loginEntry.addEventListener('click', function(){
      window.location.href = 'login.html';
    });
  }

  const mobileMenuToggle = document.querySelector('.site-header .mobile-menu-toggle');
  if(mobileMenuToggle){
    mobileMenuToggle.addEventListener('click', function(){
      if(typeof window.toggleMobileMenu === 'function') window.toggleMobileMenu();
    });
  }

  document.querySelectorAll('#mobileMenuPanel a').forEach(function(link){
    link.addEventListener('click', function(){
      if(typeof window.closeMobileMenu === 'function') window.closeMobileMenu();
    });
  });
}

bindHeaderNavigation();

