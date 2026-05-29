@extends('layouts.app')

@section('content')

<section id="scene-hero">
  <div class="hero-eyebrow">The Battle For The Ancients</div>
  <h1 class="hero-title">Enter The<br>Ancients</h1>
  <p class="hero-subtitle">Choose Your Champion · Master Your Craft · Claim Victory</p>
  <div class="hero-cta-group">
    <button class="btn-primary" onclick="document.getElementById('scene-select').scrollIntoView({behavior:'smooth'})">Choose Your Hero</button>
    <button class="btn-secondary">Watch Trailer</button>
  </div>
  <div class="scroll-hint">
    <span>Scroll to Begin</span>
    <div class="scroll-line"></div>
  </div>
</section>

<section id="scene-select">
  <div class="section-label">Hero Selection</div>
  <h2 class="section-title">Choose Your Champion</h2>

  <div class="heroes-showcase">
    <div class="hero-panel panel-dk" id="panel-dk">
      <div class="hero-panel-bg"></div>
      <div class="hero-panel-content">
        <div class="hero-orb-wrap">
          <div class="hero-orb-outer orb-dk" onclick="generateLore('Dragon Knight','A stalwart warrior-mage bonded with an ancient dragon, master of fire and iron')">
            <img class="orb-img" src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/dragon_knight.png" alt="Dragon Knight">
            <div class="orb-light orb-rim"></div>
            <div class="orb-light orb-bottom"></div>
            <div class="orb-light orb-tint"></div>
            <div class="orb-shine"></div>
            <div class="orb-ring"></div>
            <div class="orb-ring"></div>
            <div class="orb-ring"></div>
            <canvas class="hero-particles" id="particles-dk" width="580" height="580"></canvas>
          </div>
        </div>
        <div class="hero-info">
          <div class="hero-role-badge">⚔ Carry · Off-Lane</div>
          <h2 class="hero-name">Dragon<br>Knight</h2>
          <div class="hero-title-text">The Wyrm Warrior</div>
          <p class="hero-desc">"A stalwart warrior-mage who commands the ancient power of dragons — breathing fire, shedding scales, becoming the beast itself."</p>
          <div class="stat-bars">
            <div class="stat-row">
              <span class="stat-label">STR</span>
              <div class="stat-bar-track"><div class="stat-bar-fill fill-str" style="--fill:90%"></div></div>
              <span class="stat-val">9</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">AGI</span>
              <div class="stat-bar-track"><div class="stat-bar-fill fill-agi" style="--fill:55%"></div></div>
              <span class="stat-val">5</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">INT</span>
              <div class="stat-bar-track"><div class="stat-bar-fill fill-int" style="--fill:40%"></div></div>
              <span class="stat-val">4</span>
            </div>
          </div>
          <button class="hero-select-btn" onclick="generateLore('Dragon Knight','A stalwart warrior bonded with an ancient dragon, commands fire and transforms into a dragon')">
            Generate Lore with AI <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>

    <div class="hero-panel panel-invoker" id="panel-invoker">
      <div class="hero-panel-bg"></div>
      <div class="hero-panel-content">
        <div class="hero-info">
          <div class="hero-role-badge">✦ Intelligence · Mid</div>
          <h2 class="hero-name">Invoker</h2>
          <div class="hero-title-text">The Arcanist of the Seven Spheres</div>
          <p class="hero-desc">"A master of ancient elements who bends the cosmos to his will — conjuring spells from the infinite combinations of Quas, Wex, and Exort."</p>
          <div class="stat-bars">
            <div class="stat-row">
              <span class="stat-label">STR</span>
              <div class="stat-bar-track"><div class="stat-bar-fill fill-str" style="--fill:35%"></div></div>
              <span class="stat-val">3</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">AGI</span>
              <div class="stat-bar-track"><div class="stat-bar-fill fill-agi" style="--fill:40%"></div></div>
              <span class="stat-val">4</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">INT</span>
              <div class="stat-bar-track"><div class="stat-bar-fill fill-int" style="--fill:100%"></div></div>
              <span class="stat-val">10</span>
            </div>
          </div>
          <button class="hero-select-btn" onclick="generateLore('Invoker','An immortal arcanist who has lived for centuries, mastering all elements of the universe')">
            Generate Lore with AI <span class="btn-arrow">→</span>
          </button>
        </div>
        <div class="hero-orb-wrap">
          <div class="hero-orb-outer orb-invoker" onclick="generateLore('Invoker','Immortal arcanist mastering the elements of the cosmos')">
            <img class="orb-img" src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/invoker.png" alt="Invoker">
            <div class="orb-light orb-rim"></div>
            <div class="orb-light orb-bottom"></div>
            <div class="orb-light orb-tint"></div>
            <div class="orb-shine"></div>
            <div class="orb-ring"></div>
            <div class="orb-ring"></div>
            <div class="orb-ring"></div>
            <canvas class="hero-particles" id="particles-invoker" width="580" height="580"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-panel panel-pa" id="panel-pa">
      <div class="hero-panel-bg"></div>
      <div class="hero-panel-content">
        <div class="hero-orb-wrap">
          <div class="hero-orb-outer orb-pa" onclick="generateLore('Phantom Assassin','A deadly assassin who strikes from the shadows with precision')">
            <img class="orb-img" src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/phantom_assassin.png" alt="Phantom Assassin">
            <div class="orb-light orb-rim"></div>
            <div class="orb-light orb-bottom"></div>
            <div class="orb-light orb-tint"></div>
            <div class="orb-shine"></div>
            <div class="orb-ring"></div>
            <div class="orb-ring"></div>
            <div class="orb-ring"></div>
            <canvas class="hero-particles" id="particles-pa" width="580" height="580"></canvas>
          </div>
        </div>
        <div class="hero-info">
          <div class="hero-role-badge">◈ Carry · Safe Lane</div>
          <h2 class="hero-name">Phantom<br>Assassin</h2>
          <div class="hero-title-text">The Veiled One</div>
          <p class="hero-desc">"A deadly assassin who strikes from the shadows with lethal precision — a blade that severs fate itself, choosing which souls are condemned to die."</p>
          <div class="stat-bars">
            <div class="stat-row">
              <span class="stat-label">STR</span>
              <div class="stat-bar-track"><div class="stat-bar-fill fill-str" style="--fill:45%"></div></div>
              <span class="stat-val">4</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">AGI</span>
              <div class="stat-bar-track"><div class="stat-bar-fill fill-agi" style="--fill:95%"></div></div>
              <span class="stat-val">9</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">INT</span>
              <div class="stat-bar-track"><div class="stat-bar-fill fill-int" style="--fill:30%"></div></div>
              <span class="stat-val">3</span>
            </div>
          </div>
          <button class="hero-select-btn" onclick="generateLore('Phantom Assassin','A veiled blade who strikes from darkness, chosen by fate as death''s own executioner')">
            Generate Lore with AI <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="scene-roles">
  <div class="roles-header">
    <div class="section-label">Master Your Craft</div>
    <h2 class="section-title" style="margin-top:0.5rem;">Three Paths to Power</h2>
  </div>
  <div class="roles-grid">
    <div class="role-card" id="role-str">
      <div class="role-card-glow glow-str"></div>
      <div class="role-attr attr-str">⬡ Strength</div>
      <div class="role-name">Front-Line<br>Warriors</div>
      <p class="role-desc">Tanky juggernauts who dominate with raw physical power and unbreakable will. They are the shield — and the hammer.</p>
      <div class="role-count">38 Heroes</div>
    </div>
    <div class="role-card" id="role-agi" style="transition-delay:0.15s">
      <div class="role-card-glow glow-agi"></div>
      <div class="role-attr attr-agi">⬡ Agility</div>
      <div class="role-name">Blades of<br>Shadow</div>
      <p class="role-desc">Swift, lethal executioners who rely on speed and surgical precision. One moment they're unseen — the next, you're already dead.</p>
      <div class="role-count">42 Heroes</div>
    </div>
    <div class="role-card" id="role-int" style="transition-delay:0.3s">
      <div class="role-card-glow glow-int"></div>
      <div class="role-attr attr-int">⬡ Intelligence</div>
      <div class="role-name">Weavers of<br>the Arcane</div>
      <p class="role-desc">Masters of spells who bend reality with powerful magic. They control the tides of battle before it begins.</p>
      <div class="role-count">44 Heroes</div>
    </div>
  </div>
