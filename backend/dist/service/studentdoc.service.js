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
exports.StudenDocService = void 0;
const common_1 = require("@nestjs/common");
const generic_service_1 = require("../shared/generic.service");
const studentdoc_document_1 = require("../todos/document/studentdoc.document");
const storage_1 = require("@google-cloud/storage");
const firestore_1 = require("@google-cloud/firestore");
let StudenDocService = class StudenDocService extends generic_service_1.GenericService {
    constructor() {
        super(studentdoc_document_1.StudentDocDocument.collectionName);
        this.firestore = new firestore_1.Firestore();
        this.storage = new storage_1.Storage();
    }
    async addCommentToAspirante(aspiranteId, commentText, createdBy) {
        try {
            const snapshot = await this.firestore
                .collection('StudentDocDocument')
                .where('aspiranteId', '==', aspiranteId)
                .get();
            if (snapshot.empty) {
                throw new common_1.NotFoundException(`No se encontró el aspirante con ID: ${aspiranteId}`);
            }
            const aspiranteDoc = snapshot.docs[0];
            const aspiranteData = aspiranteDoc.data();
            const comments = aspiranteData.comments || [];
            if (!commentText || commentText.trim() === '') {
                throw new common_1.BadRequestException('El texto del comentario no puede estar vacío.');
            }
            const newComment = {
                id: this.firestore.collection('comments').doc().id,
                comment: commentText,
                createdAt: new Date().toISOString(),
                createdBy: createdBy || 'Admin',
            };
            comments.push(newComment);
            const aspiranteRef = this.firestore
                .collection('StudentDocDocument')
                .doc(aspiranteDoc.id);
            await aspiranteRef.update({ comments: comments });
            console.log(`Comentario agregado correctamente para aspiranteId: ${aspiranteId}`);
        }
        catch (error) {
            console.error('Error al agregar comentario:', error);
            throw new common_1.InternalServerErrorException('Error al intentar agregar el comentario. Por favor, inténtelo de nuevo más tarde.');
        }
    }
    async getCommentsByStudent(aspiranteId) {
        try {
            const studentDocSnapshot = await this.firestore
                .collection('StudentDocDocument')
                .where('aspiranteId', '==', aspiranteId)
                .get();
            if (studentDocSnapshot.empty) {
                throw new common_1.NotFoundException(`No se encontraron comentarios para el estudiante con ID: ${aspiranteId}`);
            }
            const studentData = studentDocSnapshot.docs[0].data();
            return studentData.comments || [];
        }
        catch (error) {
            console.error('Error al obtener los comentarios:', error);
            throw new common_1.InternalServerErrorException('Error al obtener los comentarios. Intenta de nuevo más tarde.');
        }
    }
    async deleteCommentFromStudent(commentId, aspiranteId) {
        try {
            console.log(commentId);
            console.log(aspiranteId);
            const studentDocSnapshot = await this.firestore
                .collection('StudentDocDocument')
                .where('aspiranteId', '==', aspiranteId)
                .get();
            if (studentDocSnapshot.empty) {
                throw new common_1.NotFoundException(`No se encontró el estudiante con ID: ${aspiranteId}`);
            }
            const studentDoc = studentDocSnapshot.docs[0];
            const studentData = studentDoc.data();
            const comments = studentData.comments || [];
            const commentIndex = comments.findIndex((comment) => comment.id === commentId);
            if (commentIndex === -1) {
                throw new common_1.NotFoundException(`No se encontró el comentario con ID: ${commentId}`);
            }
            comments.splice(commentIndex, 1);
            await studentDoc.ref.update({ comments });
            console.log(`Comentario con ID: ${commentId} eliminado correctamente.`);
        }
        catch (error) {
            console.error('Error al eliminar el comentario:', error);
            throw new common_1.InternalServerErrorException('Error al eliminar el comentario. Intenta de nuevo más tarde.');
        }
    }
    async addDocumentToAspirante(aspiranteId, documentBuffer, documentType, documentName) {
        try {
            if (!aspiranteId || !documentBuffer || !documentType || !documentName) {
                throw new common_1.BadRequestException('Faltan datos requeridos para el documento');
            }
            const aspiranteDocs = await this.firestore
                .collection('StudentDocDocument')
                .where('aspiranteId', '==', aspiranteId)
                .get();
            if (aspiranteDocs.empty) {
                throw new common_1.NotFoundException(`No se encontró el aspirante con ID: ${aspiranteId}`);
            }
            const aspiranteDoc = aspiranteDocs.docs[0];
            console.log('Aspirante Doc:', aspiranteDoc.data());
            const link = await this.uploadPdfToFirebase(documentBuffer, aspiranteId, documentName);
            const document = {
                name: documentName,
                type: documentType,
                link: link,
                date: new Date().toISOString(),
                status: 'uploaded',
            };
            const aspiranteRef = this.firestore
                .collection('StudentDocDocument')
                .doc(aspiranteDoc.id);
            await aspiranteRef.update({
                Documents: firestore_1.FieldValue.arrayUnion(document),
            });
        }
        catch (error) {
            console.error('Error al añadir documento al aspirante:', error);
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error interno al intentar añadir el documento. Por favor, inténtelo de nuevo más tarde.');
            }
        }
    }
    async editDocumentForAspirante(aspiranteId, documentBuffer, documentType, documentName) {
        try {
            if (!aspiranteId || !documentBuffer || !documentType || !documentName) {
                throw new common_1.BadRequestException('Faltan datos requeridos para el documento');
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
            const existingDocumentIndex = documents.findIndex((doc) => doc.type === documentType);
            if (existingDocumentIndex !== -1) {
                const existingDocument = documents[existingDocumentIndex];
                await this.deletePdfFromFirebase(existingDocument.link);
                documents[existingDocumentIndex] = {
                    name: documentName,
                    type: documentType,
                    link: '',
                    date: new Date().toISOString(),
                    status: 'uploaded',
                };
            }
            else {
                documents.push({
                    name: documentName,
                    type: documentType,
                    link: '',
                    date: new Date().toISOString(),
                    status: 'uploaded',
                });
            }
            const link = await this.uploadPdfToFirebase(documentBuffer, aspiranteId, documentName);
            documents[existingDocumentIndex !== -1
                ? existingDocumentIndex
                : documents.length - 1].link = link;
            const aspiranteRef = this.firestore
                .collection('StudentDocDocument')
                .doc(aspiranteDoc.id);
            await aspiranteRef.update({
                Documents: documents,
            });
        }
        catch (error) {
            console.error('Error al editar el documento del aspirante:', error);
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error interno al intentar editar el documento. Por favor, inténtelo de nuevo más tarde.');
            }
        }
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
            const documentLink = documentToDelete.link;
            if (documentLink) {
                await this.deletePdfFromFirebase(documentLink);
                documents.splice(documentIndex, 1);
                const aspiranteRef = this.firestore
                    .collection('StudentDocDocument')
                    .doc(aspiranteDoc.id);
                await aspiranteRef.update({
                    Documents: documents,
                });
                console.log(`Documento del tipo ${documentType} eliminado correctamente para el aspirante con ID: ${aspiranteId}.`);
            }
            else {
                throw new common_1.NotFoundException('No se encontró el enlace del documento para eliminar.');
            }
        }
        catch (error) {
            console.error('Error al eliminar el documento del aspirante:', error);
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error interno al intentar eliminar el documento. Por favor, inténtelo de nuevo más tarde.');
            }
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
            console.log(`Archivo ${fileName} eliminado correctamente de Firebase Storage.`);
        }
        catch (error) {
            console.error('Error al eliminar el PDF de Firebase Storage:', error);
            throw new Error('No se pudo eliminar el PDF de Firebase Storage');
        }
    }
    async uploadPdfToFirebase(pdfBuffer, aspiranteId, documentName) {
        const bucketName = 'albergue-57e14.appspot.com';
        const fileName = `${aspiranteId}_${documentName}.pdf`;
        try {
            const bucket = this.storage.bucket(bucketName);
            const file = bucket.file(fileName);
            await file.save(pdfBuffer, {
                metadata: { contentType: 'application/pdf' },
                resumable: false,
            });
            await file.makePublic();
            return `https://storage.googleapis.com/${bucketName}/${fileName}`;
        }
        catch (error) {
            console.error('Error al subir el PDF a Firebase Storage:', error);
            throw new Error('No se pudo subir el PDF a Firebase Storage');
        }
    }
    async getDocumentsByAspiranteId(aspiranteId) {
        try {
            const snapshot = await this.firestore
                .collection('StudentDocDocument')
                .where('aspiranteId', '==', aspiranteId)
                .get();
            if (snapshot.empty) {
                throw new common_1.NotFoundException(`No se encontraron documentos para el aspirante con ID: ${aspiranteId}`);
            }
            const aspiranteData = snapshot.docs[0].data();
            const Documents = aspiranteData.Documents || [];
            return Documents;
        }
        catch (error) {
            console.error('Error al obtener documentos por aspiranteId:', error);
            throw new Error('No se pudieron recuperar los documentos.');
        }
    }
    async getStudentByAspiranteId(aspiranteId) {
        try {
            const snapshot = await this.firestore
                .collection('StudentDocDocument')
                .where('aspiranteId', '==', aspiranteId)
                .get();
            if (snapshot.empty) {
                throw new common_1.NotFoundException(`No se encontro el aspirante con ID: ${aspiranteId}`);
            }
            const aspiranteData = snapshot.docs.map((doc) => doc.data());
            return aspiranteData;
        }
        catch (error) {
            console.error('Error al estudiante por aspiranteId:', error);
            throw new Error('No se pudieron recuperar los documentos.');
        }
    }
    async getStudents(skip, limit, name) {
        try {
            let query = this.firestore
                .collection('StudentDocDocument')
                .limit(limit)
                .offset(skip);
            if (name) {
                query = query
                    .where('name', '>=', name)
                    .where('name', '<=', name + '\uf8ff');
            }
            const snapshot = await query.get();
            if (snapshot.empty) {
                throw new common_1.NotFoundException('No se encontraron estudiantes');
            }
            const students = snapshot.docs.map((doc) => {
                const studentData = doc.data();
                return {
                    id: doc.id,
                    name: studentData.name,
                    lastName1: studentData.lastName1,
                    lastName2: studentData.lastName2,
                    email: studentData.email,
                    curp: studentData.curp,
                    enrollmentStatus: studentData.enrollmentStatus,
                    documents: studentData.Documents || [],
                };
            });
            return students;
        }
        catch (error) {
            throw new Error('Error al obtener los estudiantes');
        }
    }
    async getEnrolledStudents(page, name) {
        const studentsPerPage = 20;
        let query = this.firestore
            .collection('StudentDocDocument')
            .where('enrollmentStatus', '==', true)
            .orderBy('id', 'desc')
            .offset((page - 1) * studentsPerPage)
            .limit(studentsPerPage);
        if (name) {
            query = query
                .where('name', '>=', name)
                .where('name', '<=', name + '\uf8ff');
        }
        const snapshot = await query.get();
        if (snapshot.empty) {
            throw new common_1.NotFoundException('No se encontraron estudiantes inscritos.');
        }
        const students = [];
        snapshot.forEach((doc) => {
            students.push(doc.data());
        });
        return students;
    }
    async getNotEnrolledStudents(page, name) {
        const studentsPerPage = 20;
        let query = this.firestore
            .collection('StudentDocDocument')
            .where('enrollmentStatus', '==', false)
            .orderBy('id', 'desc')
            .offset((page - 1) * studentsPerPage)
            .limit(studentsPerPage);
        if (name) {
            query = query
                .where('name', '>=', name)
                .where('name', '<=', name + '\uf8ff');
        }
        const snapshot = await query.get();
        if (snapshot.empty) {
            throw new common_1.NotFoundException('No se encontraron estudiantes no inscritos.');
        }
        const students = [];
        snapshot.forEach((doc) => {
            students.push(doc.data());
        });
        return students;
    }
    async updateDocumentStatus(aspiranteId, documentLink, newStatus) {
        try {
            if (!aspiranteId || !documentLink || !newStatus) {
                throw new common_1.BadRequestException('Datos requeridos faltantes.');
            }
            const snapshot = await this.firestore
                .collection('StudentDocDocument')
                .where('aspiranteId', '==', aspiranteId)
                .get();
            if (snapshot.empty) {
                throw new common_1.NotFoundException(`No se encontraron documentos para el aspirante con ID: ${aspiranteId}`);
            }
            const aspiranteDoc = snapshot.docs[0];
            const aspiranteData = aspiranteDoc.data();
            const documents = aspiranteData.Documents || [];
            const documentIndex = documents.findIndex((doc) => doc.link === documentLink);
            if (documentIndex === -1) {
                throw new common_1.NotFoundException(`No se encontró el documento con el link proporcionado para el aspirante con ID: ${aspiranteId}`);
            }
            documents[documentIndex].status = newStatus;
            const aspiranteRef = this.firestore
                .collection('StudentDocDocument')
                .doc(aspiranteDoc.id);
            await aspiranteRef.update({ Documents: documents });
            const allApproved = documents.every((doc) => doc.status === 'approved');
            if (allApproved) {
                await aspiranteRef.update({ enrollmentStatus: true });
                console.log(`Estado de inscripción actualizado automáticamente a inscrito para el aspiranteId: ${aspiranteId}`);
            }
            else {
                await aspiranteRef.update({ enrollmentStatus: false });
                console.log(`Estado de inscripción actualizado automáticamente a no inscrito para el aspiranteId: ${aspiranteId}`);
            }
        }
        catch (error) {
            console.error('Error al actualizar el estado del documento:', error);
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error interno al intentar actualizar el estado del documento. Por favor, inténtelo de nuevo más tarde.');
            }
        }
    }
    async updateAllDocumentsStatus(aspiranteId, newStatus) {
        try {
            if (!aspiranteId || !newStatus) {
                throw new common_1.BadRequestException('Datos requeridos faltantes.');
            }
            const snapshot = await this.firestore
                .collection('StudentDocDocument')
                .where('aspiranteId', '==', aspiranteId)
                .get();
            if (snapshot.empty) {
                throw new common_1.NotFoundException(`No se encontraron documentos para el aspirante con ID: ${aspiranteId}`);
            }
            const aspiranteDoc = snapshot.docs[0];
            const aspiranteData = aspiranteDoc.data();
            const documents = aspiranteData.Documents || [];
            documents.forEach((doc) => {
                doc.status = newStatus;
            });
            const aspiranteRef = this.firestore
                .collection('StudentDocDocument')
                .doc(aspiranteDoc.id);
            await aspiranteRef.update({ Documents: documents });
            const totalDocuments = documents.length;
            const allApproved = documents.every((doc) => doc.status === 'approved');
            if (allApproved && totalDocuments === 12) {
                await aspiranteRef.update({ enrollmentStatus: true });
                console.log(`Estado de inscripción actualizado automáticamente a inscrito para el aspiranteId: ${aspiranteId}`);
            }
            else {
                await aspiranteRef.update({ enrollmentStatus: false });
                console.log(`Estado de inscripción actualizado automáticamente a no inscrito para el aspiranteId: ${aspiranteId}`);
            }
        }
        catch (error) {
            console.error('Error al actualizar el estado de todos los documentos:', error);
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error interno al intentar actualizar el estado de los documentos. Por favor, inténtelo de nuevo más tarde.');
            }
        }
    }
};
exports.StudenDocService = StudenDocService;
exports.StudenDocService = StudenDocService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StudenDocService);
//# sourceMappingURL=studentdoc.service.js.map