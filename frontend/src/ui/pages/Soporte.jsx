import { useState } from 'react';

const WHATSAPP = '529994969520';

const secciones = [
  {
    icono: '🍽️',
    titulo: 'Módulo 1 — Registro de Pedidos',
    color: '#7C3A1E',
    pasos: [
      {
        titulo: 'Abrir la app',
        desc: 'Entra a la aplicación desde cualquier celular o tablet con Internet. No necesitas instalar nada.',
      },
      {
        titulo: 'Seleccionar productos',
        desc: 'En la pantalla principal verás el menú completo. Toca el botón "+" en el producto que el cliente quiera ordenar. Puedes agregar varios productos al mismo pedido.',
      },
      {
        titulo: 'Agregar notas al producto',
        desc: 'Después de agregar un producto, toca el ícono ✏️ "Nota" para escribir modificaciones como: +queso, sin cebolla, término medio, etc.',
      },
      {
        titulo: 'Revisar el pedido',
        desc: 'Toca la pestaña "Pedido" (arriba a la derecha) para ver el resumen con todos los productos, notas y el total calculado automáticamente.',
      },
      {
        titulo: 'Confirmar el pedido',
        desc: 'Toca "Confirmar Pedido". El pedido se guarda en el sistema al instante y se genera el ticket.',
      },
    ],
  },
  {
    icono: '🎫',
    titulo: 'Módulo 2 — Ticket y Código QR',
    color: '#2E7D32',
    pasos: [
      {
        titulo: '¿Qué aparece en el ticket?',
        desc: 'Cada ticket muestra: el logo del restaurante, nombre del negocio, fecha y hora, número de folio único, lista de productos con sus notas y precios, y el total del pedido.',
      },
      {
        titulo: 'Código QR para el cliente',
        desc: 'El ticket incluye un código QR. Si el cliente quiere ver su ticket en su propio celular, solo tiene que escanearlo con la cámara. Verá exactamente lo mismo que tú.',
      },
      {
        titulo: 'No necesitas impresora',
        desc: 'El ticket es completamente digital. El mesero lo muestra en pantalla o el cliente lo escanea. No se requiere ninguna impresora.',
      },
      {
        titulo: 'Hacer otro pedido',
        desc: 'Al final del ticket hay un botón "+ Nuevo Pedido" para regresar al menú y tomar el siguiente pedido de inmediato.',
      },
    ],
  },
  {
    icono: '⚙️',
    titulo: 'Módulo 3 — Gestión del Menú',
    color: '#1565C0',
    pasos: [
      {
        titulo: 'Acceder al menú',
        desc: 'Abre el menú hamburguesa (≡) arriba a la izquierda y selecciona "Gestión Menú".',
      },
      {
        titulo: 'Agregar un producto',
        desc: 'Toca el botón "+ Agregar" (arriba a la derecha). Escribe el nombre, precio y descripción opcional. Toca "Guardar".',
      },
      {
        titulo: 'Editar un producto',
        desc: 'Toca el botón ✏️ "Editar" junto al producto que quieras modificar. Cambia el nombre o precio y guarda.',
      },
      {
        titulo: 'Eliminar un producto',
        desc: 'Toca el ícono 🗑 junto al producto. El sistema pedirá confirmación antes de eliminarlo para evitar errores.',
      },
      {
        titulo: 'Los cambios son inmediatos',
        desc: 'Cualquier cambio en el menú se refleja al instante. No necesitas recargar la app.',
      },
    ],
  },
  {
    icono: '📋',
    titulo: 'Módulo 4 — Historial y Cierre de Caja',
    color: '#6A1E6A',
    pasos: [
      {
        titulo: 'Ver el historial',
        desc: 'Abre el menú (≡) y selecciona "Historial". Verás todos los cortes del día con fecha y total de ingresos.',
      },
      {
        titulo: 'Ver detalles de un pedido',
        desc: 'Toca cualquier corte para expandirlo y ver todos los pedidos de ese día. Toca un pedido para ver sus productos y notas.',
      },
      {
        titulo: 'Cerrar el día',
        desc: 'Cuando termines el turno, en la pantalla de Historial aparece el botón "Cerrar día". Al confirmarlo, el sistema archiva todos los pedidos y reinicia el contador para el día siguiente.',
      },
      {
        titulo: 'Eliminar historial antiguo',
        desc: 'Los cortes ya cerrados muestran un botón "🗑 Eliminar historial". Úsalo solo si quieres limpiar registros antiguos. Esta acción no se puede deshacer.',
      },
      {
        titulo: 'El historial es permanente',
        desc: 'Los pedidos quedan guardados aunque cierres la app o el navegador. Puedes consultarlos en cualquier momento desde cualquier dispositivo.',
      },
    ],
  },
];

