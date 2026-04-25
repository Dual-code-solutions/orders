/* ═══════════════════════════════════════
   DUAL CODE SOLUTIONS — Secuencia del Logo
   js/logo.js
═══════════════════════════════════════ */

import gsap from 'gsap';
import { playThud, playChime, playWhoosh, playImpact } from './sound.js';

/* ─── Utilidades ──────────────────────────────────────────── */
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const vw    = () => window.innerWidth;
const vh    = () => window.innerHeight;
const cx    = () => vw() / 2;
const cy    = () => vh() / 2;

/* ─── Configuración de los 18 triángulos orbitales ─────────────── */
const SHAPES = [
  'polygon(50% 0%, 0% 100%, 100% 100%)',
  'polygon(0% 0%, 100% 0%, 50% 100%)',
  'polygon(0% 0%, 0% 100%, 100% 100%)',
  'polygon(100% 0%, 0% 100%, 100% 100%)',
  'polygon(0% 0%, 100% 0%, 0% 100%)',
  'polygon(0% 0%, 100% 0%, 100% 100%)',
  'polygon(20% 0%, 0% 100%, 100% 80%)',
  'polygon(80% 0%, 100% 100%, 0% 80%)',
  'polygon(50% 0%, 20% 100%, 80% 100%)',
  'polygon(0% 50%, 100% 0%, 100% 100%)'
];

const BLUES = [
  '#020b1f', '#041538', '#062057', '#082b75', '#0a3694',
  '#0d42b3', '#104ed1', '#145cf0', '#296df2', '#3d7ff5',
  '#5291f7', '#66a2fa', '#7ab4fc', '#8fc6ff', '#a3d8ff'
];

const DRIFT_TRIS = [
  // ── CAPA 1
  { sz:280, clip:SHAPES[0], c:BLUES[7],  rx:0.42, ry:0.28, tilt:0.0,  a0:0.0,  spd:0.55, op:0.90 },
  { sz:220, clip:SHAPES[2], c:BLUES[5],  rx:0.38, ry:0.22, tilt:0.9,  a0:2.1,  spd:0.70, op:0.85 },
  { sz:300, clip:SHAPES[6], c:BLUES[4],  rx:0.48, ry:0.18, tilt:-0.6, a0:3.8,  spd:0.45, op:0.95 },
  { sz:190, clip:SHAPES[8], c:BLUES[9],  rx:0.35, ry:0.30, tilt:1.4,  a0:5.0,  spd:0.80, op:0.80 },
  // ── CAPA 2
  { sz:155, clip:SHAPES[3], c:BLUES[6],  rx:0.30, ry:0.20, tilt:0.4,  a0:1.0,  spd:0.50, op:0.60 },
  { sz:120, clip:SHAPES[1], c:BLUES[8],  rx:0.44, ry:0.14, tilt:-1.1, a0:2.7,  spd:0.65, op:0.55 },
  { sz:165, clip:SHAPES[4], c:BLUES[3],  rx:0.26, ry:0.32, tilt:0.7,  a0:4.2,  spd:0.40, op:0.70 },
  { sz:105, clip:SHAPES[7], c:BLUES[10], rx:0.50, ry:0.16, tilt:-0.3, a0:0.5,  spd:0.72, op:0.45 },
  { sz:175, clip:SHAPES[9], c:BLUES[11], rx:0.22, ry:0.28, tilt:1.8,  a0:3.3,  spd:0.38, op:0.65 },
  { sz:135, clip:SHAPES[5], c:BLUES[6],  rx:0.40, ry:0.12, tilt:-0.8, a0:5.5,  spd:0.58, op:0.50 },
  { sz:145, clip:SHAPES[0], c:BLUES[7],  rx:0.28, ry:0.24, tilt:0.2,  a0:1.8,  spd:0.62, op:0.60 },
  // ── CAPA 3
  { sz: 65, clip:SHAPES[2], c:BLUES[12], rx:0.46, ry:0.10, tilt:1.2,  a0:0.8,  spd:0.25, op:0.22 },
  { sz: 80, clip:SHAPES[4], c:BLUES[13], rx:0.18, ry:0.34, tilt:-1.5, a0:2.4,  spd:0.30, op:0.28 },
  { sz: 50, clip:SHAPES[6], c:BLUES[14], rx:0.52, ry:0.08, tilt:0.5,  a0:4.0,  spd:0.20, op:0.15 },
  { sz: 92, clip:SHAPES[8], c:BLUES[11], rx:0.14, ry:0.38, tilt:-0.2, a0:5.2,  spd:0.32, op:0.30 },
  { sz: 45, clip:SHAPES[1], c:BLUES[12], rx:0.36, ry:0.20, tilt:1.0,  a0:1.5,  spd:0.22, op:0.12 },
  { sz: 72, clip:SHAPES[3], c:BLUES[10], rx:0.24, ry:0.30, tilt:-0.7, a0:3.0,  spd:0.28, op:0.20 },
  { sz: 58, clip:SHAPES[9], c:BLUES[13], rx:0.44, ry:0.14, tilt:1.6,  a0:0.3,  spd:0.18, op:0.14 }
];

