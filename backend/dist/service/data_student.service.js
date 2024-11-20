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
exports.DataStudentService = void 0;
const common_1 = require("@nestjs/common");
const generic_service_1 = require("../shared/generic.service");
const data_student_document_1 = require("../todos/document/data_student.document");
let DataStudentService = class DataStudentService extends generic_service_1.GenericService {
    constructor() {
        super(data_student_document_1.DataStudent.collectionName);
    }
    async findByAspiranteId(aspiranteId) {
        try {
            const snapshot = await this.firestore
                .collection(this.collectionName)
                .where('aspiranteId', '==', aspiranteId)
                .limit(1)
                .get();
            if (snapshot.empty) {
                throw new common_1.NotFoundException(`No se encontró ningún documento para el aspiranteId: ${aspiranteId}`);
            }
            const doc = snapshot.docs[0];
            return doc.data();
        }
        catch (error) {
            console.error('Error al buscar DataStudent por aspiranteId:', error);
            throw new Error('Error al buscar el documento del estudiante');
        }
    }
};
exports.DataStudentService = DataStudentService;
exports.DataStudentService = DataStudentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DataStudentService);
//# sourceMappingURL=data_student.service.js.map