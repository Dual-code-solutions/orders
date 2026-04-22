import { Router } from 'express';

export const menuRoutes = (controller) => {
  const router = Router();
  router.get('/categorias', controller.listarCategorias);
  router.get('/', controller.listar);
  router.post('/', controller.agregar);
  router.put('/:id', controller.editar);
  router.delete('/:id', controller.eliminar);
  return router;
};