const LOGO_W = 266, LOGO_H = 229;
const LOGO_TRIS = [
  { p:[[1,102.6],[1,57.6],[159.5,72.1],[186.5,72.1],[265.5,113.1],[265.5,172.6],[186.5,211.1],[102,183.1],[103,133.6],[97.5,137.6],[80.5,147.6],[1,102.6]], bg:'linear-gradient(160deg, #ddeeff 0%, #c8d8e8 40%, #a8c0da 100%)', z:2 },
  { p:[[102.5,165.1],[102.5,154.6],[113,159.6],[102.5,165.1]], bg:'linear-gradient(135deg, #68c882 0%, #4ea661 60%, #2e8040 100%)', z:4 },
  { p:[[80.5,84.6],[154.5,45.6],[80.5,6.1],[67,13.1],[62,10.6],[80.5,0.6],[161,44.1],[161,71.6],[80.5,113.1],[80.5,84.6]], bg:'linear-gradient(140deg, #4a78d8 0%, #2d5bbf 45%, #1a3a8a 100%)', z:3 },
  { p:[[80.5,113.1],[80.5,84.6],[7.5,45.1],[66.5,13.1],[62.5,10.6],[1,42.6],[1,71.6],[80.5,113.1]], bg:'linear-gradient(145deg, #162d6e 0%, #0b1d4c 55%, #050e28 100%)', z:3 },
  { p:[[79.5,156.6],[80.5,126.6],[160.5,83.1],[160,114.1],[79.5,156.6]], bg:'linear-gradient(155deg, #3565c8 0%, #1f4da0 50%, #0e3070 100%)', z:3 },
  { p:[[80,156.6],[80.5,127.1],[0.5,83.1],[0.5,113.1],[80,156.6]], bg:'linear-gradient(155deg, #192e72 0%, #0c1e4b 55%, #060f28 100%)', z:3 },
  { p:[[81,84.6],[7.5,45.1],[81,6.6],[154,46.1],[81,84.6]], bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:5 },
  { p:[[103,171.1],[103,165.1],[177.5,124.6],[177.5,75.6],[209.5,58.6],[212,63.6],[182.5,79.6],[182.5,127.6],[103,171.1]], bg:'linear-gradient(145deg, #2a4898 0%, #1e3870 50%, #0c2050 100%)', z:3 },
  { p:[[209,44.1],[234.5,56.1],[222,68.1],[209.5,56.1],[209,44.1]], bg:'linear-gradient(135deg, #a0d870 0%, #85bc6b 50%, #5a9840 100%)', z:5 },
  { p:[[209.5,56.1],[234.5,56.1],[222,68.1],[209.5,56.1]], bg:'linear-gradient(135deg, #70b850 0%, #5a9840 100%)', z:5 },
  { p:[[215.5,56.1],[228.5,56.1],[222,62.1],[215.5,56.1]], bg:'radial-gradient(circle, #ffffff 0%, #e8f8e0 100%)', z:6 },
  { p:[[21.5,157.1],[46.5,157.1],[34,169.1],[21.5,157.1]], bg:'linear-gradient(135deg, #1e3870 0%, #0c1e4b 100%)', z:5 },
  { p:[[21.5,157.1],[46.5,157.1],[34,145.1],[21.5,157.1]], bg:'linear-gradient(135deg, #284080 0%, #162d6e 100%)', z:5 },
  { p:[[27.5,157.1],[40.5,157.1],[34,163.1],[27.5,157.1]], bg:'radial-gradient(circle, #ffffff 0%, #d0e0ff 100%)', z:6 },
  { p:[[104.5,171.1],[102.5,165.6],[80.5,177.6],[45,160.1],[43,164.6],[80.5,183.6],[104.5,171.1]], bg:'linear-gradient(160deg, #091832 0%, #041b44 50%, #020d20 100%)', z:4 },
  { p:[[124,153.1],[115.5,147.6],[144.5,131.6],[154,137.1],[124,153.1]], bg:'linear-gradient(135deg, #68c878 0%, #4ea661 55%, #306840 100%)', z:4 },
  { p:[[185.5,185.6],[185.5,156.6],[173,150.1],[192,138.6],[192,132.1],[141,161.6],[185.5,185.6]], bg:'linear-gradient(145deg, #50b870 0%, #3da260 50%, #1e7040 100%)', z:4 },
  { p:[[185.5,186.1],[185.5,156.6],[258.5,116.1],[195,82.6],[201.5,79.6],[265.5,113.6],[265.5,142.6],[185.5,186.1]], bg:'linear-gradient(135deg, #a8e080 0%, #8aca6d 40%, #60a048 100%)', z:3 },
  { p:[[177.5,82.1],[177.5,76.1],[168.5,80.6],[168.5,86.1],[177.5,82.1]], bg:'linear-gradient(135deg, #80c060 0%, #6aaa50 55%, #408830 100%)', z:4 },
  { p:[[185,227.6],[185,197.1],[265.5,155.1],[265.5,184.1],[185,227.6]], bg:'linear-gradient(150deg, #98d878 0%, #86c76c 45%, #58a048 100%)', z:3 },
  { p:[[185,227.6],[185,197.1],[129,169.1],[102.5,183.6],[185,227.6]], bg:'linear-gradient(145deg, #3ab878 0%, #29975b 55%, #186040 100%)', z:3 },
];

