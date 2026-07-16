/* ============================================================
   Bao Long Studio · Prompt Builder — UI LAYER
   (loads AFTER core.js; overrides go() / copy() with safer,
   more polished versions and wires the docked console)
   ============================================================ */

/* ---------- top-bar nav helper ---------- */
function navFilter(category){
  location.href = 'assets.html?filter=' + encodeURIComponent(category) + '#products';
  return false;
}

/* ---------- mobile menu ---------- */
function toggleMobileMenu(){
  const p = document.getElementById('mobileMenuPanel');
  if (p) p.classList.toggle('open');
}
function closeMobileMenu(){
  const p = document.getElementById('mobileMenuPanel');
  if (p) p.classList.remove('open');
}
document.addEventListener('click', function(e){
  const panel = document.getElementById('mobileMenuPanel');
  const btn = document.querySelector('.menu-btn');
  if (!panel || !btn) return;
  if (panel.contains(e.target) || btn.contains(e.target)) return;
  panel.classList.remove('open');
});

/* ---------- smooth scroll to a section (replaces scrollIntoView) ---------- */
function scrollOffset(){
  const topbar = document.querySelector('.topbar');
  const rail = document.querySelector('.rail');
  let off = (topbar ? topbar.offsetHeight : 0) + 18;
  // when the rail is laid out horizontally (mobile) it stacks under the topbar
  if (rail && window.matchMedia('(max-width:1080px)').matches){
    off += rail.offsetHeight;
  }
  return off;
}
function go(id){
  const target = document.getElementById(id);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - scrollOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  setActiveNav(id);
}
function setActiveNav(id){
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.sectionTarget === id);
  });
}

/* ---------- scroll-spy: highlight current section in the rail ---------- */
(function initScrollSpy(){
  const sections = Array.from(document.querySelectorAll('.section'));
  if (!sections.length) return;
  const obs = new IntersectionObserver((entries) => {
    // pick the entry nearest the top that is intersecting
    let best = null;
    entries.forEach(en => {
      if (en.isIntersecting){
        if (!best || en.boundingClientRect.top < best.boundingClientRect.top) best = en;
      }
    });
    if (best) setActiveNav(best.target.id);
  }, { rootMargin: '-22% 0px -68% 0px', threshold: 0 });
  sections.forEach(s => obs.observe(s));
})();

/* ---------- docked console open / close ---------- */
function toggleConsole(force){
  const open = (typeof force === 'boolean') ? force : !document.body.classList.contains('console-open');
  document.body.classList.toggle('console-open', open);
}

/* ---------- mirror #result into the single-line bar peek ---------- */
(function initResultMirror(){
  const result = document.getElementById('result');
  const peek = document.getElementById('resultPeek');
  if (!result || !peek) return;

  function isEmpty(t){
    const s = (t || '').trim();
    return !s || s.indexOf('等待') === 0 || s.indexOf('选择维度') === 0;
  }
  function sync(){
    const txt = result.innerText || '';
    if (isEmpty(txt)){
      peek.textContent = '等待操作…';
      peek.classList.add('placeholder');
    } else {
      // flatten newlines + collapse whitespace for the one-line preview
      peek.textContent = txt.replace(/\s*\n\s*/g, '  ·  ').replace(/\s{2,}/g, ' ').trim();
      peek.classList.remove('placeholder');
    }
  }
  new MutationObserver(sync).observe(result, { childList:true, characterData:true, subtree:true });
  sync();
})();

/* ---------- toast ---------- */
let _toastTimer = null;
function showToast(msg){
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 1900);
}

/* ---------- copy() — replaces core's alert() with a toast ---------- */
function copy(){
  const text = document.getElementById('result').innerText;
  if (!text || text.indexOf('等待') === 0){
    showToast('请先选择关键词');
    return;
  }
  const done = () => showToast('已复制完整指令 ✓');
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(done).catch(fallbackCopy);
  } else {
    fallbackCopy();
  }
  function fallbackCopy(){
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch(e){ showToast('复制失败，请手动选择'); }
    document.body.removeChild(ta);
  }
}

/* ---------- keyboard: Esc closes overlays ---------- */
document.addEventListener('keydown', function(e){
  if (e.key !== 'Escape') return;
  closeMobileMenu();
  if (document.getElementById('editModalOverlay').classList.contains('open')){
    closeModal();
  } else {
    toggleConsole(false);
  }
});
