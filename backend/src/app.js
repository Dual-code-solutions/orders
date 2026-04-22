import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Repositories
import { CorteRepository } from './infrastructure/db/CorteRepository.js';
import { PedidoAdmRepository } from './infrastructure/db/PedidoAdmRepository.js';
import { DetallePedidoRepository } from './infrastructure/db/DetallePedidoRepository.js';
import { ProductoRepository } from './infrastructure/db/ProductoRepository.js';
import { QRGenerator } from './infrastructure/qr/QRGenerator.js';

// Use Cases
import { RegistrarPedidoUseCase } from './application/RegistrarPedidoUseCase.js';
import { GestionarMenuUseCase } from './application/GestionarMenuUseCase.js';
import { CerrarDiaUseCase } from './application/CerrarDiaUseCase.js';
import { ConsultarHistorialUseCase } from './application/ConsultarHistorialUseCase.js';
import { EliminarHistorialUseCase } from './application/EliminarHistorialUseCase.js';

// Controllers
import { MenuController } from './infrastructure/http/controllers/MenuController.js';
import { PedidoController } from './infrastructure/http/controllers/PedidoController.js';
import { CorteController } from './infrastructure/http/controllers/CorteController.js';
import { HistorialController } from './infrastructure/http/controllers/HistorialController.js';

// Routes
import { menuRoutes } from './infrastructure/http/routes/menu.routes.js';
import { pedidoRoutes } from './infrastructure/http/routes/pedido.routes.js';
import { corteRoutes } from './infrastructure/http/routes/corte.routes.js';
import { historialRoutes } from './infrastructure/http/routes/historial.routes.js';

import { errorHandler } from './infrastructure/http/middlewares/errorHandler.js';

const app = express();
app.use(cors());
app.use(express.json());

// --- Instanciar dependencias ---
const corteRepository = new CorteRepository();
const pedidoRepository = new PedidoAdmRepository();
const detalleRepository = new DetallePedidoRepository();
const productoRepository = new ProductoRepository();
const qrGenerator = new QRGenerator();

const registrarPedidoUseCase = new RegistrarPedidoUseCase({ corteRepository, pedidoRepository, detalleRepository });
const gestionarMenuUseCase = new GestionarMenuUseCase({ productoRepository });
const cerrarDiaUseCase = new CerrarDiaUseCase({ corteRepository });
const consultarHistorialUseCase = new ConsultarHistorialUseCase({ corteRepository, pedidoRepository, detalleRepository });
const eliminarHistorialUseCase = new EliminarHistorialUseCase({ corteRepository });

const menuController = new MenuController({ gestionarMenuUseCase });
const pedidoController = new PedidoController({ registrarPedidoUseCase, pedidoRepository, detalleRepository, qrGenerator });
const corteController = new CorteController({ cerrarDiaUseCase, corteRepository });
const historialController = new HistorialController({ consultarHistorialUseCase, eliminarHistorialUseCase });

// --- Rutas ---
app.use('/api/menu', menuRoutes(menuController));
app.use('/api/pedidos', pedidoRoutes(pedidoController));
app.use('/api/cortes', corteRoutes(corteController));
app.use('/api/historial', historialRoutes(historialController));

// --- Error handler ---
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
