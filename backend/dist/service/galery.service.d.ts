import { GenericService } from '../shared/generic.service';
import { GaleriaDocument } from '../todos/document/galery.document';
export declare class GaleriaService extends GenericService<GaleriaDocument> {
    private readonly logger;
    private storage;
    constructor();
    createGallery(categoria: string, descripcion: string, imageBuffer: Buffer, imageName: string, contentType: string): Promise<GaleriaDocument>;
    getImagesByCategory(category: string): Promise<GaleriaDocument[]>;
    private uploadImageToFirebase;
    private deleteImageFromFirebase;
    updateImageDocument(id: string, updateData: Partial<GaleriaDocument>): Promise<void>;
    deleteImageById(id: string): Promise<void>;
    updateDocumentAndReplaceImage(id: string, newImageBuffer: Buffer, newImageName: string, newImageContentType: string, updatedData: {
        Categoria: string;
        Descripcion: string;
    }): Promise<void>;
}
