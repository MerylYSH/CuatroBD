import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sidebar">

      <h2 className="logo">Mi Sistema</h2>

      <NavLink to="/" className="nav-link">
        🏠 Inicio
      </NavLink>

      <NavLink to="/inventario" className="nav-link">
        📦 Inventario
      </NavLink>

      <NavLink to="/pedidos" className="nav-link">
        📋 Pedidos
      </NavLink>

      <NavLink to="/ventas" className="nav-link">
        💰 Ventas
      </NavLink>

    </nav>
  );
}

export default Navbar;