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
  const els = Array.from(document.querySelectorAll("[data-reveal]"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-revealed");
      io.unobserve(e.target);
    });
  }, { threshold: 0.14 });

  els.forEach(el => io.observe(el));
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