/* ─── Estado del orbit ────────────────────────────────────── */
const orbitSpd  = { v: 0 };
const orbitRad  = { v: 0 };
let   tickerFn  = null;
let   bigEls    = [];
let   wordEl    = null;

let isCancelled = false; // Add cancel flag to stop async flow if unmounted
let globalScale = 1; // Para hacer responsive los triángulos y el logo

/* ─── Crear triángulos grandes ────────────────────────────── */
function createBigTriangles() {
  const container = document.getElementById('presentation-container');
  if (!container) return;
  DRIFT_TRIS.forEach(cfg => {
    const el = document.createElement('div');
    const sz = cfg.sz * globalScale;
    el.style.cssText = `
      position:fixed; left:${cx()-sz/2}px; top:${cy()-sz/2}px;
      width:${sz}px; height:${sz}px;
      background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, ${cfg.c} 40%, rgba(0,0,0,0.8) 100%);
      clip-path:${cfg.clip};
      filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.8));
      z-index:${Math.floor(cfg.sz / 20)}; will-change:transform; opacity:0;
    `;
    container.appendChild(el);
    el._cfg = cfg;
    bigEls.push(el);
  });
}

/* ─── Crear contenedor de palabra ─────────────────────────────── */
function createWordEl() {
  const container = document.getElementById('presentation-container');
  if (!container) return;
  wordEl = document.createElement('div');
  wordEl.style.cssText = `
    position:fixed; top:50%; left:50%;
    transform:translate(-50%,-50%);
    z-index:20;
    font-family:'Cormorant Garamond', serif;
    font-weight:600;
    font-style:italic;
    font-size:clamp(3rem, 7vw, 6.5rem);
    letter-spacing:0.18em;
    text-transform:uppercase;
    color: #d8eaf4;
    text-shadow: 0 0 22px rgba(100,180,255,0.55), 0 0 60px rgba(60,130,255,0.25);
    filter: drop-shadow(0 0 12px rgba(100, 180, 255, 0.3));
    white-space:nowrap; pointer-events:none;
  `;
  container.appendChild(wordEl);
}

