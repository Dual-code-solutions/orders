import React, { useEffect, useRef } from 'react';
import './Presentacion.css';
import { initSpace } from './space.js';
import { initSound } from './sound.js';
import { initCursor } from './animations.js';
import { initLogo } from './logo.js';

export const PresentacionOverlay = ({ onExplosion, fadeOut }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Fonts initialization (these should already be cached by the browser, but we ensure they're ready)
    document.fonts.ready.then(() => {
      initSound();
      const canvas = document.getElementById('space');
      const cleanupSpace = initSpace(canvas);
      const cleanupCursor = initCursor();
      const cleanupLogo = initLogo();

      return () => {
        if (cleanupSpace) cleanupSpace();
        if (cleanupCursor) cleanupCursor();
        if (cleanupLogo) cleanupLogo();
      };
    });
  }, []);

  useEffect(() => {
    const handleExplosion = () => {
      if (onExplosion) onExplosion();
    };
    window.addEventListener('trigger-planet-explosion', handleExplosion);
    return () => {
      window.removeEventListener('trigger-planet-explosion', handleExplosion);
    };
  }, [onExplosion]);

  return (
    <div
      id="presentation-container"
      ref={containerRef}
      style={{
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      <canvas id="space"></canvas>
      <div id="cursor-dot"></div>
      <div id="cursor-ring"></div>
      <main id="splash">
        <div id="logo-wrap">
          <div id="logo-pieces"></div>
        </div>
        <div id="brand">
          <h1 id="brand-name">
            <span className="brand-word" id="w1">DUAL CODE</span>
            <span className="brand-word" id="w2">SOLUTIONS</span>
          </h1>
          <p id="tagline">Bienvenidos al software que transforma</p>
        </div>
        <div id="bottom-line">
          <span className="mono">dualcodesolutions.com</span>
        </div>
      </main>
    </div>
  );
};
