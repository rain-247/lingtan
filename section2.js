// ============================================================
// 使用說明（section2.js）——第二區段：地景輪播 + 地圖彈窗
// 1) 更換地景輪播的圖片與文字：
//    - 在下方 IMGS 陣列改每一張：{ src, title, desc }；順序即為顯示順序。
//    - 可增刪物件改張數；不需更動 HTML。
// 2) 自動輪播時間：AUTOPLAY_DELAY（毫秒）。滑鼠移入暫停、移出續播已內建。
// 3) 左右切換：prev/next 兩個按鈕已綁定事件，不用改 HTML id。
// 4) 地圖彈窗：按鈕在 index.html 的 .map-btn（或你自行觸發）；
//    彈窗內容（地圖圖檔 / 標題 / 描述）在 index.html 的 #s2-flyover 中直接修改。
// 5) 想改說明框大小/字級/箭頭尺寸：到 section2.rwd.css 調整相應選擇器。
// ============================================================

// === Section2：左右切換 + 自動輪播（含暫停/重啟）===
(function(){
  const root  = document.getElementById('section2');
  if (!root) return;

  const layer = root.querySelector('.slide-layer[data-gallery="section2"]');
  const prev  = root.querySelector('.img-nav .prev');
  const next  = root.querySelector('.img-nav .next');
  const viewport = root.querySelector('.slide-viewport'); // hover 偵測用

// ============================================================
// 【使用者可修改區｜第二區段 地景輪播圖】
// 在 IMGS 陣列中逐筆設定：
// - src  ：圖片檔路徑（例如 './img/map_ling.jpg'）
// - title：圖片左下角標題（粗體）
// - desc ：標題下方描述文字（小字）
// 提示：可以增刪物件來調整張數，順序即顯示順序。
// ============================================================
  // 👉 在這裡換你的照片、地名與描述

  // 👉 在這裡換你的照片、地名與描述（可自由增減物件）
//    src  ：圖片檔路徑（例如 './img/map_ling.jpg'）
//    title：左下角粗體標題
//    desc ：標題下方敘述
const IMGS = [
    { src: './img/map_ling.jpg', title: '菱潭街',   desc: '五顏六色的燈籠點亮了街道。' },
    { src: './img/map_long.jpg', title: '龍元宮', desc: '斑駁門面與落日，時間在磚牆上寫字。' },
    { src: './img/map_south.jpg', title: '南天宮',   desc: '老屋新生，保留骨架，長出新故事。' },
    { src: './img/map_water.jpg', title: '龍潭大池',   desc: '午後的步伐緩下來，風把咖啡香帶回家。' },
    { src: './img/map_wu.jpg', title: '武德殿',   desc: '午後的步伐緩下來，風把咖啡香帶回家。' },
    { src: './img/map_wu.jpg', title: '鐘肇政文學園區',   desc: '午後的步伐緩下來，風把咖啡香帶回家。' }
  ];

  // 生成每張卡片（圖 + 左下角說明框）
  
layer.innerHTML = IMGS.map((item) => `
  <div class="s2-slide">
    <img src="${item.src}" alt="${item.title}">
    <div class="s2-caption" role="note" aria-label="${item.title}">
      <h3 class="s2-cap-title">${item.title}</h3>
      <p class="s2-cap-desc">${item.desc}</p>
    </div>
  </div>
`).join('');
let index = 0;
  function go(i){
    index = (i + IMGS.length) % IMGS.length;
    layer.style.transform = `translateX(${-index * 100}%)`;
  }
  go(0);

  // 手動切換
  const onPrev = ()=> { go(index - 1); resetAutoplay(); };
  const onNext = ()=> { go(index + 1); resetAutoplay(); };
  prev?.addEventListener('click', onPrev);
  next?.addEventListener('click', onNext);

  // 自動輪播
  // 自動輪播間隔（單位：毫秒）— 想改速度就改這裡
const AUTOPLAY_DELAY = 3800;
  let autoplayTimer = null;
  function startAutoplay(){ stopAutoplay(); autoplayTimer = setInterval(()=> go(index + 1), AUTOPLAY_DELAY); }
  function stopAutoplay(){ if (autoplayTimer){ clearInterval(autoplayTimer); autoplayTimer = null; } }
  function resetAutoplay(){ startAutoplay(); }

  startAutoplay();

  // hover 暫停 / 離開恢復；觸控也友善
  if (viewport){
    viewport.addEventListener('mouseenter', stopAutoplay);
    viewport.addEventListener('mouseleave', startAutoplay);
    viewport.addEventListener('touchstart', stopAutoplay, {passive:true});
    viewport.addEventListener('touchend',   startAutoplay, {passive:true});
    viewport.addEventListener('touchcancel',startAutoplay, {passive:true});
  }

  // 分頁切走暫停，回來再繼續
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });
})();

