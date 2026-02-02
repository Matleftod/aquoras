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

window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});

setupHeader();
setupReveal();
