const BASE = import.meta.env.VITE_API_URL;

export const pedidoApi = {
  registrar: (cliente, detalles) =>
    fetch(`${BASE}/api/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cliente, detalles }),
    }).then((r) => r.json()),

  obtenerConQR: (id) =>
    fetch(`${BASE}/api/pedidos/${id}`).then((r) => r.json()),
};
