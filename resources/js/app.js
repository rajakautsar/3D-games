const bgCanvas = document.getElementById('story-canvas');
const bCtx = bgCanvas.getContext('2d');
let W, H, stars = [], nebulae = [];
let mouseX = 0, mouseY = 0;

function resizeBg(){
  W = bgCanvas.width = window.innerWidth;
  H = bgCanvas.height = window.innerHeight;
}
resizeBg();
window.addEventListener('resize', resizeBg);

for(let i=0;i<280;i++){
  stars.push({
    x: Math.random()*2000-500,
    y: Math.random()*4000,
    z: Math.random(),
    r: Math.random()*1.5+0.2,
    brightness: Math.random()*0.7+0.3,
    twinkleSpeed: Math.random()*0.02+0.005,
    twinklePhase: Math.random()*Math.PI*2
  });
}
for(let i=0;i<8;i++){
  nebulae.push({
    x: Math.random()*W,
    y: Math.random()*H*4,
    rx: Math.random()*300+150,
    ry: Math.random()*200+100,
    hue: Math.random()<0.33 ? 30 : Math.random()<0.5 ? 240 : 200,
    opacity: Math.random()*0.06+0.02,
    speed: Math.random()*0.0003+0.0001
  });
}

function drawBg(t){
  bCtx.clearRect(0,0,W,H);
  const grad = bCtx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0,'#03040A');
  grad.addColorStop(1,'#060810');
  bCtx.fillStyle = grad;
  bCtx.fillRect(0,0,W,H);

  const camY = window.scrollY*0.05;
  nebulae.forEach(n=>{
    const ny = (n.y - camY*n.speed*1000) % (H*4);
    if(ny>H+300||ny<-300) return;
    const g = bCtx.createRadialGradient(n.x,ny,0,n.x,ny,Math.max(n.rx,n.ry));
    g.addColorStop(0,`hsla(${n.hue},60%,40%,${n.opacity})`);
    g.addColorStop(1,'transparent');
    bCtx.save();
    bCtx.scale(n.rx/Math.max(n.rx,n.ry), n.ry/Math.max(n.rx,n.ry));
    bCtx.fillStyle = g;
    bCtx.beginPath();
    bCtx.arc(n.x/(n.rx/Math.max(n.rx,n.ry)), ny/(n.ry/Math.max(n.rx,n.ry)), Math.max(n.rx,n.ry), 0, Math.PI*2);
    bCtx.fill();
    bCtx.restore();
  });

  stars.forEach(s=>{
    const pFactor = 0.02 + s.z*0.12;
    const sx = (s.x + mouseX*s.z*0.03 + W*0.5) % W;
    const sy = (s.y - window.scrollY*pFactor);
    if(sy<-5||sy>H+5) return;
    const twinkle = Math.sin(t*s.twinkleSpeed*60+s.twinklePhase)*0.3+0.7;
    const alpha = s.brightness*twinkle;
    const r = s.r*(0.5+s.z*0.8);
    if(r>1){
      const sg = bCtx.createRadialGradient(sx,sy,0,sx,sy,r*4);
      sg.addColorStop(0,`rgba(200,180,140,${alpha*0.4})`);
      sg.addColorStop(1,'transparent');
      bCtx.fillStyle = sg;
      bCtx.beginPath();
      bCtx.arc(sx,sy,r*4,0,Math.PI*2);
      bCtx.fill();
    }
    bCtx.beginPath();
    bCtx.arc(sx,sy,r,0,Math.PI*2);
    bCtx.fillStyle = `rgba(${200+s.z*55},${180+s.z*30},${140+s.z*20},${alpha})`;
    bCtx.fill();
  });

  if(Math.sin(t*0.008)*Math.sin(t*0.005)>0.998){
    const sx = Math.random()*W;
    const sy = Math.random()*H*0.5;
    const len = 80+Math.random()*120;
    const sg = bCtx.createLinearGradient(sx,sy,sx+len,sy+len*0.4);
    sg.addColorStop(0,'transparent');
    sg.addColorStop(0.5,'rgba(200,160,80,0.8)');
    sg.addColorStop(1,'transparent');
    bCtx.strokeStyle = sg;
    bCtx.lineWidth = 1.5;
    bCtx.beginPath();
    bCtx.moveTo(sx,sy);
    bCtx.lineTo(sx+len,sy+len*0.4);
    bCtx.stroke();
  }
}

function bgLoop(t){
  drawBg(t);
  requestAnimationFrame(bgLoop);
}
requestAnimationFrame(bgLoop);

window.addEventListener('mousemove', e=>{
  mouseX = e.clientX - W/2;
  mouseY = e.clientY - H/2;
});

const heroParticles = {
  'dk': {canvas:'particles-dk', hue:25, count:45, color:'rgba(255,120,40,'},
  'invoker': {canvas:'particles-invoker', hue:220, count:40, color:'rgba(100,140,255,'},
  'pa': {canvas:'particles-pa', hue:170, count:35, color:'rgba(40,200,180,'}
};
const pSystems = {};
Object.entries(heroParticles).forEach(([id,cfg])=>{
  const c=document.getElementById(cfg.canvas);
  if(!c) return;
  const ctx=c.getContext('2d');
  const pts=[];
  for(let i=0;i<cfg.count;i++){
    const angle=Math.random()*Math.PI*2;
    const dist=150+Math.random()*120;
    pts.push({
      angle, dist,
      r:Math.random()*2+0.5,
      speed:Math.random()*0.008+0.003,
      phase:Math.random()*Math.PI*2,
      orbitSpeed:(Math.random()*0.004+0.001)*(Math.random()<0.5?1:-1),
      alpha:Math.random()*0.6+0.2
    });
  }
  pSystems[id] = {ctx, pts, cfg, size:580};
});

