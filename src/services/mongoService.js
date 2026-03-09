import axios from "axios"

const API = "http://localhost:4000"

export const obtenerProductos = async ()=>{

const res = await axios.get(API+"/productos")

return res.data

}

export const agregarProducto = async (producto)=>{

await axios.post(API+"/productos",producto)

}