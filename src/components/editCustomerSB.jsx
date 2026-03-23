import { useState, useEffect } from "react";
import { updateCustomer } from "../crud/customer_Supabase";

const EditCustomer = ({ clienteSeleccionado, recargar, cancelar }) => {

  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    city: "",
    country: ""
  });

  useEffect(() => {
    if (clienteSeleccionado) {
      setForm(clienteSeleccionado);
    }
  }, [clienteSeleccionado]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardar = async (e) => {
    e.preventDefault();

    // 🔴 Validación básica
    if (!form.company_name || !form.contact_name) {
      alert("Completa los campos obligatorios");
      return;
    }

    await updateCustomer(form.customer_id, form);

    recargar();
    cancelar();
  };

  return (
    <form onSubmit={guardar} className="form">

      <div className="form-group">
        <label>Empresa</label>
        <input
          name="company_name"
          value={form.company_name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Nombre</label>
        <input
          name="contact_name"
          value={form.contact_name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Ciudad</label>
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>País</label>
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
        />
      </div>

      <div className="actions">
        <button type="submit" className="primary">
          Actualizar
        </button>

        <button type="button" className="delete" onClick={cancelar}>
          Cancelar
        </button>
      </div>

    </form>
  );
};

export default EditCustomer;