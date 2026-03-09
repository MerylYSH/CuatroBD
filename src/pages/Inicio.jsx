function Inicio(){

const datos = [
  {titulo:"Productos",valor:120},
  {titulo:"Pedidos",valor:32},
  {titulo:"Ventas",valor:"$5800"}
]

return(

<div>

<h1>Dashboard</h1>

<div className="cards">

{datos.map((d,i)=>(

<div className="card" key={i}>
<h2>{d.valor}</h2>
<p>{d.titulo}</p>
</div>

))}

</div>

</div>

)

}

export default Inicio