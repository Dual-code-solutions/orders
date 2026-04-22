import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pedidoApi } from '../../infrastructure/api/pedidoApi';
import { Ticket } from '../components/Ticket/Ticket';
import './TicketPage.css';

export const TicketPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    pedidoApi.obtenerConQR(id)
      .then((res) => {
        if (!res.ok) throw new Error(res.message);
        setData(res.data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="ticket-page ticket-page--center">Cargando ticket...</div>;
  if (error)   return <div className="ticket-page ticket-page--center ticket-page--error">{error}</div>;

  return (
    <div className="ticket-page">
      <Ticket
        pedido={data.pedido}
        detalles={data.detalles}
        qr={data.qr}
        onNuevoPedido={() => navigate('/')}
      />
    </div>
  );
};