// === section2 地圖 modal（獨立，不影響其他區段） ===
// 【彈窗開關說明】點「查看龍潭地景地圖」會打開彈窗。
// 圖片與文字不是在這裡改，請到 index.html 的 #s2-flyover 內改 s2-map-img / cap-title / cap-desc。
(function initS2Modal() {
  function bind() {
    var root = document.getElementById('section2');
    var btn = root ? root.querySelector('.map-btn') : null;
    var modal = document.getElementById('s2-map-modal');
    if (!btn || !modal) return false;

    var backdrop = modal.querySelector('.s2-modal__backdrop');
    var closeBtn = modal.querySelector('.s2-modal__close');
    var panel    = modal.querySelector('.s2-modal__panel');

    function openModal() {
      modal.classList.remove('hidden');
      // allow page scrolling while modal is open
      setTimeout(function() { panel && panel.focus && panel.focus(); }, 0);
    }
    function closeModal() {
      modal.classList.add('hidden');
      // restore (no-op, we kept scrolling enabled)
    }

    btn.addEventListener('click', openModal);
    closeBtn && closeBtn.addEventListener('click', closeModal);
    backdrop && backdrop.addEventListener('click', closeModal);
    window.addEventListener('keydown', function (e) {
      if (modal.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeModal();
    });
    return true;
  }

  if (!bind()) {
    // DOM 可能尚未就緒 → 等待 DOMContentLoaded 再嘗試一次
    document.addEventListener('DOMContentLoaded', bind, { once: true });
  }
})();


// [removed old s2-map-modal fallback handlers]


// === section2 地圖 modal（JS 控制開關，含委派） ===
(function () {
  function openModal(modal) {
    if (!modal) return;
    modal.style.display = 'block';
    // allow page scrolling while modal is open
    var panel = modal.querySelector('.s2-modal__panel');
    setTimeout(function() { panel && panel.focus && panel.focus(); }, 0);
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.style.display = 'none';
    // restore (no-op, we kept scrolling enabled)
  }

  function bind() {
    var root = document.getElementById('section2');
    var btn  = root ? root.querySelector('.map-btn') : null;
    var modal = document.getElementById('s2-map-modal');
    if (btn && modal) {
      btn.addEventListener('click', function() { openModal(modal); });
    }
    if (modal) {
      var closeBtn = modal.querySelector('.s2-modal__close');
      var backdrop = modal.querySelector('.s2-modal__backdrop');
      closeBtn && closeBtn.addEventListener('click', function() { closeModal(modal); });
      backdrop && backdrop.addEventListener('click', function() { closeModal(modal); });
    }
    return !!modal;
  }

  if (!bind()) {
    document.addEventListener('DOMContentLoaded', bind, { once: true });
  }

  // 事件委派 fallback：就算之後重繪 .map-btn，依然可用
  document.addEventListener('click', function (e) {
    var targetBtn = e.target && e.target.closest && e.target.closest('#section2 .map-btn');
    if (!targetBtn) return;
    var modal = document.getElementById('s2-map-modal');
    if (modal && modal.style.display !== 'block') openModal(modal);
  });

  // 委派關閉（關閉鈕 / 背景）
  document.addEventListener('click', function (e) {
    var toClose = e.target && e.target.closest && e.target.closest('#s2-map-modal .s2-modal__close, #s2-map-modal .s2-modal__backdrop');
    if (!toClose) return;
    var modal = document.getElementById('s2-map-modal');
    if (modal && modal.style.display !== 'none') closeModal(modal);
  });

  // Esc 關閉
  window.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var modal = document.getElementById('s2-map-modal');
    if (modal && modal.style.display === 'block') {
      closeModal(modal);
    }
  });
})();


// === section2 地圖：就地覆蓋 flyover（無半透明黑背景） ===
(function () {
  var root = document.getElementById('section2');
  if (!root) return;

  var viewport = root.querySelector('.slide-viewport');
  var btn      = root.querySelector('.map-btn');
  var flyover  = document.getElementById('s2-flyover');
  var closeBtn = flyover ? flyover.querySelector('.s2-modal__close') : null;

  // 確保 flyover 在圖片容器中（就地覆蓋）
  if (viewport && flyover && !viewport.contains(flyover)) {
    viewport.appendChild(flyover);
  }

  function openFlyover() {
    if (!flyover) return;
    flyover.classList.remove('hidden');
    flyover.classList.add('is-open');
    var panel = flyover.querySelector('.s2-map-panel');
    panel && panel.focus && panel.focus();
  }

  function closeFlyover() {
    if (!flyover) return;
    flyover.classList.remove('is-open');
    flyover.classList.add('hidden');
  }

  btn && btn.addEventListener('click', openFlyover);
  closeBtn && closeBtn.addEventListener('click', closeFlyover);

  // Esc 關閉
  window.addEventListener('keydown', function (e) {
    if (!flyover || flyover.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeFlyover();
  });
})();


// === S2 flyover open/close (robust) — 2025-09-14 ===
(function setupS2Flyover(){
  var root = document.getElementById('section2');
  var btn  = root ? root.querySelector('.map-btn') : null;
  var fly  = document.getElementById('s2-flyover');
  if (!fly) return;

  if (fly.dataset.bound === "1") return; // avoid double-binding
  fly.dataset.bound = "1";

  function openFly(){
    fly.classList.remove('hidden');
    // allow page scrolling while modal is open
  }
  function closeFly(){
    fly.classList.add('hidden');
    // restore (no-op, we kept scrolling enabled)
  }

  // open
  if (btn) btn.addEventListener('click', openFly);

  // close on X
  var closeBtn = fly.querySelector('.s2-modal__close');
  if (closeBtn) closeBtn.addEventListener('click', closeFly);

  // close when clicking backdrop (outside panel)
  fly.addEventListener('click', function(e){
    var panel = fly.querySelector('.s2-map-panel');
    if (!panel) return;
    // if click target is outside panel, close
    if (!panel.contains(e.target)) closeFly();
  });

  // Esc to close
  window.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && !fly.classList.contains('hidden')) closeFly();
  });

  // Delegate: if .map-btn is re-rendered later
  document.addEventListener('click', function(e){
    var t = e.target && e.target.closest && e.target.closest('#section2 .map-btn');
    if (t) openFly();
  });
})();
