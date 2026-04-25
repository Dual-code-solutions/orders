/* ═══════════════════════════════════════
   DUAL CODE SOLUTIONS — Sonidos
   js/sound.js
   Web Audio API — sin archivos externos.
   Todos los sonidos son sintetizados en tiempo real.
═══════════════════════════════════════ */

let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

/* Desbloquear AudioContext en primera interacción */
export function initSound() {
  const unlock = () => getCtx();
  document.addEventListener('mousemove', unlock, { once: true });
  document.addEventListener('click',     unlock, { once: true });
  document.addEventListener('keydown',   unlock, { once: true });
}

/* ── Impacto grave: triángulo se congela ── */
export function playThud(intensity = 1.0) {
  try {
    const c    = getCtx();
    const osc  = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(85 * intensity, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(16, c.currentTime + 0.35);
    gain.gain.setValueAtTime(0.5 * intensity, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.42);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + 0.42);
  } catch(e) {}
}

/* ── Tono cristalino: letra llega a su lugar ── */
export function playChime(index = 0) {
  try {
    const c    = getCtx();
    const freq = 440 * Math.pow(2, (index % 7) / 12);
    const osc  = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.10, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.55);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + 0.55);
  } catch(e) {}
}

/* ── Whoosh: triángulos se dispersan ── */
export function playWhoosh() {
  try {
    const c      = getCtx();
    const bufLen = Math.floor(c.sampleRate * 0.9);
    const buf    = c.createBuffer(1, bufLen, c.sampleRate);
    const data   = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;

    const src    = c.createBufferSource();
    src.buffer   = buf;

    const filter = c.createBiquadFilter();
    filter.type  = 'bandpass';
    filter.frequency.setValueAtTime(120, c.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3800, c.currentTime + 0.55);
    filter.Q.value = 0.7;

    const gain = c.createGain();
    gain.gain.setValueAtTime(0.38, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.9);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);
    src.start(c.currentTime);
    src.stop(c.currentTime + 0.9);
  } catch(e) {}
}

/* ── Impacto final: logo ensamblado ── */
export function playImpact() {
  try {
    const c = getCtx();
    [50, 100, 200].forEach((freq, i) => {
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = c.currentTime + i * 0.07;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.28, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
      osc.start(t);
      osc.stop(t + 0.9);
    });
  } catch(e) {}
}
