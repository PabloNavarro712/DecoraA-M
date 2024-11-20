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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionService = void 0;
const common_1 = require("@nestjs/common");
const institution_document_1 = require("../todos/document/institution.document");
const app_service_1 = require("./app.service");
const firestore_1 = require("@google-cloud/firestore");
let InstitutionService = class InstitutionService {
    constructor(institutionCollection) {
        this.institutionCollection = institutionCollection;
        this.logger = new common_1.Logger(app_service_1.AppService.name);
    }
    async createInstitution(institution) {
        if (!institution || !institution.name) {
            throw new common_1.BadRequestException('Se requiere un nombre de institución');
        }
        const nameQuerySnapshot = await this.institutionCollection.where('name', '==', institution.name).get();
        if (!nameQuerySnapshot.empty) {
            throw new common_1.ConflictException('La institución ya esta registrada');
        }
        const doc = await this.institutionCollection.doc();
        const id = institution.id = doc.id;
        const surveys = {
            ...institution,
        };
        await this.institutionCollection.doc(id).set(surveys);
        return surveys;
    }
    async getAllInstitutions() {
        const snapshot = await this.institutionCollection.get();
        const institutions = snapshot.docs.map((doc) => doc.data());
        return institutions;
    }
    async getInstitutionById(institutionId) {
        const institutionDoc = await this.institutionCollection.doc(institutionId).get();
        if (!institutionDoc.exists) {
            throw new common_1.ConflictException('Institución no encontrada');
        }
        return institutionDoc.data();
    }
    async deleteInstitutionById(institutionId) {
        const institutionDoc = await this.institutionCollection.doc(institutionId).get();
        if (!institutionDoc.exists) {
            throw new common_1.ConflictException('Institución no encontrada');
        }
        await this.institutionCollection.doc(institutionId).delete();
    }
    async updateInstitutionName(institutionId, updatedInstitutionName) {
        const institutionDoc = await this.institutionCollection.doc(institutionId).get();
        if (!institutionDoc.exists) {
            throw new common_1.ConflictException('Institución no encontrada');
        }
        await this.institutionCollection.doc(institutionId).update(updatedInstitutionName);
        return { message: 'Nombre actualizado con éxito' };
    }
};
exports.InstitutionService = InstitutionService;
exports.InstitutionService = InstitutionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(institution_document_1.InstitutionDocument.collectionName)),
    __metadata("design:paramtypes", [firestore_1.CollectionReference])
], InstitutionService);
//# sourceMappingURL=institution.service.js.map