import express from 'express';
// IMPORTANTE: Recuerda siempre poner la extensión .js al final de tus importaciones locales
import * as pedidosController from '../controller/pedidos.controller.js';

const router = express.Router();

// Rutas para la gestión de pedidos
router.post("/guardarPedido", pedidosController.guardarPedido);
router.get("/listarPedidos", pedidosController.listarPedidos);
router.get("/buscarPedido/:id", pedidosController.pedidoPorId);
router.delete("/eliminarPedido/:id", pedidosController.eliminarPedido);
router.patch("/actualizarPedido/:id", pedidosController.actualizarPedido);

export default router;