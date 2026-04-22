import { useState, useMemo } from 'react';
import { useMenu } from '../../application/useMenu';
import { Modal } from '../components/shared/Modal';
import { Button } from '../components/shared/Button';
import { Toast } from '../components/shared/Toast';

const FormProducto = ({ inicial, onGuardar, onCancelar, loading }) => {
  const [form, setForm] = useState(inicial || { nombre: '', precio_base: '', descripcion: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const inputStyle = {
    width: '100%', padding: '10px 12px',
    border: '1px solid #D4A96A', borderRadius: '8px',
    fontSize: '14px', fontFamily: "'Lato', sans-serif",
    background: '#FFF8EE', color: '#2C1A0E', outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontSize: '12px', color: '#8A6A4A',
    fontFamily: "'Lato', sans-serif",
    marginBottom: '4px', display: 'block',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <label style={labelStyle}>Nombre *</label>
        <input
          name="nombre" value={form.nombre}
          onChange={handleChange} style={inputStyle}
          placeholder="Ej. Tacos de pastor"
        />
      </div>
      <div>
        <label style={labelStyle}>Precio *</label>
        <input
          name="precio_base" type="number"
          value={form.precio_base} onChange={handleChange}
          style={inputStyle} placeholder="0.00"
        />
      </div>
      <div>
        <label style={labelStyle}>Descripción (opcional)</label>
        <input
          name="descripcion" value={form.descripcion}
          onChange={handleChange} style={inputStyle}
          placeholder="Breve descripción..."
        />
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <Button variant="ghost" onClick={onCancelar} size="sm">Cancelar</Button>
        <Button
          variant="primary" size="sm"
          disabled={loading || !form.nombre || !form.precio_base}
          onClick={() => onGuardar(form)}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </div>
  );
};

export const GestionMenu = () => {
  const { productos, loading, agregar, editar, eliminar } = useMenu();
  const [modalAgregar, setModalAgregar] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [productoEliminar, setProductoEliminar] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return productos;
    const q = busqueda.toLowerCase();
    return productos.filter(p => p.nombre.toLowerCase().includes(q));
  }, [productos, busqueda]);

  const mostrarToast = (message, type = 'success') => setToast({ message, type });

  const handleAgregar = async (form) => {
    setSaving(true);
    try {
      await agregar({ nombre: form.nombre, precio_base: Number(form.precio_base), descripcion: form.descripcion });
      setModalAgregar(false);
      mostrarToast('Producto agregado');
    } catch (e) {
      mostrarToast(e.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEditar = async (form) => {
    setSaving(true);
    try {
      await editar(productoEditar.id, { nombre: form.nombre, precio_base: Number(form.precio_base), descripcion: form.descripcion });
      setProductoEditar(null);
      mostrarToast('Producto actualizado');
    } catch (e) {
      mostrarToast(e.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEliminar = async () => {
    setSaving(true);
    try {
      await eliminar(productoEliminar.id);
      setProductoEliminar(null);
      mostrarToast('Producto eliminado');
    } catch (e) {
      mostrarToast(e.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5ECD7', padding: '1rem' }}>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '1rem',
      }}>
        <p style={{
          margin: 0, fontFamily: "'Playfair Display', serif",
          fontSize: '18px', fontWeight: 700, color: '#2C1A0E',
        }}>
          Productos ({productos.length})
        </p>
        <Button size="sm" onClick={() => setModalAgregar(true)}>
          + Agregar
        </Button>
      </div>

      {/* Buscador */}
      <div style={{
        display: 'flex', alignItems: 'center',
        background: '#FFF', borderRadius: '12px',
        border: '1px solid #D4A96A', padding: '10px 14px',
        marginBottom: '1rem',
        boxShadow: 'inset 0 2px 4px rgba(44,26,14,0.02)',
      }}>
        <span style={{ fontSize: '16px', marginRight: '10px', opacity: 0.6 }}></span>
        <input
          type="text"
          placeholder="Buscar platillo por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            border: 'none', background: 'transparent', outline: 'none',
            flex: 1, fontSize: '15px', fontFamily: "'Lato', sans-serif",
            color: '#2C1A0E',
          }}
        />
        {busqueda && (
          <button
            onClick={() => setBusqueda('')}
            style={{
              background: '#FFF0F0', border: '1px solid #E0A0A0', cursor: 'pointer',
              color: '#A32D2D', fontSize: '11px', padding: '4px 8px', borderRadius: '6px',
              fontFamily: "'Lato', sans-serif", fontWeight: 'bold'
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Lista */}
      {loading ? (
        <p style={{ textAlign: 'center', color: '#8A6A4A', fontFamily: "'Lato', sans-serif", padding: '3rem' }}>
          Cargando...
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {productosFiltrados.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1', textAlign: 'center', padding: '3rem',
              color: '#8A6A4A', fontFamily: "'Lato', sans-serif",
              background: '#FDF6EC', border: '1px dashed #D4A96A', borderRadius: '12px'
            }}>
              <p style={{ margin: 0, fontSize: '15px' }}>No se encontraron platillos con "{busqueda}".</p>
            </div>
          ) : (
            productosFiltrados.map((p) => (
              <div key={p.id} style={{
                background: '#FFF',
                border: '1px solid #E8D5B0',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex', flexDirection: 'column', gap: '12px',
                boxShadow: '0 4px 12px rgba(44, 26, 14, 0.04)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(44, 26, 14, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 26, 14, 0.04)';
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: 0, fontSize: '16px', fontWeight: 700,
                    fontFamily: "'Playfair Display', serif", color: '#2C1A0E',
                  }}>
                    {p.nombre}
                  </p>
                  <p style={{
                    margin: '4px 0 0', fontSize: '18px',
                    color: '#7C3A1E', fontFamily: "'Playfair Display', serif", fontWeight: 700,
                  }}>
                    ${Number(p.precio_base).toFixed(2)}
                  </p>
                  {p.descripcion && (
                    <p style={{
                      margin: '8px 0 0', fontSize: '12px',
                      color: '#8A6A4A', fontFamily: "'Lato', sans-serif",
                      lineHeight: 1.4,
                    }}>
                      {p.descripcion}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F5ECD7', paddingTop: '12px', marginTop: 'auto' }}>
                  <button
                    onClick={() => setProductoEditar(p)}
                    style={{
                      flex: 1, background: '#FFF8EE', border: '1px solid #D4A96A',
                      borderRadius: '8px', padding: '8px',
                      fontSize: '13px', color: '#7C3A1E', fontWeight: 700,
                      fontFamily: "'Lato', sans-serif", cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#F5E6C8'}
                    onMouseLeave={(e) => e.target.style.background = '#FFF8EE'}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => setProductoEliminar(p)}
                    style={{
                      background: '#FFF0F0', border: '1px solid #E0A0A0',
                      borderRadius: '8px', padding: '8px 12px',
                      fontSize: '13px', color: '#A32D2D',
                      fontFamily: "'Lato', sans-serif", cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#FAD4D4'}
                    onMouseLeave={(e) => e.target.style.background = '#FFF0F0'}
                  >
                    🗑
                  </button>
                </div>
              </div>
            )))}
        </div>
      )}

      {/* Modal agregar */}
      <Modal isOpen={modalAgregar} onClose={() => setModalAgregar(false)} title="Nuevo producto">
        <FormProducto onGuardar={handleAgregar} onCancelar={() => setModalAgregar(false)} loading={saving} />
      </Modal>

      {/* Modal editar */}
      <Modal isOpen={!!productoEditar} onClose={() => setProductoEditar(null)} title="Editar producto">
        {productoEditar && (
          <FormProducto
            inicial={productoEditar}
            onGuardar={handleEditar}
            onCancelar={() => setProductoEditar(null)}
            loading={saving}
          />
        )}
      </Modal>

      {/* Modal confirmar eliminar */}
      <Modal
        isOpen={!!productoEliminar}
        onClose={() => setProductoEliminar(null)}
        title="Eliminar producto"
        footer={
          <>
            <Button variant="ghost" onClick={() => setProductoEliminar(null)}>Cancelar</Button>
            <Button variant="danger" onClick={handleEliminar} disabled={saving}>
              {saving ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </>
        }
      >
        <p style={{
          margin: 0, fontFamily: "'Lato', sans-serif",
          fontSize: '14px', color: '#2C1A0E', lineHeight: 1.6,
        }}>
          ¿Eliminar <strong>{productoEliminar?.nombre}</strong>? Esta acción no se puede deshacer.
        </p>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
