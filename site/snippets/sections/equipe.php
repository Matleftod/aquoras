<?php

/** @var string $assetBase */ ?>
<section aria-label="Qui sommes-nous et contact" class="team-contact py-16" id="equipe">
  <div class="container px-4">
    <div class="tc-card">
      <header class="tc-head">
        <h2 class="tc-title" data-reveal>Qui sommes-nous</h2>
        <p class="tc-subtitle" data-reveal>
          Aqoras est né de la rencontre de deux profils complémentaires, experts des achats internationaux et du pilotage de projets industriels.
        </p>
      </header>

      <div class="tc-rows">
        <div class="tc-row tc-row--a" data-reveal>
          <div class="tc-media">
            <img alt="Photo de Gabriel Poitevin" loading="lazy" src="<?= $assetBase ?>/gabriel.jpeg">
          </div>
          <div class="tc-copy">
            <div class="tc-name">Gabriel Poitevin</div>
            <p class="tc-text">
              Gabriel Poitevin, diplômé du Master MAI - KEDGE Business School, a évolué comme acheteur au sein de grands groupes industriels tels que Bouygues Construction, Thales et Forvia (ex-Faurecia), en France et en Italie. Il apporte une solide expertise en négociation, gestion fournisseurs et environnements industriels complexes.
            </p>
          </div>
        </div>

        <div class="tc-row tc-row--b" data-reveal>
          <div class="tc-copy">
            <div class="tc-name">Guillaume Robert</div>
            <p class="tc-text">
              Guillaume Robert, également diplômé du Master MAI - KEDGE Business School, a travaillé comme acheteur pour BNP Paribas, Continental Automotive et Forvia (ex-Faurecia), en France et au Mexique. Il est spécialisé dans les achats stratégiques, les environnements multiculturels et la structuration de processus achats.
            </p>
          </div>
          <div class="tc-media">
            <img alt="Photo de Guillaume Robert" loading="lazy" src="<?= $assetBase ?>/guillaume.jpeg">
          </div>
        </div>
      </div>

      <p class="tc-final section-text mt-3 text-base md:text-lg opacity-80" data-reveal>
        Ensemble, ils ont fondé Aqoras avec une ambition claire : mettre l’exigence des grands groupes au service de projets plus agiles, durables et innovants, en particulier dans les filières vin, spiritueux et packaging.
      </p>

      <div aria-label="Nous contacter" class="tc-contact mt-12" id="contact">
        <div class="tc-contact-head" data-reveal>
          <h3 class="tc-contact-title">Nous contacter</h3>
        </div>

        <div class="tc-contact-grid mt-8" data-reveal>
          <article class="tc-contact-card">
            <div class="tc-contact-top">
              <img class="tc-contact-avatar" src="<?= $assetBase ?>/gabriel.jpeg" alt="Photo de Gabriel Poitevin" loading="lazy">
              <div class="tc-contact-meta">
                <div class="tc-contact-name">Gabriel Poitevin</div>
                <div class="tc-contact-role">Achats & sourcing</div>
              </div>
            </div>

            <a class="tc-contact-tel" href="tel:+33675436723" aria-label="Téléphoner à Gabriel Poitevin">
              <img class="tc-wa" src="<?= $assetBase ?>/whatsapp.svg" alt="" aria-hidden="true">
              <span>06 75 43 67 23</span>
            </a>
          </article>

          <article class="tc-contact-card">
            <div class="tc-contact-top">
              <img class="tc-contact-avatar" src="<?= $assetBase ?>/guillaume.jpeg" alt="Photo de Guillaume Robert" loading="lazy">
              <div class="tc-contact-meta">
                <div class="tc-contact-name">Guillaume Robert</div>
                <div class="tc-contact-role">Process & partenaires</div>
              </div>
            </div>

            <a class="tc-contact-tel" href="tel:+33606428527" aria-label="Téléphoner à Guillaume Robert">
              <img class="tc-wa" src="<?= $assetBase ?>/whatsapp.svg" alt="" aria-hidden="true">
              <span>06 06 42 85 27</span>
            </a>
          </article>
        </div>

        <div class="tc-mail-wrap mt-8" data-reveal>
          <a class="tc-mail btn gap-3" href="mailto:aqoras@outlook.com">
            <span class="tc-mail-ic">
              <svg aria-hidden="true" height="18" viewBox="0 0 24 24" width="18">
                <path d="M4 6.5h16v11H4z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.8"></path>
                <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
              </svg>
            </span>
            <span>aqoras@outlook.com</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>