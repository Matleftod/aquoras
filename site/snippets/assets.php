<?php

use Kirby\Toolkit\Html;

$vite = option('vite', []);
$isDev = ($vite['dev'] ?? false) === true;
$server = rtrim($vite['server'] ?? 'http://localhost:5173', '/');

$entry = '/src/js/app.js';

if ($isDev) {
  echo Html::tag('script', '', ['type' => 'module', 'src' => $server . '/@vite/client']);
  echo Html::tag('script', '', ['type' => 'module', 'src' => $server . $entry]);
  return;
}

$manifestPath = kirby()->root('assets') . '/build/manifest.json';
if (!is_file($manifestPath)) return;

$manifest = json_decode(file_get_contents($manifestPath), true);
$key = ltrim($entry, '/');
$item = $manifest[$key] ?? null;
if (!$item) return;

foreach (($item['css'] ?? []) as $cssFile) {
  echo css('assets/build/' . $cssFile);
}

echo Html::tag('script', '', [
  'type' => 'module',
  'src' => url('assets/build/' . $item['file']),
]);
