<?php

use Kirby\Toolkit\Html;

$vite = option('vite', []);
$isDev = ($vite['dev'] ?? false) === true;
$server = rtrim($vite['server'] ?? 'http://localhost:5173', '/');

$entry = 'src/js/app.js';

if ($isDev) {
  echo Html::tag('script', '', ['type' => 'module', 'src' => $server . '/@vite/client']);
  echo Html::tag('script', '', ['type' => 'module', 'src' => $server . '/' . $entry]);
  return;
}

// Vite manifest can be either:
// - assets/build/manifest.json
// - assets/build/.vite/manifest.json (Vite >= 5/6)
$manifestPath = kirby()->root('assets') . '/build/manifest.json';
if (!is_file($manifestPath)) {
  $manifestPath = kirby()->root('assets') . '/build/.vite/manifest.json';
}
if (!is_file($manifestPath)) {
  return;
}

$manifest = json_decode(file_get_contents($manifestPath), true);
$item = $manifest[$entry] ?? null;
if (!$item) {
  return;
}

$buildBase = 'assets/build/';

// CSS
foreach (($item['css'] ?? []) as $cssFile) {
  echo css($buildBase . $cssFile);
}

// JS entry
echo Html::tag('script', '', [
  'type' => 'module',
  'src' => url($buildBase . $item['file']),
]);
