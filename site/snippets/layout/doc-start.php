<?php
/** @var string $assetBase */
$lang = $kirby->language()?->code() ?? 'fr';
?>
<!doctype html>
<html data-theme="aqoras" lang="<?= esc($lang) ?>">
<head>
  <?php snippet('layout/head', ['assetBase' => $assetBase]) ?>
</head>
<body>
<script>window.__AQ_ASSET_BASE = <?= json_encode($assetBase) ?>;</script>
