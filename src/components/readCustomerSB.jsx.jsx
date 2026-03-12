import { useEffect, useState } from "react";
import { getCustomers } from "../crud/customer_Supabase";

const ReadCustomer = () => {

const [customers,setCustomers] = useState([]);

useEffect(()=>{

const cargarClientes = async ()=>{
const data = await getCustomers();
setCustomers(data);
}

cargarClientes();

},[])

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
<th>Pais</th>
</tr>
</thead>
<tbody>

{customers?.map((c) => (

<tr key={c.customer_id}>

<td>{c.customer_id}</td>
<td>{c.company_name}</td>
<td>{c.contact_name}</td>
<td>{c.city}</td>
<td>{c.country}</td>

</tr>

))}

</tbody>
</table>

</div>

)

}

export default ReadCustomer