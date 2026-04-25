/* ═══════════════════════════════════════
   DUAL CODE SOLUTIONS — Cursor
   js/animations.js
═══════════════════════════════════════ */

export function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let cx = 0, cy = 0;
  let rx = 0, ry = 0;

  const onMouseMove = (e) => { cx = e.clientX; cy = e.clientY; };
  document.addEventListener('mousemove', onMouseMove);

  let reqId;

  (function loop() {
    // El núcleo sigue instantáneamente
    dot.style.left = cx + 'px';
    dot.style.top  = cy + 'px';
    
    // Cálculo de velocidad para la cola
    const dx = cx - rx;
    const dy = cy - ry;
    rx += dx * 0.2;
    ry += dy * 0.2;
    
    const dist  = Math.sqrt(dx*dx + dy*dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    // Estirar la cola según la velocidad
    const length  = Math.min(Math.max(dist * 3, 0), 150);
    const opacity = Math.min(dist / 15, 1);
    
    ring.style.width   = length + 'px';
    ring.style.opacity = opacity;
    // Trasladamos al centro del núcleo y rotamos 180° (hacia atrás)
    ring.style.transform = `translate(${cx}px, ${cy - 2}px) rotate(${angle + 180}deg)`;
    
    reqId = requestAnimationFrame(loop);
  })();

  return () => {
    document.removeEventListener('mousemove', onMouseMove);
    cancelAnimationFrame(reqId);
  };
}