function drawParticles(t){
  Object.values(pSystems).forEach(sys=>{
    const {ctx, pts, cfg, size} = sys;
    const cx = size/2, cy = size/2;
    ctx.clearRect(0,0,size,size);
    pts.forEach(p=>{
      p.angle += p.orbitSpeed;
      p.dist += p.speed*0.4;
      if(p.dist>260){p.dist=120;p.alpha=0;}
      if(p.alpha<0.8) p.alpha += 0.01;
      const pulse = Math.sin(t*0.002+p.phase)*0.3+0.7;
      const x = cx + Math.cos(p.angle)*p.dist;
      const y = cy + Math.sin(p.angle)*p.dist;
      const g = ctx.createRadialGradient(x,y,0,x,y,p.r*5);
      g.addColorStop(0,cfg.color+p.alpha*pulse*0.8+')');
      g.addColorStop(1,'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x,y,p.r*5,0,Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x,y,p.r,0,Math.PI*2);
      ctx.fillStyle = cfg.color+p.alpha*pulse+')';
      ctx.fill();
    });
  });
  requestAnimationFrame(drawParticles);
}
requestAnimationFrame(drawParticles);

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.2});
document.querySelectorAll('.hero-panel,.role-card').forEach(el=>observer.observe(el));

const ctaObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      animateCounter('counter-players',11.6,1,1800);
      animateCounter('counter-heroes',124,0,1800);
      animateCounter('counter-matches',1.2,1,2000);
      ctaObserver.disconnect();
    }
  });
},{threshold:0.3});
ctaObserver.observe(document.getElementById('scene-cta'));

function animateCounter(id,target,decimals,dur){
  const el=document.getElementById(id);
  const start=performance.now();
  function update(now){
    const p=Math.min((now-start)/dur,1);
    const ease=1-Math.pow(1-p,3);
    el.textContent=(target*ease).toFixed(decimals)+'';
    if(p<1) requestAnimationFrame(update);
    else el.textContent = target + '';
  }
  requestAnimationFrame(update);
}

const loreTemplates = [
  'From the forgotten depths of the Ancients, %HERO% rises with %CONTEXT%, a living ember of ancient war.',
  'In the shadow of a shattered god, %HERO% carries %CONTEXT% toward impossible glory.',
  'The battlefield trembles as %HERO% unleashes %CONTEXT%, leaving a trail of legend in their wake.',
  'Born from endless conflict, %HERO% walks between realms with %CONTEXT%, a myth made flesh.'
];

function generateLore(heroName, heroContext){
  const panel=document.getElementById('ai-panel');
  const loreEl=document.getElementById('ai-lore');
  const loadEl=document.getElementById('ai-loading');
  panel.classList.add('show');
  loreEl.textContent='';
  loadEl.style.display='flex';

  setTimeout(()=>{
    loadEl.style.display='none';
    const template = loreTemplates[Math.floor(Math.random()*loreTemplates.length)];
    const text = template.replace('%HERO%', heroName).replace('%CONTEXT%', heroContext);
    loreEl.textContent = text;
  }, 900);
}

document.querySelectorAll('.hero-orb-outer').forEach(orb=>{
  orb.addEventListener('mousemove', e=>{
    const rect=orb.getBoundingClientRect();
    const cx=rect.left+rect.width/2;
    const cy=rect.top+rect.height/2;
    const dx=(e.clientX-cx)/rect.width;
    const dy=(e.clientY-cy)/rect.height;
    orb.style.transform = `scale(1.04) rotateX(${-dy*18}deg) rotateY(${dx*18}deg)`;
    const shine = orb.querySelector('.orb-shine');
    if(shine){ shine.style.left = (14-dx*18)+'%'; shine.style.top = (8-dy*14)+'%'; }
    const img = orb.querySelector('.orb-img');
    if(img){ img.style.transform = `scale(1.07) translateX(${dx*8}px) translateY(${dy*8}px)`; }
  });
  orb.addEventListener('mouseleave', ()=>{
    orb.style.transform='scale(1) rotateX(0) rotateY(0)';
    const shine = orb.querySelector('.orb-shine');
    if(shine){ shine.style.left='14%'; shine.style.top='8%'; }
    const img = orb.querySelector('.orb-img');
    if(img){ img.style.transform='scale(1) translateX(0) translateY(0)'; }
  });
  orb.style.transformStyle = 'preserve-3d';
  orb.style.perspective = '800px';
});

window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  const nav = document.querySelector('nav');
  if(y>50){
    nav.style.background='rgba(3,4,10,0.95)';
    nav.style.borderBottomColor='rgba(200,150,12,0.25)';
  } else {
    nav.style.background='linear-gradient(to bottom,rgba(3,4,10,0.9),transparent)';
    nav.style.borderBottomColor='rgba(200,150,12,0.15)';
  }
});
