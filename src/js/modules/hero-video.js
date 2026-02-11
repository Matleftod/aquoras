function getAssetBase() {
  return (window.__AQ_ASSET_BASE && String(window.__AQ_ASSET_BASE)) || '';
}

export function setupHeroVideoCarousel() {
  const root = document.querySelector('#accueil .hero-media');
  if (!root) return;

  const a = root.querySelector('.hero-video--a');
  const b = root.querySelector('.hero-video--b');
  const fade = root.querySelector('.hero-fade');
  if (!a || !b || !fade) return;

  const base = getAssetBase();
  const videos = [
    `${base}/videos/hero-vineyard.mp4`,
    `${base}/videos/hero-bottle.mp4`,
    `${base}/videos/hero-cuve.mp4`,
    `${base}/videos/hero-fournisseur.mp4`,
  ];

  const MAX_SECONDS = 7;
  const FADE_MS = 280;
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
      // autoplay bloqué
    }
  };

  const scheduleNext = () => {
    clearTimeout(timer);
    timer = window.setTimeout(transition, MAX_SECONDS * 1000 - FADE_MS - SAFETY_MS);
  };

  const transition = () => {
    fade.classList.add('is-on');

    window.setTimeout(async () => {
      back.currentTime = 0;
      await playSafe(back);

      back.classList.add('is-active');
      front.classList.remove('is-active');

      [front, back] = [back, front];
      idx = (idx + 1) % videos.length;

      setSource(back, videos[(idx + 1) % videos.length]);
      back.classList.remove('is-active');
      back.currentTime = 0;

      requestAnimationFrame(() => fade.classList.remove('is-on'));
      scheduleNext();
    }, FADE_MS);
  };

  a.loop = false;
  b.loop = false;
  a.autoplay = false;
  b.autoplay = false;

  setSource(front, videos[idx]);
  setSource(back, videos[(idx + 1) % videos.length]);

  front.classList.add('is-active');
  back.classList.remove('is-active');
  fade.classList.remove('is-on');

  playSafe(front);
  scheduleNext();

  window.addEventListener('pointerdown', () => playSafe(front), { once: true });
}
