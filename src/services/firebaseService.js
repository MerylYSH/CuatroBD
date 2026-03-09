import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const guardarPedido = async (pedido) => {

  try{

    await addDoc(collection(db,"pedidos"),pedido)

  }catch(error){

    console.log(error)

  }

}

export const obtenerPedidos = async ()=>{

  const querySnapshot = await getDocs(collection(db,"pedidos"))

  return querySnapshot.docs.map(doc=>({
    id:doc.id,
    ...doc.data()
  }))

}