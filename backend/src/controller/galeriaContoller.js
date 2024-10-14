const CrudController = require('./crudController');
const Galeria = require('../models/galeriaModel');

class GaleriaController extends CrudController {
  constructor() {
    super(Galeria); // Hereda las operaciones CRUD generales
  }

  // Aquí podrías añadir métodos específicos de la galería si lo necesitas
}

module.exports = new GaleriaController();
