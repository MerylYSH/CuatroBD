import { useState, useEffect } from "react";


function Ventas(){

const [producto,setProducto]=useState("")
const [cantidad,setCantidad]=useState("")
const [precio,setPrecio]=useState("")
const [ventas,setVentas]=useState([])

// prueba de conexión con Supabase al cargar la página
useEffect(()=>{

pruebaConexion()

},[])

const agregarVenta = async () => {

if(!producto || !cantidad || !precio){
alert("Completa todos los campos")
return
}

const total = Number(cantidad) * Number(precio)

const nuevaVenta = {
producto,
cantidad: Number(cantidad),
precio: Number(precio),
total
}

// guardar en Supabase
await guardarVenta(nuevaVenta)

// actualizar tabla local
setVentas([...ventas,nuevaVenta])

// limpiar inputs
setProducto("")
setCantidad("")
setPrecio("")

}

const totalVentas = ventas.reduce((acc,v)=>acc+v.total,0)

return(

<div>

<h1>Registro de Ventas</h1>

<div className="form">

<input
placeholder="Producto"
value={producto}
onChange={(e)=>setProducto(e.target.value)}
/>

<input
placeholder="Cantidad"
type="number"
value={cantidad}
onChange={(e)=>setCantidad(e.target.value)}
/>

<input
placeholder="Precio"
type="number"
value={precio}
onChange={(e)=>setPrecio(e.target.value)}
/>

<button onClick={agregarVenta}>
Registrar Venta
</button>

</div>

<table>

<thead>
<tr>
<th>#</th>
<th>Producto</th>
<th>Cantidad</th>
<th>Precio</th>
<th>Total</th>
</tr>
</thead>

<tbody>

{ventas.map((v,i)=>(

<tr key={i}>
<td>{i+1}</td>
<td>{v.producto}</td>
<td>{v.cantidad}</td>
<td>${v.precio}</td>
<td>${v.total}</td>
</tr>

))}

</tbody>

</table>

<h2 style={{marginTop:"20px"}}>
Total de ventas: ${totalVentas}
</h2>

</div>

)

}

export default Ventas