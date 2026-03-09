import axios from "axios"

const API = "http://localhost:4000"

export const obtenerProveedores = async ()=>{

const res = await axios.get(API+"/proveedores")

return res.data

}

export const agregarProveedor = async (proveedor)=>{

await axios.post(API+"/proveedores",proveedor)

}