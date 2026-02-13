export function setupReveal() {
  const reduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const els = Array.from(document.querySelectorAll('[data-reveal]:not(.step--road)'));
  if (!els.length) return;

  const reveal = (el) => el.classList.add('is-revealed');

  if (reduced) {
    els.forEach(reveal);
    return;
  }

  const inViewport = (el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    return r.bottom > 0 && r.top < vh; // strict viewport
  };

  // 1) Reveal immédiat uniquement pour ce qui est déjà visible (ex: hero)
  for (const el of els) {
    if (inViewport(el)) reveal(el);
  }

  // Fallback sans IO
  if (!('IntersectionObserver' in window)) {
    els.forEach(reveal);
    return;
  }

  // 2) Scroll reveal normal
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        reveal(e.target);
        io.unobserve(e.target);
      }
    },
    {
      threshold: 0,
      // déclenche un peu avant l'entrée complète, mais pas "trop tôt"
      rootMargin: '0px 0px -10% 0px',
    },
  );

  for (const el of els) {
    if (!el.classList.contains('is-revealed')) io.observe(el);
  }

  // 3) Sécurité: si un élément est visible mais toujours pas révélé (layout shift / fonts),
  // on révèle UNIQUEMENT ceux qui sont dans le viewport, pas toute la page.
  const nudge = () => {
    for (const el of els) {
      if (el.classList.contains('is-revealed')) continue;
      if (inViewport(el)) reveal(el);
    }
  };

  requestAnimationFrame(nudge);
  window.addEventListener('load', nudge, { once: true });
  window.addEventListener('pageshow', nudge); // BFCache
  setTimeout(nudge, 900);
}
