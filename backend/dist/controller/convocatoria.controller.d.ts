import { ConvocatoriaService } from '../service/convocatoria.service';
import { ConvocatoriaDocument } from '../todos/document/convocatoria.document';
export declare class ConvocatoriaController {
    private readonly convocatoriaService;
    constructor(convocatoriaService: ConvocatoriaService);
    getCurrentConvocatoria(): Promise<{
        message: string;
        convocatoria: ConvocatoriaDocument;
    }>;
    getAllConvocatorias(): Promise<{
        message: string;
        convocatorias: ConvocatoriaDocument[];
    }>;
    saveConvocatoria(data: Partial<ConvocatoriaDocument>): Promise<{
        message: string;
        convocatoria: ConvocatoriaDocument;
    }>;
    updateConvocatoria(id: string, data: Partial<ConvocatoriaDocument>): Promise<{
        message: string;
        updatedConvocatoria: ConvocatoriaDocument;
    }>;
    deleteConvocatoria(id: string): Promise<{
        message: string;
    }>;
}
