# ENTER THE ANCIENTS — Design Specification
## DOTA 2 Hero Selection Page · 3D Scroll Storytelling Redesign

---

## 🎯 Design Vision

**Concept**: *"The Battlefield Awakens"*
Setiap scroll membawa pemain **masuk lebih dalam ke dunia DOTA** — dari angkasa luar, turun ke medan perang, lalu ke jiwa masing-masing hero. Ini bukan sekadar halaman pemilihan hero; ini adalah **cinematic journey** yang membuat pemain merasa sedang memasuki legenda.

**Tone**: Dark fantasy · Cinematic · Epic · Immersive  
**Aesthetic**: Bukan flat, bukan card biasa — tapi **dimensi, cahaya, dan bayangan** yang hidup

---

## 🎨 Design System

### Color Palette
```
--void-black:      #03040A   /* Background utama — bukan hitam biasa, ada hint deep indigo */
--ancient-gold:    #C8960C   /* Accent utama — warna artefak kuno */
--radiant-ember:   #FF4B1F   /* Radiant side — api yang hidup */
--dire-blood:      #8B0000   /* Dire side — darah tua, gelap */
--arcane-ice:      #48C9F0   /* Intelligence hero — kristal sihir */
--steel-grey:      #A8A8B3   /* Text sekunder */
--star-white:      #F0EBE1   /* Text utama — bukan putih murni, ada warmth */
--glow-gold:       rgba(200, 150, 12, 0.15)  /* Ambient glow */
```

### Typography
```
Display Font:   "Cinzel Decorative" (Google Fonts) — untuk judul besar & nama hero
Subheading:     "Cinzel" — untuk label dan section headers
Body Text:      "Crimson Pro" — serif elegan untuk deskripsi hero
UI/Stats:       "Share Tech Mono" — monospace untuk angka stat
```

### 3D & Motion Principles
- **Parallax depth**: Setiap layer bergerak dengan kecepatan berbeda saat scroll
- **Scroll-triggered reveals**: Elemen muncul dengan physics-based animation
- **Particle systems**: Partikel ambient di background yang reaktif
- **3D card transforms**: Hero cards dengan genuine CSS 3D perspective
- **Atmospheric lighting**: Dynamic glow yang berubah per section

---

## 📜 Scroll Story Structure (Section by Section)

---

### SCENE 0 — THE VOID (Hero Section / Landing)
**Scroll position**: 0% — 15%

**Visual**:
- Background: **Star field 3D** dengan parallax depth — bintang jauh bergerak lambat, bintang dekat bergerak cepat
- Di tengah: **DOTA 2 logo** muncul dari kejauhan, scale dari 0.1 ke 1 dengan motion blur
- Partikel emas bertebaran seperti debu kosmik
- Text "ENTER THE ANCIENTS" muncul dengan **glitch effect** lalu settle ke font Cinzel

**Animation Sequence**:
```
1. [0s]   Background stars fade in (opacity 0 → 1, 2s)
2. [0.5s] Logo materializes dari center (scale 0.1 → 1, perspective distortion)
3. [1.5s] Subtitle slides up dengan letter-spacing collapse animation
4. [2.5s] CTA button "START YOUR LEGEND" dengan pulse glow border
5. [3s]   Scroll indicator — animated chevron bounce + "SCROLL TO BEGIN"
```

**3D Effect**:
```css
/* Star parallax dengan CSS 3D */
.star-layer-far    { transform: translateZ(-500px) scale(2.5); }
.star-layer-mid    { transform: translateZ(-200px) scale(1.5); }
.star-layer-near   { transform: translateZ(-50px) scale(1.1); }
/* Mouse movement triggers subtle camera rotation */
```

---

### SCENE 1 — DESCENT (Transition ke Hero Selection)
**Scroll position**: 15% — 25%

**Visual**:
- Kamera "jatuh" ke bawah — bintang berubah jadi **partikel api** yang melesat ke atas
- Ground/terrain DOTA mulai muncul dari bawah dengan fog of war effect
- Audio visual: gelombang energi melingkar (pure CSS/SVG animation)

**Animation**:
```
ScrollTrigger: onEnter → camera dive animation
- Stars stretch menjadi streaks (motion blur via CSS blur + scale Y)
- Ground rises dari opacity 0 dengan clip-path reveal (polygon expanding)
- Terrain texture muncul dengan parallax tilt
```

---

### SCENE 2 — CHOOSE YOUR HERO (Core Section)
**Scroll position**: 25% — 70%

**Layout**: BUKAN lingkaran polos — tapi **3D hero showcase cards**

