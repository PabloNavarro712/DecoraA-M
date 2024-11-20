import { Institution } from 'src/module/modelsInstitution';
import { InstitutionDocument } from 'src/todos/document/institution.document';
import { CollectionReference } from '@google-cloud/firestore';
export declare class InstitutionService {
    private institutionCollection;
    private logger;
    constructor(institutionCollection: CollectionReference<InstitutionDocument>);
    createInstitution(institution: Institution): Promise<any>;
    getAllInstitutions(): Promise<any[]>;
    getInstitutionById(institutionId: string): Promise<any>;
    deleteInstitutionById(institutionId: string): Promise<void>;
    updateInstitutionName(institutionId: string, updatedInstitutionName: any): Promise<any>;
}
