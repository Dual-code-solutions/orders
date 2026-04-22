import { useState, useEffect } from 'react';
import { corteApi } from '../infrastructure/api/corteApi';

export const useCorte = () => {
  const [corteActivo, setCorteActivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargar = async () => {
    setLoading(true);
    try {
      const res = await corteApi.obtenerActivo();
      setCorteActivo(res.data || null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const cerrarDia = async () => {
    if (!corteActivo) throw new Error('No hay corte activo.');
    setLoading(true);
    try {
      const res = await corteApi.cerrar(corteActivo.id);
      if (!res.ok) throw new Error(res.message);
      setCorteActivo(null);
      return res.data;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  return { corteActivo, loading, error, cerrarDia, cargar };
};
