"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GaleriaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GaleriaService = void 0;
const common_1 = require("@nestjs/common");
const generic_service_1 = require("../shared/generic.service");
const galery_document_1 = require("../todos/document/galery.document");
const firestore_1 = require("@google-cloud/firestore");
const storage_1 = require("@google-cloud/storage");
let GaleriaService = GaleriaService_1 = class GaleriaService extends generic_service_1.GenericService {
    constructor() {
        super(galery_document_1.GaleriaDocument.collectionName);
        this.logger = new common_1.Logger(GaleriaService_1.name);
        this.firestore = new firestore_1.Firestore();
        this.storage = new storage_1.Storage();
    }
    async createGallery(categoria, descripcion, imageBuffer, imageName, contentType) {
        const id = this.firestore
            .collection(galery_document_1.GaleriaDocument.collectionName)
            .doc().id;
        const fileName = `${id}_${imageName}`;
        try {
            const imageUrl = await this.uploadImageToFirebase(imageBuffer, categoria, fileName, contentType);
            const galeriaData = {
                id,
                Categoria: categoria,
                Descripcion: descripcion,
                Imagen: imageUrl,
            };
            await this.firestore
                .collection(galery_document_1.GaleriaDocument.collectionName)
                .doc(id)
                .set(galeriaData);
            this.logger.log(`Galería creada con éxito: ${id}`);
            return galeriaData;
        }
        catch (error) {
            this.logger.error('Error al crear la galería', error);
            throw new Error('No se pudo crear la galería');
        }
    }
    async getImagesByCategory(category) {
        this.logger.log('Executing getImagesByCategory endpoint');
        try {
            const snapshot = await this.firestore
                .collection(galery_document_1.GaleriaDocument.collectionName)
                .where('Categoria', '==', category)
                .get();
            if (snapshot.empty) {
                this.logger.warn(`No hay imagenes con la categoria : ${category}`);
                return [];
            }
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        }
        catch (error) {
            this.logger.error(`Fallo al traer las imagenes: ${error.message}`);
            throw error;
        }
    }
    async uploadImageToFirebase(imageBuffer, categoria, imageName, contentType) {
        const bucketName = 'equipo-4---decoram-ef008.firebasestorage.app';
        const fileName = `${categoria}_${imageName}.${contentType}`;
        try {
            const bucket = this.storage.bucket(bucketName);
            const file = bucket.file(fileName);
            await file.save(imageBuffer, {
                metadata: { contentType },
                resumable: false,
            });
            await file.makePublic();
            this.logger.log(`Imagen subida correctamente: ${fileName}`);
            return `https://storage.googleapis.com/${bucketName}/${fileName}`;
        }
        catch (error) {
            this.logger.error('Error al subir la imagen a Firebase Storage', error);
            throw new Error('No se pudo subir la imagen a Firebase Storage');
        }
    }
    async deleteImageFromFirebase(imageUrl) {
        const bucketName = 'equipo-4---decoram-ef008.firebasestorage.app';
        try {
            const fileName = imageUrl.split(`https://storage.googleapis.com/${bucketName}/`)[1];
            if (!fileName) {
                throw new Error('No se pudo extraer el nombre del archivo de la URL proporcionada.');
            }
            const bucket = this.storage.bucket(bucketName);
            const file = bucket.file(fileName);
            await file.delete();
            console.log(`Archivo ${fileName} eliminado correctamente de Firebase Storage.`);
        }
        catch (error) {
            console.error('Error al eliminar la imagen de Firebase Storage:', error);
            throw new Error('No se pudo eliminar la imagen de Firebase Storage.');
        }
    }
    async updateImageDocument(id, updateData, newImageBuffer, newImageName, newImageContentType) {
        try {
            if (!id.trim()) {
                throw new common_1.BadRequestException('Falta el ID requerido para actualizar el documento.');
            }
            const imageDocRef = this.firestore
                .collection(galery_document_1.GaleriaDocument.collectionName)
                .doc(id);
            const imageDoc = await imageDocRef.get();
            if (!imageDoc.exists) {
                throw new common_1.NotFoundException(`No se encontró un documento con el ID: ${id}.`);
            }
            const currentData = imageDoc.data();
            const currentImageUrl = currentData.Imagen;
            if (!currentImageUrl) {
                throw new Error('No se encontró la URL de la imagen actual.');
            }
            await this.deleteImageFromFirebase(currentImageUrl);
            console.log(`Imagen eliminada de Firebase Storage: ${currentImageUrl}`);
            const fileName = `${id}_${newImageName}`;
            const newImageUrl = await this.uploadImageToFirebase(newImageBuffer, newImageName, fileName, newImageContentType);
            console.log(`Nueva imagen cargada a Firebase Storage: ${newImageUrl}`);
            await imageDocRef.update({
                ...updateData,
                Imagen: newImageUrl,
            });
            console.log(`Documento con ID: ${id} actualizado exitosamente.`);
        }
        catch (error) {
            console.error(`Error al actualizar la imagen del documento: ${error.message}`);
            throw new Error('Error al actualizar la imagen y el documento.');
        }
    }
    async deleteImageById(id) {
        try {
            if (!id.trim()) {
                throw new common_1.BadRequestException('Falta el ID requerido para eliminar la imagen.');
            }
            const imageDoc = await this.firestore
                .collection(galery_document_1.GaleriaDocument.collectionName)
                .doc(id)
                .get();
            if (!imageDoc.exists) {
                throw new common_1.NotFoundException(`No se encontró un documento con el ID: ${id}.`);
            }
            const imageData = imageDoc.data();
            const imageUrl = imageData.Imagen;
            if (imageUrl) {
                await this.deleteImageFromFirebase(imageUrl);
                await this.firestore
                    .collection(galery_document_1.GaleriaDocument.collectionName)
                    .doc(id)
                    .delete();
                console.log(`Imagen asociada al documento con ID ${id} eliminada correctamente.`);
            }
            else {
                throw new common_1.NotFoundException('No se encontró la URL de la imagen para eliminar.');
            }
        }
        catch (error) {
            console.error('Error al eliminar la imagen:', error);
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error interno al intentar eliminar la imagen. Por favor, inténtelo de nuevo más tarde.');
            }
        }
    }
    async updateDocumentAndReplaceImage(id, newImageBuffer, newImageName, newImageContentType, updatedData) {
        try {
            const docRef = this.firestore
                .collection(galery_document_1.GaleriaDocument.collectionName)
                .doc(id);
            const docSnapshot = await docRef.get();
            if (!docSnapshot.exists) {
                throw new Error(`Document with ID ${id} not found`);
            }
            const documentData = docSnapshot.data();
            const existingImageUrl = documentData?.Imagen;
            if (!existingImageUrl) {
                throw new Error('No existing image URL found for the document');
            }
            const bucket = this.storage.bucket('albergue-57e14.appspot.com');
            const existingFileName = existingImageUrl.split('/').pop();
            await bucket.file(existingFileName).delete();
            this.logger.log(`Existing image deleted: ${existingFileName}`);
            const newImageUrl = await this.uploadImageToFirebase(newImageBuffer, updatedData.Categoria, newImageName, newImageContentType);
            await docRef.update({
                Categoria: updatedData.Categoria,
                Descripcion: updatedData.Descripcion,
                Imagen: newImageUrl,
            });
            this.logger.log(`Document updated: ${id}`);
        }
        catch (error) {
            this.logger.error(`Error updating document or replacing image: ${error.message}`, error.stack);
            throw new Error('Failed to update document and replace its associated image');
        }
    }
};
exports.GaleriaService = GaleriaService;
exports.GaleriaService = GaleriaService = GaleriaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GaleriaService);
//# sourceMappingURL=galery.service.js.map