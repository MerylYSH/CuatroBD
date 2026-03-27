// src/services/generarPDF.js
import jsPDF from "jspdf";

/**
 * Genera un PDF para una sola venta (Ticket/Nota)
 */
export const generarNotaVenta = (venta) => {
    const doc = new jsPDF();

    // Encabezado
    doc.setFontSize(16);
    doc.text("NOTA DE VENTA", 20, 20);
    doc.setFontSize(10);
    doc.text("Fecha: " + new Date().toLocaleDateString(), 20, 30);
    doc.text("--------------------------------------------------", 20, 35);

    // Detalles del producto
    doc.setFontSize(12);
    doc.text("Producto: " + venta.producto, 20, 45);
    doc.text("Cantidad: " + venta.cantidad, 20, 55);
    doc.text("Precio unitario: $" + venta.precio.toFixed(2), 20, 65);

    doc.text("--------------------------------------------------", 20, 75);
    doc.setFontSize(14);
    doc.text("Total a Pagar: $" + venta.total.toFixed(2), 20, 85);

    doc.save(`nota_${venta.producto}_${venta.id.slice(0, 5)}.pdf`);
};

/**
 * Genera un PDF con el listado de todas las ventas actuales
 */
export const generarReporteTotalVentas = (ventas, totalGeneral) => {
    const doc = new jsPDF();

    // Título y Fecha
    doc.setFontSize(18);
    doc.text("REPORTE GENERAL DE VENTAS", 20, 20);
    doc.setFontSize(10);
    doc.text("Generado el: " + new Date().toLocaleString(), 20, 30);

    // Encabezados de tabla manual
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text("Producto", 20, 45);
    doc.text("Cant.", 100, 45);
    doc.text("Precio U.", 130, 45);
    doc.text("Subtotal", 165, 45);
    doc.setFont(undefined, 'normal');
    doc.line(20, 47, 190, 47); // Línea divisoria

    let y = 55;

    // Listado de productos
    ventas.forEach((v) => {
        // Control básico de nueva página
        if (y > 270) {
            doc.addPage();
            y = 20;
        }

        doc.text(v.producto.toString(), 20, y);
        doc.text(v.cantidad.toString(), 100, y);
        doc.text("$" + v.precio.toFixed(2), 130, y);
        doc.text("$" + v.total.toFixed(2), 165, y);

        y += 10;
    });

    // Resumen final
    doc.line(20, y, 190, y);
    y += 10;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("TOTAL ACUMULADO: $" + totalGeneral.toFixed(2), 115, y);

    doc.save("reporte_ventas_completo.pdf");
};

/**
 * Genera un PDF para pedidos a proveedores
 */
export const generarPedidoPDF = (pedido) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("PEDIDO A PROVEEDOR", 20, 20);

    doc.setFontSize(12);
    doc.text("Producto solicitado: " + pedido.producto, 20, 40);
    doc.text("Cantidad requerida: " + pedido.cantidad, 20, 50);

    doc.setFontSize(10);
    doc.text("Favor de confirmar recepción de este pedido.", 20, 70);

    doc.save("pedido_proveedor.pdf");
}; 