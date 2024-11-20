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
var ExpiredStudentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpiredStudentService = void 0;
const common_1 = require("@nestjs/common");
const firestore_1 = require("@google-cloud/firestore");
const storage_1 = require("@google-cloud/storage");
const convocatoria_document_1 = require("../todos/document/convocatoria.document");
const studentdoc_document_1 = require("../todos/document/studentdoc.document");
let ExpiredStudentService = ExpiredStudentService_1 = class ExpiredStudentService {
    constructor() {
        this.logger = new common_1.Logger(ExpiredStudentService_1.name);
        this.intervalTime = 24 * 60 * 60 * 1000;
        this.firestore = new firestore_1.Firestore();
        this.storage = new storage_1.Storage();
    }
    onModuleInit() {
        this.scheduleTask();
    }
    scheduleTask() {
        console.log('iniciando');
        this.nextRunTime = new Date(Date.now() + this.intervalTime);
        console.log('iniciando 2');
        setInterval(() => {
            console.log('iniciando 3');
            this.removeExpiredUnenrolledStudents();
            this.nextRunTime = new Date(Date.now() + this.intervalTime);
        }, this.intervalTime);
    }
    async removeExpiredUnenrolledStudents() {
        console.log('eliminando studens');
        const now = new Date();
        const thresholdDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const thresholdDateStr = thresholdDate.toISOString().split('T')[0];
        console.log('Fecha límite para eliminación (thresholdDate):', thresholdDateStr);
        const snapshot = await this.firestore
            .collection(convocatoria_document_1.ConvocatoriaDocument.collectionName)
            .where('status', '==', false)
            .where('endDate', '==', thresholdDateStr)
            .get();
        console.log('antes del for');
        for (const doc of snapshot.docs) {
            const convocatoria = doc.data();
            console.log('dentro', convocatoria.id);
            this.logger.log(`Procesando convocatoria cerrada con ID ${convocatoria.id}`);
            const studentsSnapshot = await this.firestore
                .collection(studentdoc_document_1.StudentDocDocument.collectionName)
                .where('convocatoriaId', '==', convocatoria.id)
                .where('enrollmentStatus', '==', false)
                .get();
            for (const studentDoc of studentsSnapshot.docs) {
                const student = studentDoc.data();
                await this.deleteStudentData(student);
                this.logger.log(`Estudiante con ID ${student.aspiranteId} eliminado de la convocatoria ${convocatoria.id}`);
            }
        }
    }
    async deleteStudentData(student) {
        for (const document of student.Documents) {
            await this.deleteDocumentForAspirante(student.aspiranteId, document.type);
        }
        await this.firestore
            .collection(studentdoc_document_1.StudentDocDocument.collectionName)
            .doc(student.id)
            .delete();
        await this.firestore
            .collection('DataStudent')
            .doc(student.aspiranteId)
            .delete()
            .catch((error) => {
            this.logger.error(`Error eliminando StudentData para aspiranteId ${student.aspiranteId}: ${error.message}`);
        });
    }
    async deleteDocumentForAspirante(aspiranteId, documentType) {
        try {
            if (!aspiranteId.trim() || !documentType.trim()) {
                throw new common_1.BadRequestException('Faltan datos requeridos para eliminar el documento');
            }
            const aspiranteDocs = await this.firestore
                .collection('StudentDocDocument')
                .where('aspiranteId', '==', aspiranteId)
                .get();
            if (aspiranteDocs.empty) {
                throw new common_1.NotFoundException(`No se encontró el aspirante con ID: ${aspiranteId}`);
            }
            const aspiranteDoc = aspiranteDocs.docs[0];
            const aspiranteData = aspiranteDoc.data();
            const documents = aspiranteData.Documents || [];
            const documentIndex = documents.findIndex((doc) => doc.type === documentType);
            if (documentIndex === -1) {
                throw new common_1.NotFoundException(`No se encontró un documento del tipo: ${documentType} para el aspirante con ID: ${aspiranteId}`);
            }
            const documentToDelete = documents[documentIndex];
            if (documentToDelete.type === "Solicitud Ingreso") {
                this.logger.log(`Documento del tipo ${documentType} para el aspirante con ID: ${aspiranteId} no se eliminará por ser de tipo "Solicitud Ingreso".`);
                return;
            }
            const documentLink = documentToDelete.link;
            if (documentLink) {
                await this.deletePdfFromFirebase(documentLink);
                documents.splice(documentIndex, 1);
                const aspiranteRef = this.firestore
                    .collection('StudentDocDocument')
                    .doc(aspiranteDoc.id);
                await aspiranteRef.update({ Documents: documents });
                this.logger.log(`Documento del tipo ${documentType} eliminado correctamente para el aspirante con ID: ${aspiranteId}.`);
            }
            else {
                throw new common_1.NotFoundException('No se encontró el enlace del documento para eliminar.');
            }
        }
        catch (error) {
            this.logger.error(`Error al eliminar el documento del aspirante ${aspiranteId}: ${error.message}`);
            throw new common_1.InternalServerErrorException('Error interno al intentar eliminar el documento.');
        }
    }
    async deletePdfFromFirebase(pdfUrl) {
        const bucketName = 'albergue-57e14.appspot.com';
        try {
            const fileName = pdfUrl.split(`https://storage.googleapis.com/${bucketName}/`)[1];
            if (!fileName) {
                throw new Error('No se pudo extraer el nombre del archivo de la URL proporcionada');
            }
            const bucket = this.storage.bucket(bucketName);
            const file = bucket.file(fileName);
            await file.delete();
            this.logger.log(`Archivo ${fileName} eliminado correctamente de Firebase Storage.`);
        }
        catch (error) {
            this.logger.error('Error al eliminar el PDF de Firebase Storage:', error);
            throw new Error('No se pudo eliminar el PDF de Firebase Storage');
        }
    }
    getDaysUntilNextRun() {
        const now = new Date();
        const timeUntilNextRun = this.nextRunTime.getTime() - now.getTime();
        return Math.ceil(timeUntilNextRun / (24 * 60 * 60 * 1000));
    }
    async getDaysUntilDelete() {
        const now = new Date();
        const snapshot = await this.firestore
            .collection(convocatoria_document_1.ConvocatoriaDocument.collectionName)
            .where('status', '==', false)
            .get();
        const result = [];
        for (const doc of snapshot.docs) {
            const convocatoria = doc.data();
            let endDate;
            if (typeof convocatoria.endDate === 'string') {
                endDate = new Date(convocatoria.endDate);
                if (isNaN(endDate.getTime())) {
                    this.logger.error(`La fecha endDate de la convocatoria con ID ${convocatoria.id} no es válida.`);
                    continue;
                }
            }
            else {
                this.logger.error(`El formato de endDate en la convocatoria ${convocatoria.id} no es una cadena.`);
                continue;
            }
            const daysUntilDelete = Math.ceil((endDate.getTime() + 30 * 24 * 60 * 60 * 1000 - now.getTime()) / (24 * 60 * 60 * 1000));
            if (daysUntilDelete > 0) {
                result.push({
                    convocatoriaId: convocatoria.id,
                    daysUntilDelete,
                });
            }
        }
        return result;
    }
};
exports.ExpiredStudentService = ExpiredStudentService;
exports.ExpiredStudentService = ExpiredStudentService = ExpiredStudentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ExpiredStudentService);
//# sourceMappingURL=expiredCall.service.js.map