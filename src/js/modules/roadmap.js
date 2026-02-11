const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export function setupProcessRoadmap() {
  const roadmap = document.querySelector("#fonctionnement [data-roadmap]");
  if (!roadmap) return;

  const track = roadmap.querySelector(".roadmap-track");
  if (!track) return;

  const rows = Array.from(roadmap.querySelectorAll("[data-row]"));
  if (!rows.length) return;

  const pins = rows.map((r) => r.querySelector(".row-pin"));

  const THRESHOLD_FROM_BOTTOM = 100;
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
