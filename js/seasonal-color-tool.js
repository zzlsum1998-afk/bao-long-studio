
/* ===== 植物数据：四季×3色[主,次,点缀]，growth生长速度1慢2中3快 ===== */
const PLANTS = [
  { name:"银杏", latin:"Ginkgo biloba", growth:1, spring:["#9bbf6a","#bcd28a","#6f9b46"], summer:["#4f7a3a","#3f6630","#6b9148"], autumn:["#f2c12e","#e8a312","#d8b340"], winter:["#9a8c74","#b6a98f","#7d6f58"] },
  { name:"红枫", latin:"Acer palmatum", growth:1, spring:["#c8623f","#d98a5a","#a84b30"], summer:["#7a4b3a","#5d3a2c","#8c5e44"], autumn:["#c1352a","#9e2018","#d65a3a"], winter:["#8a7560","#a08a72","#6e5c49"] },
  { name:"乌桕", latin:"Triadica sebifera", growth:2, spring:["#7fae5a","#a3c97f","#5f8e3f"], summer:["#3f6b32","#2f5526","#52803f"], autumn:["#c0392b","#e07b39","#f0c04a"], winter:["#b9b2a0","#cfc8b6","#9a9382"] },
  { name:"香樟", latin:"Cinnamomum camphora", growth:2, spring:["#7ba85c","#9bc47a","#c69a5a"], summer:["#3d6b34","#2e5528","#4f8040"], autumn:["#4a7340","#3a5d32","#6b8a4e"], winter:["#37563a","#2b4530","#48694a"] },
  { name:"鸡爪槭", latin:"Acer palmatum 'Dissectum'", growth:1, spring:["#a8d08a","#c4e0a8","#86b066"], summer:["#4a7c3c","#3a632e","#5e9049"], autumn:["#d4502a","#b02f1a","#e8893a"], winter:["#7e6a55","#988366","#665545"] },
  { name:"紫薇", latin:"Lagerstroemia indica", growth:2, spring:["#88b35e","#a8cd80","#6b9446"], summer:["#c45a8a","#a83e6e","#d97ba6"], autumn:["#b06848","#d4915e","#e2b27a"], winter:["#9d8f7a","#b8ab95","#80735f"] },
  { name:"桂花", latin:"Osmanthus fragrans", growth:2, spring:["#4f7d3e","#6a9a55","#3d6330"], summer:["#3a6430","#2c4f26","#4a7a3c"], autumn:["#3f6b34","#e8a13c","#f2c266"], winter:["#37583a","#2c4831","#456b48"] },
  { name:"垂柳", latin:"Salix babylonica", growth:3, spring:["#a6c95a","#c2dd80","#8aaf42"], summer:["#5e8a3c","#4a702e","#76a04e"], autumn:["#c9b84e","#d8c96e","#a89a3c"], winter:["#9a9270","#b3ac8d","#7e765a"] },
  { name:"鼠尾草", latin:"Salvia", growth:3, spring:["#7a8fb0","#9badc8","#5f7596"], summer:["#5b6fa3","#45568a","#7888b8"], autumn:["#6a6f95","#54587e","#8488a8"], winter:["#787c70","#929684","#5e6258"] },
  { name:"狼尾草", latin:"Pennisetum alopecuroides", growth:3, spring:["#9ab06a","#b6c98a","#7d964e"], summer:["#7e955a","#637843","#97ab74"], autumn:["#caa86a","#ddc28e","#b08e4e"], winter:["#bdae8c","#d2c6aa","#9c8d6c"] },
  { name:"绣球", latin:"Hydrangea macrophylla", growth:2, spring:["#88b06a","#a6c98a","#6e944e"], summer:["#6f8fc4","#9a8fc0","#b06aa0"], autumn:["#7e8a6a","#9aa386","#6a7556"], winter:["#9a9078","#b4ac94","#7e745e"] },
  { name:"芒草", latin:"Miscanthus sinensis", growth:3, spring:["#9eb56a","#bccd8c","#83a04e"], summer:["#7c9450","#637a3c","#96ac6c"], autumn:["#d4b07a","#e6c99a","#bb945c"], winter:["#cdbe9c","#e0d4b8","#a89878"] },
  { name:"南天竹", latin:"Nandina domestica", growth:1, spring:["#7ba35a","#9bc07e","#b85040"], summer:["#4a7338","#3a5d2e","#5e8a48"], autumn:["#b23a2a","#8e2418","#d05a40"], winter:["#a83828","#7e2c20","#c25038"] },
];

