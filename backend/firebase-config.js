const admin = require('firebase-admin');
const serviceAccount = require('./equipo-4-f104b-firebase-adminsdk-g4wzk-6e262237c2.json'); // Ruta de tu archivo de clave privada

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'equipo-4-f104b.appspot.com'  // Reemplaza con el ID de tu proyecto
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
