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
var ServiciosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiciosService = void 0;
const common_1 = require("@nestjs/common");
const generic_service_1 = require("../shared/generic.service");
const servicios_document_1 = require("../todos/document/servicios.document");
const firestore_1 = require("@google-cloud/firestore");
const storage_1 = require("@google-cloud/storage");
let ServiciosService = ServiciosService_1 = class ServiciosService extends generic_service_1.GenericService {
    constructor() {
        super(servicios_document_1.ServiciosDocument.collectionName);
        this.logger = new common_1.Logger(ServiciosService_1.name);
        this.bucketName = 'equipo-4---decoram-ef008.firebasestorage.app';
        this.firestore = new firestore_1.Firestore();
        this.storage = new storage_1.Storage();
    }
    async createService(servicio, imageBuffer, imageName, contentType) {
        const id = this.firestore
            .collection(servicios_document_1.ServiciosDocument.collectionName)
            .doc().id;
        try {
            const imageUrl = await this.uploadImageToFirebase(imageBuffer, imageName, contentType);
            if (typeof servicio !== 'object') {
                throw new Error('El servicio debe ser un objeto');
            }
            const newService = { ...servicio, id, imageUrl };
            this.logger.log('Nuevo servicio a guardar:', JSON.stringify(newService, null, 2));
            this.logger.log('Nuevo servicio a guardar:', newService);
            await this.firestore
                .collection(servicios_document_1.ServiciosDocument.collectionName)
                .doc(id)
                .set(newService);
            this.logger.log(`Servicio creado exitosamente: ${id}`);
            return newService;
        }
        catch (error) {
            this.logger.error('Error al crear el servicio', error);
            throw new Error('No se pudo crear el servicio.');
        }
    }
    async updateImageDocument(id, updateData, newImageBuffer, newImageName, newImageContentType) {
        try {
            if (!id.trim()) {
                throw new common_1.BadRequestException('Falta el ID requerido para actualizar el documento.');
            }
            const imageDocRef = this.firestore
                .collection(servicios_document_1.ServiciosDocument.collectionName)
                .doc(id);
            const imageDoc = await imageDocRef.get();
            if (!imageDoc.exists) {
                throw new common_1.NotFoundException(`No se encontró un documento con el ID: ${id}.`);
            }
            const currentData = imageDoc.data();
            const currentImageUrl = currentData.imagen;
            if (!currentImageUrl) {
                throw new Error('No se encontró la URL de la imagen actual.');
            }
            await this.deleteImageFromFirebase(currentImageUrl);
            console.log(`Imagen eliminada de Firebase Storage: ${currentImageUrl}`);
            const newImageUrl = await this.uploadImageToFirebase(newImageBuffer, newImageName, newImageContentType);
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
    async deleteService(id) {
        try {
            const docRef = this.firestore
                .collection(servicios_document_1.ServiciosDocument.collectionName)
                .doc(id);
            const docSnapshot = await docRef.get();
            if (!docSnapshot.exists) {
                throw new common_1.NotFoundException(`No se encontró un servicio con el ID: ${id}`);
            }
            const data = docSnapshot.data();
            if (data.imagen) {
                await this.deleteImageFromFirebase(data.imagen);
            }
            await docRef.delete();
            this.logger.log(`Servicio eliminado exitosamente: ${id}`);
        }
        catch (error) {
            this.logger.error('Error al eliminar el servicio', error);
            throw new common_1.InternalServerErrorException('Error interno al intentar eliminar el servicio.');
        }
    }
    async uploadImageToFirebase(imageBuffer, imageName, contentType) {
        const fileName = `${imageName}`;
        try {
            const bucket = this.storage.bucket(this.bucketName);
            const file = bucket.file(fileName);
            await file.save(imageBuffer, {
                metadata: { contentType },
                resumable: false,
            });
            await file.makePublic();
            this.logger.log(`Imagen subida correctamente: ${fileName}`);
            return `https://storage.googleapis.com/${this.bucketName}/${fileName}`;
        }
        catch (error) {
            this.logger.error('Error al subir la imagen a Firebase Storage', error);
            throw new common_1.InternalServerErrorException('No se pudo subir la imagen a Firebase Storage');
        }
    }
    async deleteImageFromFirebase(imageUrl) {
        const bucketName = 'equipo-4-f104b.appspot.com';
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
    async getServiciosPaginated(page, categoria) {
        try {
            const limit = 10;
            let query = this.firestore
                .collection('servicios')
                .orderBy('id', 'desc')
                .offset((page - 1) * limit)
                .limit(limit);
            console.log('Categoría recibida:', categoria);
            if (categoria) {
                query = query.where('categoria', '==', categoria);
            }
            const snapshot = await query.get();
            if (snapshot.empty) {
                console.warn('No se encontraron servicios con la categoría:', categoria);
                throw new common_1.NotFoundException('No se encontraron servicios.');
            }
            const servicios = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                console.log('Documento recuperado:', data);
                servicios.push(data);
            });
            return servicios;
        }
        catch (error) {
            console.error('Error en la consulta de servicios:', error);
            throw new common_1.InternalServerErrorException('Error al procesar la solicitud.');
        }
    }
};
exports.ServiciosService = ServiciosService;
exports.ServiciosService = ServiciosService = ServiciosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ServiciosService);
//# sourceMappingURL=servicios.service.js.map