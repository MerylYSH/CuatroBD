import mongoose from "mongoose";

const conection = async () => {
    console.log('desde la funcion conection, intentado conectar');
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/db-Sistema");
        console.log('::: EXITO conectado a la base de datos:::');
    } catch (error) {
        console.log('error', error);
        throw new Error("::: ERROR no se ha podido establecer conexion con la base de datos:::");
    }
}

export default conection;