</section>

<section id="scene-cta">
  <div class="cta-eyebrow">Ready To Battle?</div>
  <h2 class="cta-title">The Ancients<br>Await You</h2>
  <p class="cta-sub">Join millions of players worldwide. Choose your hero. Master your craft. Claim your destiny.</p>
  <button class="cta-main-btn">⚔ Enter The Battlefield ⚔</button>
  <div class="stats-row">
    <div class="stat-item">
      <span class="stat-big" id="counter-players">0</span>
      <span class="stat-small">Million Players</span>
    </div>
    <div class="stat-item">
      <span class="stat-big" id="counter-heroes">0</span>
      <span class="stat-small">Unique Heroes</span>
    </div>
    <div class="stat-item">
      <span class="stat-big" id="counter-matches">0</span>
      <span class="stat-small">Billion Matches</span>
    </div>
  </div>
</section>

<footer>
  © {{ date('Y') }} DOTA 2 Fan Redesign · Redesigned with Claude · All Rights Reserved
</footer>

<div id="ai-panel">
  <div class="ai-header">
    <span class="ai-title">⚡ AI Lore Generator</span>
    <button class="ai-close" onclick="document.getElementById('ai-panel').classList.remove('show')">✕</button>
  </div>
  <div id="ai-lore">Click any hero orb or button to generate unique lore...</div>
  <div class="ai-loading" id="ai-loading" style="display:none">
    <div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div>
    <span style="font-family:'Cinzel',serif;font-size:0.65rem;letter-spacing:0.15em;color:var(--grey);margin-left:4px;">INVOKING THE ORACLE...</span>
  </div>
</div>

@endsection