function startTicker() {
  if (tickerFn) gsap.ticker.remove(tickerFn);
  bigEls.forEach(el => { el._angle = el._cfg.a0; });

  tickerFn = (time, deltaTime, frame) => {
    // normalizado
    const dt = Math.min(deltaTime, 50) / 16.67; 
    const globalMult = orbitSpd.v;
    const scale      = Math.max(orbitRad.v, 0.001);

    bigEls.forEach(el => {
      const cfg = el._cfg;
      el._angle += cfg.spd * globalMult * dt * 0.018;
      const θ = el._angle;
      
      const effVw = Math.max(vw(), 800);
      const effVh = Math.max(vh(), 800);
      const rx = effVw * cfg.rx * scale;
      const ry = effVh * cfg.ry * scale;

      const tilt = cfg.tilt;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      const ex   = rx * Math.cos(θ);
      const ey   = ry * Math.sin(θ);
      const px   = ex * cosT - ey * sinT;
      const py   = ex * sinT + ey * cosT;
      const dx   = -rx * Math.sin(θ);
      const dy   =  ry * Math.cos(θ);
      const tdx  = dx * cosT - dy * sinT;
      const tdy  = dx * sinT + dy * cosT;
      const rot  = Math.atan2(tdy, tdx) * (180 / Math.PI);
      gsap.set(el, { x: px, y: py, rotation: rot });
    });
  };
  gsap.ticker.add(tickerFn);
}

function stopTicker() {
  if (tickerFn) { gsap.ticker.remove(tickerFn); tickerFn = null; }
}

const tweenSpd = (to, dur, ease) =>
  new Promise(r => gsap.to(orbitSpd, { v:to, duration:dur, ease:ease||'power2.out', onComplete:r }));

const tweenRad = (to, dur, ease) =>
  new Promise(r => gsap.to(orbitRad, { v:to, duration:dur, ease:ease||'power2.inOut', onComplete:r }));

function showWord(text) {
  return new Promise(resolve => {
    if (!wordEl) return resolve();
    wordEl.innerHTML = '';
    const letters = [...text].map(ch => {
      const s = document.createElement('span');
      s.style.display = 'inline-block';
      s.textContent   = ch === ' ' ? '\u00a0' : ch;
      wordEl.appendChild(s);
      return s;
    });
    letters.forEach(s => {
      const dir = Math.random() > 0.5 ? 1 : -1;
      gsap.set(s, {
        x:        dir * (380 + Math.random() * 520),
        y:        (Math.random() - 0.5) * 300,
        opacity:  0,
        rotation: (Math.random() - 0.5) * 55,
      });
    });
    gsap.to(letters, {
      x:0, y:0, opacity:1, rotation:0,
      duration: 0.95,
      stagger:  { amount:0.32, from:'random' },
      ease:     'power4.out',
      onStart:  () => letters.forEach((_, i) => setTimeout(() => playChime(i), i * 45 + 80)),
      onComplete: resolve,
    });
  });
}

