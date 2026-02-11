<?php
$assetBase = url('assets/aqoras');
snippet('layout/doc-start', ['assetBase' => $assetBase]);
snippet('layout/site-header', ['assetBase' => $assetBase]);
?>

<main>
  <?php snippet('sections/hero', ['assetBase' => $assetBase]) ?>
  <?php snippet('sections/vision', ['assetBase' => $assetBase]) ?>
  <?php snippet('sections/fonctionnement', ['assetBase' => $assetBase]) ?>
  <?php snippet('sections/produits', ['assetBase' => $assetBase]) ?>
  <?php snippet('sections/pourqui', ['assetBase' => $assetBase]) ?>
  <?php snippet('sections/equipe', ['assetBase' => $assetBase]) ?>
</main>

<?php
snippet('layout/site-footer', ['assetBase' => $assetBase]);
snippet('layout/doc-end');
