// src/services/ventasFirebaseService.js
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

// Referencia a la "colección" (equivalente a la tabla en MySQL)
const ventasCollection = collection(db, "ventas");

// 1. Crear una nueva venta (Incluye los order_details dentro)
export const crearVenta = async (ventaData) => {
  try {
    // Añadimos la fecha automáticamente si no viene
    const nuevaVenta = {
      ...ventaData,
      order_date: new Date().toISOString()
    };
    
    const docRef = await addDoc(ventasCollection, nuevaVenta);
    return { id: docRef.id, ...nuevaVenta };
  } catch (error) {
    console.error("Error al crear la venta en Firebase: ", error);
    throw new Error("No se pudo registrar la venta");
  }
};

// 2. Obtener todas las ventas
export const obtenerVentas = async () => {
  try {
    // Consultamos las ventas ordenadas por fecha (las más recientes primero)
    const q = query(ventasCollection, orderBy("order_date", "desc"));
    const querySnapshot = await getDocs(q);
    
    // Mapeamos los documentos para incluir su ID único de Firebase
    const ventas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return ventas;
  } catch (error) {
    console.error("Error al obtener ventas: ", error);
    throw new Error("No se pudieron cargar las ventas");
  }
};

// 3. Actualizar una venta (Ej: cambiar estado de "Enviado" a "Entregado")
export const actualizarVenta = async (id, datosActualizados) => {
  try {
    const ventaRef = doc(db, "ventas", id);
    await updateDoc(ventaRef, datosActualizados);
    return { id, ...datosActualizados };
  } catch (error) {
    console.error("Error al actualizar la venta: ", error);
    throw new Error("No se pudo actualizar la venta");
  }
};

// 4. Eliminar una venta (Usar con precaución)
export const eliminarVenta = async (id) => {
  try {
    const ventaRef = doc(db, "ventas", id);
    await deleteDoc(ventaRef);
    return id;
  } catch (error) {
    console.error("Error al eliminar la venta: ", error);
    throw new Error("No se pudo eliminar la venta");
  }
};