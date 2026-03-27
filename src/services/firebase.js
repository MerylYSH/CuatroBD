// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Reemplaza esto con la configuración que te da Firebase en tu consola
const firebaseConfig = {
  apiKey: "AIzaSyCICkV9-IGm_7I9lgaJ3rrzk9br9OCAvuc",
  authDomain: "northwind-f4bc0.firebaseapp.com",
  projectId: "northwind-f4bc0",
  storageBucket: "northwind-f4bc0.firebasestorage.app",
  messagingSenderId: "96146410849",
  appId: "1:96146410849:web:2a5861b0637adb7ed64920"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar y exportar la base de datos Firestore
export const db = getFirestore(app);