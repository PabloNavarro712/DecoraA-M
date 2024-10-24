// backend/routes/servicios.js
const express = require('express');
const { db } = require('../config/firebase'); // Asegúrate de importar la conexión a Firebase
const router = express.Router();

// Crear un nuevo servicio
router.post('/', async (req, res) => {
    const { titulo, descripcion, imagen, elementos, precio, opciones } = req.body;

    if (!titulo || !descripcion || !imagen || !elementos || !precio || !opciones) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const newService = { titulo, descripcion, imagen, elementos, precio, opciones };
        const docRef = await db.collection('servicios').add(newService);
        res.status(201).send({ id: docRef.id, ...newService });
    } catch (error) {
        res.status(500).send({ error: 'Error creando el servicio' });
    }
});

// Obtener todos los servicios
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('servicios').get();
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(items);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo servicios' });
    }
});

// Actualizar un servicio
router.put('/:id', async (req, res) => {
    const itemId = req.params.id;
    const { titulo, descripcion, imagen, elementos, precio, opciones } = req.body;

    try {
        await db.collection('servicios').doc(itemId).update({ titulo, descripcion, imagen, elementos, precio, opciones });
        res.send({ id: itemId, titulo, descripcion, imagen, elementos, precio, opciones });
    } catch (error) {
        res.status(500).send({ error: 'Error actualizando el servicio' });
    }
});

// Eliminar un servicio
router.delete('/:id', async (req, res) => {
    const itemId = req.params.id;

    try {
        await db.collection('servicios').doc(itemId).delete();
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: 'Error eliminando el servicio' });
    }
});

module.exports = router;
