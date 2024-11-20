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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutService = void 0;
const common_1 = require("@nestjs/common");
const firestore_1 = require("@google-cloud/firestore");
const about_document_1 = require("../todos/document/about.document");
let AboutService = class AboutService {
    constructor() {
        this.firestore = new firestore_1.Firestore();
        this.collection = this.firestore.collection(about_document_1.AboutDocument.collectionName);
        this.firestore = new firestore_1.Firestore();
    }
    async createAboutInfo(data) {
        try {
            if (!data.mission || !data.vision || !data.directorName) {
                throw new common_1.BadRequestException('No se permiten campos vacíos');
            }
            if (!this.collection) {
                this.collection = this.firestore.collection(about_document_1.AboutDocument.collectionName);
            }
            const docRef = this.collection.doc();
            const aboutData = { ...data, id: docRef.id };
            await docRef.set(aboutData);
            return {
                message: 'Información creada exitosamente',
                document: aboutData,
            };
        }
        catch (error) {
            console.error("Error al crear la información:", error);
            throw new common_1.BadRequestException('Error al crear la información');
        }
    }
    async getAboutInfo() {
        const snapshot = await this.firestore.collection(about_document_1.AboutDocument.collectionName).get();
        if (snapshot.empty) {
            throw new common_1.NotFoundException('No se encontró información en la colección About');
        }
        const aboutInfo = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return aboutInfo;
    }
    async getAboutInfoById(id) {
        const docRef = this.firestore.collection(about_document_1.AboutDocument.collectionName).doc(id);
        const snapshot = await docRef.get();
        if (!snapshot.exists) {
            throw new common_1.NotFoundException(`No se encontró la información con ID: ${id}`);
        }
        return { id: snapshot.id, ...snapshot.data() };
    }
    async updateAboutInfoById(id, data) {
        try {
            const docRef = this.collection.doc(id);
            const doc = await docRef.get();
            if (!doc.exists) {
                throw new common_1.NotFoundException('Documento no encontrado');
            }
            const updatedData = {
                ...doc.data(),
                ...data,
            };
            await docRef.update(updatedData);
            return {
                message: 'Información actualizada exitosamente',
                document: updatedData,
            };
        }
        catch (error) {
            console.error("Error al actualizar la información:", error);
            throw new common_1.BadRequestException('Error al actualizar la información');
        }
    }
    async deleteAboutInfoById(id) {
        try {
            const docRef = this.firestore.collection(about_document_1.AboutDocument.collectionName).doc(id);
            const snapshot = await docRef.get();
            if (!snapshot.exists) {
                throw new common_1.NotFoundException(`No se encontró la información para eliminar con ID: ${id}`);
            }
            await docRef.delete();
            return { message: `Información con ID: ${id} eliminada exitosamente` };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error interno al intentar eliminar la información. Por favor, inténtelo de nuevo más tarde.');
        }
    }
};
exports.AboutService = AboutService;
exports.AboutService = AboutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AboutService);
//# sourceMappingURL=about.service.js.map