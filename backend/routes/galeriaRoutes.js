const express = require('express');
const multer = require('multer');
const GaleriaController = require('../controllers/galeriaController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Configuración de multer

router.post('/upload', upload.single('image'), GaleriaController.uploadImage.bind(GaleriaController));
router.use('/', require('./crudRoutes')); // Rutas CRUD generales

module.exports = router;
