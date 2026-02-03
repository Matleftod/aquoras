/* Aqoras – minimal interactions
   - Header blur on scroll
   - Intro animation on load (hero)
   - Reveal on scroll
*/

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupHeader(){
  const header = document.querySelector("[data-header]");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

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
  const tabs = Array.from(document.querySelectorAll(".product-tab"));
  const items = Array.from(document.querySelectorAll(".product-item"));
  if (!tabs.length || !items.length) return;

  const setActive = (key) => {
    tabs.forEach(t => {
      const active = t.dataset.focus === key;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });
    items.forEach(i => i.classList.toggle("is-active", i.dataset.item === key));
  };

  tabs.forEach(t => {
    t.addEventListener("mouseenter", () => setActive(t.dataset.focus));
    t.addEventListener("click", () => setActive(t.dataset.focus));
  });

  items.forEach(i => {
    i.addEventListener("mouseenter", () => setActive(i.dataset.item));
  });

  setActive("bouteille");
})();

window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});

setupHeader();
setupReveal();
setupProcessRoadmap();
