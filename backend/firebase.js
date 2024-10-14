// backend/firebase.js
const admin = require('firebase-admin');

// Inicializa Firebase Admin con las credenciales del servicio
const serviceAccount = require('./equipo-4-f104b-firebase-adminsdk-g4wzk-6e262237c2.json'); // Cambia la ruta al archivo de clave del servicio

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://equipo-4-f104b.firebaseio.com', // Cambia esto por la URL de tu base de datos
  storageBucket: 'equipo-4-f104b.appspot.com' // Agrega el bucket de almacenamiento (Reemplaza con el nombre correcto)
});

const db = admin.firestore();
const bucket = admin.storage().bucket();  // Agrega el bucket para Firebase Storage

module.exports = { db, bucket };
