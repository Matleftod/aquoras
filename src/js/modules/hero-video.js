function getAssetBase() {
  return (window.__AQ_ASSET_BASE && String(window.__AQ_ASSET_BASE)) || '';
}

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const saveData = () =>
  typeof navigator !== 'undefined' &&
  navigator.connection &&
  navigator.connection.saveData === true;

const effectiveType = () => (navigator.connection && navigator.connection.effectiveType) || '';

function buildSources(videoBase, name) {
  return [
    { src: `${videoBase}/${name}.av1.mp4`, type: 'video/mp4; codecs="av01.0.05M.08"' },
    { src: `${videoBase}/${name}.hevc.mp4`, type: 'video/mp4; codecs="hvc1"' },
    { src: `${videoBase}/${name}.mp4`, type: 'video/mp4; codecs="avc1.42E01E"' },
    { src: `${videoBase}/${name}.mp4`, type: 'video/mp4' },
  ];
}

function setOnceSources(videoEl, candidates) {
  if (videoEl.dataset.sourcesSet === '1') return;
  videoEl.dataset.sourcesSet = '1';

  let i = 0;

  const setCandidate = (c) => {
    videoEl.querySelectorAll('source').forEach((s) => s.remove());
    const source = document.createElement('source');
    source.src = c.src;
    source.type = c.type;
    videoEl.appendChild(source);
    videoEl.load();
  };

  const tryNext = () => {
    while (i < candidates.length) {
      const c = candidates[i++];
      const r = videoEl.canPlayType(c.type);
      if (r === 'probably' || r === 'maybe') {
        setCandidate(c);
        return;
      }
    }
  };

  videoEl.addEventListener(
    'error',
    () => {
      // si le format choisi plante au decode, on tente le suivant
      tryNext();
    },
    { once: false },
  );

  tryNext();
}

function waitReady(videoEl, timeoutMs = 12000) {
  return new Promise((resolve) => {
    if (videoEl.readyState >= 3) return resolve(true); // HAVE_FUTURE_DATA

    let done = false;
    const finish = (ok) => {
      if (done) return;
      done = true;
      cleanup();
      resolve(ok);
    };

    const onOk = () => finish(true);
    const onErr = () => finish(false);

    const cleanup = () => {
      clearTimeout(t);
      videoEl.removeEventListener('canplay', onOk);
      videoEl.removeEventListener('canplaythrough', onOk);
      videoEl.removeEventListener('stalled', onErr);
      videoEl.removeEventListener('error', onErr);
    };

    videoEl.addEventListener('canplay', onOk, { once: true });
    videoEl.addEventListener('canplaythrough', onOk, { once: true });
    videoEl.addEventListener('stalled', onErr, { once: true });
    videoEl.addEventListener('error', onErr, { once: true });

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

  const base = getAssetBase();
  const videoBase = root.getAttribute('data-video-base') || `${base}/videos`;
  const posterBase = root.getAttribute('data-poster-base') || `${base}/images`;
  const fade = root.querySelector('.hero-fade');
  const posterImg = root.querySelector('.hero-poster');

  const clips = [
    { key: 'vineyard', name: 'hero-vineyard', poster: `${posterBase}/hero-vineyard.jpg` },
    { key: 'bottle', name: 'hero-bottle', poster: `${posterBase}/hero-bottle.jpg` },
    { key: 'cuve', name: 'hero-cuve', poster: `${posterBase}/hero-cuve.jpg` },
    { key: 'fournisseur', name: 'hero-fournisseur', poster: `${posterBase}/hero-fournisseur.jpg` },
  ];

  const els = new Map();
  root.querySelectorAll('video.hero-video').forEach((v) => {
    const k = v.dataset.clip;
    if (k) els.set(k, v);
  });

  // sécurité
  for (const c of clips) {
    const v = els.get(c.key);
    if (!v) return;

    v.loop = false;
    v.autoplay = false;
    v.controls = false;
    v.disablePictureInPicture = true;

    if (c.poster) v.poster = c.poster;
    setOnceSources(v, buildSources(videoBase, c.name));
  }

  const FADE_MS = 320;
  const HOLD_MS = 120;
  const MAX_SECONDS = 7;

  if (posterImg && clips[0]?.poster) posterImg.src = clips[0].poster;

  // stratégie preload
  const slow = saveData() || /(^|-)2g$/.test(effectiveType());
  if (!slow) {
    setTimeout(() => {
      for (const v of els.values()) v.preload = 'auto';
    }, 1200);
  }

  let idx = 0;
  let timer = 0;
  let running = true;

  const show = (v) => v.classList.add('is-active');
  const hide = (v) => v.classList.remove('is-active');

  const current = () => els.get(clips[idx].key);
  const next = () => els.get(clips[(idx + 1) % clips.length].key);

  const duration = (v) => {
    const d = Number.isFinite(v.duration) && v.duration > 0 ? v.duration : MAX_SECONDS;
    return Math.min(MAX_SECONDS, d);
  };

  const showPosterOnly = (posterUrl) => {
    root.classList.add('no-video');
    if (posterImg && posterUrl) posterImg.src = posterUrl;
    for (const v of els.values()) v.pause();
    running = false;
    clearTimeout(timer);
  };

  const XFADE_MS = 900; // doit matcher --hero-xfade

  const schedule = () => {
    clearTimeout(timer);
    const v = current();
    const d = duration(v);
    const t = Math.max(0, v.currentTime || 0);
    const remainingMs = Math.max(0, (d - t) * 1000);
    const delay = Math.max(200, remainingMs - XFADE_MS - 80);
    timer = window.setTimeout(transition, delay);
  };

  const transition = async () => {
    if (!running || document.hidden) return;

    const out = current();
    const inc = next();

    inc.currentTime = 0;

    const ok = await waitReady(inc, 12000);
    if (!ok) {
      showPosterOnly(clips[(idx + 1) % clips.length]?.poster);
      return;
    }

    const played = await playSafe(inc);
    if (!played) {
      root.classList.add('needs-gesture');
      return;
    }

    // Crossfade
    inc.classList.add('is-active');
    out.classList.remove('is-active');

    // Après le crossfade, on gèle l’ancienne vidéo (sinon elle continue et peut “attirer l’œil”)
    setTimeout(() => {
      out.pause();
    }, XFADE_MS + 40);

    idx = (idx + 1) % clips.length;
    schedule();
  };

  // init
  root.classList.remove('no-video');
  fade?.classList.remove('is-on');

  for (const v of els.values()) hide(v);
  const first = current();
  show(first);

  (async () => {
    const ok = await waitReady(first, 12000);
    if (!ok) {
      showPosterOnly(clips[0]?.poster);
      return;
    }
    const played = await playSafe(first);
    if (!played) {
      root.classList.add('needs-gesture');
    } else {
      root.classList.add('has-video');
      schedule();
    }
  })();

  // au premier geste, relance si autoplay bloqué
  window.addEventListener(
    'pointerdown',
    async () => {
      if (!running) return;
      if (!root.classList.contains('needs-gesture')) return;
      const played = await playSafe(current());
      if (played) {
        root.classList.remove('needs-gesture');
        root.classList.add('has-video');
        schedule();
      }
    },
    { once: true },
  );

  document.addEventListener('visibilitychange', async () => {
    if (document.hidden) {
      clearTimeout(timer);
      current()?.pause();
      return;
    }
    if (!running || !root.classList.contains('has-video')) return;
    await playSafe(current());
    schedule();
  });

  // upgrade preload plus tard si connexion OK
  if (!slow) {
    setTimeout(() => {
      for (const v of els.values()) v.preload = 'auto';
    }, 1500);
  }
}
