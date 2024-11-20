"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericService = void 0;
const firestore_1 = require("@google-cloud/firestore");
class GenericService {
    constructor(collectionName) {
        this.firestore = new firestore_1.Firestore();
        this.collectionName = collectionName;
    }
    async findAll() {
        try {
            const snapshot = await this.firestore.collection(this.collectionName).get();
            const items = [];
            snapshot.forEach(doc => items.push(doc.data()));
            console.log('Todos los documentos obtenidos correctamente');
            return items;
        }
        catch (error) {
            console.error('Error al obtener los documentos:', error);
            throw error;
        }
    }
    async findById(id) {
        try {
            const doc = await this.firestore.collection(this.collectionName).doc(id).get();
            if (!doc.exists) {
                throw new Error('Documento no encontrado');
            }
            console.log(`Documento con ID ${id} obtenido correctamente`);
            return doc.data();
        }
        catch (error) {
            console.error(`Error al obtener el documento con ID ${id}:`, error);
            throw error;
        }
    }
    async create(data) {
        try {
            const docRef = this.firestore.collection(this.collectionName).doc();
            const newItem = { ...data, id: docRef.id };
            await docRef.set(newItem);
            console.log(`Documento creado con ID ${docRef.id}`);
            return newItem;
        }
        catch (error) {
            console.error('Error al crear el documento:', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const docRef = this.firestore.collection(this.collectionName).doc(id);
            await docRef.update(data);
            console.log(`Documento con ID ${id} actualizado correctamente`);
        }
        catch (error) {
            console.error(`Error al actualizar el documento con ID ${id}:`, error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const docRef = this.firestore.collection(this.collectionName).doc(id);
            await docRef.delete();
            console.log(`Documento con ID ${id} eliminado correctamente`);
        }
        catch (error) {
            console.error(`Error al eliminar el documento con ID ${id}:`, error);
            throw error;
        }
    }
}
exports.GenericService = GenericService;
//# sourceMappingURL=generic.service.js.map