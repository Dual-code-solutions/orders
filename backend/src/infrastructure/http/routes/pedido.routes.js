import { Router } from 'express';

export const pedidoRoutes = (controller) => {
  const router = Router();
  router.post('/', controller.registrar);
  router.get('/:id', controller.obtenerConQR);
  return router;
};
