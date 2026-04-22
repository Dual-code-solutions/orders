import { Router } from 'express';

export const historialRoutes = (controller) => {
  const router = Router();
  router.get('/', controller.listar);
  router.get('/:corteId', controller.obtenerPedidos);
  router.delete('/:corteId', controller.eliminar);
  return router;
};