#### Hero Card Design:
```
┌─────────────────────────────────┐
│  [3D Rotating Hero Model]       │  ← CSS 3D transform on hover
│  Particle aura sesuai role      │
│  ════════════════════════       │
│  DRAGON KNIGHT                  │  ← Cinzel font, gold
│  CARRY · STRENGTH               │  ← Badge dengan texture metal
│  ─────────────────────          │
│  Stat bars dengan glow:         │
│  STR ████████░░ 8/10            │
│  AGI ██████░░░░ 6/10            │
│  INT ████░░░░░░ 4/10            │
│  ─────────────────────          │
│  "A stalwart warrior who        │
│   commands dragons..."          │  ← Crimson Pro, soft grey
│  ─────────────────────          │
│  [SELECT HERO] ──────►          │  ← CTA dengan arrow animation
└─────────────────────────────────┘
```

#### Per-Hero Atmosphere:
Setiap hero punya **environment yang berbeda** saat di-scroll ke:

**Dragon Knight (Strength/Carry)**:
- Background: Volcanic landscape dengan lava glow
- Color shift: Ambient berubah ke warm orange-red
- Particle: Ember dan asap mengambang naik
- 3D element: Dragon wings silhouette di background bergerak lambat
- Card glow: Fire aura pulsing di edges

**Invoker (Intelligence)**:
- Background: Cosmic library — buku-buku melayang di nebula
- Color shift: Deep purple-blue indigo ambience
- Particle: Orbs of lightning berputar (Exort, Wex, Quas inspired)
- 3D element: Magical runes rotating di belakang card
- Card glow: Lightning arcs di corners

**Phantom Assassin (Agility/Carry)**:
- Background: Dark forest dengan shaft of light
- Color shift: Deep teal-crimson dual tone
- Particle: Cherry blossom petals + shadow fragments
- 3D element: Blade silhouettes crossing di background
- Card glow: Sharp cyan slash effect

#### Hero Card 3D Animation:
```javascript
// Mouse parallax tilt per card
card.addEventListener('mousemove', (e) => {
  const { x, y } = getRelativePosition(e, card);
  card.style.transform = `
    perspective(1000px)
    rotateX(${y * 15}deg)
    rotateY(${x * 15}deg)
    translateZ(20px)
  `;
  // Move inner elements dengan depth berbeda
  heroImage.style.transform = `translateZ(60px) translateX(${x * 10}px)`;
  statBars.style.transform = `translateZ(30px)`;
  background.style.transform = `translateZ(-20px) scale(1.1)`;
});
```

#### Scroll Between Heroes:
```
Scroll ke bawah → Current hero card slides ke kiri + fades
                → Next hero card slides dari kanan dengan 3D rotate
                → Background atmosphere crossfades (0.8s ease)
                → Particle system morphs dari satu type ke lain
```

---

### SCENE 3 — THE BATTLEFIELD (Stats Section)
**Scroll position**: 70% — 85%

**Visual**:
- Isometric battlefield view mulai terbentu dari partikel
- Stats muncul sebagai **holographic HUD** overlay
- Live counter animation untuk angka players, matches, etc.
- Grid lines muncul seperti scanning effect

**Layout**:
```
[ISOMETRIC MAP WIREFRAME]     [HOLOGRAPHIC STATS PANEL]
 ─ 3D grid lines animate in    ─ Numbers count up on enter
 ─ Hero icons float di map     ─ Bar charts draw themselves
 ─ Ancient towers glow         ─ Pulsing ring indicators
```

**Animation**:
```css
@keyframes scanLine {
  0%   { transform: translateY(-100%); opacity: 0; }
  50%  { opacity: 0.5; }
  100% { transform: translateY(100%); opacity: 0; }
}
/* Hologram flicker */
@keyframes hologramFlicker {
  0%, 97%, 100% { opacity: 1; }
  98%           { opacity: 0.4; }
}
```

---

### SCENE 4 — MASTER YOUR CRAFT (Roles Section)
**Scroll position**: 85% — 95%

**Layout**: **Triptych cards** dengan 3D flip reveal

Setiap role card (Strength/Agility/Intelligence) ter-reveal dengan:
1. Card starts face-down (rotateY: 180deg)
2. Scroll trigger → flip animation (rotateY: 0deg, 0.8s cubic-bezier)
3. Di dalam card: animated icon + stats + lore snippet

**Card Design per Role**:
```
STRENGTH                    AGILITY                     INTELLIGENCE
━━━━━━━━━━━━━━              ━━━━━━━━━━━━━━              ━━━━━━━━━━━━━━
[Shield icon — 3D]          [Blade icon — 3D]           [Orb icon — 3D]
 Fiery red aura              Teal-silver aura             Purple-blue aura

 "FRONT LINE"                "BLADES OF"                 "WEAVERS OF"
 "WARRIORS"                  "SHADOW"                    "THE ARCANE"

 Tanky fighters who          Swift killers who            Masters of spells
 dominate with raw           rely on speed and            who bend reality
 physical power.             lethal precision.            to their will.
━━━━━━━━━━━━━━              ━━━━━━━━━━━━━━              ━━━━━━━━━━━━━━
 [See Heroes →]              [See Heroes →]              [See Heroes →]
```

---

### SCENE 5 — READY TO BATTLE (CTA Section)
**Scroll position**: 95% — 100%

**Visual**: **Grand finale** — semua partikel dari semua section berkumpul ke center

