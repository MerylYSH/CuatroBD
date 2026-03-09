import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">Sistema</h2>

      <NavLink to="/" end className="nav-link">
        📊 Dashboard
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

    </div>
  );
}

export default Sidebar;