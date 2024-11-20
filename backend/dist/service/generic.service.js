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
        const snapshot = await this.firestore.collection(this.collectionName).get();
        const items = [];
        snapshot.forEach(doc => items.push(doc.data()));
        return items;
    }
    async findById(id) {
        const doc = await this.firestore.collection(this.collectionName).doc(id).get();
        if (!doc.exists) {
            throw new Error('Documento no encontrado');
        }
        return doc.data();
    }
    async create(data) {
        const docRef = this.firestore.collection(this.collectionName).doc();
        const newItem = { ...data, id: docRef.id };
        await docRef.set(newItem);
        return newItem;
    }
    async update(id, data) {
        const docRef = this.firestore.collection(this.collectionName).doc(id);
        await docRef.update(data);
    }
    async delete(id) {
        const docRef = this.firestore.collection(this.collectionName).doc(id);
        await docRef.delete();
    }
}
exports.GenericService = GenericService;
//# sourceMappingURL=generic.service.js.map