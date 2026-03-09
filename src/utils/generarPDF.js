import jsPDF from "jspdf"

export const generarNotaVenta = (venta)=>{

const doc = new jsPDF()

doc.text("NOTA DE VENTA",20,20)

doc.text("Producto: "+venta.producto,20,40)
doc.text("Cantidad: "+venta.cantidad,20,50)
doc.text("Precio: "+venta.precio,20,60)
doc.text("Total: "+venta.total,20,70)

doc.save("nota_venta.pdf")

}

export const generarPedidoPDF = (pedido)=>{

const doc = new jsPDF()

doc.text("PEDIDO A PROVEEDOR",20,20)

doc.text("Producto: "+pedido.producto,20,40)
doc.text("Cantidad: "+pedido.cantidad,20,50)

doc.save("pedido.pdf")

}