function hideWord() {
  return new Promise(resolve => {
    if (!wordEl) return resolve();
    const letters = [...wordEl.querySelectorAll('span')];
    if (!letters.length) { resolve(); return; }
    gsap.to(letters, {
      x:        () => (Math.random()>.5?380:-380) + Math.random()*200,
      y:        () => (Math.random()-.5)*260,
      opacity:  0,
      rotation: () => (Math.random()-.5)*55,
      duration: 0.55,
      stagger:  { amount:0.16, from:'random' },
      ease:     'power2.in',
      onComplete: resolve,
    });
  });
}

function toPolygon(pts) {
  return `polygon(${pts.map(([x,y])=>`${x}px ${y}px`).join(', ')})`;
}

function makeScattered(pts) {
  const dirs = [[-720,-440],[720,-440],[-720,440],[720,440],[0,-600],[0,600],[-820,0],[820,0]];
  const [ex,ey] = dirs[Math.floor(Math.random()*dirs.length)];
  return pts.map(() => [ex+(Math.random()-.5)*90, ey+(Math.random()-.5)*90]);
}

function assembleLogo() {
  return new Promise(resolve => {
    const wrap = document.getElementById('logo-wrap');
    const cont = document.getElementById('logo-pieces');
    if (!wrap || !cont) { resolve(); return; }
    wrap.style.opacity = '1';
    
    // Escalar el contenedor base del logo para móviles
    gsap.set(cont, { scale: 1.1 * globalScale });

    let done = 0;
    LOGO_TRIS.forEach((tri, i) => {
      const el = document.createElement('div');
      el.style.cssText = `
        position:absolute; top:0; left:0;
        width:${LOGO_W}px; height:${LOGO_H}px;
        background: ${tri.bg};
        z-index:${tri.z};
        will-change:clip-path,transform;
        filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
      `;
      el.style.clipPath = toPolygon(makeScattered(tri.p));
      cont.appendChild(el);

      gsap.to(el, {
        clipPath:  toPolygon(tri.p),
        duration:  1.2,
        delay:     0.25 + Math.random() * 0.85,
        ease:      'power4.out',
        onComplete: () => {
          if (++done === LOGO_TRIS.length) {
            playImpact();
            resolve();
          }
        },
      });
    });
  });
}

