import { useState, useEffect } from 'react';
import { historialApi } from '../infrastructure/api/historialApi';

export const useHistorial = () => {
  const [cortes, setCortes] = useState([]);
  const [pedidosDelCorte, setPedidosDelCorte] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargar = async () => {
    setLoading(true);
    try {
      const res = await historialApi.listar();
      setCortes(res.data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const verPedidos = async (corteId) => {
    setLoading(true);
    try {
      const res = await historialApi.obtenerPedidos(corteId);
      setPedidosDelCorte(res.data || []);
      return res.data;
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarHistorial = async (corteId) => {
    const res = await historialApi.eliminar(corteId);
    if (!res.ok) throw new Error(res.message);
    await cargar();
  };

  useEffect(() => { cargar(); }, []);

  return {
    cortes,
    pedidosDelCorte,
    loading,
    error,
    verPedidos,
    eliminarHistorial,
    cargar,
  };
};