/* ===== 网格设置 ===== */
const PCOL = 10, PROW = 11;        // 刷的粗网格
const RCOL = 90, RROW = 99;        // 渲染的细网格（每个粗格 = 9×9 细格）
const SUB = RCOL / PCOL;           // =9

let grid = Array(PROW).fill(0).map(()=>Array(PCOL).fill(-1)); // -1空白，否则植物index
let siteMask = Array(PROW).fill(0).map(()=>Array(PCOL).fill(false)); // true=场地内
let curPlant = -1;
let mode = 'brush';
let curSeason = 'spring';
let timeVal = 0;
let painting = false;

const plantList = document.getElementById('plantList');
const paintGrid = document.getElementById('paintGrid');
const canvas = document.getElementById('outCanvas');
const ctx = canvas.getContext('2d');
const canvasEmpty = document.getElementById('canvasEmpty');
const timeSlider = document.getElementById('timeSlider');
const timeStage = document.getElementById('timeStage');
const timeNote = document.getElementById('timeNote');
const metaSeason = document.getElementById('metaSeason');
const metaPlants = document.getElementById('metaPlants');
const metaCoverage = document.getElementById('metaCoverage');
const seasonName = {spring:'春季', summer:'夏季', autumn:'秋季', winter:'冬季'};

/* ---- build plant chips ---- */
function activatePlantChip(chip,i){
  curPlant=i; mode='brush'; setMode();
  document.querySelectorAll('.plant-chip').forEach(c=>{
    const isActive=c===chip;
    c.classList.toggle('active',isActive);
    c.setAttribute('aria-pressed',String(isActive));
  });
}
PLANTS.forEach((p,i)=>{
  const chip=document.createElement('div');
  chip.className='plant-chip'; chip.dataset.idx=i;
  chip.setAttribute('role','button');
  chip.setAttribute('tabindex','0');
  chip.setAttribute('aria-pressed','false');
  chip.setAttribute('aria-label',`选择植物：${p.name}`);
  chip.innerHTML=`<div class="chip-swatch">${p[curSeason].map(c=>`<span style="background:${c}"></span>`).join('')}</div>
    <div><div class="chip-name">${p.name}</div><div class="chip-latin">${p.latin}</div></div>`;
  chip.addEventListener('click',()=>activatePlantChip(chip,i));
  chip.addEventListener('keydown',e=>{
    if(e.key!=='Enter'&&e.key!==' ')return;
    e.preventDefault();
    activatePlantChip(chip,i);
  });
  plantList.appendChild(chip);
});

/* ---- build paint grid ---- */
paintGrid.style.gridTemplateColumns=`repeat(${PCOL},1fr)`;
paintGrid.style.gridTemplateRows=`repeat(${PROW},1fr)`;
const cells=[];
for(let r=0;r<PROW;r++)for(let c=0;c<PCOL;c++){
  const el=document.createElement('div');
  el.className='pcell'; el.dataset.r=r; el.dataset.c=c;
  paintGrid.appendChild(el); cells.push(el);
}
function updateCellVisual(el){
  const r=+el.dataset.r,c=+el.dataset.c;
  el.classList.toggle('site', siteMask[r][c]);
  const v=grid[r][c];
  el.style.background = v<0 ? '' : PLANTS[v][curSeason][0];
}
function paintCell(el){
  const r=+el.dataset.r,c=+el.dataset.c;
  if(mode==='site'){ siteMask[r][c]=true; }
  else if(mode==='siteErase'){ siteMask[r][c]=false; grid[r][c]=-1; }
  else if(mode==='brush'){
    if(curPlant<0) return;
    if(!siteMask[r][c]){ siteMask[r][c]=true; } // 直接种也自动纳入场地，省事
    grid[r][c]=curPlant;
  }
  else { grid[r][c]=-1; } // erase 植物，保留场地
  updateCellVisual(el);
  renderOut();
}
paintGrid.addEventListener('pointerdown',e=>{const el=e.target.closest('.pcell');if(el){painting=true;paintCell(el);}});
paintGrid.addEventListener('pointermove',e=>{if(!painting)return;const el=document.elementFromPoint(e.clientX,e.clientY);if(el&&el.classList.contains('pcell'))paintCell(el);});
window.addEventListener('pointerup',()=>painting=false);

function refreshPaintColors(){ cells.forEach(updateCellVisual); }

