

const baseData=[
 {id:1,name:'Color Board',zh:'色彩灵感',cat:'inspiration',count:64,score:92,desc:'适合做色彩趋势、配色参考和视觉情绪归档。'},
 {id:2,name:'Plan Board',zh:'平面参考',cat:'inspiration',count:48,score:78,desc:'整理平面图、空间组织和设计表达参考。'},
 {id:3,name:'Section Board',zh:'剖面参考',cat:'inspiration',count:36,score:70,desc:'偏向剖面表达、空间层次和图纸语法。'},
 {id:4,name:'Other Board',zh:'综合灵感',cat:'inspiration',count:72,score:86,desc:'渲染、拼贴、概念表达等综合视觉灵感。'},
 {id:5,name:'Product Assets',zh:'产品素材',cat:'assets',count:42,score:74,desc:'产品展示、商品图和可复用视觉素材。'},
 {id:6,name:'Plant Assets',zh:'植物素材',cat:'assets',count:34,score:66,desc:'植物图像、绿植组合和花境素材。'},
 {id:7,name:'Texture Assets',zh:'纹理素材',cat:'assets',count:28,score:58,desc:'纸张、石材、布料、自然纹理等背景素材。'},
 {id:8,name:'Prompt Library',zh:'提示词库',cat:'tools',count:31,score:82,desc:'沉淀可复制的生成式 AI 提示词案例。'},
 {id:9,name:'Resume Tool',zh:'简历工具',cat:'tools',count:12,score:54,desc:'一页式简历生成与模板展示工具。'},
 {id:10,name:'Color Calendar',zh:'色彩日历',cat:'lab',count:18,score:61,desc:'以季节、时间和情绪组织颜色的交互实验。'},
 {id:11,name:'Emotion Radar',zh:'植物雷达',cat:'lab',count:24,score:69,desc:'用雷达图表达植物气质与情绪倾向。'},
 {id:12,name:'Data Bloom',zh:'数据花园',cat:'lab',count:20,score:76,desc:'把数据关系做成花园式径向图谱。',subitems:8}
];
const sampleCSV = `category,name,count,score,description,subitems
Inspiration,Color Board,64,92,色彩趋势、配色参考和视觉情绪归档,18
Inspiration,Plan Board,48,78,平面图、空间组织和设计表达参考,13
Inspiration,Section Board,36,70,剖面表达、空间层次和图纸语法,10
Inspiration,Other Board,72,86,渲染、拼贴和概念表达综合灵感,19
Assets,Product Assets,42,74,产品展示、商品图和可复用视觉素材,12
Assets,Plant Assets,34,66,植物图像、绿植组合和花境素材,9
Assets,Texture Assets,28,58,纸张、石材、布料和自然纹理素材,8
Tools,Prompt Library,31,82,可复制的生成式 AI 提示词案例,9
Tools,Resume Tool,12,54,一页式简历生成与模板展示工具,5
Lab,Color Calendar,18,61,以季节、时间和情绪组织颜色的交互实验,7
Lab,Emotion Radar,24,69,用雷达图表达植物气质与情绪倾向,8
Lab,Data Bloom,20,76,把数据关系做成花园式径向图谱,8`;
const aliases={'inspiration':'inspiration','灵感库':'inspiration','灵感':'inspiration','assets':'assets','asset':'assets','素材':'assets','素材库':'assets','tools':'tools','tool':'tools','工具':'tools','lab':'lab','experiment':'lab','实验':'lab','交互':'lab'};
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function normalizeCat(v){const key=(v||'').trim().toLowerCase();return aliases[key]||aliases[(v||'').trim()]||'inspiration'}
function parseCSVLine(line){const res=[];let cur='',inside=false;for(let i=0;i<line.length;i++){const ch=line[i],next=line[i+1];if(ch==='"'&&inside&&next==='"'){cur+='"';i++;continue}if(ch==='"'){inside=!inside;continue}if(ch===','&&!inside){res.push(cur.trim());cur='';continue}cur+=ch}res.push(cur.trim());return res}
function parseCSV(text){const rows=text.trim().split(/\r?\n/).filter(Boolean).map(parseCSVLine);if(rows.length<2)return[];const headers=rows[0].map(h=>h.trim().toLowerCase());return rows.slice(1).map((row,i)=>{const obj={};headers.forEach((h,idx)=>obj[h]=row[idx]||'');const rawSub=obj.subitems||obj.subitem||obj.children||'';let subitems=0;if(rawSub){const n=Number(rawSub);subitems=Number.isFinite(n)?n:rawSub.split(/[;；|、]/).filter(Boolean).length}return{id:i+1,name:obj.name||obj.title||`Node ${i+1}`,zh:obj.zh||obj.label||obj.name||`Node ${i+1}`,cat:normalizeCat(obj.category||obj.cat||obj.group),count:Math.max(1,Number(obj.count||obj.value||obj.size||10)),score:Math.min(100,Math.max(1,Number(obj.score||obj.active||obj.weight||60))),desc:obj.description||obj.desc||obj.note||'暂无说明。',subitems:Math.max(0,Math.round(subitems))}}).filter(d=>d.name)}
function downloadText(filename,text){const blob=new Blob([text],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url)}
let data=JSON.parse(JSON.stringify(baseData));
let selectedId=1;
let filter='all';
const cats={
  inspiration:{name:'Inspiration',start:-160,end:-25,color:'rgba(223,244,241,.95)'},
  assets:{name:'Assets',start:-18,end:65,color:'rgba(246,204,180,.95)'},
  tools:{name:'Tools',start:74,end:137,color:'rgba(214,233,229,.95)'},
  lab:{name:'Lab',start:145,end:205,color:'rgba(251,227,208,.95)'}
};
const $=id=>document.getElementById(id);
const svg=$('svg');
function getPageLang(){return (localStorage.getItem('baolongLanguage')||document.documentElement.lang||'zh').toLowerCase().startsWith('en')?'en':'zh'}
const UI={
  zh:{selected:'Selected Node',count:'数量',activity:'活跃指数',items:'项',mainNodes:'主节点',firstNodes:'第一层小节点',secondNodes:'第二层小节点',totalAvg:'总数量 · 活跃均值',focus:'专注看图',edit:'展开编辑',invalid:'没有识别到有效数据',generated:'已生成',nodes:'个主节点',noData:'请先生成图谱',exported:'PNG 已导出',exportFailed:'导出失败，可以先截图使用',cleared:'已清空',note:'当前节点会自动生成约 {n} 个第一层小节点，并继续延伸出更细的小点。',emptyTitle:'请上传或粘贴数据',emptyDesc:'使用示例数据可以快速预览效果。'},
  en:{selected:'Selected Node',count:'Count',activity:'Activity',items:'items',mainNodes:'Main nodes',firstNodes:'Primary leaves',secondNodes:'Secondary dots',totalAvg:'Total · Avg score',focus:'Focus View',edit:'Edit Data',invalid:'No valid data found',generated:'Generated',nodes:'main nodes',noData:'Generate a map first',exported:'PNG exported',exportFailed:'Export failed. You can use a screenshot instead.',cleared:'Cleared',note:'This node generates about {n} primary leaves, then extends into finer outer dots.',emptyTitle:'Upload or paste data',emptyDesc:'Use sample data to preview the generator quickly.'}
};
function ui(key){return UI[getPageLang()][key]||UI.zh[key]||key}
function applyStaticLang(){
  const lang=getPageLang();
  document.querySelectorAll('[data-i18n-zh][data-i18n-en]').forEach(el=>{
    el.textContent=el.getAttribute(lang==='en'?'data-i18n-en':'data-i18n-zh');
  });
  document.title=lang==='en'?'Data Bloom Generator | BaoLong Lab':'数据花园生成器 | BaoLong Lab';
}

