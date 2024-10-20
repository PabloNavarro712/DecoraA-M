const { db, bucket } = require('../config/firebase');

class FirestoreService {
    async addItem(collection, item) {
        const docRef = await db.collection(collection).add(item);
        return { id: docRef.id, ...item };
    }

    async getItems(collection) {
        const snapshot = await db.collection(collection).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async updateItem(collection, id, data) {
        await db.collection(collection).doc(id).update(data);
        return { id, ...data };
    }

    async deleteItem(collection, id) {
        await db.collection(collection).doc(id).delete();
    }

    async uploadImage(file) {
        if (!file) {
            throw new Error('No se ha recibido ningún archivo');
        }
        
        const fileName = `${Date.now()}_${file.originalname}`;
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        return new Promise((resolve, reject) => {
            blobStream.on('error', (err) => {
                reject(err);
            });

            blobStream.on('finish', async () => {
                await blob.makePublic();
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                resolve(publicUrl);
            });

            blobStream.end(file.buffer);
        });
    }
}

module.exports = new FirestoreService();
