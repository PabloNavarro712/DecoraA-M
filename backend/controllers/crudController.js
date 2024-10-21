const FirestoreService = require('../services/firestoreService');

class CrudController {
    constructor(collection) {
        this.collection = collection;
    }

    async create(req, res) {
        try {
            const item = req.body;
            const newItem = await FirestoreService.addItem(this.collection, item);
            res.status(201).send(newItem);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    async read(req, res) {
        try {
            const items = await FirestoreService.getItems(this.collection);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    async update(req, res) {
        const itemId = req.params.id;
        const data = req.body;

        try {
            const updatedItem = await FirestoreService.updateItem(this.collection, itemId, data);
            res.send(updatedItem);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    async delete(req, res) {
        const itemId = req.params.id;

        try {
            await FirestoreService.deleteItem(this.collection, itemId);
            res.status(204).send();
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = CrudController;
