// src/services/mysqlService.js
const API_URL = 'http://localhost:3000/api/suppliers';

export const getSuppliers = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al cargar proveedores');
    return response.json();
};

export const createSupplier = async (supplierData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplierData),
    });
    if (!response.ok) throw new Error('Error al crear proveedor');
    return response.json();
};

export const updateSupplier = async (id, supplierData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplierData),
    });
    if (!response.ok) throw new Error('Error al actualizar proveedor');
    return response.json();
};

export const deleteSupplier = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar proveedor');
    return response.json();
};