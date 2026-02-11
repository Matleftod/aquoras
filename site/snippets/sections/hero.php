<section aria-label="Accueil" class="hero min-h-screen relative overflow-hidden" id="accueil">
  <div class="hero-media"
    data-force-video="1"
    data-video-base="<?= $assetBase ?>/videos"
    data-poster-base="<?= $assetBase ?>/images">
    <img class="hero-poster" alt="" loading="eager" fetchpriority="high" />
    <video class="hero-video hero-video--a" muted playsinline preload="auto"></video>
    <video class="hero-video hero-video--b" muted playsinline preload="metadata"></video>
    <div class="hero-fade" aria-hidden="true"></div>
  </div>

  <div class="hero-content w-full px-4 pb-14">
    <div class="mx-auto w-full max-w-6xl grid lg:grid-cols-12 gap-10 items-center">
      <div class="lg:col-span-7 text-left relative z-10">
        <h1 class="mt-6 text-4xl md:text-6xl font-semibold leading-tight text-base-100" data-intro>
          <?= $page->headline()->or('Simplifiez vos achats ; optimisez vos approvisionnements')->escape() ?>
        </h1>

        <p class="mt-5 text-lg md:text-xl text-base-100/75 max-w-prose" data-intro>
          <?= $page->subheadline()->or('Une seule plateforme pour comparer, consulter et sélectionner les meilleurs fournisseurs.')->escape() ?>
        </p>
      </div>
    </div>
  </div>
</section>