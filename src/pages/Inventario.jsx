// src/pages/Inventario.jsx
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";

// ─── Servicio inline para inventario ───
const inventarioCollection = collection(db, "inventario");

const crearProducto = async (data) => {
    const docRef = await addDoc(inventarioCollection, data);
    return { id: docRef.id, ...data };
};

const obtenerProductos = async () => {
    const q = query(inventarioCollection, orderBy("nombre", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

const actualizarProducto = async (id, datos) => {
    await updateDoc(doc(db, "inventario", id), datos);
    return { id, ...datos };
};

const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "inventario", id));
    return id;
};

// ─── Componente ───
function Inventario() {
    const [productos, setProductos] = useState([]);
    const [buscar, setBuscar] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form nuevo producto
    const [nombre, setNombre] = useState("");
    const [stock, setStock] = useState("");
    const [categoria, setCategoria] = useState("");

    // Edición inline
    const [editandoId, setEditandoId] = useState(null);
    const [editNombre, setEditNombre] = useState("");
    const [editStock, setEditStock] = useState("");
    const [editCategoria, setEditCategoria] = useState("");

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            setLoading(true);
            const datos = await obtenerProductos();
            setProductos(datos);
        } catch (err) {
            setError("Error al cargar el inventario");
        } finally {
            setLoading(false);
        }
    };

    // ─── CREAR ───
    const agregarProducto = async () => {
        if (!nombre || !stock) {
            alert("Nombre y stock son obligatorios");
            return;
        }
        try {
            const nuevo = await crearProducto({
                nombre,
                stock: Number(stock),
                categoria: categoria || "Sin categoría",
            });
            setProductos([...productos, nuevo].sort((a, b) => a.nombre.localeCompare(b.nombre)));
            setNombre("");
            setStock("");
            setCategoria("");
        } catch (err) {
            alert("Error al agregar el producto");
        }
    };

    // ─── EDITAR ───
    const iniciarEdicion = (p) => {
        setEditandoId(p.id);
        setEditNombre(p.nombre);
        setEditStock(p.stock);
        setEditCategoria(p.categoria);
    };

    const cancelarEdicion = () => setEditandoId(null);

    const guardarEdicion = async (id) => {
        if (!editNombre || editStock === "") {
            alert("Nombre y stock son obligatorios");
            return;
        }
        try {
            const actualizado = { nombre: editNombre, stock: Number(editStock), categoria: editCategoria };
            await actualizarProducto(id, actualizado);
            setProductos(productos.map((p) => (p.id === id ? { ...p, ...actualizado } : p)));
            cancelarEdicion();
        } catch (err) {
            alert("Error al actualizar el producto");
        }
    };

    // ─── ELIMINAR ───
    const borrarProducto = async (id) => {
        if (!confirm("¿Eliminar este producto del inventario?")) return;
        try {
            await eliminarProducto(id);
            setProductos(productos.filter((p) => p.id !== id));
        } catch (err) {
            alert("Error al eliminar el producto");
        }
    };

    const filtrados = productos.filter((p) =>
        p.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
        p.categoria?.toLowerCase().includes(buscar.toLowerCase())
    );

    const totalProductos = productos.length;
    const stockBajo = productos.filter((p) => p.stock < 10).length;
    const stockTotal = productos.reduce((acc, p) => acc + p.stock, 0);

    return (
        <div style={s.container}>
            <h1 style={s.titulo}>📦 Inventario</h1>

            {/* ── Tarjetas resumen ── */}
            <div style={s.cards}>
                <div style={s.card}>
                    <span style={s.cardNum}>{totalProductos}</span>
                    <span style={s.cardLabel}>Productos</span>
                </div>
                <div style={{ ...s.card, borderColor: "#ef4444" }}>
                    <span style={{ ...s.cardNum, color: "#ef4444" }}>{stockBajo}</span>
                    <span style={s.cardLabel}>Stock bajo (&lt;10)</span>
                </div>
                <div style={{ ...s.card, borderColor: "#22c55e" }}>
                    <span style={{ ...s.cardNum, color: "#22c55e" }}>{stockTotal}</span>
                    <span style={s.cardLabel}>Unidades totales</span>
                </div>
            </div>

            {/* ── Formulario nuevo producto ── */}
            <div style={s.form}>
                <h2 style={s.subtitulo}>Agregar Producto</h2>
                <div style={s.inputGroup}>
                    <input
                        style={s.input}
                        placeholder="Nombre del producto"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <input
                        style={s.input}
                        placeholder="Categoría (opcional)"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />
                    <input
                        style={{ ...s.input, maxWidth: "120px" }}
                        placeholder="Stock"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    <button style={s.btnPrimary} onClick={agregarProducto}>
                        ➕ Agregar
                    </button>
                </div>
            </div>

            {/* ── Buscador ── */}
            <input
                style={{ ...s.input, marginBottom: "16px", width: "100%", boxSizing: "border-box" }}
                placeholder="🔍 Buscar por nombre o categoría..."
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
            />

            {/* ── Tabla ── */}
            {loading ? (
                <p style={{ textAlign: "center" }}>Cargando inventario...</p>
            ) : error ? (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            ) : (
                <table style={s.tabla}>
                    <thead>
                        <tr>
                            <th style={s.th}>#</th>
                            <th style={s.th}>Producto</th>
                            <th style={s.th}>Categoría</th>
                            <th style={s.th}>Stock</th>
                            <th style={s.th}>Estado</th>
                            <th style={s.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrados.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ ...s.td, textAlign: "center", color: "#999" }}>
                                    No se encontraron productos
                                </td>
                            </tr>
                        ) : (
                            filtrados.map((p, i) => (
                                <tr key={p.id} style={i % 2 === 0 ? s.trPar : s.trImpar}>
                                    {editandoId === p.id ? (
                                        <>
                                            <td style={s.td}>{i + 1}</td>
                                            <td style={s.td}>
                                                <input style={s.inputTabla} value={editNombre} onChange={(e) => setEditNombre(e.target.value)} />
                                            </td>
                                            <td style={s.td}>
                                                <input style={s.inputTabla} value={editCategoria} onChange={(e) => setEditCategoria(e.target.value)} />
                                            </td>
                                            <td style={s.td}>
                                                <input style={{ ...s.inputTabla, width: "70px" }} type="number" value={editStock} onChange={(e) => setEditStock(e.target.value)} />
                                            </td>
                                            <td style={s.td}>—</td>
                                            <td style={s.td}>
                                                <button style={s.btnGuardar} onClick={() => guardarEdicion(p.id)}>✅ Guardar</button>
                                                <button style={s.btnCancelar} onClick={cancelarEdicion}>✖ Cancelar</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td style={s.td}>{i + 1}</td>
                                            <td style={s.td}>{p.nombre}</td>
                                            <td style={s.td}>{p.categoria}</td>
                                            <td style={{ ...s.td, fontWeight: "bold", color: p.stock < 10 ? "#ef4444" : "#22c55e" }}>
                                                {p.stock}
                                            </td>
                                            <td style={s.td}>
                                                <span style={p.stock === 0 ? s.badgeAgotado : p.stock < 10 ? s.badgeBajo : s.badgeOk}>
                                                    {p.stock === 0 ? "Agotado" : p.stock < 10 ? "Stock bajo" : "Disponible"}
                                                </span>
                                            </td>
                                            <td style={s.td}>
                                                <button style={s.btnEditar} onClick={() => iniciarEdicion(p)}>✏️ Editar</button>
                                                <button style={s.btnEliminar} onClick={() => borrarProducto(p.id)}>🗑️ Eliminar</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const s = {
    container: { padding: "20px", fontFamily: "sans-serif", maxWidth: "960px", margin: "0 auto" },
    titulo: { color: "#1a1a2e", marginBottom: "20px" },
    subtitulo: { marginBottom: "10px", fontSize: "15px", color: "#444" },
    cards: { display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" },
    card: { flex: "1", minWidth: "120px", padding: "16px", borderRadius: "10px", border: "2px solid #4f46e5", background: "#fff", textAlign: "center" },
    cardNum: { display: "block", fontSize: "28px", fontWeight: "bold", color: "#4f46e5" },
    cardLabel: { fontSize: "13px", color: "#666" },
    form: { background: "#f5f5f5", padding: "16px", borderRadius: "8px", marginBottom: "20px" },
    inputGroup: { display: "flex", gap: "10px", flexWrap: "wrap" },
    input: { padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", flex: "1", minWidth: "120px" },
    inputTabla: { padding: "4px 8px", borderRadius: "4px", border: "1px solid #aaa", width: "110px", fontSize: "13px" },
    btnPrimary: { padding: "8px 16px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
    tabla: { width: "100%", borderCollapse: "collapse" },
    th: { background: "#4f46e5", color: "white", padding: "10px", textAlign: "left", fontSize: "14px" },
    td: { padding: "8px 10px", fontSize: "14px", borderBottom: "1px solid #eee" },
    trPar: { background: "#fff" },
    trImpar: { background: "#f9f9ff" },
    btnEditar: { marginRight: "6px", padding: "4px 10px", background: "#f59e0b", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" },
    btnEliminar: { padding: "4px 10px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" },
    btnGuardar: { marginRight: "6px", padding: "4px 10px", background: "#22c55e", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" },
    btnCancelar: { padding: "4px 10px", background: "#6b7280", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" },
    badgeOk: { padding: "2px 10px", borderRadius: "12px", background: "#dcfce7", color: "#16a34a", fontSize: "12px", fontWeight: "bold" },
    badgeBajo: { padding: "2px 10px", borderRadius: "12px", background: "#fef9c3", color: "#ca8a04", fontSize: "12px", fontWeight: "bold" },
    badgeAgotado: { padding: "2px 10px", borderRadius: "12px", background: "#fee2e2", color: "#dc2626", fontSize: "12px", fontWeight: "bold" },
};

export default Inventario;