import { useState } from "react";
import { guardarPedido } from "../services/firebaseService";

function Pedidos(){

const [producto,setProducto]=useState("")
const [cantidad,setCantidad]=useState("")
const [pedidos,setPedidos]=useState([])

const agregarPedido = async () => {

if(!producto || !cantidad){
alert("Completa los campos")
return
}

const nuevoPedido = {
producto,
cantidad,
fecha: new Date()
}

// guardar en Firebase
await guardarPedido(nuevoPedido)

// guardar en estado local
setPedidos([...pedidos,nuevoPedido])

setProducto("")
setCantidad("")

}

return(

<div>

<h1>Gestión de Pedidos</h1>

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

<button onClick={agregarPedido}>
Agregar Pedido
</button>

</div>

<table>

<thead>
<tr>
<th>#</th>
<th>Producto</th>
<th>Cantidad</th>
</tr>
</thead>

<tbody>

{pedidos.map((p,i)=>(

<tr key={i}>
<td>{i+1}</td>
<td>{p.producto}</td>
<td>{p.cantidad}</td>
</tr>

))}

</tbody>

</table>

</div>

)

}

export default Pedidos