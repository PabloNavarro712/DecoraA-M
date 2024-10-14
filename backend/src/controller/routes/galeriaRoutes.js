const express = require('express');
const router = express.Router();
const galeriaController = require('../controllers/galeriaController');

// Definir las rutas para las operaciones CRUD
router.post('/', (req, res) => galeriaController.create(req, res));
router.get('/', (req, res) => galeriaController.getAll(req, res));
router.get('/:id', (req, res) => galeriaController.getById(req, res));
router.put('/:id', (req, res) => galeriaController.update(req, res));
router.delete('/:id', (req, res) => galeriaController.delete(req, res));

module.exports = router;
