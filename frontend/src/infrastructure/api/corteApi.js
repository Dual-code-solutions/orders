const BASE = import.meta.env.VITE_API_URL;

export const corteApi = {
  obtenerActivo: () =>
    fetch(`${BASE}/api/cortes/activo`).then((r) => r.json()),

  abrir: () =>
    fetch(`${BASE}/api/cortes/abrir`, { method: 'POST' }).then((r) => r.json()),

  cerrar: (id) =>
    fetch(`${BASE}/api/cortes/${id}/cerrar`, { method: 'PATCH' }).then((r) => r.json()),
};
