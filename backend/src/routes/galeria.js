// backend/routes/galeria.js
const express = require('express');
const { db } = require('../config/firebase'); // Asegúrate de que firebase.js exporte db
const router = express.Router();

// Crear un nuevo elemento en la colección 'galeria prueba'
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('galeria prueba').get();
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(items);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo elementos' });
    }
});

// Actualizar un elemento en la colección 'galeria prueba'
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        await db.collection('galeria prueba').doc(itemId).delete();
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: 'Error eliminando el elemento' });
    }
});

module.exports = router;
