<?php

/** @var string $assetBase */ ?>
<header class="header fixed top-0 inset-x-0 z-50" data-header>
  <div class="container mx-auto px-4 py-3">
    <div class="navbar bg-base-100/70 backdrop-blur shadow-sm rounded-2xl px-2">
      <div class="navbar-start gap-2">
        <a aria-label="Aqoras" class="btn btn-ghost !rounded-xl px-2" href="#accueil">
          <img alt="Aqoras" src="<?= $assetBase ?>/logo.png" class="h-7 w-auto">
        </a>
      </div>

      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 gap-1">
          <li><a class="!rounded-xl" href="#projet">Vision</a></li>
          <li><a class="!rounded-xl" href="#fonctionnement">Fonctionnement</a></li>
          <li><a class="!rounded-xl" href="#produits">Produits</a></li>
          <li><a class="!rounded-xl" href="#pourqui">La Cible</a></li>
          <li><a class="!rounded-xl" href="#equipe">Équipe</a></li>
        </ul>
      </div>

      <div class="navbar-end gap-2">
        <a aria-label="Nous contacter" class="btn btn-ghost btn-circle" href="#contact">
          <svg aria-hidden="true" height="18" viewBox="0 0 24 24" width="18">
            <path d="M4 6.5h16v11H4z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.8"></path>
            <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
          </svg>
        </a>

        <div class="dropdown dropdown-end lg:hidden">
          <label tabindex="0" class="btn btn-ghost btn-circle" aria-label="Ouvrir le menu">
            <svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path>
            </svg>
          </label>
          <ul tabindex="0" class="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-64">
            <li><a href="#projet">Vision</a></li>
            <li><a href="#fonctionnement">Fonctionnement</a></li>
            <li><a href="#produits">Produits</a></li>
            <li><a href="#pourqui">La Cible</a></li>
            <li><a href="#equipe">Équipe</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</header>