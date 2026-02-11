<?php
$assetBase = url('assets/aqoras');

snippet('layout/doc-start', ['assetBase' => $assetBase]);
snippet('layout/site-header', ['assetBase' => $assetBase]);
?>

<main class="pt-24">
  <div class="container mx-auto px-4 py-10 prose max-w-none">
    <h1><?= $page->title()->escape() ?></h1>
    <?= $page->text()->kirbytext() ?>
  </div>
</main>

<?php
snippet('layout/site-footer', ['assetBase' => $assetBase]);
snippet('layout/doc-end');
