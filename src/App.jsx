import { BrowserRouter,Routes,Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"

import Inicio from "./pages/Inicio"
import Inventario from "./pages/Inventario"
import Pedidos from "./pages/Pedidos"
import Ventas from "./pages/Ventas"

function App(){

return(

<BrowserRouter>

<div className="layout">

<Sidebar/>

<div className="content">

<Routes>

<Route path="/" element={<Inicio/>}/>
<Route path="/inventario" element={<Inventario/>}/>
<Route path="/pedidos" element={<Pedidos/>}/>
<Route path="/ventas" element={<Ventas/>}/>

</Routes>

</div>

</div>

</BrowserRouter>

)

}

export default App