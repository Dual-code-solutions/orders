const BASE = import.meta.env.VITE_API_URL;

export const menuApi = {
  listar: () =>
    fetch(`${BASE}/api/menu`).then((r) => r.json()),

  agregar: (datos) =>
    fetch(`${BASE}/api/menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    }).then((r) => r.json()),

  editar: (id, datos) =>
    fetch(`${BASE}/api/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    }).then((r) => r.json()),

  eliminar: (id) =>
    fetch(`${BASE}/api/menu/${id}`, { method: 'DELETE' }).then((r) => r.json()),
};
