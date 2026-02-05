/* Aqoras – minimal interactions
   - Header blur on scroll
   - Intro animation on load (hero)
   - Reveal on scroll
*/

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupReveal(){
  if (prefersReducedMotion) return;
    const els = Array.from(document.querySelectorAll("[data-reveal]:not(.step--road)"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-revealed");
      io.unobserve(e.target);
    });
  }, { threshold: 0.14 });

  els.forEach(el => io.observe(el));
}

function setupProcessRoadmap(){
  const section = document.querySelector("#fonctionnement");
  const roadmap = section?.querySelector("[data-roadmap]");
  if (!section || !roadmap) return;

  const track = roadmap.querySelector(".roadmap-track");
  const rows = Array.from(roadmap.querySelectorAll("[data-row]"));
  const pins = rows.map(r => r.querySelector(".row-pin"));

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const THRESHOLD_FROM_BOTTOM = 100; // px
  let raf = 0;

  const update = () => {
    raf = 0;

    const y = window.scrollY;
    const vh = window.innerHeight || 1;
    const thresholdDoc = y + (vh - THRESHOLD_FROM_BOTTOM);

    const trackRect = track.getBoundingClientRect();
    const trackTop = trackRect.top + y;
    const trackHeight = trackRect.height;
    const trackBottom = trackTop + trackHeight;

    const dotDoc = clamp(thresholdDoc, trackTop, trackBottom);
    const dotY = clamp(dotDoc - trackTop, 0, trackHeight);

    roadmap.style.setProperty("--dotY", `${dotY}px`);
    roadmap.style.setProperty("--progressPx", `${dotY}px`);

    for (let i = 0; i < rows.length; i++){
      const pin = pins[i];
      if (!pin) continue;

      const pr = pin.getBoundingClientRect();
      const pinDoc = pr.top + y + pr.height / 2;

      const visible = dotDoc >= pinDoc;
      rows[i].classList.toggle("is-visible", visible);
    }
  };

  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

(() => {
  const scope = document.querySelector("#produits");
  if (!scope) return;

  const tabs = Array.from(scope.querySelectorAll(".product-tab"));
  const items = Array.from(scope.querySelectorAll(".product-item"));
  if (!tabs.length || !items.length) return;

  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const setActive = (key) => {
    tabs.forEach((t) => {
      const active = t.dataset.focus === key;
      t.classList.toggle("is-active", active);
      t.classList.toggle("tab-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });
    items.forEach((i) => i.classList.toggle("is-active", i.dataset.item === key));
  };

  const clearActive = () => {
    tabs.forEach((t) => {
      t.classList.remove("is-active", "tab-active");
      t.setAttribute("aria-selected", "false");
    });
    items.forEach((i) => i.classList.remove("is-active"));
  };

  tabs.forEach((t) => {
    t.addEventListener("mouseenter", () => setActive(t.dataset.focus));
    t.addEventListener("click", () => setActive(t.dataset.focus));
  });

  items.forEach((i) => {
    i.addEventListener("mouseenter", () => setActive(i.dataset.item));
  });

  // Aucun actif par défaut
  clearActive();

  if (!canHover) return;

  let timer = 0;

  const armClear = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // si on ne survole plus ni un bouton ni une image -> reset
      if (!scope.querySelector(".product-tab:hover, .product-item:hover")) {
        clearActive();
      }
    }, 60);
  };

  const disarmClear = () => {
    clearTimeout(timer);
  };

  // Dès qu’on entre sur un élément interactif, on annule le reset
  scope.addEventListener(
    "pointerover",
    (e) => {
      if (e.target.closest(".product-tab, .product-item")) disarmClear();
    },
    true
  );

  // Dès qu’on sort d’un élément interactif, on arme le reset
  scope.addEventListener(
    "pointerout",
    (e) => {
      if (e.target.closest(".product-tab, .product-item")) armClear();
    },
    true
  );

  // Si on sort complètement de la section, reset immédiat
  scope.addEventListener("pointerleave", () => {
    disarmClear();
    clearActive();
  });
})();

window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});

setupReveal();
setupProcessRoadmap();

function setupHeroVideoCarousel(){
  const root = document.querySelector("#accueil .hero-media");
  if (!root) return;

  const a = root.querySelector(".hero-video--a");
  const b = root.querySelector(".hero-video--b");
  const fade = root.querySelector(".hero-fade");
  if (!a || !b || !fade) return;

  const videos = [
    "./assets/hero-vineyard.mp4",
    "./assets/hero-bottle.mp4",
    "./assets/hero-cuve.mp4",
    "./assets/hero-fournisseur.mp4",
  ];

  const MAX_SECONDS = 7;
  const FADE_MS = 280;     // doit matcher --hero-fade
  const SAFETY_MS = 80;

  let idx = 0;
  let front = a;
  let back = b;
  let timer = null;

  const setSource = (el, src) => {
    el.pause();
    el.src = src;
    el.load();
  };

  const playSafe = async (el) => {
    try{
      el.muted = true;
      el.playsInline = true;
      await el.play();
    }catch{
      // autoplay bloqué -> relancé au premier tap/clic
    }
  };

  const scheduleNext = () => {
    clearTimeout(timer);
    // déclenche le fade un poil avant 7s pour rester <= 7s ressenti
    timer = setTimeout(transition, (MAX_SECONDS * 1000) - FADE_MS - SAFETY_MS);
  };

  const transition = async () => {
    fade.classList.add("is-on");

    setTimeout(async () => {
      back.currentTime = 0;
      await playSafe(back);

      back.classList.add("is-active");
      front.classList.remove("is-active");

      const tmp = front; front = back; back = tmp;

      idx = (idx + 1) % videos.length;

      // prépare la prochaine pendant que c’est masqué (et surtout pendant les 7s suivantes)
      setSource(back, videos[(idx + 1) % videos.length]);
      back.classList.remove("is-active");
      back.currentTime = 0;

      requestAnimationFrame(() => fade.classList.remove("is-on"));
      scheduleNext();
    }, FADE_MS);
  };

  a.loop = false; b.loop = false;
  a.autoplay = false; b.autoplay = false;

  setSource(front, videos[idx]);
  setSource(back, videos[(idx + 1) % videos.length]);

  front.classList.add("is-active");
  back.classList.remove("is-active");
  fade.classList.remove("is-on");

  playSafe(front);
  scheduleNext();

  window.addEventListener("pointerdown", () => playSafe(front), { once: true });
}

setupHeroVideoCarousel();
