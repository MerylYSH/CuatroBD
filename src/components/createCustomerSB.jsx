import { useState } from "react";
import { createCustomer } from "../crud/customer_Supabase";

const CreateCustomer = ({recargar}) => {

const [form,setForm] = useState({
customer_id:"",
company_name:"",
contact_name:"",
city:"",
country:""
})

const handleChange = (e)=>{
setForm({
...form,
[e.target.name]:e.target.value
})
}

const handleSubmit = async(e)=>{
e.preventDefault()

await createCustomer(form)

recargar()

setForm({
customer_id:"",
company_name:"",
contact_name:"",
city:"",
country:""
})

}

return(

<form onSubmit={handleSubmit}>

<h3>Agregar Cliente</h3>

<input
name="customer_id"
placeholder="ID"
value={form.customer_id}
onChange={handleChange}
/>

<input
name="company_name"
placeholder="Empresa"
value={form.company_name}
onChange={handleChange}
/>

<input
name="contact_name"
placeholder="Nombre"
value={form.contact_name}
onChange={handleChange}
/>

<input
name="city"
placeholder="Ciudad"
value={form.city}
onChange={handleChange}
/>

<input
name="country"
placeholder="País"
value={form.country}
onChange={handleChange}
/>

<button className="primary">Guardar</button>

</form>

)

}

export default CreateCustomer