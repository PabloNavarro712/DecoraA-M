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
exports.StudentDocController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const studentdoc_service_1 = require("../service/studentdoc.service");
const studentdoc_document_1 = require("../todos/document/studentdoc.document");
const generic_controller_1 = require("../shared/generic.controller");
const endpoint = 'api/studentdoc';
const GenericStudentDocController = (0, generic_controller_1.createGenericController)(studentdoc_document_1.StudentDocDocument.collectionName, endpoint);
let StudentDocController = class StudentDocController extends GenericStudentDocController {
    constructor(studentdocService) {
        super();
        this.studentdocService = studentdocService;
    }
    async addCommentToAspirante(aspiranteId, text, createdBy) {
        try {
            await this.studentdocService.addCommentToAspirante(aspiranteId, text, createdBy);
            return { message: 'Comentario agregado correctamente' };
        }
        catch (error) {
            console.error('Error al agregar el comentario:', error);
            throw new common_1.HttpException({ message: 'Error al agregar el comentario', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCommentsByStudent(aspiranteId) {
        try {
            const comments = await this.studentdocService.getCommentsByStudent(aspiranteId);
            return comments;
        }
        catch (error) {
            console.error('Error al obtener los comentarios:', error);
            throw new common_1.HttpException({ message: 'Error al obtener los comentarios', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteCommentFromStudent(commentId, body) {
        try {
            await this.studentdocService.deleteCommentFromStudent(body.aspiranteId, commentId);
            return { message: 'Comentario eliminado correctamente' };
        }
        catch (error) {
            console.error('Error al eliminar el comentario:', error);
            throw new common_1.HttpException({ message: 'Error al eliminar el comentario', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addDocumentToAspirante(aspiranteId, documentType, documentName, file) {
        try {
            if (!file || !file.buffer) {
                throw new common_1.BadRequestException('No se ha proporcionado un archivo válido.');
            }
            await this.studentdocService.addDocumentToAspirante(aspiranteId, file.buffer, documentType, documentName);
        }
        catch (error) {
            console.error('Error al añadir el documento al aspirante:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error interno al intentar añadir el documento. Por favor, inténtelo de nuevo más tarde.');
            }
        }
    }
    async editDocument(aspiranteId, documentType, documentName, document) {
        try {
            if (!document) {
                throw new common_1.BadRequestException('El archivo del documento es requerido');
            }
            const documentBuffer = document.buffer;
            await this.studentdocService.editDocumentForAspirante(aspiranteId, documentBuffer, documentType, documentName);
        }
        catch (error) {
            console.error('Error en el controlador al editar el documento del aspirante:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error al intentar editar el documento del aspirante.');
            }
        }
    }
    async deleteDocument(aspiranteId, documentType) {
        try {
            if (!aspiranteId || !documentType) {
                console.log('aspiranteId:', aspiranteId);
                console.log('documentType:', documentType);
                throw new common_1.BadRequestException('Faltan datos requeridos para eliminar el documento');
            }
            await this.studentdocService.deleteDocumentForAspirante(aspiranteId, documentType);
        }
        catch (error) {
            console.error('Error al eliminar el documento del aspirante:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error interno al intentar eliminar el documento. Por favor, inténtelo de nuevo más tarde.');
            }
        }
    }
    async getStudentByAspiranteId(aspiranteId) {
        try {
            const studentData = await this.studentdocService.getStudentByAspiranteId(aspiranteId);
            return studentData;
        }
        catch (error) {
            console.error('Error al obtener datos del estudiante por aspiranteId:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error('Error al recuperar los datos del estudiante.');
        }
    }
    async getDocumentsByAspiranteId(aspiranteId) {
        try {
            const documents = await this.studentdocService.getDocumentsByAspiranteId(aspiranteId);
            return documents;
        }
        catch (error) {
            console.error('Error al obtener documentos del aspirante:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error('Error al recuperar los documentos del aspirante.');
        }
    }
    async getStudents(page = 1, name) {
        try {
            const limit = 20;
            const skip = (page - 1) * limit;
            const students = await this.studentdocService.getStudents(skip, limit, name);
            const hashedStudents = students.map((student) => ({
                ...student,
            }));
            return hashedStudents;
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Error al obtener los estudiantes',
                details: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getEnrolledStudents(page = 1, name) {
        try {
            const students = await this.studentdocService.getEnrolledStudents(page, name);
            return students;
        }
        catch (error) {
            throw new common_1.HttpException({ message: error.message }, error instanceof common_1.HttpException
                ? error.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getNotEnrolledStudents(page = 1, name) {
        try {
            const students = await this.studentdocService.getNotEnrolledStudents(page, name);
            return students;
        }
        catch (error) {
            throw new common_1.HttpException({ message: error.message }, error instanceof common_1.HttpException
                ? error.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateDocumentStatus(aspiranteId, body) {
        const { link, status } = body;
        try {
            await this.studentdocService.updateDocumentStatus(aspiranteId, link, status);
            return {
                message: 'Se ha actualizado correctamente el Status del Documento',
            };
        }
        catch (error) {
            throw new common_1.HttpException({ message: error.message }, error instanceof common_1.HttpException
                ? error.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAllDocumentsStatus(aspiranteId, body) {
        const { status } = body;
        try {
            await this.studentdocService.updateAllDocumentsStatus(aspiranteId, status);
            return {
                message: 'Se han actualizado todos los documentos correctamente.',
            };
        }
        catch (error) {
            throw new common_1.HttpException({ message: error.message }, error instanceof common_1.HttpException
                ? error.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.StudentDocController = StudentDocController;
__decorate([
    (0, common_1.Post)('/add-comment'),
    __param(0, (0, common_1.Body)('aspiranteId')),
    __param(1, (0, common_1.Body)('text')),
    __param(2, (0, common_1.Body)('createdBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], StudentDocController.prototype, "addCommentToAspirante", null);
__decorate([
    (0, common_1.Get)('/comments/:aspiranteId'),
    __param(0, (0, common_1.Param)('aspiranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentDocController.prototype, "getCommentsByStudent", null);
__decorate([
    (0, common_1.Delete)('/delete-comment/:commentId'),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentDocController.prototype, "deleteCommentFromStudent", null);
__decorate([
    (0, common_1.Post)('/add-document'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)('aspiranteId')),
    __param(1, (0, common_1.Body)('documentType')),
    __param(2, (0, common_1.Body)('documentName')),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], StudentDocController.prototype, "addDocumentToAspirante", null);
__decorate([
    (0, common_1.Post)('/edit-document'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('document')),
    __param(0, (0, common_1.Body)('aspiranteId')),
    __param(1, (0, common_1.Body)('documentType')),
    __param(2, (0, common_1.Body)('documentName')),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], StudentDocController.prototype, "editDocument", null);
__decorate([
    (0, common_1.Post)('/delete-document'),
    __param(0, (0, common_1.Body)('aspiranteId')),
    __param(1, (0, common_1.Body)('documentType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StudentDocController.prototype, "deleteDocument", null);
__decorate([
    (0, common_1.Get)('/student/:aspiranteId'),
    __param(0, (0, common_1.Param)('aspiranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentDocController.prototype, "getStudentByAspiranteId", null);
__decorate([
    (0, common_1.Get)('/documents/:aspiranteId'),
    __param(0, (0, common_1.Param)('aspiranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentDocController.prototype, "getDocumentsByAspiranteId", null);
__decorate([
    (0, common_1.Get)('/students'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], StudentDocController.prototype, "getStudents", null);
__decorate([
    (0, common_1.Get)('/enrolled'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], StudentDocController.prototype, "getEnrolledStudents", null);
__decorate([
    (0, common_1.Get)('/not-enrolled'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], StudentDocController.prototype, "getNotEnrolledStudents", null);
__decorate([
    (0, common_1.Put)('/update-status/:aspiranteId'),
    __param(0, (0, common_1.Param)('aspiranteId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentDocController.prototype, "updateDocumentStatus", null);
__decorate([
    (0, common_1.Put)('/update-all-status/:aspiranteId'),
    __param(0, (0, common_1.Param)('aspiranteId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentDocController.prototype, "updateAllDocumentsStatus", null);
exports.StudentDocController = StudentDocController = __decorate([
    (0, common_1.Controller)(endpoint),
    __metadata("design:paramtypes", [studentdoc_service_1.StudenDocService])
], StudentDocController);
//# sourceMappingURL=studentdoc.controller.js.map