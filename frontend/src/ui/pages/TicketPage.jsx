import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { usePedido } from '../../application/usePedido';
import { Ticket } from '../components/Ticket/Ticket';
import { Button } from '../components/shared/Button';

export const TicketPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { obtenerTicket } = usePedido();
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar si es la vista del cliente desde el QR
  const queryParams = new URLSearchParams(location.search);
  const esCliente = queryParams.get('cliente') === 'true';

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await obtenerTicket(id);
        setDatos(res);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [id]);

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: '#F5ECD7', color: '#8A6A4A',
      fontFamily: "'Lato', sans-serif", fontSize: '15px',
    }}>
      Cargando ticket...
    </div>
  );

  if (error) return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1rem',
      background: '#F5ECD7', padding: '2rem',
    }}>
      <p style={{ color: '#A32D2D', fontFamily: "'Lato', sans-serif" }}>{error}</p>
      {!esCliente && <Button onClick={() => navigate('/')}>Volver al inicio</Button>}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', background: '#F5ECD7',
      padding: '1.5rem 1rem',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: '1.5rem',
    }}>
      <Ticket
        pedido={datos.pedido}
        detalles={datos.detalles}
        qr={datos.qr}
      />

      {/* Acciones solo para el mesero/administrador */}
      {!esCliente && (
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: '10px', width: '100%', maxWidth: '360px',
        }}>
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={() => navigate('/')}
          >
            + Nuevo Pedido
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate('/historial')}
          >
            Ver Historial
          </Button>
        </div>
      )}
    </div>
  );
};
