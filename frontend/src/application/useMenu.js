import { useState, useEffect } from 'react';
import { menuApi } from '../infrastructure/api/menuApi';

export const useMenu = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargar = async () => {
    setLoading(true);
    try {
      const [resProductos, resCategorias] = await Promise.all([
        menuApi.listar(),
        menuApi.listarCategorias(),
      ]);
      setProductos(resProductos.data || []);
      setCategorias(resCategorias.data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const agregar = async (datos) => {
    const res = await menuApi.agregar(datos);
    if (!res.ok) throw new Error(res.message);
    await cargar();
    return res.data;
  };

  const editar = async (id, datos) => {
    const res = await menuApi.editar(id, datos);
    if (!res.ok) throw new Error(res.message);
    await cargar();
    return res.data;
  };

  const eliminar = async (id) => {
    const res = await menuApi.eliminar(id);
    if (!res.ok) throw new Error(res.message);
    await cargar();
  };

  useEffect(() => { cargar(); }, []);

  return { productos, categorias, loading, error, agregar, editar, eliminar, cargar };
};
