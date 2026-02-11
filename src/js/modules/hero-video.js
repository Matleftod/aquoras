function getAssetBase() {
  return (window.__AQ_ASSET_BASE && String(window.__AQ_ASSET_BASE)) || '';
}

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const saveData = () =>
  typeof navigator !== 'undefined' &&
  navigator.connection &&
  navigator.connection.saveData === true;

function buildSources(videoEl, videoBase, name) {
  const candidates = [
    { src: `${videoBase}/${name}.av1.mp4`, type: 'video/mp4; codecs="av01"' },
    { src: `${videoBase}/${name}.hevc.mp4`, type: 'video/mp4; codecs="hvc1"' },
    { src: `${videoBase}/${name}.mp4`, type: 'video/mp4' },
  ];

  return candidates.filter((c) => videoEl.canPlayType(c.type));
}

function setVideoSources(videoEl, sources) {
  videoEl.pause();
  videoEl.removeAttribute('src');
  videoEl.querySelectorAll('source').forEach((s) => s.remove());

  for (const s of sources) {
    const source = document.createElement('source');
    source.src = s.src;
    source.type = s.type;
    videoEl.appendChild(source);
  }

  videoEl.load();
}

function waitPlayable(videoEl, timeoutMs = 10000) {
  return new Promise((resolve) => {
    // déjà prêt
    if (videoEl.readyState >= 2) return resolve(true);

    let done = false;
    const finish = (ok) => {
      if (done) return;
      done = true;
      cleanup();
      resolve(ok);
    };

    const onOk = () => finish(true);
    const onError = () => finish(false);

    const cleanup = () => {
      clearTimeout(t);
      videoEl.removeEventListener('loadedmetadata', onOk);
      videoEl.removeEventListener('canplay', onOk);
      videoEl.removeEventListener('error', onError);
    };

    videoEl.addEventListener('loadedmetadata', onOk, { once: true });
    videoEl.addEventListener('canplay', onOk, { once: true });
    videoEl.addEventListener('error', onError, { once: true });

    const t = setTimeout(() => finish(false), timeoutMs);
  });
}

async function playSafe(videoEl) {
  try {
    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('muted', '');
    await videoEl.play();
    return true;
  } catch {
    return false;
  }
}

export function setupHeroVideoCarousel() {
  const root = document.querySelector('#accueil .hero-media');
  if (!root) return;

  const forceVideo = root.getAttribute('data-force-video') === '1';

  if (!forceVideo && (prefersReducedMotion() || saveData())) {
    root.classList.add('no-video');
    return;
  }

  const a = root.querySelector('.hero-video--a');
  const b = root.querySelector('.hero-video--b');
  const fade = root.querySelector('.hero-fade');
  const posterImg = root.querySelector('.hero-poster');

  if (!a || !b || !fade) return;

  const base = getAssetBase();
  const videoBase = root.getAttribute('data-video-base') || `${base}/videos`;
  const posterBase = root.getAttribute('data-poster-base') || `${base}/images`;

  const clips = [
    { name: 'hero-vineyard', poster: `${posterBase}/hero-vineyard.jpg` },
    { name: 'hero-bottle', poster: `${posterBase}/hero-bottle.jpg` },
    { name: 'hero-cuve', poster: `${posterBase}/hero-cuve.jpg` },
    { name: 'hero-fournisseur', poster: `${posterBase}/hero-fournisseur.jpg` },
  ];

  const MAX_SECONDS = 7;
  const FADE_MS = 280;
  const SAFETY_MS = 80;

  let idx = 0;
  let front = a;
  let back = b;
  let timer = 0;
  let running = true;

  const applyClipTo = (videoEl, clip, preload = 'metadata') => {
    videoEl.preload = preload;
    videoEl.loop = false;
    videoEl.autoplay = false;
    videoEl.controls = false;
    videoEl.disablePictureInPicture = true;
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('muted', '');
    if (clip.poster) videoEl.poster = clip.poster;
    setVideoSources(videoEl, buildSources(videoEl, videoBase, clip.name));
  };

  const showPosterOnly = (posterUrl) => {
    root.classList.add('no-video');
    if (posterImg && posterUrl) posterImg.src = posterUrl;
    front.pause();
    back.pause();
    running = false;
    clearTimeout(timer);
  };

  const scheduleNext = () => {
    clearTimeout(timer);
    timer = window.setTimeout(transition, MAX_SECONDS * 1000 - FADE_MS - SAFETY_MS);
  };

  const transition = async () => {
    if (!running) return;

    fade.classList.add('is-on');

    window.setTimeout(async () => {
      back.currentTime = 0;

      const ok = await waitPlayable(front, 10000);
      const okToPlay = await waitPlayable(back, 10000);
      if (!okToPlay) {
        showPosterOnly(clips[idx]?.poster);
        return;
      }

      const played = await playSafe(back);
      if (!played) {
        showPosterOnly(clips[idx]?.poster);
        return;
      }

      back.classList.add('is-active');
      front.classList.remove('is-active');

      [front, back] = [back, front];
      idx = (idx + 1) % clips.length;

      const nextClip = clips[(idx + 1) % clips.length];
      applyClipTo(back, nextClip, 'metadata');
      back.classList.remove('is-active');
      back.currentTime = 0;

      requestAnimationFrame(() => fade.classList.remove('is-on'));
      scheduleNext();
    }, FADE_MS);
  };

  // init
  root.classList.remove('no-video');
  fade.classList.remove('is-on');

  const first = clips[0];
  const second = clips[1];

  if (posterImg && first?.poster) {
    posterImg.src = first.poster;
  }

  applyClipTo(front, first, 'auto'); // on veut démarrer vite
  applyClipTo(back, second, 'metadata'); // on prépare le suivant sans tout télécharger

  front.classList.add('is-active');
  back.classList.remove('is-active');

  (async () => {
    const ok = await waitPlayable(front, 3000);
    if (!ok) {
      showPosterOnly(first?.poster);
      return;
    }

    const played = await playSafe(front);
    if (!played) {
      // autoplay bloqué, on garde l’image, et on retente au premier geste utilisateur
      root.classList.add('needs-gesture');
    } else {
      root.classList.add('has-video');
      scheduleNext();
    }
  })();

  window.addEventListener(
    'pointerdown',
    async () => {
      if (!running) return;
      if (root.classList.contains('needs-gesture')) {
        const played = await playSafe(front);
        if (played) {
          root.classList.remove('needs-gesture');
          root.classList.add('has-video');
          scheduleNext();
        }
      }
    },
    { once: true },
  );

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      front.pause();
      back.pause();
      clearTimeout(timer);
    } else if (running && root.classList.contains('has-video')) {
      playSafe(front);
      scheduleNext();
    }
  });
}
