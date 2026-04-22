import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResponsive } from '../../../application/useResponsive';

const NAV_ITEMS = [
  { path: '/',           label: 'Nuevo Pedido', icon: '🍽️' },
  { path: '/historial',  label: 'Historial',    icon: '📋' },
  { path: '/menu',       label: 'Gestión Menú', icon: '⚙️' },
];

export const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { esMobile } = useResponsive();

  const handleNav = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(30, 15, 5, 0.5)',
            zIndex: 998,
          }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        height: '100vh', width: '280px',
        background: '#2C1A0E',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        zIndex: 999,
        display: 'flex', flexDirection: 'column',
        boxShadow: open ? '4px 0 24px rgba(0,0,0,0.4)' : 'none',
      }}>
        {/* Logo en drawer */}
        <div style={{
          padding: '2rem 1.5rem 1.5rem',
          borderBottom: '1px solid #4A2E1A',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <img
            src="/logo.png"
            alt="Como en Casa"
            style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <p style={{
              margin: 0, color: '#D4A96A',
              fontFamily: "'Playfair Display', serif",
              fontSize: '16px', fontWeight: 700,
            }}>Como en Casa</p>
            <p style={{ margin: 0, color: '#8A6A4A', fontSize: '11px' }}>Sistema POS</p>
          </div>
        </div>

        {/* Navegación */}
        <nav style={{ padding: '1rem 0', flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  width: '100%', padding: '14px 1.5rem',
                  background: active ? '#4A2E1A' : 'transparent',
                  border: 'none',
                  borderLeft: active ? '3px solid #D4A96A' : '3px solid transparent',
                  color: active ? '#F5E6C8' : '#A08060',
                  fontSize: '15px',
                  fontFamily: "'Playfair Display', serif",
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer del drawer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid #4A2E1A',
          color: '#5A3E28', fontSize: '11px',
          fontFamily: 'monospace',
        }}>
          v1.0.0 · Dual Code Solutions
        </div>
      </div>

      {/* Topbar */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '60px',
        background: '#2C1A0E',
        display: 'flex', alignItems: 'center',
        padding: '0 1rem',
        zIndex: 997,
        borderBottom: '1px solid #4A2E1A',
      }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: 'none', border: 'none',
            cursor: 'pointer', padding: '8px',
            display: 'flex', flexDirection: 'column',
            gap: '5px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '2px',
              background: '#D4A96A',
              borderRadius: '2px',
              transition: 'all 0.3s',
              transform: open
                ? i === 0 ? 'translateY(7px) rotate(45deg)'
                : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>

        <span style={{
          marginLeft: '1rem',
          color: '#D4A96A',
          fontFamily: "'Playfair Display', serif",
          fontSize: esMobile ? '15px' : '17px', fontWeight: 700,
        }}>
          Como en Casa
        </span>
      </header>

      {/* Espaciado para el topbar */}
      <div style={{ height: '60px' }} />
    </>
  );
};
