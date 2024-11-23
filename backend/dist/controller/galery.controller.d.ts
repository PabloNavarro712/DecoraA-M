import { GaleriaService } from '../service/galery.service';
import { GaleriaDocument } from 'src/todos/document/galery.document';
export declare class GaleriaController {
    private readonly galeriaService;
    constructor(galeriaService: GaleriaService);
    createGallery(file: Express.Multer.File, categoria: string, descripcion: string): Promise<any>;
    getByCategory(categoria: string): Promise<GaleriaDocument[]>;
    updateImageDocument(id: string, updateData: Partial<GaleriaDocument>): Promise<void>;
    deleteImage(id: string): Promise<void>;
}
