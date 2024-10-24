const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');

// Crear un documento
router.post('/:collection', async (req, res) => {
    try {
        const data = req.body;
        const collection = req.params.collection;
        const result = await crudController.createDocument(collection, data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todos los documentos de una colección
router.get('/:collection', async (req, res) => {
    try {
        const collection = req.params.collection;
        const results = await crudController.getAllDocuments(collection);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un documento por ID
router.get('/:collection/:id', async (req, res) => {
    try {
        const collection = req.params.collection;
        const id = req.params.id;
        const result = await crudController.getDocumentById(collection, id);
        if (!result) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un documento por ID
router.put('/:collection/:id', async (req, res) => {
    try {
        const collection = req.params.collection;
        const id = req.params.id;
        const data = req.body;
        const result = await crudController.updateDocument(collection, id, data);
        if (!result) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un documento por ID
router.delete('/:collection/:id', async (req, res) => {
    try {
        const collection = req.params.collection;
        const id = req.params.id;
        const result = await crudController.deleteDocument(collection, id);
        if (!result) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
