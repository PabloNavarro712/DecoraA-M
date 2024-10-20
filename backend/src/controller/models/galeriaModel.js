const mongoose = require('mongoose');

const GaleriaSchema = new mongoose.Schema({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  description: { type: String, required: false },
});

const Galeria = mongoose.model('Galeria', GaleriaSchema);
module.exports = Galeria;