/* ---- mode buttons ---- */
const brushBtn=document.getElementById('brushBtn'),eraseBtn=document.getElementById('eraseBtn');
const siteBtn=document.getElementById('siteBtn'),siteEraseBtn=document.getElementById('siteEraseBtn');
function setMode(){
  brushBtn.classList.toggle('on',mode==='brush');
  eraseBtn.classList.toggle('on',mode==='erase');
  siteBtn.classList.toggle('on',mode==='site');
  siteEraseBtn.classList.toggle('on',mode==='siteErase');
}
brushBtn.addEventListener('click',()=>{mode='brush';setMode();});
eraseBtn.addEventListener('click',()=>{mode='erase';setMode();});
siteBtn.addEventListener('click',()=>{mode='site';setMode();});
siteEraseBtn.addEventListener('click',()=>{mode='siteErase';setMode();});
document.getElementById('fillAllBtn').addEventListener('click',()=>{
  for(let r=0;r<PROW;r++)for(let c=0;c<PCOL;c++)siteMask[r][c]=true;
  refreshPaintColors(); renderOut();
});
document.getElementById('clearGrid').addEventListener('click',()=>{
  grid=Array(PROW).fill(0).map(()=>Array(PCOL).fill(-1));
  siteMask=Array(PROW).fill(0).map(()=>Array(PCOL).fill(false));
  refreshPaintColors(); renderOut();
});

document.getElementById('sampleBtn').addEventListener('click',()=>{
  grid=Array(PROW).fill(0).map(()=>Array(PCOL).fill(-1));
  siteMask=Array(PROW).fill(0).map(()=>Array(PCOL).fill(false));
  const pattern=[
    [-1,-1, 0, 0, 0, 3, 3,-1,-1,-1],
    [-1, 0, 0, 0, 3, 3, 3, 7,-1,-1],
    [ 0, 0, 4, 4, 3, 3, 7, 7, 7,-1],
    [ 0, 4, 4, 4,11,11, 7, 7, 7,12],
    [ 4, 4,10,10,11,11,11, 7,12,12],
    [ 4,10,10,10, 8, 8,11,12,12,12],
    [-1,10,10, 8, 8, 8, 9, 9,12,12],
    [-1,-1, 8, 8, 8, 9, 9, 9, 9,-1],
    [-1,-1,-1, 8, 9, 9, 9, 9,-1,-1],
    [-1,-1,-1,-1, 9, 9, 9,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  ];
  for(let r=0;r<PROW;r++)for(let c=0;c<PCOL;c++){
    if(pattern[r][c]>=0){ siteMask[r][c]=true; grid[r][c]=pattern[r][c]; }
  }
  curPlant=0; mode='brush'; setMode();
  document.querySelectorAll('.plant-chip').forEach(chip=>{const isActive=chip.dataset.idx==='0';chip.classList.toggle('active',isActive);chip.setAttribute('aria-pressed',String(isActive));});
  timeSlider.value=45; timeVal=45;
  const n=NOTES.find(x=>timeVal<x.max)||NOTES[NOTES.length-1];
  timeStage.textContent=n.stage; timeNote.textContent=n.note;
  refreshPaintColors(); renderOut();
});

document.getElementById('resetViewBtn').addEventListener('click',()=>{
  timeSlider.value=0; timeVal=0;
  timeStage.textContent='第 1 年 · 初栽';
  timeNote.textContent='每片分区界限分明——这是设计图上的样子。';
  renderOut();
});

/* ---- 上传底图 ---- */
const baseImg=document.getElementById('baseImg');
document.getElementById('imgInput').addEventListener('change',e=>{
  const f=e.target.files[0]; if(!f)return;
  const url=URL.createObjectURL(f);
  baseImg.src=url; baseImg.style.display='block';
  paintGrid.classList.add('has-img');
  document.getElementById('removeImg').style.display='';
});
document.getElementById('removeImg').addEventListener('click',()=>{
  baseImg.src=''; baseImg.style.display='none';
  paintGrid.classList.remove('has-img');
  document.getElementById('removeImg').style.display='none';
  document.getElementById('imgInput').value='';
});

/* ---- color helpers ---- */
function hexToRgb(h){const n=parseInt(h.slice(1),16);return[n>>16,(n>>8)&255,n&255];}
function rgbToHex(r,g,b){return'#'+[r,g,b].map(x=>Math.max(0,Math.min(255,Math.round(x))).toString(16).padStart(2,'0')).join('');}
function mix(h1,h2,t){const a=hexToRgb(h1),b=hexToRgb(h2);return rgbToHex(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t);}
function jitter(hex,amt){const[r,g,b]=hexToRgb(hex);const j=()=>(Math.random()-.5)*amt;return rgbToHex(r+j(),g+j(),b+j());}

function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h,s,l=(mx+mn)/2;if(mx===mn){h=s=0;}else{const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;default:h=(r-g)/d+4;}h/=6;}return[h*360,s,l];}
function hslToRgb(h,s,l){h/=360;let r,g,b;if(s===0){r=g=b=l;}else{const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q;const hk=t=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p;};r=hk(h+1/3);g=hk(h);b=hk(h-1/3);}return[r*255,g*255,b*255];}

