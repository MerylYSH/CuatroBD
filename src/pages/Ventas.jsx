// src/pages/Ventas.jsx
import { useState, useEffect } from "react";
import {
  crearVenta,
  obtenerVentas,
  actualizarVenta,
  eliminarVenta,
} from "../services/firebaseService";
// Importamos las funciones de generación de PDF
import { generarNotaVenta, generarReporteTotalVentas } from "../utils/generarPDF";

function Ventas() {
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para manejar la edición
  const [editandoId, setEditandoId] = useState(null);
  const [editProducto, setEditProducto] = useState("");
  const [editCantidad, setEditCantidad] = useState("");
  const [editPrecio, setEditPrecio] = useState("");

  // ─── LEER: Cargar ventas desde Firebase ───
  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    try {
      setLoading(true);
      const datos = await obtenerVentas();
      setVentas(datos);
    } catch (err) {
      setError("Error al cargar las ventas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ─── CREAR ───
  const agregarVenta = async () => {
    if (!producto || !cantidad || !precio) {
      alert("Completa todos los campos");
      return;
    }

    const total = Number(cantidad) * Number(precio);
    const nuevaVenta = {
      producto,
      cantidad: Number(cantidad),
      precio: Number(precio),
      total,
    };

    try {
      const ventaGuardada = await crearVenta(nuevaVenta);
      setVentas([ventaGuardada, ...ventas]);
      setProducto("");
      setCantidad("");
      setPrecio("");
    } catch (err) {
      alert("Error al registrar la venta");
      console.error(err);
    }
  };

  // ─── ACTUALIZAR ───
  const iniciarEdicion = (venta) => {
    setEditandoId(venta.id);
    setEditProducto(venta.producto);
    setEditCantidad(venta.cantidad);
    setEditPrecio(venta.precio);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setEditProducto("");
    setEditCantidad("");
    setEditPrecio("");
  };

  const guardarEdicion = async (id) => {
    if (!editProducto || !editCantidad || !editPrecio) {
      alert("Completa todos los campos");
      return;
    }

    const datosActualizados = {
      producto: editProducto,
      cantidad: Number(editCantidad),
      precio: Number(editPrecio),
      total: Number(editCantidad) * Number(editPrecio),
    };

    try {
      await actualizarVenta(id, datosActualizados);
      setVentas(
        ventas.map((v) => (v.id === id ? { ...v, ...datosActualizados } : v))
      );
      cancelarEdicion();
    } catch (err) {
      alert("Error al actualizar la venta");
      console.error(err);
    }
  };

  // ─── ELIMINAR ───
  const borrarVenta = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar esta venta?")) return;

    try {
      await eliminarVenta(id);
      setVentas(ventas.filter((v) => v.id !== id));
    } catch (err) {
      alert("Error al eliminar la venta");
      console.error(err);
    }
  };

  const totalVentas = ventas.reduce((acc, v) => acc + v.total, 0);

  // ─── RENDER ───
  return (
    <div style={styles.container}>

      {/* Encabezado con Botón de Reporte General */}
      <div style={styles.headerRow}>
        <h1 style={styles.titulo}>🛒 Registro de Ventas</h1>
        <button
          style={styles.btnReporte}
          onClick={() => generarReporteTotalVentas(ventas, totalVentas)}
        >
          📊 Descargar Reporte Total
        </button>
      </div>

      {/* ── Formulario de Nueva Venta ── */}
      <div style={styles.form}>
        <h2 style={styles.subtitulo}>Nueva Venta</h2>
        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            placeholder="Producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Cantidad"
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Precio unitario"
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <button style={styles.btnPrimary} onClick={agregarVenta}>
            ➕ Registrar Venta
          </button>
        </div>
      </div>

      {/* ── Tabla de Ventas ── */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando ventas...</p>
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <table style={styles.tabla}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Producto</th>
              <th style={styles.th}>Cantidad</th>
              <th style={styles.th}>Precio</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((v, i) => (
              <tr key={v.id} style={i % 2 === 0 ? styles.trPar : styles.trImpar}>
                {editandoId === v.id ? (
                  <>
                    <td style={styles.td}>{i + 1}</td>
                    <td style={styles.td}>
                      <input
                        style={styles.inputTabla}
                        value={editProducto}
                        onChange={(e) => setEditProducto(e.target.value)}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        style={styles.inputTabla}
                        type="number"
                        value={editCantidad}
                        onChange={(e) => setEditCantidad(e.target.value)}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        style={styles.inputTabla}
                        type="number"
                        value={editPrecio}
                        onChange={(e) => setEditPrecio(e.target.value)}
                      />
                    </td>
                    <td style={styles.td}>
                      ${(Number(editCantidad) * Number(editPrecio)).toFixed(2)}
                    </td>
                    <td style={styles.td}>
                      <button style={styles.btnGuardar} onClick={() => guardarEdicion(v.id)}>✅ Guardar</button>
                      <button style={styles.btnCancelar} onClick={cancelarEdicion}>✖ Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={styles.td}>{i + 1}</td>
                    <td style={styles.td}>{v.producto}</td>
                    <td style={styles.td}>{v.cantidad}</td>
                    <td style={styles.td}>${v.precio.toFixed(2)}</td>
                    <td style={styles.td}>${v.total.toFixed(2)}</td>
                    <td style={styles.td}>
                      {/* Botón para PDF Individual */}
                      <button style={styles.btnPdf} onClick={() => generarNotaVenta(v)}>📄 PDF</button>
                      <button style={styles.btnEditar} onClick={() => iniciarEdicion(v)}>✏️</button>
                      <button style={styles.btnEliminar} onClick={() => borrarVenta(v.id)}>🗑️</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 style={styles.total}>Total de ventas: ${totalVentas.toFixed(2)}</h2>
    </div>
  );
}

// ─── Estilos ───
const styles = {
  container: { padding: "20px", fontFamily: "sans-serif", maxWidth: "950px", margin: "0 auto" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  titulo: { color: "#1a1a2e", margin: 0 },
  subtitulo: { marginBottom: "10px", fontSize: "16px", color: "#444" },
  form: { background: "#f5f5f5", padding: "16px", borderRadius: "8px", marginBottom: "24px" },
  inputGroup: { display: "flex", gap: "10px", flexWrap: "wrap" },
  input: { padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", flex: "1" },
  inputTabla: { padding: "4px 8px", borderRadius: "4px", border: "1px solid #aaa", width: "80px" },
  btnPrimary: { padding: "8px 16px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
  btnReporte: { padding: "10px 18px", background: "#1e293b", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
  tabla: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
  th: { background: "#4f46e5", color: "white", padding: "10px", textAlign: "left" },
  td: { padding: "8px 10px", fontSize: "14px", borderBottom: "1px solid #eee" },
  trPar: { background: "#fff" },
  trImpar: { background: "#f9f9ff" },
  btnPdf: { marginRight: "6px", padding: "4px 8px", background: "#06b6d4", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  btnEditar: { marginRight: "6px", padding: "4px 8px", background: "#f59e0b", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  btnEliminar: { padding: "4px 8px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  btnGuardar: { marginRight: "6px", padding: "4px 8px", background: "#22c55e", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  btnCancelar: { padding: "4px 8px", background: "#6b7280", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  total: { marginTop: "20px", color: "#1a1a2e", textAlign: "right" },
};

export default Ventas;