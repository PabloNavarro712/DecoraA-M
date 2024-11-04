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
// Obtener solo las fechas de los eventos
router.get('/fechas-no-seleccionables', async (req, res) => {
    try {
        const snapshot = await db.collection('eventos').select('FechaEvento').get();
        const fechas = snapshot.docs.map(doc => doc.data().FechaEvento);
        res.send(fechas);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo las fechas no seleccionables' });
    }
});

// Obtener todas las fechas de eventos activos
router.get('/fechas', async (req, res) => {
    try {
        const snapshot = await db.collection('eventos').where('EstadoEvento', '!=', 'cancelado').get();
        const fechas = snapshot.docs.map(doc => doc.data().FechaEvento); // Solo fechas
        res.send(fechas);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo las fechas de eventos' });
    }
});

// Obtener eventos por estado
router.get('/estado/:estado', async (req, res) => {
    const estado = req.params.estado.toLowerCase(); // Convertimos a minúsculas para asegurar consistencia en los datos
    try {
        const snapshot = await db.collection('eventos').where('EstadoEvento', '==', estado).get();
        const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(events);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo eventos por estado' });
    }
});
// Obtener eventos próximos a la fecha actual
router.get('/proximos', async (req, res) => {
    try {
        const fechaActual = new Date().toISOString().split('T')[0]; // Obtener fecha actual en formato YYYY-MM-DD
        const snapshot = await db.collection('eventos')
            .where('FechaEvento', '>=', fechaActual)
            .orderBy('FechaEvento') // Ordena los eventos próximos por fecha ascendente
            .get();

        const eventosProximos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(eventosProximos);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo eventos próximos' });
    }
});





module.exports = router;
