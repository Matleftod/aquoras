<?php /** @var string $assetBase */ ?>
<section aria-label="Nos produits" class="section products" id="produits">
  <div class="container px-4">
    <div class="text-center" data-reveal>
      <h2 class="section-title text-3xl md:text-4xl font-semibold">
        Nos produits
      </h2>

      <div aria-label="Catégories produits" class="product-pillbar mx-auto mt-6" role="tablist">
        <button aria-selected="false" class="product-tab" data-focus="bouchon" role="tab" type="button">Bouchon</button>
        <button aria-selected="false" class="product-tab" data-focus="bouteille" role="tab" type="button">Bouteille</button>
        <button aria-selected="false" class="product-tab" data-focus="etiquette" role="tab" type="button">Étiquette</button>
        <button aria-selected="false" class="product-tab" data-focus="carton" role="tab" type="button">Carton</button>
      </div>

      <p class="mt-3 text-sm text-base-content/60">
        Survole une catégorie pour mettre en avant le produit
      </p>
    </div>

    <div aria-label="Présentation des produits" class="product-scene" data-reveal>
      <div aria-label="Bouchon" class="product-item product-shift product-shift--bouchon" data-item="bouchon">
        <img class="product-icon" src="<?= $assetBase ?>/bouchon.png" alt="Bouchon" loading="lazy">
      </div>

      <div aria-label="Bouteille" class="product-item" data-item="bouteille">
        <img class="product-icon" src="<?= $assetBase ?>/bouteille.png" alt="Bouteille" loading="lazy">
      </div>

      <div aria-label="Étiquette" class="product-item product-shift product-shift--etiquette" data-item="etiquette">
        <img class="product-icon" src="<?= $assetBase ?>/etiquette.png" alt="Étiquette" loading="lazy">
      </div>

      <div aria-label="Carton" class="product-item product-shift product-shift--carton" data-item="carton">
        <img class="product-icon" src="<?= $assetBase ?>/carton.png" alt="Carton" loading="lazy">
      </div>
    </div>
  </div>
</section>
