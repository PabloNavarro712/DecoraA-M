import { GaleriaService } from '../service/galery.service';
import { GaleriaDocument } from 'src/todos/document/galery.document';
declare const GenericGController: {
    new (): {
        readonly genericService: import("../shared/generic.service").GenericService<GaleriaDocument>;
        findAll(): Promise<GaleriaDocument[]>;
        findById(id: string): Promise<GaleriaDocument>;
        create(data: GaleriaDocument): Promise<GaleriaDocument>;
        update(id: string, data: Partial<GaleriaDocument>): Promise<void>;
        delete(id: string): Promise<void>;
    };
};
export declare class GaleriaController extends GenericGController {
    private readonly galeriaService;
    constructor(galeriaService: GaleriaService);
    createGallery(file: Express.Multer.File, categoria: string, descripcion: string): Promise<any>;
    getByCategory(categoria: string): Promise<GaleriaDocument[]>;
    updateImageDocument(id: string, updateData: Partial<GaleriaDocument>, file: Express.Multer.File): Promise<void>;
    deleteImage(id: string): Promise<void>;
}
export {};
