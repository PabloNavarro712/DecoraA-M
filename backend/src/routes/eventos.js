// backend/routes/eventos.js
const express = require('express');
const { db } = require('../config/firebase'); // Asegúrate de que firebase.js exporte db
const router = express.Router();

// Crear un nuevo evento
router.post('/', async (req, res) => {
    const { Descripcion, InformacionContacto, FechaEvento, EstadoEvento } = req.body;

    // Validación básica para asegurarse de que los campos importantes no estén vacíos
    if (!Descripcion || !InformacionContacto || !FechaEvento || !EstadoEvento) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const newEvent = { Descripcion, InformacionContacto, FechaEvento, EstadoEvento };
        const docRef = await db.collection('eventos').add(newEvent);
        res.status(201).send({ id: docRef.id, ...newEvent });
    } catch (error) {
        res.status(500).send({ error: 'Error creando el evento' });
    }
});

// Obtener todos los eventos
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('eventos').get();
        const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(events);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo eventos' });
    }
});

// Actualizar un evento
router.put('/:id', async (req, res) => {
    const eventId = req.params.id;
    const { Descripcion, InformacionContacto, FechaEvento, EstadoEvento } = req.body;

    // Validación básica
    if (!Descripcion || !InformacionContacto || !FechaEvento || !EstadoEvento) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const updatedEvent = { Descripcion, InformacionContacto, FechaEvento, EstadoEvento };
        await db.collection('eventos').doc(eventId).update(updatedEvent);
        res.send({ id: eventId, ...updatedEvent });
    } catch (error) {
        res.status(500).send({ error: 'Error actualizando el evento' });
    }
});

// Eliminar un evento
router.delete('/:id', async (req, res) => {
    const eventId = req.params.id;
    try {
        await db.collection('eventos').doc(eventId).delete();
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: 'Error eliminando el evento' });
    }
});

module.exports = router;