function bindHeaderNavigation(){
  document.querySelectorAll('.site-header [data-nav-filter]').forEach(link=>{
    link.addEventListener('click',event=>{
      if(typeof window.navFilter==='function' && window.navFilter(link.dataset.navFilter)===false){
        event.preventDefault();
      }
    });
  });

  const loginEntry=document.querySelector('.site-header .login-entry-btn');
  if(loginEntry){
    loginEntry.addEventListener('click',()=>{window.location.href='login.html'});
  }

  const mobileMenuToggle=document.querySelector('.site-header .mobile-menu-toggle');
  if(mobileMenuToggle){
    mobileMenuToggle.addEventListener('click',()=>{
      if(typeof window.toggleMobileMenu==='function')window.toggleMobileMenu();
    });
  }

  document.querySelectorAll('#mobileMenuPanel a').forEach(link=>{
    link.addEventListener('click',()=>{
      if(typeof window.closeMobileMenu==='function')window.closeMobileMenu();
    });
  });
}

function polar(cx,cy,r,a){const rad=(a-90)*Math.PI/180;return{x:cx+r*Math.cos(rad),y:cy+r*Math.sin(rad)}}
function arcPath(cx,cy,r,a0,a1){const p0=polar(cx,cy,r,a0),p1=polar(cx,cy,r,a1),large=Math.abs(a1-a0)>180?1:0;return`M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`}
function curve(cx,cy,x,y,score){const dx=x-cx,dy=y-cy;const k=.35+(100-score)*.0015;const c1={x:cx+dx*k,y:cy+dy*.06};const c2={x:cx+dx*.70,y:cy+dy*.86};return`M ${cx} ${cy} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${x} ${y}`}
function microCurve(x1,y1,x2,y2){const mx=(x1+x2)/2,my=(y1+y2)/2;const kx=mx+(x2-x1)*.07,ky=my+(y2-y1)*.07;return`M ${x1} ${y1} Q ${kx} ${ky} ${x2} ${y2}`}
function nanoCurve(x1,y1,x2,y2){const mx=(x1+x2)/2,my=(y1+y2)/2;const kx=mx+(x2-x1)*.04,ky=my+(y2-y1)*.04;return`M ${x1} ${y1} Q ${kx} ${ky} ${x2} ${y2}`}
function childCountFor(d){return d.subitems?Math.max(3,Math.min(28,d.subitems)):Math.max(6,Math.min(18,Math.round(d.count/4.8)))}
function nanoCountFor(index,d){return 1+((index+d.id)%2)}
function percent(part,total){return total?Math.round(part/total*100):0}
function render(){
  if(!data.length){
    svg.innerHTML='';
    $('dataList').innerHTML='';
    $('stats').innerHTML='';
    $('detailBox').innerHTML=`<div class="k">${ui('selected')}</div><h3>${ui('emptyTitle')}</h3><p>${ui('emptyDesc')}</p>`;
    return;
  }
  const shown=data.filter(d=>filter==='all'||d.cat===filter);
  if(!shown.length){filter='all'; selectedId=data[0].id; return render();}
  const totalCount=shown.reduce((s,d)=>s+d.count,0);
  const cx=452,cy=360,outer=238,inner=214,petal=304,nanoBase=340;
  svg.innerHTML=`<defs><radialGradient id="aquaGrad"><stop offset="0%" stop-color="#eefcfa"/><stop offset="72%" stop-color="#dcf5f1"/><stop offset="100%" stop-color="#ccefe9" stop-opacity=".36"/></radialGradient></defs>`;
  svg.insertAdjacentHTML('beforeend',`
    <circle class="blob" cx="${cx}" cy="${cy}" r="248"></circle>
    <circle class="backRing" cx="${cx}" cy="${cy}" r="${outer+132}"></circle>
    <circle class="ring" cx="${cx}" cy="${cy}" r="${outer+102}"></circle>
    <circle class="ring2" cx="${cx}" cy="${cy}" r="${petal+10}"></circle>
    <circle class="ring" cx="${cx}" cy="${cy}" r="${inner-9}" opacity=".38"></circle>
  `);

  Object.entries(cats).forEach(([key,c])=>{
    const bucket=shown.filter(d=>d.cat===key);
    const bucketCount=bucket.reduce((s,d)=>s+d.count,0);
    const active=filter==='all'||filter===key;
    svg.insertAdjacentHTML('beforeend',`<path class="categoryWash" opacity="${active?.9:.14}" stroke="${c.color}" d="${arcPath(cx,cy,outer+56,c.start,c.end)}"></path>`);
    svg.insertAdjacentHTML('beforeend',`<path class="tickArc" opacity="${active?1:.16}" d="${arcPath(cx,cy,outer+110,c.start,c.end)}"></path>`);
    const mid=(c.start+c.end)/2;
    const p=polar(cx,cy,outer+136,mid);
    svg.insertAdjacentHTML('beforeend',`<text class="catName" x="${p.x}" y="${p.y-3}" text-anchor="middle">${c.name}</text>`);
    svg.insertAdjacentHTML('beforeend',`<text class="catMeta" x="${p.x}" y="${p.y+11}" text-anchor="middle">${bucket.length} GROUPS · ${percent(bucketCount,totalCount)}%</text>`);
  });

  const groups={};Object.keys(cats).forEach(k=>groups[k]=shown.filter(d=>d.cat===k));
  const positions=[];
  Object.entries(groups).forEach(([cat,arr])=>{
    if(!arr.length)return;
    const span=cats[cat];
    arr.forEach((d,i)=>{
      const base=span.start+(span.end-span.start)*((i+1)/(arr.length+1));
      const jitter=((d.id%3)-1)*2.8;
      const a=base+jitter;
      const rShift=((d.id%2)?-4:4);
      const p=polar(cx,cy,outer+rShift,a);
      positions.push({...d,a,x:p.x,y:p.y,r:11+Math.sqrt(d.count)*2.48,w:1.05+d.score/27});
    });
  });

  const microNodes=[]; const nanoNodes=[]; const clusterDefs=[];
  positions.forEach(d=>{
    const n=childCountFor(d);
    const spread=Math.min(36,17+n*1.02);
    clusterDefs.push({id:d.id,start:d.a-spread/2-3,end:d.a+spread/2+3,r:petal+26,count:n,label:`${n} leaves`});
    for(let i=0;i<n;i++){
      const ratio=n===1?.5:i/(n-1);
      const a=d.a-spread/2+spread*ratio + (((i%2)?1:-1)*0.5);
      const r=petal + (i%4)*7 + Math.min(22,d.count*.07);
      const p=polar(cx,cy,r,a);
      const micro={parentId:d.id,index:i,a,x:p.x,y:p.y,r:5.2 + ((i%4)*1.0) + Math.min(3.6,d.count/32),label:i===Math.ceil(n/2)-1?`${n} ${ui('items')}`:'',};
      microNodes.push(micro);
      const nanoTotal=nanoCountFor(i,d);
      for(let j=0;j<nanoTotal;j++){
        const offset=(j===0?-3.2:3.1)+(j>1?(j-1)*1.4:0);
        const na=a+offset;
        const nr=nanoBase + (i%3)*8 + j*6 + Math.min(18,d.count*.04);
        const np=polar(cx,cy,nr,na);
        nanoNodes.push({parentId:d.id,microIndex:i,a:na,x:np.x,y:np.y,r:1.65+((i+j)%3)*.36});
      }
    }
  });

  clusterDefs.forEach(c=>{
    const active=c.id===selectedId;
    const path=arcPath(cx,cy,c.r,c.start,c.end);
    const lp=polar(cx,cy,c.r+13,(c.start+c.end)/2);
    svg.insertAdjacentHTML('beforeend',`<path class="clusterArc ${active?'active':''}" data-parent="${c.id}" d="${path}"></path>`);
    svg.insertAdjacentHTML('beforeend',`<text class="clusterLabel" x="${lp.x}" y="${lp.y}" text-anchor="middle">${c.label}</text>`);
  });

  microNodes.forEach(m=>{
    const parent=positions.find(p=>p.id===m.parentId);
    const active=parent.id===selectedId;
    svg.insertAdjacentHTML('beforeend',`<path class="microLink ${active?'active':''}" data-parent="${parent.id}" d="${microCurve(parent.x,parent.y,m.x,m.y)}"></path>`);
  });
  nanoNodes.forEach(n=>{
    const active=n.parentId===selectedId;
    const micro=microNodes.find(m=>m.parentId===n.parentId && m.index===n.microIndex);
    svg.insertAdjacentHTML('beforeend',`<path class="nanoLink ${active?'active':''}" data-parent="${n.parentId}" d="${nanoCurve(micro.x,micro.y,n.x,n.y)}"></path>`);
  });
  positions.forEach(d=>{
    const active=d.id===selectedId;
    svg.insertAdjacentHTML('beforeend',`<path class="link ${active?'active':''}" data-id="${d.id}" d="${curve(cx,cy,d.x,d.y,d.score)}" stroke-width="${d.w}"></path>`)
  });

  svg.insertAdjacentHTML('beforeend',`
    <circle class="core3" cx="${cx}" cy="${cy}" r="64"></circle>
    <circle class="core2" cx="${cx}" cy="${cy}" r="40"></circle>
    <circle class="core" cx="${cx}" cy="${cy}" r="22"></circle>
    <text class="numLabel" x="${cx}" y="${cy-46}" text-anchor="middle">${shown.length} groups</text>
    <text class="numLabel" x="${cx}" y="${cy+61}" text-anchor="middle">Bao Long Lab</text>
  `);

  nanoNodes.forEach(n=>{
    const active=n.parentId===selectedId;
    svg.insertAdjacentHTML('beforeend',`<g class="nanoNode ${active?'active':''}" data-parent="${n.parentId}"><circle class="nanoDot" cx="${n.x}" cy="${n.y}" r="${n.r}"></circle></g>`);
  });
  microNodes.forEach(m=>{
    const active=m.parentId===selectedId;
    svg.insertAdjacentHTML('beforeend',`<g class="microNode ${active?'active':''}" data-parent="${m.parentId}">
      <circle class="microHalo" cx="${m.x}" cy="${m.y}" r="${m.r}"></circle>
      <circle class="microDot" cx="${m.x}" cy="${m.y}" r="1.4"></circle>
      ${m.label?`<text class="miniOuterLabel" x="${m.x}" y="${m.y+m.r+11}" text-anchor="middle">${m.label}</text>`:''}
    </g>`);
  });
  positions.forEach(d=>{
    const labelP=polar(cx,cy,outer+18,d.a);const side=d.x<cx?'end':'start';
    svg.insertAdjacentHTML('beforeend',`<g class="node ${d.id===selectedId?'active':''}" data-id="${d.id}">
      <circle class="halo" cx="${d.x}" cy="${d.y}" r="${d.r}"></circle>
      <circle class="dot" cx="${d.x}" cy="${d.y}" r="3.2"></circle>
      <text class="label" x="${labelP.x}" y="${labelP.y}" text-anchor="${side}">${d.name}</text>
    </g>`)
  });

  // selected callout
  const sel=positions.find(d=>d.id===selectedId) || positions[0];
  if(sel){
    const anchor=polar(cx,cy,outer+76,sel.a + (sel.x>cx?10:-10));
    const boxX=anchor.x + (sel.x>cx?18:-140);
    const boxY=anchor.y - 28;
    svg.insertAdjacentHTML('beforeend',`<path d="M ${sel.x} ${sel.y} Q ${(sel.x+anchor.x)/2} ${(sel.y+anchor.y)/2} ${anchor.x} ${anchor.y}" stroke="rgba(24,63,61,.25)" stroke-width="1" fill="none"></path>`);
    svg.insertAdjacentHTML('beforeend',`<g>
      <rect class="calloutBox" x="${boxX}" y="${boxY}" width="122" height="56" rx="14"></rect>
      <text class="calloutTitle" x="${boxX+12}" y="${boxY+18}">${sel.name}</text>
      <text class="calloutMeta" x="${boxX+12}" y="${boxY+34}">COUNT · ${sel.count}</text>
      <text class="calloutMeta" x="${boxX+12}" y="${boxY+47}">SCORE · ${sel.score}</text>
    </g>`);
  }

  svg.querySelectorAll('.node').forEach(g=>{g.onclick=()=>select(+g.dataset.id);g.onmouseenter=()=>focus(+g.dataset.id);g.onmouseleave=()=>focus(null)});
  svg.querySelectorAll('.microNode,.nanoNode').forEach(g=>{g.onclick=()=>select(+g.dataset.parent);g.onmouseenter=()=>focus(+g.dataset.parent);g.onmouseleave=()=>focus(null)});

  renderList(); renderForm(); renderDetail(); renderStats(microNodes.length,nanoNodes.length,shown);
}
function focus(id){
  svg.querySelectorAll('.link').forEach(l=>{if(!id)l.classList.remove('dim');else l.classList.toggle('dim',+l.dataset.id!==id);l.classList.toggle('active',+l.dataset.id===id)});
  svg.querySelectorAll('.microLink,.nanoLink').forEach(l=>{if(!id)l.classList.remove('dim');else l.classList.toggle('dim',+l.dataset.parent!==id);l.classList.toggle('active',+l.dataset.parent===id)});
  svg.querySelectorAll('.clusterArc').forEach(a=>{a.classList.toggle('active',id && +a.dataset.parent===id);a.classList.toggle('dim',id && +a.dataset.parent!==id)});
  svg.querySelectorAll('.node').forEach(n=>n.classList.toggle('active',id && +n.dataset.id===id));
  svg.querySelectorAll('.microNode,.nanoNode').forEach(n=>n.classList.toggle('active',id && +n.dataset.parent===id));
}
function select(id){selectedId=id;render()}
function current(){return data.find(d=>d.id===selectedId)||data[0]}
function renderForm(){}
function renderDetail(){
  const d=current();
  if(!d){$('detailBox').innerHTML=`<div class="k">${ui('selected')}</div><h3>${ui('emptyTitle')}</h3><p>${ui('emptyDesc')}</p>`;return;}
  $('detailBox').innerHTML=`<div class="k">${ui('selected')}</div><h3>${d.name}</h3><p>${d.zh}｜${d.desc}</p><div class="miniMetrics"><div class="miniMetric"><b>${d.count}</b><span>${ui('count')}</span></div><div class="miniMetric"><b>${d.score}</b><span>${ui('activity')}</span></div></div><p style="margin-top:10px;color:var(--muted)">${ui('note').replace('{n}', '<b>'+childCountFor(d)+'</b>')}</p>`
}
function renderList(){
  const shown=data.filter(d=>filter==='all'||d.cat===filter);
  $('dataList').innerHTML=shown.map(d=>`<div class="item ${d.id===selectedId?'active':''}" data-id="${d.id}"><b>${d.name}</b><small>${d.zh} · ${d.count} ${ui('items')}</small></div>`).join('');
  document.querySelectorAll('.item').forEach(el=>el.onclick=()=>select(+el.dataset.id));
}
function renderStats(microTotal,nanoTotal,shown){
  const avg=Math.round(shown.reduce((s,d)=>s+d.score,0)/shown.length);
  const total=shown.reduce((s,d)=>s+d.count,0);
  $('stats').innerHTML=`
    <div class="stat"><div class="miniCircle"></div><b>${shown.length}</b><small>${ui('mainNodes')}</small></div>
    <div class="stat"><div class="miniCircle"></div><b>${microTotal}</b><small>${ui('firstNodes')}</small></div>
    <div class="stat"><div class="miniCircle"></div><b>${nanoTotal}</b><small>${ui('secondNodes')}</small></div>
    <div class="stat"><div class="miniCircle"></div><b>${total}</b><small>${ui('totalAvg')} ${avg}</small></div>`
}

