import { useEffect, useState } from "react";
import { getCustomers } from "../crud/customer_Supabase";

import ReadCustomer from "../components/readCustomerSB.jsx";
import CreateCustomer from "../components/createCustomerSB";
import EditCustomer from "../components/editCustomerSB";

const CustomerSB = () => {

  const [customers, setCustomers] = useState([]);
  const [clienteEditar, setClienteEditar] = useState(null);

  const cargarClientes = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  return (
    <div className="container">

      <h1 className="title">Gestión de Clientes</h1>

      {/* CREAR */}
      <div className="card">

        <CreateCustomer recargar={cargarClientes} />
      </div>

      {/* EDITAR */}
      {clienteEditar && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Editar Cliente</h2>

      <EditCustomer
        clienteSeleccionado={clienteEditar}
        recargar={cargarClientes}
        cancelar={() => setClienteEditar(null)}
      />

    </div>
  </div>
)}

      {/* LISTA */}
      <div className="card">
        <ReadCustomer
          customers={customers}
          recargar={cargarClientes}
          setClienteEditar={setClienteEditar}
        />
      </div>

    </div>
  );
};

export default CustomerSB;