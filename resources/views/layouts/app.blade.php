<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DOTA 2 — Immersive</title>
    <!-- CDN: Three.js r128, GSAP + ScrollTrigger, Alpine.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.12.0/cdn.min.js"></script>
    @vite(['resources/css/app.css','resources/js/app.js'])
</head>
<body class="antialiased bg-void text-white">
<canvas id="story-canvas" class="fixed inset-0 z-0 pointer-events-none"></canvas>

<nav>
  <div class="nav-logo">DOTA 2</div>
  <ul class="nav-links">
    <li><a href="#scene-select">Heroes</a></li>
    <li><a href="#scene-roles">Roles</a></li>
    <li><a href="#scene-cta">Play</a></li>
  </ul>
  <button class="nav-cta" onclick="document.querySelector('#scene-select').scrollIntoView({behavior:'smooth'})">Get Started</button>
</nav>

<main class="pt-24">
    @yield('content')
</main>

@stack('scripts')
</body>
</html>