function loadFromText(){const parsed=parseCSV($('csvInput').value);if(!parsed.length){toast(ui('invalid'));return}data=parsed;selectedId=data[0].id;filter='all';document.querySelectorAll('.chip').forEach(b=>b.classList.toggle('active',b.dataset.filter==='all'));render();toast(`${ui('generated')} ${data.length} ${ui('nodes')}`)}
function getExportStyleText(){const chunks=[];document.querySelectorAll('style').forEach(el=>{if(el.textContent)chunks.push(el.textContent)});Array.from(document.styleSheets||[]).forEach(sheet=>{try{const rules=sheet.cssRules;if(!rules)return;let block='';Array.from(rules).forEach(rule=>{block+=rule.cssText+'\n'});if(block)chunks.push(block)}catch(e){}});return chunks.join('\n')}
async function exportPNG(){if(!data.length){toast(ui('noData'));return}const svgEl=svg.cloneNode(true);svgEl.setAttribute('xmlns','http://www.w3.org/2000/svg');svgEl.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');const styleText=getExportStyleText();if(styleText){const styleEl=document.createElementNS('http://www.w3.org/2000/svg','style');styleEl.textContent=styleText;const defs=svgEl.querySelector('defs');if(defs)defs.insertAdjacentElement('afterend',styleEl);else svgEl.insertBefore(styleEl,svgEl.firstChild)}const svgText=new XMLSerializer().serializeToString(svgEl);const blob=new Blob([svgText],{type:'image/svg+xml;charset=utf-8'});const url=URL.createObjectURL(blob);const img=new Image();img.onload=()=>{const canvas=document.createElement('canvas');canvas.width=1840;canvas.height=1580;const ctx=canvas.getContext('2d');ctx.fillStyle='#fffdf8';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);URL.revokeObjectURL(url);canvas.toBlob(pngBlob=>{if(!pngBlob){toast(ui('exportFailed'));return}const pngUrl=URL.createObjectURL(pngBlob);const a=document.createElement('a');a.href=pngUrl;a.download='data-bloom-generator-c7.png';a.click();URL.revokeObjectURL(pngUrl);toast(ui('exported'))})};img.onerror=()=>{URL.revokeObjectURL(url);toast(ui('exportFailed'))};img.src=url}
const workspace=$('workspace');const toggleSidebarBtn=$('toggleSidebarBtn');
function setSidebarCollapsed(collapsed){workspace.classList.toggle('collapsed',collapsed);toggleSidebarBtn.querySelector('.toggleIcon').textContent=collapsed?'→':'←';toggleSidebarBtn.querySelector('.toggleText').textContent=collapsed?ui('edit'):ui('focus');toggleSidebarBtn.setAttribute('aria-expanded',String(!collapsed));try{localStorage.setItem('dataBloomSidebarCollapsed',collapsed?'1':'0')}catch(e){}}
toggleSidebarBtn.addEventListener('click',()=>setSidebarCollapsed(!workspace.classList.contains('collapsed')));
try{setSidebarCollapsed(localStorage.getItem('dataBloomSidebarCollapsed')==='1')}catch(e){setSidebarCollapsed(false)}
bindHeaderNavigation();
applyStaticLang();
new MutationObserver(function(){applyStaticLang(); if(data&&data.length) render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

$('sampleBtn').addEventListener('click',()=>{$('csvInput').value=sampleCSV;loadFromText()});
$('generateBtn').addEventListener('click',loadFromText);
$('clearBtn').addEventListener('click',()=>{$('csvInput').value='';data=[];render();toast(ui('cleared'))});
$('downloadTemplateBtn').addEventListener('click',()=>downloadText('data-bloom-template.csv',sampleCSV));
$('exportBtn').addEventListener('click',exportPNG);
$('csvFile').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;const text=await file.text();$('csvInput').value=text;loadFromText()});
document.querySelectorAll('.chip').forEach(btn=>btn.addEventListener('click',()=>{filter=btn.dataset.filter;document.querySelectorAll('.chip').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const first=data.find(d=>filter==='all'||d.cat===filter);if(first)selectedId=first.id;render()}));
$('csvInput').value=sampleCSV;
loadFromText();

