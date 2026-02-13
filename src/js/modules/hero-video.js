const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const saveData = () =>
  typeof navigator !== 'undefined' &&
  navigator.connection &&
  navigator.connection.saveData === true;

function waitReady(videoEl, timeoutMs = 8000) {
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
    // attributs indispensables pour autoplay mobile
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

/**
 * Export attendu par app.js
 * (garde le nom historique setupHeroVideoCarousel)
 */
export function setupHeroVideoCarousel() {
  const root = document.querySelector('#accueil .hero-media');
  if (!root) return;

  const forceVideo = root.getAttribute('data-force-video') === '1';
  if (!forceVideo && (prefersReducedMotion() || saveData())) {
    root.classList.add('no-video');
    return;
  }

  const video = root.querySelector('video.hero-video');
  if (!video) return;

  let running = true;

  const showPosterOnly = () => {
    root.classList.add('no-video');
    running = false;
    try {
      video.pause();
    } catch {}
  };

  (async () => {
    const ok = await waitReady(video, 8000);
    if (!ok) return showPosterOnly();

    const played = await playSafe(video);
    if (!played) {
      // autoplay bloqué : on garde le poster, et on relance au premier geste
      root.classList.add('needs-gesture');
      return;
    }

    root.classList.add('has-video');
  })();

  window.addEventListener(
    'pointerdown',
    async () => {
      if (!running) return;
      if (!root.classList.contains('needs-gesture')) return;

      const played = await playSafe(video);
      if (played) {
        root.classList.remove('needs-gesture');
        root.classList.add('has-video');
      }
    },
    { once: true },
  );

  document.addEventListener('visibilitychange', async () => {
    if (!running) return;
    if (document.hidden) return;

    // au retour sur l’onglet, certains navigateurs mettent la vidéo en pause
    if (root.classList.contains('has-video')) {
      await playSafe(video);
    }
  });
}

// Optionnel : si tu veux aussi garder ton ancien nom ailleurs
export const setupHeroVideoLoop = setupHeroVideoCarousel;
