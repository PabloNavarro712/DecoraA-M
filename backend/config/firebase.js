const admin = require('firebase-admin');
const serviceAccount = require('./../equipo-4-f104b-firebase-adminsdk-g4wzk-6e262237c2.json'); // Ruta al archivo de clave privada

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://equipo-4-f104b.firebaseio.com' // Cambia esto por la URL de tu base de datos
});

const db = admin.firestore(); // Usando Firestore
const bucket = admin.storage().bucket(); // Para Storage

module.exports = { admin, db, bucket };
