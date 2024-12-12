import { ServiciosService } from '../service/servicios.service';
import { ServiciosDocument } from 'src/todos/document/servicios.document';
declare const GenericServiciosController: {
    new (): {
        readonly genericService: import("../shared/generic.service").GenericService<ServiciosDocument>;
        findAll(): Promise<ServiciosDocument[]>;
        findById(id: string): Promise<ServiciosDocument>;
        create(data: ServiciosDocument): Promise<ServiciosDocument>;
        update(id: string, data: Partial<ServiciosDocument>): Promise<void>;
        delete(id: string): Promise<void>;
    };
};
export declare class ServiciosController extends GenericServiciosController {
    private readonly serviciosService;
    constructor(serviciosService: ServiciosService);
    createServicio(servicioData: any, file: Express.Multer.File): Promise<ServiciosDocument>;
    updateImageDocument(id: string, updateData: any, newImage: Express.Multer.File): Promise<{
        message: string;
    }>;
    deleteService(id: string): Promise<void>;
    getServiciosPaginated(page?: number, categoria?: string): Promise<ServiciosDocument[]>;
}
export {};
