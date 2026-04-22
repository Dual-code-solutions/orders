import { useState } from 'react';
import { useHistorial } from '../../application/useHistorial';
import { useCorte } from '../../application/useCorte';
import { ListaPedidos } from '../components/Historial/ListaPedidos';
import { Modal } from '../components/shared/Modal';
import { Button } from '../components/shared/Button';
import { Toast } from '../components/shared/Toast';

export const Historial = () => {
  const { cortes, pedidosDelCorte, loading, verPedidos, eliminarHistorial, cargar } = useHistorial();
  const { corteActivo, cerrarDia, loading: loadingCorte } = useCorte();
  const [corteExpandido, setCorteExpandido] = useState(null);
  const [pedidosCargados, setPedidosCargados] = useState({});
  const [modalCerrar, setModalCerrar] = useState(false);
  const [toast, setToast] = useState(null);

  const mostrarToast = (message, type = 'success') => setToast({ message, type });

  const handleExpandir = async (corteId) => {
    if (corteExpandido === corteId) {
      setCorteExpandido(null);
      return;
    }
    setCorteExpandido(corteId);
    if (!pedidosCargados[corteId]) {
      const pedidos = await verPedidos(corteId);
      setPedidosCargados((prev) => ({ ...prev, [corteId]: pedidos }));
    }
  };

  const handleEliminar = async (corteId) => {
    try {
      await eliminarHistorial(corteId);
      mostrarToast('Historial eliminado correctamente');
      setPedidosCargados((prev) => {
        const copia = { ...prev };
        delete copia[corteId];
        return copia;
      });
    } catch (e) {
      mostrarToast(e.message, 'error');
    }
  };

  const handleCerrarDia = async () => {
    try {
      await cerrarDia();
      setModalCerrar(false);
      mostrarToast('Día cerrado correctamente');
      cargar();
    } catch (e) {
      mostrarToast(e.message, 'error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5ECD7', padding: '1rem' }}>

      {/* Botón cerrar día */}
      {corteActivo && (
        <div style={{
          background: '#FDF6EC', border: '1px solid #D4A96A',
          borderRadius: '12px', padding: '1rem',
          marginBottom: '1rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <p style={{
              margin: 0, fontFamily: "'Playfair Display', serif",
              fontSize: '15px', fontWeight: 700, color: '#2C1A0E',
            }}>
              Día en curso
            </p>
            <p style={{
              margin: '2px 0 0', fontSize: '12px',
              color: '#8A6A4A', fontFamily: "'Lato', sans-serif",
            }}>
              {new Date(corteActivo.fecha).toLocaleDateString('es-MX', {
                day: '2-digit', month: 'long', year: 'numeric',
              })}
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setModalCerrar(true)}>
            Cerrar día
          </Button>
        </div>
      )}

      {/* Lista de cortes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {loading ? (
          <p style={{
            textAlign: 'center', color: '#8A6A4A',
            fontFamily: "'Lato', sans-serif", padding: '3rem',
          }}>
            Cargando historial...
          </p>
        ) : cortes.length === 0 ? (
          <p style={{
            textAlign: 'center', color: '#8A6A4A',
            fontFamily: "'Lato', sans-serif", padding: '3rem',
          }}>
            No hay historial registrado.
          </p>
        ) : (
          cortes.map((corte) => (
            <div key={corte.id}>
              {/* Botón para expandir corte */}
              <button
                onClick={() => handleExpandir(corte.id)}
                style={{
                  width: '100%', background: '#FDF6EC',
                  border: '1px solid #E8D5B0', borderRadius: '10px',
                  padding: '12px 14px', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: corteExpandido === corte.id ? '8px' : 0,
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <p style={{
                    margin: 0, fontFamily: "'Playfair Display', serif",
                    fontSize: '14px', fontWeight: 700, color: '#2C1A0E',
                    textTransform: 'capitalize',
                  }}>
                    {new Date(corte.fecha).toLocaleDateString('es-MX', {
                      weekday: 'long', day: '2-digit', month: 'long',
                    })}
                  </p>
                  <p style={{
                    margin: '2px 0 0', fontSize: '11px',
                    color: corte.cerrado ? '#1D9E75' : '#D4A96A',
                    fontFamily: "'Lato', sans-serif",
                  }}>
                    {corte.cerrado ? '✓ Cerrado' : '🟢 Activo'}
                  </p>
                </div>
                <span style={{
                  color: '#8A6A4A', fontSize: '12px',
                  transform: corteExpandido === corte.id ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s', display: 'inline-block',
                }}>
                  ▼
                </span>
              </button>

              {corteExpandido === corte.id && (
                <ListaPedidos
                  corte={corte}
                  pedidos={pedidosCargados[corte.id] || []}
                  onEliminarCorte={handleEliminar}
                  loading={loading}
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal confirmar cierre */}
      <Modal
        isOpen={modalCerrar}
        onClose={() => setModalCerrar(false)}
        title="Cerrar el día"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalCerrar(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleCerrarDia}
              disabled={loadingCorte}
            >
              {loadingCorte ? 'Cerrando...' : 'Confirmar cierre'}
            </Button>
          </>
        }
      >
        <p style={{
          margin: 0, fontFamily: "'Lato', sans-serif",
          fontSize: '14px', color: '#2C1A0E', lineHeight: 1.6,
        }}>
          ¿Estás seguro de cerrar el día? Esta acción archivará todos los pedidos
          del día en curso y no podrás agregar más pedidos a este corte.
        </p>
      </Modal>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
};
