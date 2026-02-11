<?php /** @var string $assetBase */ ?>
<section aria-label="Vision du projet" id="projet"
  class="relative min-h-screen overflow-hidden bg-neutral text-neutral-content flex items-center">
  <div class="container relative z-10 px-4 py-16 md:py-24">
    <div class="max-w-3xl lg:max-w-[68ch] rounded-3xl bg-black/35 backdrop-blur-sm ring-1 ring-white/10 p-6 md:p-8">
      <h2 class="text-3xl md:text-5xl font-semibold tracking-tight" data-reveal>
        Vision du projet
      </h2>

      <div class="mt-7 space-y-4" data-reveal>
        <p class="text-base md:text-lg text-neutral-content/85">
          Le marché viticole repose sur une relation essentielle entre viticulteurs et fournisseurs.
        </p>
        <p class="text-base md:text-lg text-neutral-content/75">
          Aujourd’hui, elle est freinée par un manque de visibilité, une information fragmentée et des processus d’achats peu fluides.
        </p>

        <p class="mt-6 pl-6 border-l-2 border-primary text-base md:text-lg font-semibold text-neutral-content">
          Les échanges doivent être plus transparents, plus simples et plus équilibrés.
        </p>
      </div>

      <div class="mt-10 space-y-3" data-reveal>
        <div class="collapse collapse-arrow bg-black/20 border border-white/10 rounded-2xl">
          <input type="checkbox">
          <div class="collapse-title text-base md:text-lg font-semibold">
            Le problème, côté viticulteurs et fournisseurs
          </div>
          <div class="collapse-content text-neutral-content/75 space-y-4">
            <p>
              Côté viticulteurs, la multiplicité des offres et la difficulté à comparer complexifient les décisions.
            </p>
            <p>
              Côté fournisseurs, il est souvent difficile de valoriser son savoir-faire, de toucher les bons clients et de rendre son offre lisible.
            </p>
          </div>
        </div>

        <div class="collapse collapse-arrow bg-black/20 border border-white/10 rounded-2xl">
          <input type="checkbox">
          <div class="collapse-title text-base md:text-lg font-semibold">
            Une meilleure structuration profite à tous
          </div>
          <div class="collapse-content text-neutral-content/75">
            <ul class="list-disc pl-5 space-y-2">
              <li>aux viticulteurs, qui gagnent en clarté et en efficacité,</li>
              <li>aux fournisseurs, qui gagnent en visibilité et en pertinence commerciale.</li>
            </ul>
          </div>
        </div>

        <div class="collapse collapse-arrow bg-black/20 border border-white/10 rounded-2xl">
          <input type="checkbox">
          <div class="collapse-title text-base md:text-lg font-semibold">
            La plateforme, concrètement
          </div>
          <div class="collapse-content text-neutral-content/75 space-y-4">
            <p>
              Nous avons conçu une plateforme d’achats pensée comme un point de rencontre entre l’offre et la demande.
            </p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Comparer, sélectionner et sécuriser les achats plus rapidement,</li>
              <li>Présenter clairement produits, spécificités et valeur ajoutée,</li>
              <li>Fluidifier les échanges et renforcer la qualité des relations.</li>
            </ul>
          </div>
        </div>

        <div class="collapse collapse-arrow bg-black/20 border border-white/10 rounded-2xl">
          <input type="checkbox">
          <div class="collapse-title text-base md:text-lg font-semibold">
            L’ambition
          </div>
          <div class="collapse-content text-neutral-content/75 space-y-4">
            <p>
              Créer un écosystème plus équilibré et plus performant, où chacun trouve sa place :
            </p>
            <ul class="list-disc pl-5 space-y-2">
              <li>des décisions d’achat plus éclairées pour les exploitations,</li>
              <li>des opportunités commerciales mieux qualifiées et plus nombreuses pour les fournisseurs,</li>
              <li>une relation durable basée sur la confiance et la transparence.</li>
            </ul>
            <p>
              En renforçant le lien entre viticulteurs et fournisseurs, nous contribuons à une filière viticole plus lisible, plus efficace et plus résiliente.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    aria-hidden="true"
    class="pointer-events-none absolute bottom-0 right-0 z-0
           w-[420px] h-[420px]
           sm:w-[520px] sm:h-[470px]
           lg:w-[640px] lg:h-[540px]
           overflow-hidden aq-corner-oval translate-x-6 translate-y-8 opacity-95"
  >
    <img
      alt=""
      loading="lazy"
      src="<?= $assetBase ?>/projet.jpg"
      class="h-full w-full object-cover"
    >
    <div class="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent"></div>
  </div>
</section>
