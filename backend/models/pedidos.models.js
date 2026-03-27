import mongoose from "mongoose";

const { Schema, model } = mongoose;

const pedidoSchema = new Schema({
    cliente: {
        type: String,
        required: true,
        trim: true
    },
    // Array para guardar múltiples productos en un solo pedido
    productos: [{
        nombre: { type: String, required: true },
        cantidad: { type: Number, required: true, min: 1 },
        precio: { type: Number, required: true }
    }],
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        default: 'Pendiente',
        enum: [
            'Pendiente',
            'En Preparacion',
            'Completado',
            'Cancelado'
        ]
    },
    fecha_pedido: {
        type: Date,
        default: Date.now
    }
});

export default model("Pedido", pedidoSchema, "pedidos");