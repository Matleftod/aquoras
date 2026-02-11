export function setupReveal() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const els = Array.from(document.querySelectorAll("[data-reveal]:not(.step--road)"));
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
