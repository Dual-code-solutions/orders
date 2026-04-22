import { Router } from 'express';

export const corteRoutes = (controller) => {
  const router = Router();
  router.get('/activo', controller.obtenerActivo);
  router.post('/abrir', controller.abrir);
  router.patch('/:id/cerrar', controller.cerrar);
  return router;
};
