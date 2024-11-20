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
var ConvocatoriaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvocatoriaService = void 0;
const common_1 = require("@nestjs/common");
const generic_service_1 = require("../shared/generic.service");
const convocatoria_document_1 = require("../todos/document/convocatoria.document");
const firestore_1 = require("@google-cloud/firestore");
let ConvocatoriaService = ConvocatoriaService_1 = class ConvocatoriaService extends generic_service_1.GenericService {
    constructor() {
        super(convocatoria_document_1.ConvocatoriaDocument.collectionName);
        this.logger = new common_1.Logger(ConvocatoriaService_1.name);
        this.firestore = new firestore_1.Firestore();
    }
    onModuleInit() {
        setInterval(() => {
            this.updateExpiredStatus();
        }, 24 * 60 * 60 * 1000);
    }
    async getById(id) {
        const docRef = this.firestore.collection(convocatoria_document_1.ConvocatoriaDocument.collectionName).doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            throw new common_1.HttpException('Convocatoria not found', common_1.HttpStatus.NOT_FOUND);
        }
        return doc.data();
    }
    async getCurrentConvocatoria() {
        const snapshot = await this.firestore
            .collection(convocatoria_document_1.ConvocatoriaDocument.collectionName)
            .where('status', '==', true)
            .limit(1)
            .get();
        if (snapshot.empty) {
            throw new common_1.HttpException('No active convocatoria found', common_1.HttpStatus.NOT_FOUND);
        }
        let convocatoria = snapshot.docs[0].data();
        convocatoria = await this.updateAvailableCupoField(convocatoria);
        return convocatoria;
    }
    async saveConvocatoria(data) {
        const { startDate, endDate, cupo } = data;
        if (!startDate || !endDate || cupo === undefined) {
            throw new common_1.HttpException('Start date, end date, and cupo are required', common_1.HttpStatus.BAD_REQUEST);
        }
        const activeConvocatoriaSnapshot = await this.firestore
            .collection(convocatoria_document_1.ConvocatoriaDocument.collectionName)
            .where('status', '==', true)
            .limit(1)
            .get();
        if (!activeConvocatoriaSnapshot.empty) {
            throw new common_1.HttpException({
                message: 'No se puede crear una nueva convocatoria mientras haya una convocatoria activa.'
            }, common_1.HttpStatus.CONFLICT);
        }
        const convocatoria = {
            ...data,
            id: this.firestore.collection(convocatoria_document_1.ConvocatoriaDocument.collectionName).doc().id,
            status: false,
            availableCupo: cupo,
        };
        this.calculateStatus(convocatoria);
        await this.firestore.collection(convocatoria_document_1.ConvocatoriaDocument.collectionName).doc(convocatoria.id).set(convocatoria);
        return convocatoria;
    }
    async getAllConvocatorias() {
        const snapshot = await this.firestore.collection(convocatoria_document_1.ConvocatoriaDocument.collectionName).get();
        if (snapshot.empty) {
            throw new common_1.HttpException('No convocatorias found', common_1.HttpStatus.NOT_FOUND);
        }
        const convocatorias = [];
        for (const doc of snapshot.docs) {
            let convocatoria = doc.data();
            convocatoria = await this.updateAvailableCupoField(convocatoria);
            convocatorias.push(this.calculateStatus(convocatoria));
        }
        return convocatorias;
    }
    async updateAvailableCupoField(convocatoria) {
        const aspirantesSnapshot = await this.firestore
            .collection('Aspirantes')
            .where('convocatoriaId', '==', convocatoria.id)
            .where('statusinscripcion', '==', true)
            .get();
        const aspirantesInscritos = aspirantesSnapshot.size;
        convocatoria.availableCupo = convocatoria.cupo - aspirantesInscritos;
        await this.firestore.collection(convocatoria_document_1.ConvocatoriaDocument.collectionName).doc(convocatoria.id).update({
            availableCupo: convocatoria.availableCupo,
        });
        return convocatoria;
    }
    async updateConvocatoria(id, data) {
        const docRef = this.firestore.collection(convocatoria_document_1.ConvocatoriaDocument.collectionName).doc(id);
        const currentDoc = await docRef.get();
        if (!currentDoc.exists) {
            throw new common_1.HttpException('Convocatoria not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedData = { ...currentDoc.data(), ...data };
        this.calculateStatus(updatedData);
        if (data.cupo !== undefined) {
            updatedData.availableCupo = updatedData.cupo - await this.getAspirantesInscritos(id);
        }
        await docRef.set(updatedData);
        return updatedData;
    }
    async getAspirantesInscritos(convocatoriaId) {
        const aspirantesSnapshot = await this.firestore
            .collection('Aspirantes')
            .where('convocatoriaId', '==', convocatoriaId)
            .where('statusinscripcion', '==', true)
            .get();
        return aspirantesSnapshot.size;
    }
    async updateCuposOnInscription(convocatoriaId, newCupo, newAvailableCupo, newOccupiedCupo) {
        const docRef = this.firestore.collection(convocatoria_document_1.ConvocatoriaDocument.collectionName).doc(convocatoriaId);
        await docRef.update({
            cupo: newCupo,
            availableCupo: newAvailableCupo,
            occupiedCupo: newOccupiedCupo
        });
    }
    async updateCuposOnDeletion(convocatoriaId, newCupo, newAvailableCupo, newOccupiedCupo) {
        const docRef = this.firestore.collection(convocatoria_document_1.ConvocatoriaDocument.collectionName).doc(convocatoriaId);
        await docRef.update({
            cupo: newCupo,
            availableCupo: newAvailableCupo,
            occupiedCupo: newOccupiedCupo
        });
    }
    async updateExpiredStatus() {
        const now = new Date();
        const snapshot = await this.firestore
            .collection(convocatoria_document_1.ConvocatoriaDocument.collectionName)
            .where('status', '==', true)
            .get();
        for (const doc of snapshot.docs) {
            const convocatoria = doc.data();
            const endDate = new Date(convocatoria.endDate);
            if (endDate < now) {
                await this.firestore
                    .collection(convocatoria_document_1.ConvocatoriaDocument.collectionName)
                    .doc(convocatoria.id)
                    .update({ status: false });
                this.logger.log(`Convocatoria con ID ${convocatoria.id} marcada como cerrada`);
            }
        }
    }
    calculateStatus(convocatoria) {
        const now = new Date();
        const startDate = new Date(convocatoria.startDate);
        const endDate = new Date(convocatoria.endDate);
        const startDayLocal = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate()).getTime();
        const endDayLocal = new Date(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate(), 23, 59, 59, 999).getTime();
        const currentDateLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        convocatoria.status = currentDateLocal >= startDayLocal && currentDateLocal <= endDayLocal;
        return convocatoria;
    }
};
exports.ConvocatoriaService = ConvocatoriaService;
exports.ConvocatoriaService = ConvocatoriaService = ConvocatoriaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ConvocatoriaService);
//# sourceMappingURL=convocatoria.service.js.map