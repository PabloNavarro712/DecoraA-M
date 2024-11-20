import { OnModuleInit } from '@nestjs/common';
import { GenericService } from '../shared/generic.service';
import { ConvocatoriaDocument } from '../todos/document/convocatoria.document';
export declare class ConvocatoriaService extends GenericService<ConvocatoriaDocument> implements OnModuleInit {
    private readonly logger;
    constructor();
    onModuleInit(): void;
    getById(id: string): Promise<ConvocatoriaDocument>;
    getCurrentConvocatoria(): Promise<ConvocatoriaDocument>;
    saveConvocatoria(data: Partial<ConvocatoriaDocument>): Promise<ConvocatoriaDocument>;
    getAllConvocatorias(): Promise<ConvocatoriaDocument[]>;
    private updateAvailableCupoField;
    updateConvocatoria(id: string, data: Partial<ConvocatoriaDocument>): Promise<ConvocatoriaDocument>;
    private getAspirantesInscritos;
    updateCuposOnInscription(convocatoriaId: string, newCupo: number, newAvailableCupo: number, newOccupiedCupo: number): Promise<void>;
    updateCuposOnDeletion(convocatoriaId: string, newCupo: number, newAvailableCupo: number, newOccupiedCupo: number): Promise<void>;
    updateExpiredStatus(): Promise<void>;
    private calculateStatus;
}