/* 斑驳自然色：明度大扰动、饱和中扰动、色相小扰动 → 同色系丰富变体 */
function speckle(hex,intensity){
  const[r,g,b]=hexToRgb(hex);
  let[h,s,l]=rgbToHsl(r,g,b);
  h += (Math.random()-.5)*14*intensity;
  s += (Math.random()-.5)*0.28*intensity;
  l += (Math.random()-.5)*0.30*intensity;
  s=Math.max(0,Math.min(1,s)); l=Math.max(0.08,Math.min(0.92,l));
  const[nr,ng,nb]=hslToRgb((h+360)%360,s,l);
  return rgbToHex(nr,ng,nb);
}
/* 从植物3色取锚并在锚间插值，制造连续丰富色域 */
function plantColor(palette,intensity){
  const r=Math.random();
  let a,b;
  if(r<0.5){a=palette[0];b=palette[1];}
  else if(r<0.8){a=palette[0];b=palette[2];}
  else{a=palette[1];b=palette[2];}
  const base=mix(a,b,Math.random());
  return speckle(base,intensity);
}

/* ---- build expanded plant map with time growth ---- */
function expandedMap(t){
  // 细网格场地mask
  let siteFine=Array(RROW).fill(0).map(()=>Array(RCOL).fill(false));
  for(let r=0;r<PROW;r++)for(let c=0;c<PCOL;c++){
    if(!siteMask[r][c])continue;
    for(let sr=0;sr<SUB;sr++)for(let sc=0;sc<SUB;sc++) siteFine[r*SUB+sr][c*SUB+sc]=true;
  }
  // 植物细格
  let fine=Array(RROW).fill(0).map(()=>Array(RCOL).fill(-1));
  for(let r=0;r<PROW;r++)for(let c=0;c<PCOL;c++){
    const v=grid[r][c]; if(v<0)continue;
    for(let sr=0;sr<SUB;sr++)for(let sc=0;sc<SUB;sc++) fine[r*SUB+sr][c*SUB+sc]=v;
  }
  // growth：植物向相邻空白细格扩张，但不越出场地
  const steps=Math.floor(t*8);
  for(let s=0;s<steps;s++){
    const snap=fine.map(row=>row.slice());
    for(let r=0;r<RROW;r++)for(let c=0;c<RCOL;c++){
      if(snap[r][c]!==-1)continue;
      if(!siteFine[r][c])continue; // 场地外不生长
      const nb=[[r-1,c],[r+1,c],[r,c-1],[r,c+1]].filter(([y,x])=>y>=0&&y<RROW&&x>=0&&x<RCOL&&snap[y][x]>=0);
      if(nb.length){
        const pick=nb[Math.floor(Math.random()*nb.length)];
        const pv=snap[pick[0]][pick[1]];
        const g=PLANTS[pv].growth;
        if(Math.random()<g/3*0.55) fine[r][c]=pv;
      }
    }
  }
  return {fine, siteFine};
}

