/* Aqoras – interactions
   - Intro on load
   - Reveal on scroll
   - Roadmap scroll indicator
   - Products hover focus (no default active, auto-clear on exit)
   - Hero video carousel
*/

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // 1) Reveal
  function setupReveal() {
    if (prefersReducedMotion) return;

    const els = $$("[data-reveal]:not(.step--road)");
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-revealed");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.14 }
    );

    els.forEach((el) => io.observe(el));
  }

  // 2) Roadmap
  function setupProcessRoadmap() {
    const roadmap = $("#fonctionnement [data-roadmap]");
    if (!roadmap) return;

    const track = $(".roadmap-track", roadmap);
    if (!track) return;

    const rows = $$("[data-row]", roadmap);
    if (!rows.length) return;

    const pins = rows.map((r) => $(".row-pin", r));

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

      for (let i = 0; i < rows.length; i++) {
        const pin = pins[i];
        if (!pin) continue;

        const pr = pin.getBoundingClientRect();
        const pinDoc = pr.top + y + pr.height / 2;

        rows[i].classList.toggle("is-visible", dotDoc >= pinDoc);
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

  // 3) Products hover focus
  function setupProductsHover() {
    const scope = $("#produits");
    if (!scope) return;

    const tabs = $$(".product-tab", scope);
    const items = $$(".product-item", scope);
    if (!tabs.length || !items.length) return;

    const setActive = (key) => {
      for (const t of tabs) {
        const active = t.dataset.focus === key;
        t.classList.toggle("is-active", active);
        t.classList.toggle("tab-active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      }
      for (const i of items) {
        i.classList.toggle("is-active", i.dataset.item === key);
      }
    };

    const clearActive = () => {
      for (const t of tabs) {
        t.classList.remove("is-active", "tab-active");
        t.setAttribute("aria-selected", "false");
      }
      for (const i of items) i.classList.remove("is-active");
    };

    // delegation: hover + click sur tabs
    scope.addEventListener("mouseenter", (e) => {
      const tab = e.target.closest(".product-tab");
      if (tab) setActive(tab.dataset.focus);
      const item = e.target.closest(".product-item");
      if (item) setActive(item.dataset.item);
    }, true);

    scope.addEventListener("click", (e) => {
      const tab = e.target.closest(".product-tab");
      if (tab) setActive(tab.dataset.focus);
    });

    // aucun actif au chargement
    clearActive();

    // auto-clear uniquement sur devices hover
    if (!canHover) return;

    let timer = 0;

    const armClear = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!scope.querySelector(".product-tab:hover, .product-item:hover")) {
          clearActive();
        }
      }, 60);
    };

    const disarmClear = () => clearTimeout(timer);

    scope.addEventListener(
      "pointerover",
      (e) => {
        if (e.target.closest(".product-tab, .product-item")) disarmClear();
      },
      true
    );

    scope.addEventListener(
      "pointerout",
      (e) => {
        if (e.target.closest(".product-tab, .product-item")) armClear();
      },
      true
    );

    scope.addEventListener("pointerleave", () => {
      disarmClear();
      clearActive();
    });
  }

  // 4) Hero video carousel
  function setupHeroVideoCarousel() {
    const root = $("#accueil .hero-media");
    if (!root) return;

    const a = $(".hero-video--a", root);
    const b = $(".hero-video--b", root);
    const fade = $(".hero-fade", root);
    if (!a || !b || !fade) return;

    const videos = [
      "./assets/hero-vineyard.mp4",
      "./assets/hero-bottle.mp4",
      "./assets/hero-cuve.mp4",
      "./assets/hero-fournisseur.mp4",
    ];

    const MAX_SECONDS = 7;
    const FADE_MS = 280; // doit matcher --hero-fade
    const SAFETY_MS = 80;

    let idx = 0;
    let front = a;
    let back = b;
    let timer = 0;

    const setSource = (el, src) => {
      el.pause();
      el.src = src;
      el.load();
    };

    const playSafe = async (el) => {
      try {
        el.muted = true;
        el.playsInline = true;
        await el.play();
      } catch {
        // autoplay bloqué -> relancé au premier tap/clic
      }
    };

    const scheduleNext = () => {
      clearTimeout(timer);
      timer = setTimeout(transition, MAX_SECONDS * 1000 - FADE_MS - SAFETY_MS);
    };

    const transition = () => {
      fade.classList.add("is-on");

      setTimeout(async () => {
        back.currentTime = 0;
        await playSafe(back);

        back.classList.add("is-active");
        front.classList.remove("is-active");

        [front, back] = [back, front];
        idx = (idx + 1) % videos.length;

        // prépare la prochaine pendant le masque
        setSource(back, videos[(idx + 1) % videos.length]);
        back.classList.remove("is-active");
        back.currentTime = 0;

        requestAnimationFrame(() => fade.classList.remove("is-on"));
        scheduleNext();
      }, FADE_MS);
    };

    a.loop = false;
    b.loop = false;
    a.autoplay = false;
    b.autoplay = false;

    setSource(front, videos[idx]);
    setSource(back, videos[(idx + 1) % videos.length]);

    front.classList.add("is-active");
    back.classList.remove("is-active");
    fade.classList.remove("is-on");

    playSafe(front);
    scheduleNext();

    window.addEventListener("pointerdown", () => playSafe(front), { once: true });
  }

  // Boot
  window.addEventListener("load", () => {
    document.body.classList.add("is-loaded");

    const yearEl = $("#aq-year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  });

  setupReveal();
  setupProcessRoadmap();
  setupProductsHover();
  setupHeroVideoCarousel();
})();
