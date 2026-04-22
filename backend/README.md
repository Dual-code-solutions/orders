# POS Restaurante — "Como en Casa"

Sistema de punto de venta diseñado para tablet/celular, con arquitectura hexagonal completa.

## Stack

| Capa | Tecnología |
|------|-----------|
| Backend | Node.js + Express + Supabase |
| Frontend | React 18 + Vite + React Router |
| Base de datos | Supabase (PostgreSQL) |
| QR | librería `qrcode` |

---

## Estructura del proyecto

```
pos-restaurante/
├── backend/   → API REST (hexagonal)
└── frontend/  → SPA React (hexagonal)
```

---

## Configuración del Backend

### 1. Variables de entorno

```bash
cp backend/.env.example backend/.env
```

Edita `backend/.env`:

```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE=eyJ...
LOCAL_ID_TIMUCUY=<uuid del local en tabla locales>
BASE_URL=http://localhost:5173
PORT=3000
```

### 2. Tablas en Supabase

Ejecuta este SQL en el SQL Editor de Supabase:

```sql
-- Cortes de caja
CREATE TABLE cortes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_local    UUID NOT NULL,
  fecha       TIMESTAMPTZ NOT NULL DEFAULT now(),
  cerrado     BOOLEAN NOT NULL DEFAULT false,
  fecha_cierre TIMESTAMPTZ
);

-- Pedidos administrativos
CREATE TABLE pedido_adm (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  corte_id    UUID NOT NULL REFERENCES cortes(id) ON DELETE CASCADE,
  cliente     TEXT NOT NULL DEFAULT 'Cliente',
  fecha_hora  TIMESTAMPTZ NOT NULL DEFAULT now(),
  total       NUMERIC(10,2) NOT NULL DEFAULT 0
);

-- Detalle de cada pedido
CREATE TABLE detalle_pedido_adm (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id       UUID NOT NULL REFERENCES pedido_adm(id) ON DELETE CASCADE,
  producto_id     UUID NOT NULL REFERENCES productos(id),
  comentario      TEXT,
  precio_unitario NUMERIC(10,2) NOT NULL
);

-- Productos del menú
CREATE TABLE productos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_local    UUID NOT NULL,
  nombre      TEXT NOT NULL,
  descripcion TEXT,
  precio_base NUMERIC(10,2) NOT NULL,
  activo      BOOLEAN NOT NULL DEFAULT true
);
```

### 3. Arrancar el backend

```bash
cd backend
npm install
npm run dev
```

El servidor corre en `http://localhost:3000`.

---

## Configuración del Frontend

### 1. Variable de entorno

El archivo `frontend/.env` ya incluye:
```env
VITE_API_URL=http://localhost:3000
```

### 2. Arrancar el frontend

```bash
cd frontend
npm install
npm run dev
```

La app corre en `http://localhost:5173`.

---

## Endpoints del API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/menu` | Listar productos |
| `POST` | `/api/menu` | Agregar producto |
| `PUT` | `/api/menu/:id` | Editar producto |
| `DELETE` | `/api/menu/:id` | Eliminar producto |
| `POST` | `/api/pedidos` | Registrar pedido |
| `GET` | `/api/pedidos/:id` | Obtener pedido + QR |
| `GET` | `/api/cortes/activo` | Corte activo del día |
| `PATCH` | `/api/cortes/:id/cerrar` | Cerrar corte |
| `GET` | `/api/historial` | Listar todos los cortes |
| `GET` | `/api/historial/:corteId` | Pedidos de un corte |
| `DELETE` | `/api/historial/:corteId` | Eliminar corte cerrado |

---

## Flujo de capas

```
UI (pages/components)
  → application (useXxx hooks)
    → infrastructure/api (fetch)
      → backend controllers
        → application (UseCases)
          → domain (entities + rules)
            → infrastructure/db (Supabase)
```

---

*Desarrollado con Arquitectura Hexagonal · v1.0.0 · Dual Code Solutions*
