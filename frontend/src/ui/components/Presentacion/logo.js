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

const LOGO_W = 500, LOGO_H = 409;
const LOGO_TRIS = [
  { d:'M499 278.5V253L349 354L499 278.5Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:3 },
  { d:'M348.5 354.5V329.5L498.5 254.5L348.5 354.5Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:4 },
  { d:'M348.5 355V333L295.5 328.5L348.5 355Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:5 },
  { d:'M301.5 330.27L353.5 334L313.67 311L301.5 330.27Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:6 },
  { d:'M303.253 332.5L314.5 308.5L270 316.955L303.253 332.5Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:7 },
  { d:'M286.5 300.5L311.5 314L270 316.5L286.5 300.5Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:8 },
  { d:'M292 327V296.469L219.5 293L292 327Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:9 },
  { d:'M261.5 286L286.5 299.5L245 302L261.5 286Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:10 },
  { d:'M3 180.5V115L149.5 245.5L3 180.5Z', bg:'linear-gradient(145deg, #e0e6ed 0%, #c8d4df 50%, #a8bac9 100%)', z:11 },
  { d:'M150.5 245.5V171.949L30.5 140.5L150.5 245.5Z', bg:'linear-gradient(145deg, #e0e6ed 0%, #c8d4df 50%, #a8bac9 100%)', z:12 },
  { d:'M289.058 80.9846L151.058 150.477V9.47748L289.058 80.9846Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:13 },
  { d:'M490 209.5L349 280.5V139L490 209.5Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:14 },
  { d:'M151.058 150.477V8.47748L14.0583 79.2248L151.058 150.477Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:15 },
  { d:'M150.5 243V187.241L270.5 144L150.5 243Z', bg:'linear-gradient(145deg, #e0e6ed 0%, #c8d4df 50%, #a8bac9 100%)', z:16 },
  { d:'M300.5 162L180.682 213.356L300.5 118.5V162Z', bg:'linear-gradient(145deg, #e0e6ed 0%, #c8d4df 50%, #a8bac9 100%)', z:17 },
  { d:'M192 329V277L265 291L192 329Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:18 },
  { d:'M192 325V253L288 272.385L192 325Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:19 },
  { d:'M253 297V245L326 259L253 297Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:20 },
  { d:'M277 233.5L197.5 275.5L194 210L277 233.5Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:21 },
  { d:'M349.5 281L349 139L198.5 204.5L349.5 281Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:22 },
  { d:'M192.113 295.956V277.065L211.889 286.061L192.113 295.956Z', bg:'linear-gradient(135deg, #a0d870 0%, #68c882 50%, #2e8040 100%)', z:23 },
  { d:'M150.677 151.127L290.053 80.9606L150.677 9.89519L125.25 22.489L115.833 17.9912L150.677 0L302.295 78.2619V127.738L150.677 202.401V151.127Z', bg:'linear-gradient(145deg, #162d6e 0%, #0b1d4c 55%, #050e28 100%)', z:24 },
  { d:'M150.677 202.401V151.127L13.1842 80.0611L124.308 22.489L116.774 17.9912L0.941711 75.5632V127.738L150.677 202.401Z', bg:'linear-gradient(145deg, #162d6e 0%, #0b1d4c 55%, #050e28 100%)', z:25 },
  { d:'M148.793 280.663L150.677 226.689L301.353 148.428L300.412 204.2L148.793 280.663Z', bg:'linear-gradient(145deg, #162d6e 0%, #0b1d4c 55%, #050e28 100%)', z:26 },
  { d:'M149.735 280.663L150.677 227.589L0 148.428V202.401L149.735 280.663Z', bg:'linear-gradient(145deg, #162d6e 0%, #0b1d4c 55%, #050e28 100%)', z:27 },
  { d:'M193.055 306.75V295.956L333.372 223.091V134.934L393.643 104.349C394.458 108.794 395.312 110.924 398.351 113.345L342.789 142.131V228.488L193.055 306.75Z', bg:'linear-gradient(145deg, #162d6e 0%, #0b1d4c 55%, #050e28 100%)', z:28 },
  { d:'M417.186 122.341C430.709 122.341 441.671 112.272 441.671 99.8514C441.671 87.4311 430.709 77.3624 417.186 77.3624C403.663 77.3624 392.701 87.4311 392.701 99.8514C392.701 112.272 403.663 122.341 417.186 122.341Z', bg:'linear-gradient(135deg, #a0d870 0%, #68c882 50%, #2e8040 100%)', z:29 },
  { d:'M417.186 111.546C424.467 111.546 430.37 106.31 430.37 99.8514C430.37 93.3928 424.467 88.1571 417.186 88.1571C409.905 88.1571 404.002 93.3928 404.002 99.8514C404.002 106.31 409.905 111.546 417.186 111.546Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:30 },
  { d:'M417.186 122.341C430.709 122.341 441.671 112.272 441.671 99.8514C441.671 87.4311 430.709 77.3624 417.186 77.3624C403.663 77.3624 392.701 87.4311 392.701 99.8514C392.701 112.272 403.663 122.341 417.186 122.341Z', bg:'linear-gradient(135deg, #a0d870 0%, #68c882 50%, #2e8040 100%)', z:31 },
  { d:'M417.186 111.546C424.467 111.546 430.37 106.31 430.37 99.8514C430.37 93.3928 424.467 88.1571 417.186 88.1571C409.905 88.1571 404.002 93.3928 404.002 99.8514C404.002 106.31 409.905 111.546 417.186 111.546Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:32 },
  { d:'M63.0959 304.052C76.6185 304.052 87.5808 293.983 87.5808 281.563C87.5808 269.142 76.6185 259.074 63.0959 259.074C49.5732 259.074 38.6109 269.142 38.6109 281.563C38.6109 293.983 49.5732 304.052 63.0959 304.052Z', bg:'linear-gradient(145deg, #162d6e 0%, #0b1d4c 55%, #050e28 100%)', z:33 },
  { d:'M63.0959 293.257C70.3773 293.257 76.2801 288.021 76.2801 281.563C76.2801 275.104 70.3773 269.868 63.0959 269.868C55.8145 269.868 49.9117 275.104 49.9117 281.563C49.9117 288.021 55.8145 293.257 63.0959 293.257Z', bg:'linear-gradient(150deg, #ffffff 0%, #eef4ff 45%, #d0e4ff 100%)', z:34 },
  { d:'M198 304.5C198 302.5 199.256 296.199 198 293.5L150.677 318.445L83.8139 286.96L80.047 295.056L150.677 329.24C165.43 321.744 199 303.5 198 304.5Z', bg:'linear-gradient(145deg, #162d6e 0%, #0b1d4c 55%, #050e28 100%)', z:35 },
  { d:'M232.607 274.366L216.598 264.471L271.218 235.685L289.111 245.58L232.607 274.366Z', bg:'linear-gradient(135deg, #a0d870 0%, #68c882 50%, #2e8040 100%)', z:36 },
  { d:'M348.44 332.838V280.663L324.897 268.969L360.682 248.279V236.585L264.626 289.659L348.44 332.838Z', bg:'linear-gradient(135deg, #a0d870 0%, #68c882 50%, #2e8040 100%)', z:37 },
  { d:'M348.44 333.737V280.663L485.932 207.799L366.333 147.528L378.575 142.131L499.117 203.301V255.475L348.44 333.737Z', bg:'linear-gradient(135deg, #a0d870 0%, #68c882 50%, #2e8040 100%)', z:38 },
  { d:'M333.372 146.629V135.834L316.421 143.93V153.825L333.372 146.629Z', bg:'linear-gradient(135deg, #a0d870 0%, #68c882 50%, #2e8040 100%)', z:39 },
  { d:'M347.498 408.401V353.528L499.117 277.964V330.139L347.498 408.401Z', bg:'linear-gradient(135deg, #a0d870 0%, #68c882 50%, #2e8040 100%)', z:40 },
  { d:'M347.498 408.401V353.528L242.024 303.152L192.113 329.24L347.498 408.401Z', bg:'linear-gradient(135deg, #a0d870 0%, #68c882 50%, #2e8040 100%)', z:41 },
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
    font-size:clamp(1.5rem, 8vw, 6.5rem);
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



function assembleLogo() {
  return new Promise(resolve => {
    const wrap = document.getElementById('logo-wrap');
    const cont = document.getElementById('logo-pieces');
    if (!wrap || !cont) { resolve(); return; }
    wrap.style.opacity = '1';
    
    // Escalar el contenedor base del logo para móviles.
    // Base 500x409. Para mantener visualmente la proporción antigua, multiplicamos por 0.6
    gsap.set(cont, { scale: 0.6 * globalScale });

    let done = 0;
    LOGO_TRIS.forEach((tri, i) => {
      const el = document.createElement('div');
      el.style.cssText = `
        position:absolute; top:0; left:0;
        width:${LOGO_W}px; height:${LOGO_H}px;
        background: ${tri.bg};
        z-index:${tri.z};
        will-change:clip-path,transform,opacity;
        filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
        clip-path: path('${tri.d}');
        opacity: 0;
      `;
      cont.appendChild(el);

      const dirs = [[-720,-440],[720,-440],[-720,440],[720,440],[0,-600],[0,600],[-820,0],[820,0]];
      const [ex,ey] = dirs[Math.floor(Math.random()*dirs.length)];
      const sx = ex + (Math.random()-0.5)*90;
      const sy = ey + (Math.random()-0.5)*90;

      gsap.set(el, { x: sx, y: sy });

      gsap.to(el, {
        x: 0,
        y: 0,
        opacity: 1,
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
  path.setAttribute('d','M 150 150 L 290 80 L 393 104 L 417 122');
  path.setAttribute('fill','none'); path.setAttribute('stroke','#00ffff');
  path.setAttribute('stroke-width','2'); path.setAttribute('stroke-linecap','round');
  path.setAttribute('stroke-linejoin','round');
  path.setAttribute('opacity','0.75');
  [[150,150],[290,80],[393,104],[417,122]].forEach(([px,py]) => {
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
    gsap.to(logoPieces, { scale: 1.2 * globalScale, duration: 0.6, delay: 5.5, ease: 'power2.out', transformOrigin: 'center center' });
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

  setTimeout(() => window.dispatchEvent(new CustomEvent('trigger-planet-explosion')), 8500);

  gsap.to(allFadeEls, { opacity: 0, duration: 1.5, delay: 8.5, ease: 'power2.inOut' });
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
