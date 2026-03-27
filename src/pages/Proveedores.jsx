import React, { useState, useEffect } from 'react';
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../services/mysqlService';
// Asegúrate de importar tu archivo CSS aquí
import '../styles.css';

const Proveedores = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        company: '',
        first_name: '',
        last_name: '',
        city: '',
        business_phone: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getSuppliers();
            setSuppliers(data);
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

    const openModal = (supplier = null) => {
        if (supplier) {
            setEditingId(supplier.id);
            setFormData({
                company: supplier.company || '',
                first_name: supplier.first_name || '',
                last_name: supplier.last_name || '',
                city: supplier.city || '',
                business_phone: supplier.business_phone || ''
            });
        } else {
            setEditingId(null);
            setFormData({ company: '', first_name: '', last_name: '', city: '', business_phone: '' });
        }
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateSupplier(editingId, formData);
            } else {
                await createSupplier(formData);
            }
            closeModal();
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
            try {
                await deleteSupplier(id);
                fetchData();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    if (loading) return <div className="main-content"><h2 className="title">Cargando proveedores...</h2></div>;
    if (error) return <div className="main-content"><h2 className="title" style={{ color: 'var(--danger)' }}>{error}</h2></div>;

    return (
        <div className="main-content">
            <h1 className="title">Gestión de Proveedores</h1>

            <div className="card">
                {/* Usamos flexbox inline rápido para alinear el botón a la derecha antes de la tabla */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    <button className="primary" onClick={() => openModal()}>
                        + Nuevo Proveedor
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Empresa</th>
                            <th>Contacto</th>
                            <th>Ciudad</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((sup) => (
                            <tr key={sup.id}>
                                <td>{sup.company}</td>
                                <td>{sup.first_name} {sup.last_name}</td>
                                <td>{sup.city}</td>
                                <td>{sup.business_phone}</td>
                                <td className="actions">
                                    <button className="edit" onClick={() => openModal(sup)}>Editar</button>
                                    <button className="delete" onClick={() => handleDelete(sup.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        {suppliers.length === 0 && (
                            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No hay proveedores registrados.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2 className="title" style={{ fontSize: '22px', marginBottom: '20px' }}>
                            {editingId ? 'Editar Proveedor' : 'Nuevo Proveedor'}
                        </h2>

                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Empresa</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Contenedor flex para agrupar Nombre y Apellido */}
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Nombre del Contacto</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Apellido</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Ciudad</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Teléfono Comercial</label>
                                <input
                                    type="text"
                                    name="business_phone"
                                    value={formData.business_phone}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="actions" style={{ justifyContent: 'flex-end', marginTop: '10px' }}>
                                <button type="button" onClick={closeModal} style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-main)' }}>
                                    Cancelar
                                </button>
                                <button type="submit" className="primary">
                                    Guardar
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Proveedores;