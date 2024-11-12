// backend/routes/eventos.js
const express = require('express');
const { db } = require('../config/firebase'); // Asegúrate de que firebase.js exporte db
const router = express.Router();

// Crear un nuevo evento
router.post('/', async (req, res) => {
    const {
        id_del_cliente,
        usuario,
        descripcion,
        servicio_seleccionado,
        estado_evento,
        tipo_evento,
        nombre_contacto,
        numero_telefono,
        direccion_local,
        fecha_evento,
        hora
    } = req.body;

    // Validación básica para asegurarse de que los campos importantes no estén vacíos
    if (!id_del_cliente || !usuario || !descripcion || !servicio_seleccionado || !estado_evento || !tipo_evento || !nombre_contacto || !numero_telefono || !direccion_local || !fecha_evento || !hora) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const newEvent = {
            id_del_cliente,
            usuario,
            descripcion,
            servicio_seleccionado,
            estado_evento,
            tipo_evento,
            nombre_contacto,
            numero_telefono,
            direccion_local,
            fecha_evento,
            hora
        };
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
    const {
        id_del_cliente,
        usuario,
        descripcion,
        servicio_seleccionado,
        estado_evento,
        tipo_evento,
        nombre_contacto,
        numero_telefono,
        direccion_local,
        fecha_evento,
        hora
    } = req.body;

    // Validación básica
    if (!id_del_cliente || !usuario || !descripcion || !servicio_seleccionado || !estado_evento || !tipo_evento || !nombre_contacto || !numero_telefono || !direccion_local || !fecha_evento || !hora) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const updatedEvent = {
            id_del_cliente,
            usuario,
            descripcion,
            servicio_seleccionado,
            estado_evento,
            tipo_evento,
            nombre_contacto,
            numero_telefono,
            direccion_local,
            fecha_evento,
            hora
        };
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
        const snapshot = await db.collection('eventos').select('fecha_evento').get();
        const fechas = snapshot.docs.map(doc => doc.data().fecha_evento);
        res.send(fechas);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo las fechas no seleccionables' });
    }
});

// Obtener todas las fechas de eventos activos
router.get('/fechas', async (req, res) => {
    try {
        const snapshot = await db.collection('eventos').where('estado_evento', '!=', 'cancelado').get();
        const fechas = snapshot.docs.map(doc => doc.data().fecha_evento); // Solo fechas
        res.send(fechas);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo las fechas de eventos' });
    }
});

// Obtener eventos por estado
router.get('/estado/:estado', async (req, res) => {
    const estado = req.params.estado.toLowerCase();
    try {
        const snapshot = await db.collection('eventos').where('estado_evento', '==', estado).get();
        const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(events);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo eventos por estado' });
    }
});

// Obtener eventos próximos a la fecha actual
router.get('/proximos', async (req, res) => {
    try {
        const fechaActual = new Date().toISOString().split('T')[0];
        const snapshot = await db.collection('eventos')
            .where('fecha_evento', '>=', fechaActual)
            .orderBy('fecha_evento')
            .get();

        const eventosProximos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(eventosProximos);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo eventos próximos' });
    }
});

// Obtener eventos próximos según el estado "activo"
router.get('/proximos/activo', async (req, res) => {
    try {
        const fechaActual = new Date().toISOString().split('T')[0];
        const snapshot = await db.collection('eventos')
            .where('fecha_evento', '>=', fechaActual)
            .where('estado_evento', '==', 'activo')
            .orderBy('fecha_evento')
            .get();

        const eventosActivos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(eventosActivos);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo eventos activos' });
    }
});

// Obtener eventos con estado "cancelado" sin filtrar por fecha
router.get('/proximos/cancelado', async (req, res) => {
    try {
        const snapshot = await db.collection('eventos')
            .where('estado_evento', '==', 'cancelado')
            .orderBy('fecha_evento')
            .get();

        const eventosCancelados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(eventosCancelados);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo eventos cancelados' });
    }
});

// Obtener eventos próximos según el estado "por confirmar"
router.get('/proximos/por-confirmar', async (req, res) => {
    try {
        const fechaActual = new Date().toISOString().split('T')[0];
        const snapshot = await db.collection('eventos')
            .where('fecha_evento', '>=', fechaActual)
            .where('estado_evento', '==', 'por confirmar')
            .orderBy('fecha_evento')
            .get();

        const eventosPorConfirmar = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(eventosPorConfirmar);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo eventos por confirmar' });
    }
});

// Obtener todos los eventos próximos sin filtrar por estado
router.get('/proximos/todos', async (req, res) => {
    try {
        const fechaActual = new Date().toISOString().split('T')[0];
        const snapshot = await db.collection('eventos')
            .where('fecha_evento', '>=', fechaActual)
            .orderBy('fecha_evento')
            .get();

        const eventosProximos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(eventosProximos);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo todos los eventos próximos' });
    }
});
// Obtener servicios asociados a un cliente específico por id_del_cliente
router.get('/cliente/:id_del_cliente', async (req, res) => {
    const id_del_cliente = req.params.id_del_cliente;

    try {
        // Filtrar los eventos por id_del_cliente
        const snapshot = await db.collection('eventos').where('id_del_cliente', '==', id_del_cliente).get();

        // Si no hay eventos, responder con un mensaje
        if (snapshot.empty) {
            return res.status(404).send({ error: 'No se encontraron eventos para este cliente' });
        }

        const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(events);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo eventos del cliente' });
    }
});

module.exports = router;
