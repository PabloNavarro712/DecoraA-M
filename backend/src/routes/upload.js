// backend/routes/upload.js
const express = require('express');
const multer = require('multer');
const { bucket } = require('../config/firebase'); // Asegúrate de que firebase.js exporte bucket
const router = express.Router();

// Configuración de multer para manejar archivos en memoria
const upload = multer({ storage: multer.memoryStorage() });

// Ruta para subir imagen a Firebase Storage
router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No se ha recibido ningún archivo' });
    }

    try {
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
            await blob.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            res.status(200).send({ imageUrl: publicUrl });
        });

        blobStream.end(req.file.buffer);
    } catch (error) {
        res.status(500).send({ error: 'Error subiendo la imagen' });
    }
});

module.exports = router;
