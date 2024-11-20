import { GenericService } from '../shared/generic.service';
import { StudentDocDocument } from '../todos/document/studentdoc.document';
import { Firestore } from '@google-cloud/firestore';
export declare class StudenDocService extends GenericService<StudentDocDocument> {
    firestore: Firestore;
    private storage;
    constructor();
    addCommentToAspirante(aspiranteId: string, commentText: string, createdBy: string): Promise<void>;
    getCommentsByStudent(aspiranteId: string): Promise<any[]>;
    deleteCommentFromStudent(commentId: string, aspiranteId: string): Promise<void>;
    addDocumentToAspirante(aspiranteId: string, documentBuffer: Buffer, documentType: string, documentName: string): Promise<void>;
    editDocumentForAspirante(aspiranteId: string, documentBuffer: Buffer, documentType: string, documentName: string): Promise<void>;
    deleteDocumentForAspirante(aspiranteId: string, documentType: string): Promise<void>;
    private deletePdfFromFirebase;
    private uploadPdfToFirebase;
    getDocumentsByAspiranteId(aspiranteId: string): Promise<any[]>;
    getStudentByAspiranteId(aspiranteId: string): Promise<any[]>;
    getStudents(skip: number, limit: number, name?: string): Promise<any[]>;
    getEnrolledStudents(page: number, name?: string): Promise<StudentDocDocument[]>;
    getNotEnrolledStudents(page: number, name?: string): Promise<StudentDocDocument[]>;
    updateDocumentStatus(aspiranteId: string, documentLink: string, newStatus: 'approved' | 'rejected' | 'uploaded'): Promise<void>;
    updateAllDocumentsStatus(aspiranteId: string, newStatus: 'approved' | 'rejected' | 'uploaded'): Promise<void>;
}
