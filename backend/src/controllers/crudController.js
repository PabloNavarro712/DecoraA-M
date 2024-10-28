const db = require('../config/firebase');

// Crear un documento
const createDocument = async (collection, data) => {
    const docRef = await db.collection(collection).add(data);
    return { id: docRef.id, ...data };
};

// Obtener todos los documentos de una colección
const getAllDocuments = async (collection) => {
    const snapshot = await db.collection(collection).get();
    const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
};

// Obtener un documento por ID
const getDocumentById = async (collection, id) => {
    const doc = await db.collection(collection).doc(id).get();
    if (!doc.exists) {
        return null; // Documento no encontrado
    }
    return { id: doc.id, ...doc.data() };
};

// Actualizar un documento por ID
const updateDocument = async (collection, id, data) => {
    const docRef = db.collection(collection).doc(id);
    await docRef.update(data);
    return { id: docRef.id, ...data };
};

// Eliminar un documento por ID
const deleteDocument = async (collection, id) => {
    const docRef = db.collection(collection).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
        return null; // Documento no encontrado
    }
    await docRef.delete();
    return { id: doc.id }; // Retorna el ID del documento eliminado
};

module.exports = {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
};
