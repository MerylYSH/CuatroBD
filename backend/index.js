import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { apiReference } from '@scalar/express-api-reference';

// Importaciones locales (OBLIGATORIO llevar .js al final)
import conection from './database/concection.js';
import PedidosRoutes from './routes/pedidos.routes.js'; // <-- Tu nueva ruta de pedidos

const app = express();
const PORT = 3690;

// Conexión a la base de datos
conection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints de la API
app.use("/api/v1/Pedidos", PedidosRoutes); // <-- Endpoint habilitado para pedidos

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`El server is running on http://localhost:${PORT}`);
});