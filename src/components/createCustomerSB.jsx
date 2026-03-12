import { useState } from "react";
import { createCustomer } from "../crud/customer_Supabase";

const CreateCustomer = () => {

const [form,setForm] = useState({
customer_id:"",
company_name:"",
contact_name:"",
country:""
});

const handleChange = (e)=>{
setForm({
...form,
[e.target.name]: e.target.value
});
}

const handleSubmit = async(e)=>{
e.preventDefault();

await createCustomer(form);

alert("Cliente agregado");

}

return(

<form onSubmit={handleSubmit}>

<input
name="customer_id"
placeholder="ID"
onChange={handleChange}
/>

<input
name="company_name"
placeholder="Empresa"
onChange={handleChange}
/>

<input
name="contact_name"
placeholder="Contacto"
onChange={handleChange}
/>

<input
name="country"
placeholder="País"
onChange={handleChange}
/>

<button type="submit">
Agregar Cliente
</button>

</form>

)

}

export default CreateCustomer