import '../css/app.css';

import { setupBoot } from './modules/boot.js';
import { setupReveal } from './modules/reveal.js';
import { setupHeroVideoCarousel } from './modules/hero-video.js';
import { setupProductsHover } from './modules/products.js';
import { setupProcessRoadmap } from './modules/roadmap.js';

const safe = (fn, name) => {
  try {
    fn();
  } catch (err) {
    console.error(`[aqoras] ${name} failed`, err);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  safe(setupBoot, 'boot');
  safe(setupReveal, 'reveal');
  safe(setupHeroVideoCarousel, 'hero-video');
  safe(setupProductsHover, 'products');
  safe(setupProcessRoadmap, 'roadmap');
});
