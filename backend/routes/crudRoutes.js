const express = require('express');
const CrudController = require('../controllers/crudController');

const router = express.Router();

router.post('/', CrudController.create.bind(CrudController));
router.get('/', CrudController.read.bind(CrudController));
router.put('/:id', CrudController.update.bind(CrudController));
router.delete('/:id', CrudController.delete.bind(CrudController));

module.exports = router;