**Animation Sequence**:
```
1. Partikel dari seluruh halaman stream ke center vortex
2. Ancient portal materializes dari partikel convergence
3. Portal energy pulses dengan ripple waves
4. "READY TO BATTLE?" text materializes dengan typewriter effect
5. CTA button muncul terakhir dengan MAXIMUM DRAMA:
   - Border draws itself clockwise
   - Text fades in
   - Continuous pulse glow
6. Background: Silhouettes dari semua hero yang dipilih visible
```

**CTA Button Design**:
```
┌──────────────────────────────────────────┐
│                                          │  ← Border animates on
│    ⚔  ENTER THE BATTLEFIELD  ⚔          │     hover: sword icons slide
│                                          │     in from both sides
└──────────────────────────────────────────┘
    ↑ Glow pulse, gold gradient,
      hover: całe button lifts + deeper glow
```

---

## 🔧 Technical Architecture

### Dependencies
```html
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600&family=Crimson+Pro:ital,wght@0,400;1,300&family=Share+Tech+Mono&display=swap" rel="stylesheet">

<!-- Animations -->
<!-- GSAP + ScrollTrigger untuk scroll storytelling -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

<!-- Particle system -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/tsparticles/2.11.0/tsparticles.bundle.min.js"></script>
```

### CSS Architecture
```
globals.css
├── variables.css       ← Design tokens (colors, fonts, spacing)
├── animations.css      ← Keyframes & reusable animation classes
├── 3d-effects.css      ← Perspective & transform utilities
├── particles.css       ← Particle layer styles
└── sections/
    ├── hero-landing.css
    ├── hero-selection.css
    ├── battlefield.css
    ├── roles.css
    └── cta.css
```

### Performance Considerations
```javascript
// GPU-accelerated properties only
// ✅ Use: transform, opacity, filter
// ❌ Avoid: width, height, top, left, margin

// Intersection Observer untuk lazy-load animasi
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, { threshold: 0.2 });

// Particle density berdasarkan device performance
const particleCount = window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  ? 0 
  : navigator.hardwareConcurrency > 4 ? 100 : 40;
```

---

## 🌟 AI-Powered Enhancements

### 1. Dynamic Hero Lore Generator
```
User hover/click pada hero → 
AI generate unique lore snippet sesuai hero yang dipilih →
Text materializes dengan typewriter animation
```

### 2. Personalized Hero Recommendation
```
Form input: "Describe your playstyle in one sentence" →
AI analyze → Recommend 3 heroes dengan explanation →
Heroes tersebut glow/highlight di selection grid
```

### 3. Match Tagline Generator
```
Setelah hero dipilih →
AI generate epic battle cry/tagline personal →
"You have chosen the path of the Dragon. Let the battlefield tremble."
Displayed di CTA section dengan dramatic reveal
```

---

## 📱 Responsive Breakpoints

```
Desktop (1440px+):  Full 3D effects, all particles, parallax enabled
Laptop  (1024px):   Reduced particle count, 3D effects maintained
Tablet  (768px):    Simplified parallax, cards stack 2-col
Mobile  (480px):    Linear scroll, no 3D tilt, reduced animations
                    prefers-reduced-motion: all animations disabled
```

---

## ✨ Micro-interaction Details

| Element | Trigger | Animation |
|---|---|---|
| Hero name text | Hover | Letters ripple — gold glow spreads per character |
| Stat bars | Enter viewport | Fill dari kiri ke kanan dengan overshoot bounce |
| Select button | Hover | Border traces clockwise, text shifts ke kanan |
| Role cards | Hover | Card lifts 8px, shadow deepens, aura brightens |
| Navigation dots | Scroll | Active dot expands + fills, others shrink |
| Background particles | Mouse move | Particles gently attracted ke cursor position |
| Section transitions | Scroll trigger | Staggered element reveals dengan 0.1s delay per item |

---

## 🎭 Mood Board Keywords

```
Cinematic dark fantasy
Epic battle preparation  
Ancient mythology meets modern game UI
Depth, weight, gravitas
Each hero feels LEGENDARY
Clean typography floating in dimensional space
Light cutting through darkness
```

---

## 📋 Implementation Priority

```
Phase 1 (Core)
├── ✅ Dark base layout dengan proper typography
├── ✅ 3D hero cards dengan mouse parallax tilt
├── ✅ Atmospheric color backgrounds per hero
└── ✅ Smooth scroll transitions

Phase 2 (Motion)  
├── ✅ GSAP scroll storytelling sequences
├── ✅ Particle systems per hero
├── ✅ Portal/vortex CTA animation
└── ✅ Stat bar animations

Phase 3 (AI Enhancement)
├── ✅ Hero lore generator
├── ✅ Personalized recommendation
└── ✅ Battle cry tagline generator
```

---

*Design Spec by Claude · DOTA 2 Fan Redesign · 2026*
*"The battle for the Ancients begins not on the map — but in the mind of the warrior choosing their champion."*
