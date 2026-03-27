import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'northwind',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// GET: Obtener todos los proveedores
app.get('/api/suppliers', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, company, first_name, last_name, city, business_phone FROM suppliers ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proveedores', error: error.message });
    }
});

// POST: Crear un nuevo proveedor
app.post('/api/suppliers', async (req, res) => {
    const { company, first_name, last_name, city, business_phone } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO suppliers (company, first_name, last_name, city, business_phone) VALUES (?, ?, ?, ?, ?)',
            [company, first_name, last_name, city, business_phone]
        );
        res.status(201).json({ id: result.insertId, company, first_name, last_name, city, business_phone });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear proveedor', error: error.message });
    }
});

// PUT: Actualizar un proveedor existente
app.put('/api/suppliers/:id', async (req, res) => {
    const { id } = req.params;
    const { company, first_name, last_name, city, business_phone } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE suppliers SET company = ?, first_name = ?, last_name = ?, city = ?, business_phone = ? WHERE id = ?',
            [company, first_name, last_name, city, business_phone, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Proveedor no encontrado' });
        res.json({ id, company, first_name, last_name, city, business_phone });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar proveedor', error: error.message });
    }
});

// DELETE: Eliminar un proveedor
app.delete('/api/suppliers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM suppliers WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Proveedor no encontrado' });
        res.json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar proveedor', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});