/* ── Acordeón de cada módulo ── */
const SeccionAyuda = ({ seccion }) => {
  const [expandido, setExpandido] = useState(false);

  return (
    <div style={{
      background: '#FDF6EC',
      border: '1px solid #E8D5B0',
      borderRadius: '14px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(44,26,14,0.05)',
      transition: 'box-shadow 0.2s ease',
    }}>
      {/* Cabecera clickeable */}
      <button
        onClick={() => setExpandido(!expandido)}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '1rem 1.25rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '12px',
          textAlign: 'left',
        }}
      >
        <span style={{
          fontSize: '20px',
          background: `${seccion.color}18`,
          padding: '8px', borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {seccion.icono}
        </span>
        <p style={{
          margin: 0, flex: 1,
          fontFamily: "'Playfair Display', serif",
          fontSize: '14px', fontWeight: 700,
          color: '#2C1A0E',
        }}>
          {seccion.titulo}
        </p>
        <span style={{
          color: '#D4A96A', fontSize: '12px',
          transform: expandido ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
          display: 'inline-block', flexShrink: 0,
        }}>
          ▼
        </span>
      </button>

      {/* Contenido expandible */}
      {expandido && (
        <div style={{
          borderTop: '1px solid rgba(212,169,106,0.2)',
          padding: '1rem 1.25rem',
          display: 'flex', flexDirection: 'column', gap: '14px',
          animation: 'expandIn 0.25s ease both',
        }}>
          <style>{`@keyframes expandIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:none; } }`}</style>
          {seccion.pasos.map((paso, pi) => (
            <div key={pi} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              {/* Número */}
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: seccion.color, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 700,
                fontFamily: "'Lato', sans-serif",
                flexShrink: 0, marginTop: '1px',
              }}>
                {pi + 1}
              </div>
              <div>
                <p style={{
                  margin: '0 0 3px',
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '13px', fontWeight: 700,
                  color: '#2C1A0E',
                }}>
                  {paso.titulo}
                </p>
                <p style={{
                  margin: 0,
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '12.5px', color: '#8A6A4A',
                  lineHeight: 1.65,
                }}>
                  {paso.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Página principal de Soporte ── */
export const Soporte = () => {
  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP}?text=Hola,%20necesito%20ayuda%20con%20el%20sistema%20POS%20de%20Como%20en%20Casa`,
      '_blank'
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5ECD7', padding: '1rem 1rem 3rem' }}>

      {/* ── Hero header ── */}
      <div style={{
        background: 'linear-gradient(135deg, #2C1A0E 0%, #1A0C05 100%)',
        borderRadius: '16px',
        padding: '1.75rem 1.5rem',
        marginBottom: '1.25rem',
        textAlign: 'center',
        border: '1px solid rgba(212,169,106,0.2)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Resplandor decorativo */}
        <div style={{
          position: 'absolute', top: '-40px', left: '50%',
          transform: 'translateX(-50%)',
          width: '200px', height: '120px',
          background: 'radial-gradient(ellipse, rgba(212,169,106,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <p style={{ margin: 0, fontSize: '30px', position: 'relative', zIndex: 1 }}>🛠️</p>
        <p style={{
          margin: '10px 0 4px',
          fontFamily: "'Playfair Display', serif",
          fontSize: '21px', fontWeight: 700,
          color: '#D4A96A',
          position: 'relative', zIndex: 1,
        }}>
          Centro de Ayuda
        </p>
        <p style={{
          margin: 0, fontSize: '12px',
          color: 'rgba(212,169,106,0.55)',
          fontFamily: "'Lato', sans-serif",
          letterSpacing: '0.05em',
          position: 'relative', zIndex: 1,
        }}>
          Guía completa del sistema POS
        </p>
      </div>

      {/* ── Módulos de ayuda ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.25rem' }}>
        {secciones.map((seccion, si) => (
          <SeccionAyuda key={si} seccion={seccion} />
        ))}
      </div>

      {/* ── Tarjeta de contacto ── */}
      <div style={{
        background: '#FDF6EC',
        border: '1px solid #D4A96A',
        borderRadius: '16px',
        padding: '1.5rem',
        textAlign: 'center',
        boxShadow: '0 4px 16px rgba(124,58,30,0.08)',
      }}>
        <p style={{ fontSize: '26px', margin: '0 0 10px' }}>💬</p>
        <p style={{
          margin: '0 0 4px',
          fontFamily: "'Playfair Display', serif",
          fontSize: '17px', fontWeight: 700,
          color: '#2C1A0E',
        }}>
          ¿Necesitas ayuda?
        </p>
        <p style={{
          margin: '0 0 6px',
          fontSize: '12px', color: '#8A6A4A',
          fontFamily: "'Lato', sans-serif",
        }}>
          Soporte técnico — Dual Code Solutions
        </p>
        <p style={{
          margin: '0 0 1.25rem',
          fontSize: '20px', fontWeight: 700,
          fontFamily: "'Playfair Display', serif",
          color: '#7C3A1E',
          letterSpacing: '0.04em',
        }}>
          999 496 9520
        </p>

        <button
          onClick={handleWhatsApp}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            color: '#fff', border: 'none',
            borderRadius: '12px', padding: '13px 28px',
            fontSize: '14px', fontWeight: 700,
            fontFamily: "'Lato', sans-serif",
            cursor: 'pointer', letterSpacing: '0.03em',
            boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(37,211,102,0.45)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.3)';
          }}
        >
          {/* WhatsApp SVG logo */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Contactar por WhatsApp
        </button>
      </div>
    </div>
  );
};
