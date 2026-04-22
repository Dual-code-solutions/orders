import { useState } from 'react';
import { pedidoApi } from '../infrastructure/api/pedidoApi';

export const usePedido = () => {
  const [carrito, setCarrito] = useState([]);
  const [pedidoActual, setPedidoActual] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Agrega producto al carrito o incrementa si ya existe con mismo comentario
  const agregarAlCarrito = (producto, comentario = '') => {
    setCarrito((prev) => {
      const existe = prev.find(
        (i) => i.producto_id === producto.id && i.comentario === comentario
      );
      if (existe) {
        return prev.map((i) =>
          i.producto_id === producto.id && i.comentario === comentario
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      }
      return [
        ...prev,
        {
          producto_id: producto.id,
          nombre: producto.nombre,
          precio_unitario: producto.precio_base,
          comentario,
          cantidad: 1,
        },
      ];
    });
  };

  const quitarDelCarrito = (producto_id, comentario) => {
    setCarrito((prev) =>
      prev.filter(
        (i) => !(i.producto_id === producto_id && i.comentario === comentario)
      )
    );
  };

  const actualizarComentario = (producto_id, comentarioViejo, comentarioNuevo) => {
    setCarrito((prev) =>
      prev.map((i) =>
        i.producto_id === producto_id && i.comentario === comentarioViejo
          ? { ...i, comentario: comentarioNuevo }
          : i
      )
    );
  };

  const limpiarCarrito = () => setCarrito([]);

  const calcularTotal = () =>
    carrito.reduce((acc, i) => acc + i.precio_unitario * i.cantidad, 0);

  const confirmarPedido = async (cliente) => {
    if (carrito.length === 0) throw new Error('El carrito está vacío.');
    if (!cliente || cliente.trim() === '') throw new Error('El nombre del cliente es obligatorio.');
    setLoading(true);
    setError(null);
    try {
      // Expandir items con cantidad > 1
      const detalles = carrito.flatMap((i) =>
        Array.from({ length: i.cantidad }, () => ({
          producto_id: i.producto_id,
          precio_unitario: i.precio_unitario,
          comentario: i.comentario || null,
        }))
      );

      const res = await pedidoApi.registrar(cliente.trim(), detalles);
      if (!res.ok) throw new Error(res.message);

      setPedidoActual(res.data);
      limpiarCarrito();
      return res.data;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const obtenerTicket = async (id) => {
    const res = await pedidoApi.obtenerConQR(id);
    if (!res.ok) throw new Error(res.message);
    return res.data;
  };

  return {
    carrito,
    pedidoActual,
    loading,
    error,
    agregarAlCarrito,
    quitarDelCarrito,
    actualizarComentario,
    limpiarCarrito,
    calcularTotal,
    confirmarPedido,
    obtenerTicket,
  };
};