function addCircuit() {
  const cont = document.getElementById('logo-pieces');
  if (!cont) return;
  const NS  = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${LOGO_W} ${LOGO_H}`);
  svg.style.cssText = `
    position:absolute; top:0; left:0;
    width:${LOGO_W}px; height:${LOGO_H}px;
    overflow:visible; z-index:3;
    opacity:0; transition:opacity 1s; pointer-events:none;
  `;
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d','M 222 56 L 182 80 L 177 100 L 133 130 L 80 157 L 34 157');
  path.setAttribute('fill','none'); path.setAttribute('stroke','#00ffff');
  path.setAttribute('stroke-width','1'); path.setAttribute('stroke-linecap','round');
  path.setAttribute('stroke-linejoin','round');
  path.setAttribute('opacity','0.75');
  [[222,56],[182,80],[133,130],[80,157],[34,157]].forEach(([px,py]) => {
    const c = document.createElementNS(NS,'circle');
    c.setAttribute('cx',px); c.setAttribute('cy',py);
    c.setAttribute('r','2.5'); c.setAttribute('fill','#001a1a');
    c.setAttribute('stroke','#00ffff'); c.setAttribute('stroke-width','1');
    svg.appendChild(c);
  });
  svg.appendChild(path);
  cont.appendChild(svg);
  requestAnimationFrame(() => requestAnimationFrame(() => svg.style.opacity = '1'));
}

function animateBrand() {
  const w1 = document.getElementById('w1');
  const w2 = document.getElementById('w2');
  if (!w1 || !w2) return;

  function splitEl(el) {
    const chars = [];
    function proc(node) {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        for (const ch of node.textContent) {
          const s = document.createElement('span');
          s.style.display = 'inline-block';
          s.textContent   = ch === ' ' ? '\u00a0' : ch;
          if (ch !== ' ') {
            const dir = Math.random() > 0.5 ? 1 : -1;
            s._sx = dir * (280 + Math.random() * 520);
            s._sy = (Math.random() - 0.5) * 150;
            s._sr = (Math.random() - 0.5) * 90;
            chars.push(s);
          }
          frag.appendChild(s);
        }
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        [...node.childNodes].forEach(proc);
      }
    }
    [...el.childNodes].forEach(proc);
    return chars;
  }

  const c1  = splitEl(w1);
  const c2  = splitEl(w2);
  const all = [...c1, ...c2];
  const brand = document.getElementById('brand');
  if (brand) brand.style.opacity = '1';

  gsap.set(all, {
    x:        i => all[i]._sx,
    y:        i => all[i]._sy,
    rotation: i => all[i]._sr,
    opacity:  0,
  });
  
  const taglineEl = document.getElementById('tagline');
  if (taglineEl && !taglineEl.querySelector('.tchar')) {
    const text = taglineEl.textContent;
    taglineEl.innerHTML = '';
    for (const ch of text) {
      const s = document.createElement('span');
      s.className = 'tchar';
      s.textContent = ch === ' ' ? '\u00a0' : ch;
      taglineEl.appendChild(s);
    }
  }

  const tagChars = document.querySelectorAll('.tchar');
  const tagArray = Array.from(tagChars);
  tagArray.forEach(s => {
    const dir = Math.random() > 0.5 ? 1 : -1;
    s._sx = dir * (280 + Math.random() * 520);
    s._sy = (Math.random() - 0.5) * 150;
    s._sr = (Math.random() - 0.5) * 90;
  });
  
  gsap.set(tagArray, { 
    x: i => tagArray[i]._sx,
    y: i => tagArray[i]._sy,
    rotation: i => tagArray[i]._sr,
    opacity: 0 
  });

  gsap.to(all, {
    x:0, y:0, rotation:0, opacity:1,
    duration: 1.2, delay: 0.3,
    stagger:  { amount:0.4, from:'random' },
    ease:     'power4.out',
    onStart:  () => all.forEach((_,i) => setTimeout(() => playChime(i%8), i*28)),
  });

  gsap.to(all, { 
    x:        () => (Math.random()>.5?400:-400) + Math.random()*250,
    y:        () => (Math.random()-.5)*300,
    opacity:  0,
    rotation: () => (Math.random()-.5)*90,
    duration: 0.8,
    delay: 3.5,
    stagger:  { amount:0.25, from:'center' },
    ease:     'power2.in'
  });

  const logoPieces = document.getElementById('logo-pieces');
  if (logoPieces) {
    const tris = Array.from(logoPieces.querySelectorAll('div'));
    gsap.to(logoPieces, { scale: 2.2 * globalScale, duration: 0.6, delay: 5.5, ease: 'power2.out', transformOrigin: 'center center' });
    const circuitSvg = logoPieces.querySelector('svg');
    if (circuitSvg) gsap.to(circuitSvg, { opacity: 0, duration: 0.4, delay: 5.5 });

    setTimeout(() => window.dispatchEvent(new CustomEvent('trigger-comet', { detail: { duration: 0.5 } })), 5500);

    tris.forEach((el, i) => {
      const angle = (i / tris.length) * Math.PI * 2;
      const dist  = 180 + Math.random() * 140;
      const tl = gsap.timeline({ delay: 6.0 + i * 0.015 });
      tl.to(el, { x: Math.cos(angle)*dist, y: Math.sin(angle)*dist, rotation: (Math.random()-0.5)*540, scale: 0.4+Math.random()*0.5, opacity: 0.9, duration: 0.65, ease: 'power3.out' })
        .to(el, { x: Math.cos(angle)*(dist+100), y: Math.sin(angle)*(dist+100), opacity: 0, duration: 0.7, ease: 'power2.in' });
    });
  }

  const spinnerWrap = document.getElementById('logo-wrap');
  if (spinnerWrap) {
    const spinner = document.createElement('div');
    spinner.id = 'premium-spinner';
    spinner.style.cssText = `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90px; height: 90px; border-radius: 50%; border: 2px solid rgba(100, 180, 255, 0.12); border-top: 2px solid rgba(100, 200, 255, 0.85); border-right: 2px solid rgba(60, 140, 255, 0.5); box-shadow: 0 0 18px rgba(80, 160, 255, 0.35), inset 0 0 12px rgba(40, 100, 255, 0.1); opacity: 0; animation: spinRing 1.1s linear infinite;`;
    const inner = document.createElement('div');
    inner.style.cssText = `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; border-radius: 50%; border: 1px solid rgba(100, 180, 255, 0.08); border-bottom: 1px solid rgba(150, 210, 255, 0.6); animation: spinRingReverse 0.8s linear infinite;`;
    spinner.appendChild(inner);
    const dot = document.createElement('div');
    dot.style.cssText = `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 6px; height: 6px; border-radius: 50%; background: rgba(150, 210, 255, 0.9); box-shadow: 0 0 10px rgba(100, 180, 255, 0.8), 0 0 25px rgba(60, 130, 255, 0.4);`;
    spinner.appendChild(dot);
    spinnerWrap.appendChild(spinner);
    gsap.to(spinner, { opacity: 1, duration: 0.6, delay: 6.0, ease: 'power2.out' });
    gsap.to(spinner, { opacity: 0, duration: 0.8, delay: 7.5, ease: 'power2.in' });
  }

  gsap.to(tagArray, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 1.0, stagger: { amount: 0.6, from: 'random' }, ease: 'power4.out', delay: 4.0 });
  gsap.to(tagArray, { x: () => (Math.random()>.5?400:-400)+Math.random()*250, y: () => (Math.random()-.5)*300, opacity: 0, rotation: () => (Math.random()-.5)*90, duration: 0.8, delay: 6.0, stagger: { amount: 0.25, from: 'center' }, ease: 'power2.in' });

  const bottom = document.getElementById('bottom-line');
  if (bottom) { 
    gsap.set(bottom, { opacity: 1 });
    const monoEl = bottom.querySelector('.mono');
    if (monoEl && !monoEl.querySelector('.mchar')) {
      const text = monoEl.textContent;
      monoEl.innerHTML = '';
      for (const ch of text) {
        const s = document.createElement('span');
        s.className = 'mchar';
        s.style.display = 'inline-block';
        s.textContent = ch === ' ' ? '\u00a0' : ch;
        monoEl.appendChild(s);
      }
    }
    const monoChars = bottom.querySelectorAll('.mchar');
    const monoArray = Array.from(monoChars);
    monoArray.forEach(s => {
      const dir = Math.random() > 0.5 ? 1 : -1;
      s._sx = dir * (280 + Math.random() * 520);
      s._sy = (Math.random() - 0.5) * 150;
      s._sr = (Math.random() - 0.5) * 90;
    });
    gsap.set(monoArray, { x: i => monoArray[i]._sx, y: i => monoArray[i]._sy, rotation: i => monoArray[i]._sr, opacity: 0 });
    gsap.to(monoArray, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 1.0, stagger: { amount: 0.5, from: 'random' }, ease: 'power4.out', delay: 4.5 });
    gsap.to(monoArray, { x: () => (Math.random()>.5?400:-400)+Math.random()*250, y: () => (Math.random()-.5)*300, opacity: 0, rotation: () => (Math.random()-.5)*90, duration: 0.8, delay: 6.0, stagger: { amount: 0.25, from: 'center' }, ease: 'power2.in' });
  }

  const splash = document.getElementById('splash');
  const logoWrapFade = document.getElementById('logo-wrap');
  const allFadeEls = [splash, logoWrapFade, ...bigEls].filter(Boolean);

  setTimeout(() => window.dispatchEvent(new CustomEvent('trigger-planet-explosion')), 7500);

  gsap.to(allFadeEls, { opacity: 0, duration: 1.5, delay: 7.5, ease: 'power2.inOut' });
}

async function act1() {
  if (isCancelled) return;
  bigEls.forEach(el => {
    const cfg = el._cfg;
    const sz = cfg.sz * globalScale;
    el.style.width  = sz + 'px';
    el.style.height = sz + 'px';
    el.style.left   = (cx() - sz/2) + 'px';
    el.style.top    = (cy() - sz/2) + 'px';
  });

  orbitRad.v = 0.001; 
  orbitSpd.v = 4.0;   
  startTicker();

  bigEls.forEach((el, i) => {
    gsap.set(el, { opacity: 0, scale: 0 });
    gsap.to(el, { opacity: el._cfg.op, scale: 1, duration: 1.5, delay: i * 0.03 + 0.2, ease: 'back.out(1.2)' });
  });

  tweenRad(1.1, 2.5, 'expo.out'); 
  await tweenSpd(0.8, 2.5, 'expo.out'); 
  if (isCancelled) return;
  tweenRad(1.0, 1.5, 'power2.inOut');
  await sleep(800);
  if (isCancelled) return;
  await tweenSpd(0, 1.4, 'power2.out');
  if (isCancelled) return;

  [...Array(6)].forEach((_, i) => setTimeout(() => playThud(0.85 - i*0.1), i*75));
  await sleep(400);
  if (isCancelled) return;

  await showWord('Innovación');
  if (isCancelled) return;
  await sleep(2500);
  if (isCancelled) return;
  await hideWord();
  if (isCancelled) return;
  await sleep(300);
}

async function act2() {
  if (isCancelled) return;
  tweenRad(0.65, 0.9, 'power2.inOut');
  await tweenSpd(0.5, 1.0, 'power2.inOut');  
  if (isCancelled) return;
  await sleep(2700);
  if (isCancelled) return;
  await tweenSpd(0, 1.2, 'power2.out');
  if (isCancelled) return;

  [...Array(6)].forEach((_, i) => setTimeout(() => playThud(0.75 - i*0.08), i*80));
  await sleep(400);
  if (isCancelled) return;

  await showWord('Calidad');
  if (isCancelled) return;
  await sleep(2500);
  if (isCancelled) return;
  await hideWord();
  if (isCancelled) return;
  await sleep(300);
}

async function act3() {
  if (isCancelled) return;
  playWhoosh();
  stopTicker();

  bigEls.forEach((el, i) => {
    const a = el._angle ?? el._cfg.a0;
    gsap.to(el, {
      x:Math.cos(a)*1800, y:Math.sin(a)*1800,
      opacity:0, scale:0.35,
      duration:0.8, delay:i*0.02,
      ease:'power3.in',
      onComplete: () => el.remove(),
    });
  });

  await sleep(750);
  if (isCancelled) return;

  await assembleLogo();
  if (isCancelled) return;
  await sleep(500);
  if (isCancelled) return;
  addCircuit();

  animateBrand();
}

export function initLogo() {
  isCancelled = false;
  
  // Calcular escala global basada en el ancho de la pantalla (Responsive)
  if (window.innerWidth <= 480) {
    globalScale = 0.5;
  } else if (window.innerWidth <= 768) {
    globalScale = 0.75;
  } else {
    globalScale = 1;
  }

  createBigTriangles();
  createWordEl();
  
  // Launch acts sequentially
  (async () => {
    await act1();
    await act2();
    await act3();
  })();

  return () => {
    isCancelled = true;
    stopTicker();
    gsap.killTweensOf('*');
  };
}
