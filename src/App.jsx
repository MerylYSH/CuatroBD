import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Importamos todas las páginas de tu carpeta "pages"
import Inicio from "./pages/Inicio";
import CustomerSB from "./pages/customerSB"; // Tu página de clientes // Tu página de proveedores
import Inventario from "./pages/Inventario";
import Pedidos from "./pages/Pedidos";
import Ventas from "./pages/Ventas";
import Proveedores from "./pages/Proveedores";

function App() {
    return (
        <div className="app-container">
            {/* El Navbar siempre visible a la izquierda */}
            <Navbar />

            <div className="main-content">
                <Routes>
                    {/* Ruta por defecto que muestra el inicio */}
                    <Route path="/" element={<Inicio />} />

                    {/* Nuevas rutas agregadas para coincidir con tu Navbar */}
                    <Route path="/clientes" element={<CustomerSB />} />

                    {/* Rutas que ya tenías */}
                    <Route path="/inventario" element={<Inventario />} />
                    <Route path="/Pedidos" element={<Pedidos />} />
                    <Route path="/Ventas" element={<Ventas />} />
                    <Route path="/Proveedores" element={<Proveedores />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;