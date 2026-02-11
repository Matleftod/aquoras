<?php /** @var string $assetBase */ ?>
<section aria-label="Comment fonctionne la plateforme" class="section process process--video py-16" id="fonctionnement">
  <div aria-hidden="true" class="soft-video">
    <video autoplay class="soft-video-media" loop muted playsinline poster="<?= $assetBase ?>/hero-vineyard.jpg" preload="metadata">
      <source src="<?= $assetBase ?>/hero-vineyard.mp4" type="video/mp4">
    </video>
  </div>

  <div class="container px-4">
    <h2 class="section-title text-3xl md:text-4xl font-semibold" data-reveal>Comment fonctionne la plateforme</h2>
    <p class="section-text mt-3 text-base md:text-lg opacity-80" data-reveal>Un processus simple, neutre et efficace</p>

    <div aria-label="Étapes du processus" class="roadmap" data-roadmap>
      <div aria-hidden="true" class="roadmap-track">
        <span class="roadmap-line"></span>
        <span class="roadmap-progress"></span>
        <span class="roadmap-dot"></span>
      </div>

      <div class="roadmap-rows">
        <div class="roadmap-row is-left" data-row>
          <article class="step step--road card bg-base-100/80 shadow">
            <div class="card-body p-6">
              <h3 class="step-title card-title text-lg">Étape 1 – Dépôt d’un appel d’offres</h3>
              <p class="step-text opacity-85">
                L’exploitation viticole publie gratuitement son besoin (cartons, bouteilles ou bouchons) directement sur la plateforme.
              </p>
            </div>
          </article>
          <span aria-hidden="true" class="row-pin"></span>
          <div aria-hidden="true" class="row-spacer"></div>
        </div>

        <div class="roadmap-row is-right" data-row>
          <div aria-hidden="true" class="row-spacer"></div>
          <span aria-hidden="true" class="row-pin"></span>
          <article class="step step--road card bg-base-100/80 shadow">
            <div class="card-body p-6">
              <h3 class="step-title card-title text-lg">Étape 2 – Réponses fournisseurs anonymes</h3>
              <p class="step-text opacity-85">
                Les fournisseurs consultent les appels d’offres et y répondent de manière anonyme, garantissant une mise en concurrence équitable.
              </p>
            </div>
          </article>
        </div>

        <div class="roadmap-row is-left" data-row>
          <article class="step step--road card bg-base-100/80 shadow">
            <div class="card-body p-6">
              <h3 class="step-title card-title text-lg">Étape 3 – Comparaison objective</h3>
              <p class="step-text opacity-85">
                Les offres sont comparées selon des critères clairs : prix, délais, qualité, certifications, conditions logistiques.
              </p>
            </div>
          </article>
          <span aria-hidden="true" class="row-pin"></span>
          <div aria-hidden="true" class="row-spacer"></div>
        </div>

        <div class="roadmap-row is-right" data-row>
          <div aria-hidden="true" class="row-spacer"></div>
          <span aria-hidden="true" class="row-pin"></span>
          <article class="step step--road card bg-base-100/80 shadow">
            <div class="card-body p-6">
              <h3 class="step-title card-title text-lg">Étape 4 – Choix du fournisseur</h3>
              <p class="step-text opacity-85">
                L’exploitation sélectionne l’offre la plus adaptée à ses besoins
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</section>
