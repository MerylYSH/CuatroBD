import { deleteCustomer } from "../crud/customer_Supabase";

const ReadCustomer = ({ customers, recargar, setClienteEditar }) => {
const eliminarCliente = async (id) => {


await deleteCustomer(id)

recargar()

}

return(

<div>

<h2>Lista de Clientes</h2>

<table>

<thead>
<tr>
<th>ID</th>
<th>Empresa</th>
<th>Nombre</th>
<th>Ciudad</th>
<th>País</th>
<th>Acciones</th>
</tr>
</thead>

<tbody>

{customers?.map((c)=>(
<tr key={c.customer_id}>

<td>{c.customer_id}</td>
<td>{c.company_name}</td>
<td>{c.contact_name}</td>
<td>{c.city}</td>
<td>{c.country}</td>

<td>
  <div className="actions">
    <button 
  className="edit"
  onClick={() => setClienteEditar(c)}
>
  Editar
</button>
    <button className="delete" onClick={() => eliminarCliente(c.customer_id)}>
      Eliminar
    </button>
  </div>
</td>

</tr>
))}

</tbody>

</table>

</div>

)

}

export default ReadCustomer