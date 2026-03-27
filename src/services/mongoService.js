// src/services/pedidosService.js
const API_URL = 'http://localhost:3690/api/v1/Pedidos';

export const getPedidos = async () => {
    const response = await fetch(`${API_URL}/listarPedidos`);
    if (!response.ok) throw new Error('Error al cargar pedidos');
    const data = await response.json();
    return data.data; // Tu backend devuelve { status, message, data }
};

export const createPedido = async (pedidoData) => {
    const response = await fetch(`${API_URL}/guardarPedido`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoData),
    });
    if (!response.ok) throw new Error('Error al crear pedido');
    return response.json();
};

export const updatePedido = async (id, pedidoData) => {
    const response = await fetch(`${API_URL}/actualizarPedido/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoData),
    });
    if (!response.ok) throw new Error('Error al actualizar pedido');
    return response.json();
};

export const deletePedido = async (id) => {
    const response = await fetch(`${API_URL}/eliminarPedido/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar pedido');
    return response.json();
};