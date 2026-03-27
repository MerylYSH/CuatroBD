// src/pages/Pedidos.jsx
import React, { useState, useEffect } from 'react';
import { getPedidos, createPedido, updatePedido, deletePedido } from '../services/mongoService';
import '../styles.css';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Estado inicial del formulario
    const [formData, setFormData] = useState({
        cliente: '',
        estado: 'Pendiente',
        productos: [{ nombre: '', cantidad: 1, precio: 0 }],
        total: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    // Calcular el total automáticamente cuando cambian los productos
    useEffect(() => {
        const nuevoTotal = formData.productos.reduce((acc, prod) => {
            return acc + (Number(prod.cantidad) * Number(prod.precio));
        }, 0);
        setFormData(prev => ({ ...prev, total: nuevoTotal }));
    }, [formData.productos]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getPedidos();
            setPedidos(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Manejo dinámico de productos
    const handleProductChange = (index, field, value) => {
        const nuevosProductos = [...formData.productos];
        nuevosProductos[index][field] = value;
        setFormData({ ...formData, productos: nuevosProductos });
    };

    const addProductRow = () => {
        setFormData({
            ...formData,
            productos: [...formData.productos, { nombre: '', cantidad: 1, precio: 0 }]
        });
    };

    const removeProductRow = (index) => {
        const nuevosProductos = formData.productos.filter((_, i) => i !== index);
        setFormData({ ...formData, productos: nuevosProductos });
    };

    const openModal = (pedido = null) => {
        if (pedido) {
            setEditingId(pedido._id); // MongoDB usa _id
            setFormData({
                cliente: pedido.cliente,
                estado: pedido.estado,
                productos: pedido.productos,
                total: pedido.total
            });
        } else {
            setEditingId(null);
            setFormData({
                cliente: '',
                estado: 'Pendiente',
                productos: [{ nombre: '', cantidad: 1, precio: 0 }],
                total: 0
            });
        }
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updatePedido(editingId, formData);
            } else {
                await createPedido(formData);
            }
            closeModal();
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
            try {
                await deletePedido(id);
                fetchData();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    // Renderizado de estados
    if (loading) return <div className="main-content"><h2 className="title">Cargando pedidos...</h2></div>;
    if (error) return <div className="main-content"><h2 className="title" style={{ color: 'var(--danger)' }}>{error}</h2></div>;

    return (
        <div className="main-content">
            <h1 className="title">Gestión de Pedidos</h1>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    <button className="primary" onClick={() => openModal()}>
                        + Nuevo Pedido
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Artículos</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido._id}>
                                <td>{pedido.cliente}</td>
                                <td>{new Date(pedido.fecha_pedido).toLocaleDateString()}</td>
                                <td>{pedido.productos.length} prod.</td>
                                <td>${pedido.total.toFixed(2)}</td>
                                <td>
                                    <span style={{
                                        padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold',
                                        backgroundColor: pedido.estado === 'Completado' ? '#e8f5e9' :
                                            pedido.estado === 'Pendiente' ? '#fff3e0' :
                                                pedido.estado === 'Cancelado' ? '#ffebee' : '#e3f2fd',
                                        color: pedido.estado === 'Completado' ? '#2e7d32' :
                                            pedido.estado === 'Pendiente' ? '#ed6c02' :
                                                pedido.estado === 'Cancelado' ? '#c62828' : '#1976d2'
                                    }}>
                                        {pedido.estado}
                                    </span>
                                </td>
                                <td className="actions">
                                    <button className="edit" onClick={() => openModal(pedido)}>Editar</button>
                                    <button className="delete" onClick={() => handleDelete(pedido._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        {pedidos.length === 0 && (
                            <tr><td colSpan="6" style={{ textAlign: 'center' }}>No hay pedidos registrados.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    {/* Hacemos el modal un poco más ancho para que quepan los productos */}
                    <div className="modal" style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 className="title" style={{ fontSize: '22px', marginBottom: '20px' }}>
                            {editingId ? 'Editar Pedido' : 'Nuevo Pedido'}
                        </h2>

                        <form className="form" onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div className="form-group" style={{ flex: 2 }}>
                                    <label>Nombre del Cliente</label>
                                    <input type="text" name="cliente" value={formData.cliente} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Estado</label>
                                    <select
                                        name="estado"
                                        value={formData.estado}
                                        onChange={handleInputChange}
                                        style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                                    >
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="En Preparacion">En Preparación</option>
                                        <option value="Completado">Completado</option>
                                        <option value="Cancelado">Cancelado</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ marginTop: '15px', padding: '15px', backgroundColor: 'var(--bg-body)', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <label style={{ margin: 0, fontWeight: 'bold' }}>Productos</label>
                                    <button type="button" className="primary" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={addProductRow}>
                                        + Agregar Producto
                                    </button>
                                </div>

                                {formData.productos.map((prod, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                                        <input
                                            type="text" placeholder="Nombre" value={prod.nombre} required
                                            onChange={(e) => handleProductChange(index, 'nombre', e.target.value)}
                                            style={{ flex: 2 }}
                                        />
                                        <input
                                            type="number" placeholder="Cant." value={prod.cantidad} min="1" required
                                            onChange={(e) => handleProductChange(index, 'cantidad', e.target.value)}
                                            style={{ width: '70px' }}
                                        />
                                        <input
                                            type="number" placeholder="Precio $" value={prod.precio} min="0" step="0.01" required
                                            onChange={(e) => handleProductChange(index, 'precio', e.target.value)}
                                            style={{ width: '90px' }}
                                        />
                                        {formData.productos.length > 1 && (
                                            <button type="button" className="delete" style={{ padding: '8px' }} onClick={() => removeProductRow(index)}>
                                                X
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <div style={{ textAlign: 'right', marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>
                                    Total: ${formData.total.toFixed(2)}
                                </div>
                            </div>

                            <div className="actions" style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
                                <button type="button" onClick={closeModal} style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-main)' }}>
                                    Cancelar
                                </button>
                                <button type="submit" className="primary">
                                    Guardar Pedido
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pedidos;