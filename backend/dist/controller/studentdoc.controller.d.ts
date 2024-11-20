import { StudenDocService } from '../service/studentdoc.service';
import { StudentDocDocument } from 'src/todos/document/studentdoc.document';
declare const GenericStudentDocController: {
    new (): {
        readonly genericService: import("../shared/generic.service").GenericService<StudentDocDocument>;
        findAll(): Promise<StudentDocDocument[]>;
        findById(id: string): Promise<StudentDocDocument>;
        create(data: StudentDocDocument): Promise<StudentDocDocument>;
        update(id: string, data: Partial<StudentDocDocument>): Promise<void>;
        delete(id: string): Promise<void>;
    };
};
export declare class StudentDocController extends GenericStudentDocController {
    private readonly studentdocService;
    constructor(studentdocService: StudenDocService);
    addCommentToAspirante(aspiranteId: string, text: string, createdBy: string): Promise<{
        message: string;
    }>;
    getCommentsByStudent(aspiranteId: string): Promise<any[]>;
    deleteCommentFromStudent(commentId: string, body: {
        aspiranteId: string;
    }): Promise<{
        message: string;
    }>;
    addDocumentToAspirante(aspiranteId: string, documentType: string, documentName: string, file: Express.Multer.File): Promise<void>;
    editDocument(aspiranteId: string, documentType: string, documentName: string, document: Express.Multer.File): Promise<void>;
    deleteDocument(aspiranteId: string, documentType: string): Promise<void>;
    getStudentByAspiranteId(aspiranteId: string): Promise<any[]>;
    getDocumentsByAspiranteId(aspiranteId: string): Promise<any[]>;
    getStudents(page?: number, name?: string): Promise<any[]>;
    getEnrolledStudents(page?: number, name?: string): Promise<StudentDocDocument[]>;
    getNotEnrolledStudents(page?: number, name?: string): Promise<StudentDocDocument[]>;
    updateDocumentStatus(aspiranteId: string, body: {
        link: string;
        status: 'approved' | 'rejected' | 'uploaded';
    }): Promise<{
        message: string;
    }>;
    updateAllDocumentsStatus(aspiranteId: string, body: {
        status: 'approved' | 'rejected' | 'uploaded';
    }): Promise<{
        message: string;
    }>;
}
export {};