/* ---- render output canvas ---- */
function hasSite(){return siteMask.some(row=>row.some(v=>v));}
function updateMeta(){
  const used = new Set();
  let planted = 0, site = 0;
  for(let r=0;r<PROW;r++)for(let c=0;c<PCOL;c++){
    if(siteMask[r][c]) site++;
    if(grid[r][c]>=0){ used.add(grid[r][c]); planted++; }
  }
  metaSeason.textContent = seasonName[curSeason] || '春季';
  metaPlants.textContent = `${used.size} 种植物`;
  metaCoverage.textContent = `${Math.round(site/(PROW*PCOL)*100)}% 场地`;
}
function renderOut(){
  updateMeta();
  if(!hasSite()){canvasEmpty.style.display='grid';ctx.clearRect(0,0,canvas.width,canvas.height);return;}
  canvasEmpty.style.display='none';
  const t=timeVal/100;
  const {fine, siteFine}=expandedMap(t);
  const cw=canvas.width/RCOL, ch=canvas.height/RROW;

  ctx.clearRect(0,0,canvas.width,canvas.height); // 场地外保持透明

  for(let r=0;r<RROW;r++)for(let c=0;c<RCOL;c++){
    if(!siteFine[r][c]) continue; // 场地外不画 → 生成图贴合场地形状
    let col;
    const v=fine[r][c];
    if(v<0){
      const base = curSeason==='winter'?'#cfc8b4':curSeason==='autumn'?'#cabf9a':'#c2c8a8';
      col=speckle(base,0.8);
    }else{
      const p=PLANTS[v];
      let base=plantColor(p[curSeason],1.0);
      // 柔性过渡带：邻域异种植物按距离加权混入
      if(t>0.1){
        const R=2; let blendCol=null,blendW=0;
        for(let dy=-R;dy<=R;dy++)for(let dx=-R;dx<=R;dx++){
          if(dx===0&&dy===0)continue;
          const y=r+dy,x=c+dx;
          if(y<0||y>=RROW||x<0||x>=RCOL)continue;
          const nv=fine[y][x];
          if(nv>=0&&nv!==v){
            const dist=Math.sqrt(dx*dx+dy*dy);
            const w=(1-dist/(R+1))*t*0.6;
            if(w>blendW){blendW=w;blendCol=PLANTS[nv][curSeason][Math.floor(Math.random()*3)];}
          }
        }
        if(blendCol) base=mix(base, speckle(blendCol,0.8), Math.min(0.55,blendW));
      }
      col=base;
    }
    ctx.fillStyle=col;
    ctx.fillRect(c*cw,r*ch,cw+0.6,ch+0.6);
  }

  // 野化杂色（仅场地内）
  if(t>0.55){
    const allCols=[];
    grid.forEach(row=>row.forEach(v=>{if(v>=0)allCols.push(...PLANTS[v][curSeason]);}));
    if(allCols.length){
      const n=Math.floor((t-0.55)*RROW*RCOL*0.12);
      for(let k=0;k<n;k++){
        const rx=Math.floor(Math.random()*RCOL),ry=Math.floor(Math.random()*RROW);
        if(!siteFine[ry][rx])continue;
        const a=allCols[Math.floor(Math.random()*allCols.length)];
        const wild=speckle(mix(a,'#7d7a55',0.32),1.0);
        ctx.fillStyle=wild; ctx.fillRect(rx*cw,ry*ch,cw+0.6,ch+0.6);
      }
    }
  }

  addNoise(siteFine, cw, ch);
}

function addNoise(siteFine, cw, ch){
  const img=ctx.getImageData(0,0,canvas.width,canvas.height);
  const d=img.data;
  const W=canvas.width;
  for(let i=0;i<d.length;i+=4){
    if(d[i+3]===0) continue; // 跳过透明像素（场地外）
    const n=(Math.random()-0.5)*12;
    d[i]+=n; d[i+1]+=n; d[i+2]+=n;
  }
  ctx.putImageData(img,0,0);
}

/* ---- season tabs ---- */
document.getElementById('seasonTabs').addEventListener('click',e=>{
  const tab=e.target.closest('.season-tab');if(!tab)return;
  document.querySelectorAll('.season-tab').forEach(t=>t.classList.remove('active'));
  tab.classList.add('active'); curSeason=tab.dataset.s;
  document.querySelectorAll('.plant-chip').forEach(chip=>{const p=PLANTS[chip.dataset.idx];chip.querySelector('.chip-swatch').innerHTML=p[curSeason].map(c=>`<span style="background:${c}"></span>`).join('');});
  refreshPaintColors(); renderOut();
});

/* ---- time slider ---- */
const NOTES=[
  {max:15,stage:"第 1 年 · 初栽",note:"每片分区界限分明——这是设计图上的样子。"},
  {max:55,stage:"第 2 年 · 渐合",note:"植株长大、向留白处蔓延，分区边缘开始出现过渡色。"},
  {max:85,stage:"第 3 年 · 交融",note:"相邻植物互相渗透，规整的分区长成了有机整体。"},
  {max:101,stage:"第 3 年+ · 成境",note:"自播与野化带来计划外的杂色——成熟种植设计最自然、最难复制的状态。"},
];
timeSlider.addEventListener('input',()=>{
  timeVal=+timeSlider.value;
  const n=NOTES.find(x=>timeVal<x.max)||NOTES[NOTES.length-1];
  timeStage.textContent=n.stage; timeNote.textContent=n.note;
  renderOut();
});

/* ---- export ---- */
document.getElementById('exportBtn').addEventListener('click',()=>{
  if(!hasSite()){alert('先描出场地范围、刷点植物吧');return;}
  const a=document.createElement('a');
  a.download=`季相色谱_${curSeason}_${timeStage.textContent.replace(/[^\d]/g,'')||'1'}年.png`;
  a.href=canvas.toDataURL('image/png'); a.click();
});

setMode();
renderOut();
