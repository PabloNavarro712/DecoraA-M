const CrudController = require('./crudController');
const FirestoreService = require('../services/firestoreService');

class GaleriaController extends CrudController {
    constructor() {
        super('galeria prueba'); // Nombre de la colección
    }

    async uploadImage(req, res) {
        try {
            const imageUrl = await FirestoreService.uploadImage(req.file);
            res.status(200).send({ imageUrl });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = new GaleriaController();
