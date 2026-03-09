import {useState} from "react"
import { obtenerProductos } from "../services/mongoService"
function Inventario(){

const [buscar,setBuscar]=useState("")

const productos=[
{nombre:"Laptop",stock:10},
{nombre:"Mouse",stock:5},
{nombre:"Teclado",stock:20}
]

const filtrados=productos.filter(p=>
p.nombre.toLowerCase().includes(buscar.toLowerCase())
)

return(

<div>

<h1>Inventario</h1>

<input
className="input"
placeholder="Buscar producto..."
value={buscar}
onChange={(e)=>setBuscar(e.target.value)}
/>

<table>

<thead>
<tr>
<th>Producto</th>
<th>Stock</th>
</tr>
</thead>

<tbody>

{filtrados.length===0 ? (

<tr>
<td colSpan="2">No se encontraron productos</td>
</tr>

):(

filtrados.map((p,i)=>(

<tr key={i}>

<td>{p.nombre}</td>

<td className={p.stock<10 ? "stock-bajo":""}>
{p.stock}
</td>

</tr>

))

)}

</tbody>

</table>

</div>

)

}

export default Inventario