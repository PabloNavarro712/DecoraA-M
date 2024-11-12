const express = require('express');
const { db } = require('../config/firebase'); // Asegúrate de que firebase.js exporte db
const router = express.Router();

// Crear un nuevo usuario
// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const { nombreCompleto, usuario, correo, contrasena, esAdministrador } = req.body;

    // Validación básica para asegurarse de que los campos importantes no estén vacíos
    if (!nombreCompleto || !usuario || !correo || !contrasena || esAdministrador === undefined) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    } 

    try {
        // Verificar si el correo ya existe
        const userSnapshotCorreo = await db.collection('usuarios').where('correo', '==', correo).get();
        if (!userSnapshotCorreo.empty) {
            return res.status(400).send({ error: 'El correo ya está registrado' });
        }

        // Verificar si el nombre de usuario ya existe
        const userSnapshotUsuario = await db.collection('usuarios').where('usuario', '==', usuario).get();
        if (!userSnapshotUsuario.empty) {
            return res.status(400).send({ error: 'El nombre de usuario ya está registrado' });
        }

        // Crear el nuevo usuario
        const newUser = { nombreCompleto, usuario, correo, contrasena, esAdministrador };
        const docRef = await db.collection('usuarios').add(newUser);
        res.status(201).send({ id: docRef.id, ...newUser });
    } catch (error) {
        res.status(500).send({ error: 'Error creando el usuario' });
    }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('usuarios').get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(users);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo los usuarios' });
    }
});

// Obtener un usuario por su ID
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const doc = await db.collection('usuarios').doc(userId).get();
        if (!doc.exists) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
        res.send({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo el usuario' });
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { nombreCompleto, usuario, correo, contrasena, esAdministrador } = req.body;

    // Validación básica
    if (!nombreCompleto || !usuario || !correo || !contrasena || esAdministrador === undefined) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const updatedUser = { nombreCompleto, usuario, correo, contrasena, esAdministrador };
        await db.collection('usuarios').doc(userId).update(updatedUser);
        res.send({ id: userId, ...updatedUser });
    } catch (error) {
        res.status(500).send({ error: 'Error actualizando el usuario' });
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        await db.collection('usuarios').doc(userId).delete();
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: 'Error eliminando el usuario' });
    }
});

module.exports = router;
