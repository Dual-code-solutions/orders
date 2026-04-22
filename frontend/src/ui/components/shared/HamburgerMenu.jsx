import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResponsive } from '../../../application/useResponsive';

const NAV_SECTIONS = [
  {
    title: 'OPERACIONES',
    items: [
      { path: '/', label: 'Nuevo Pedido', icon: '🍽️' },
    ]
  },
  {
    title: 'ADMINISTRACIÓN',
    items: [
      { path: '/historial', label: 'Historial', icon: '📋' },
      { path: '/menu', label: 'Gestión Menú', icon: '⚙️' },
    ]
  }
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
            background: 'rgba(26, 15, 8, 0.6)',
            backdropFilter: 'blur(3px)',
            zIndex: 998,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        height: '100vh', width: '280px',
        background: 'linear-gradient(180deg, #2C1A0E 0%, #1A0F08 100%)',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 999,
        display: 'flex', flexDirection: 'column',
        boxShadow: open ? '8px 0 32px rgba(0,0,0,0.5)' : 'none',
        borderRight: '1px solid #3d2413',
      }}>
        {/* Logo en drawer */}
        <div style={{
          padding: '2rem 1.5rem 1.5rem',
          display: 'flex', alignItems: 'center', gap: '14px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
          borderBottom: '1px solid #3d2413',
        }}>
          <img
            src="/logo.png"
            alt="Como en Casa"
            style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
          />
          <div>
            <p style={{
              margin: 0, color: '#F5E6C8',
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px', fontWeight: 700,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>Como en Casa</p>
            <p style={{ margin: '2px 0 0', color: '#D4A96A', fontSize: '12px', letterSpacing: '0.05em' }}>SISTEMA POS</p>
          </div>
        </div>

        {/* Navegación por secciones */}
        <nav style={{ padding: '1.5rem 1rem', flex: 1, overflowY: 'auto' }}>
          {NAV_SECTIONS.map((section, idx) => (
            <div key={idx} style={{ marginBottom: '1.5rem' }}>
              <p style={{
                margin: '0 0 8px 12px',
                color: '#8A6A4A',
                fontSize: '11px',
                fontWeight: 700,
                fontFamily: "'Lato', sans-serif",
                letterSpacing: '0.1em',
              }}>
                {section.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {section.items.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNav(item.path)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '14px',
                        width: '100%', padding: '12px 14px',
                        background: active ? 'linear-gradient(90deg, #4A2E1A 0%, rgba(74,46,26,0.3) 100%)' : 'transparent',
                        border: '1px solid',
                        borderColor: active ? '#5A3E28' : 'transparent',
                        borderRadius: '10px',
                        color: active ? '#F5E6C8' : '#A08060',
                        fontSize: '15px',
                        fontFamily: "'Playfair Display', serif",
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        boxShadow: active ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
                      }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <span style={{ fontSize: '18px', filter: active ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none' }}>
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer del drawer */}
        <div style={{
          padding: '1.25rem',
          borderTop: '1px solid #3d2413',
          background: 'rgba(0,0,0,0.1)',
          display: 'flex', justifyContent: 'center',
        }}>
          <p style={{
            margin: 0,
            color: '#5A3E28', fontSize: '11px',
            fontFamily: "'Lato', sans-serif",
            letterSpacing: '0.05em',
          }}>
            Como En Casa
          </p>
        </div>
      </div>

      {/* Topbar */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '64px',
        background: 'linear-gradient(90deg, #2C1A0E 0%, #3d2413 100%)',
        display: 'flex', alignItems: 'center',
        padding: '0 1rem',
        zIndex: 997,
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
      }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: 'none', border: 'none',
            cursor: 'pointer', padding: '10px',
            display: 'flex', flexDirection: 'column',
            gap: '5px',
            borderRadius: '8px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: '24px', height: '2px',
              background: '#D4A96A',
              borderRadius: '2px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
          color: '#F5E6C8',
          fontFamily: "'Playfair Display', serif",
          fontSize: esMobile ? '16px' : '18px', fontWeight: 700,
          letterSpacing: '0.02em',
        }}>
          Como en Casa
        </span>
      </header>

      {/* Espaciado para el topbar */}
      <div style={{ height: '64px' }} />
    </>
  );
};
