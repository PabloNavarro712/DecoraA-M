import { InstitutionService } from 'src/service/institution.service';
import { Institution } from 'src/module/modelsInstitution';
export declare class InstitutionController {
    private readonly institutionsService;
    constructor(institutionsService: InstitutionService);
    createNewInstitution(newInstitution: Institution): Promise<{
        message: string;
    }>;
    getAllInstitutions(): Promise<any[]>;
    getInstitutionById(institutionId: string): Promise<any>;
    deleteInstitutionById(institutionId: string): Promise<{
        message: string;
    }>;
    updateInstitution(institutionId: string, updatedInstitution: Institution): Promise<{
        message: string;
    }>;
}
