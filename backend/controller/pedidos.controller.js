import Pedido from '../models/pedidos.models.js'; // <-- Nota el .js al final

// 1. Crear un nuevo pedido
export const guardarPedido = async (req, res) => {
    try {
        const { cliente, productos, total, estado } = req.body;

        // Validar datos obligatorios
        if (!cliente || !productos || productos.length === 0 || !total) {
            return res.status(400).json({
                status: "Error",
                message: "Los campos 'cliente, productos y total' son obligatorios"
            });
        }

        // Crear objeto usando el modelo
        const nuevoPedido = new Pedido({
            cliente,
            productos,
            total,
            estado
        });

        // Guardar en la base de datos
        const pedidoGuardado = await nuevoPedido.save();

        return res.status(201).json({
            status: "success",
            message: "Pedido creado correctamente",
            data: pedidoGuardado
        });
    } catch (error) {
        console.log("ERROR al guardar Pedido", error);
        return res.status(500).json({
            status: "error",
            message: "Error del servidor",
            error: error.message
        });
    }
};

// 2. Obtener todos los pedidos
export const listarPedidos = async (req, res) => {
    try {
        // Obtenemos los pedidos y los ordenamos por fecha (los más nuevos primero)
        const pedidosBD = await Pedido.find().sort({ fecha_pedido: -1 });

        return res.status(200).json({
            status: "success",
            message: "Todos los pedidos obtenidos",
            data: pedidosBD
        });
    } catch (error) {
        console.log("ERROR al listar Pedidos", error);
        return res.status(500).json({
            status: "error",
            message: "Error del servidor",
            error: error.message
        });
    }
};

// 3. Obtener pedido por ID
export const pedidoPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const pedidoBuscado = await Pedido.findById(id);

        if (!pedidoBuscado) {
            return res.status(404).json({
                status: "error",
                message: "Pedido no encontrado"
            });
        }

        return res.status(200).json({
            status: 'success',
            message: "Pedido encontrado",
            data: pedidoBuscado
        });
    } catch (error) {
        console.log("Error al encontrar el pedido", error);
        return res.status(500).json({
            status: "error",
            message: "Error del servidor",
            error: error.message
        });
    }
};

// 4. Actualizar pedido (Ej: cambiar de "Pendiente" a "Completado")
export const actualizarPedido = async (req, res) => {
    try {
        const id = req.params.id;
        const { cliente, productos, total, estado } = req.body;

        if (!cliente && !productos && !total && !estado) {
            return res.status(400).json({
                status: "error",
                message: "Debe proporcionar al menos un campo para actualizar"
            });
        }

        const datosActualizar = {};
        if (cliente) datosActualizar.cliente = cliente;
        if (productos) datosActualizar.productos = productos;
        if (total) datosActualizar.total = total;
        if (estado) datosActualizar.estado = estado;

        const pedidoActualizado = await Pedido.findByIdAndUpdate(id, datosActualizar, {
            new: true, // Devuelve el documento ya actualizado
            runValidators: true // Asegura que se respeten las reglas del modelo (ej. el enum de estado)
        });

        if (!pedidoActualizado) {
            return res.status(404).json({
                status: "error",
                message: "Pedido no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Pedido actualizado correctamente",
            data: pedidoActualizado
        });

    } catch (error) {
        console.log("Error al actualizar pedido", error);
        return res.status(500).json({
            status: "error",
            message: "Error del servidor",
            error: error.message
        });
    }
};

// 5. Eliminar pedido
export const eliminarPedido = async (req, res) => {
    try {
        const id = req.params.id;
        const pedidoEliminado = await Pedido.findByIdAndDelete(id).lean();

        if (!pedidoEliminado) {
            return res.status(404).json({
                status: "error",
                message: "Pedido no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Pedido eliminado correctamente",
            data: pedidoEliminado
        });
    } catch (error) {
        console.log("Error al eliminar el pedido", error);
        return res.status(500).json({
            status: "error",
            message: "Error del servidor",
            error: error.message
        });
    }
};