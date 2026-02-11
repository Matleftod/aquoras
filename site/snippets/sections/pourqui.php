<?php /** @var string $assetBase */ ?>
<section aria-label="Pour qui est ce projet" class="section audience audience--dark py-16" id="pourqui">
  <div class="container px-4">
    <h2 class="section-title text-3xl md:text-4xl font-semibold" data-reveal>Pour qui est ce projet ?</h2>
    <h3 class="section-subtitle" data-reveal>Une plateforme pensée pour deux acteurs</h3>

    <div class="audience-grid" data-reveal>
      <article class="audience-card">
        <div aria-hidden="true" class="audience-media">
          <img alt="" class="audience-img" loading="lazy" src="<?= $assetBase ?>/audience-viticoles.jpg">
          <span aria-hidden="true" class="audience-media-overlay"></span>
        </div>
        <div class="audience-body">
          <h4 class="audience-title">Exploitations viticoles</h4>
          <ul class="audience-list">
            <li>Gain de temps</li>
            <li>Meilleure visibilité sur le marché</li>
            <li>Décisions éclairées</li>
          </ul>
        </div>
      </article>

      <article class="audience-card">
        <div aria-hidden="true" class="audience-media">
          <img alt="" class="audience-img" loading="lazy" src="<?= $assetBase ?>/audience-fournisseurs.jpg">
          <span aria-hidden="true" class="audience-media-overlay"></span>
        </div>
        <div class="audience-body">
          <h4 class="audience-title">Fournisseurs</h4>
          <ul class="audience-list">
            <li>Accès à des appels d’offres qualifiés</li>
            <li>Mise en avant des offres auprès des viticulteurs</li>
            <li>Opportunités commerciales équitables</li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</section>
