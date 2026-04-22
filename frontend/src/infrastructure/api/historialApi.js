const BASE = import.meta.env.VITE_API_URL;

export const historialApi = {
  listar: () =>
    fetch(`${BASE}/api/historial`).then((r) => r.json()),

  obtenerPedidos: (corteId) =>
    fetch(`${BASE}/api/historial/${corteId}`).then((r) => r.json()),

  eliminar: (corteId) =>
    fetch(`${BASE}/api/historial/${corteId}`, { method: 'DELETE' }).then((r) => r.json()),
};
