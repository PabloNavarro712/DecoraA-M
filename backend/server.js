// backend/server.js
const express = require('express');
const cors = require('cors');
const { db, bucket } = require('./firebase'); // Importa el db y bucket de Firebase
const multer = require('multer'); // Multer para manejar archivos
const path = require('path');
const bcrypt = require('bcrypt'); // Importa bcrypt para encriptar contraseñas

const app = express();
const port = 3000;

app.use(cors()); // Middleware CORS para permitir solicitudes de cualquier origen
app.use(express.json()); // Parseo de cuerpo JSON en las solicitudes

// Configuración de multer para manejar archivos en memoria
const upload = multer({ storage: multer.memoryStorage() });

// Ruta para subir imagen a Firebase Storage
app.post('/api/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No se ha recibido ningún archivo' });
    }

    try {
        // Generar un nombre único para el archivo
        const fileName = `${Date.now()}_${req.file.originalname}`;
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        blobStream.on('error', (err) => {
            res.status(500).send({ error: err.message });
        });

        blobStream.on('finish', async () => {
            // Hacer que el archivo sea público
            await blob.makePublic();
        
            // Obtener la URL pública del archivo subido
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            res.status(200).send({ imageUrl: publicUrl });
        });
        
        blobStream.end(req.file.buffer); // Subir el archivo a Firebase Storage
    } catch (error) {
        res.status(500).send({ error: 'Error subiendo la imagen' });
    }
});

// Crear un nuevo elemento en la colección 'galeria prueba'
app.post('/api/galeria-prueba', async (req, res) => {
    const { Categoria, Descripcion, Imagen } = req.body;
    if (!Categoria || !Descripcion || !Imagen) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const newItem = { Categoria, Descripcion, Imagen };
        const docRef = await db.collection('galeria prueba').add(newItem);
        res.status(201).send({ id: docRef.id, ...newItem });
    } catch (error) {
        res.status(500).send({ error: 'Error creando el elemento' });
    }
});

// Obtener todos los elementos de la colección 'galeria prueba'
app.get('/api/galeria-prueba', async (req, res) => {
    try {
        const snapshot = await db.collection('galeria prueba').get();
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(items);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo elementos' });
    }
});

// Actualizar un elemento en la colección 'galeria prueba'
app.put('/api/galeria-prueba/:id', async (req, res) => {
    const itemId = req.params.id;
    const { Categoria, Descripcion, Imagen } = req.body;

    try {
        await db.collection('galeria prueba').doc(itemId).update({ Categoria, Descripcion, Imagen });
        res.send({ id: itemId, Categoria, Descripcion, Imagen });
    } catch (error) {
        res.status(500).send({ error: 'Error actualizando el elemento' });
    }
});

// Eliminar un elemento en la colección 'galeria prueba'
app.delete('/api/galeria-prueba/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        await db.collection('galeria prueba').doc(itemId).delete();
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: 'Error eliminando el elemento' });
    }
});

// Ruta para registrar un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
    const { usuario, contraseña, correo, esAdmin, nombre } = req.body;

    // Validar los campos requeridos
    if (!usuario || !contrasena || !correo || !nombre) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    }

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const newUser = { usuario, contraseña: hashedPassword, correo, esAdmin, nombre };
        const docRef = await db.collection('usuarios').add(newUser);
        res.status(201).send({ id: docRef.id, ...newUser });
    } catch (error) {
        res.status(500).send({ error: 'Error creando el usuario' });
    }
});

// Ruta para autenticar a un usuario
app.post('/api/login', async (req, res) => {
    const { usuario, contraseña } = req.body;

    // Validar los campos requeridos
    if (!usuario || !contraseña) {
        return res.status(400).send({ error: 'Usuario y contraseña son obligatorios' });
    }

    try {
        const snapshot = await db.collection('usuarios').where('usuario', '==', usuario).get();
        
        if (snapshot.empty) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        const userData = snapshot.docs[0].data();

        // Verificar la contraseña
        const match = await bcrypt.compare(contraseña, userData.contraseña);
        if (match) {
            res.status(200).send({ message: 'Login exitoso', user: { id: snapshot.docs[0].id, ...userData } });
        } else {
            res.status(401).send({ error: 'Contraseña incorrecta' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Error en el login' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
