<?php
/** @var string $assetBase */

$siteTitle = $site->title()->value();
$pageTitle = $page->title()->value();

$seoTitle = $page->seoTitle()->isNotEmpty() ? $page->seoTitle()->value() : $pageTitle;
$seoDescription = $page->seoDescription()->isNotEmpty()
  ? $page->seoDescription()->value()
  : $site->seoDescription()->value();

$title = trim($seoTitle ?: $siteTitle);
if ($siteTitle && $title && $title !== $siteTitle) {
  $title .= ' | ' . $siteTitle;
}
?>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#14545a">

<title><?= esc($title) ?></title>
<?php if ($seoDescription): ?>
<meta name="description" content="<?= esc($seoDescription) ?>">
<?php endif; ?>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<?php snippet('assets') ?>
