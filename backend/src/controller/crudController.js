
class CrudController {
    constructor(model) {
      this.model = model;
    }
  
    // Crear (POST)
    async create(req, res) {
      try {
        const item = new this.model(req.body);
        const savedItem = await item.save();
        res.status(201).json(savedItem);
      } catch (error) {
        res.status(500).json({ message: 'Error al crear el elemento', error });
      }
    }
  
    // Leer todos los elementos (GET)
    async getAll(req, res) {
      try {
        const items = await this.model.find();
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ message: 'Error al obtener los elementos', error });
      }
    }
  
    // Leer un solo elemento por ID (GET)
    async getById(req, res) {
      try {
        const item = await this.model.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Elemento no encontrado' });
        res.status(200).json(item);
      } catch (error) {
        res.status(500).json({ message: 'Error al obtener el elemento', error });
      }
    }
  
    // Actualizar (PUT)
    async update(req, res) {
      try {
        const updatedItem = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Elemento no encontrado' });
        res.status(200).json(updatedItem);
      } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el elemento', error });
      }
    }
  
    // Eliminar (DELETE)
    async delete(req, res) {
      try {
        const deletedItem = await this.model.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Elemento no encontrado' });
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el elemento', error });
      }
    }
  }
  
  module.exports = CrudController;
  