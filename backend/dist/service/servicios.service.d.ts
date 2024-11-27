import { GenericService } from '../shared/generic.service';
import { ServiciosDocument } from '../todos/document/servicios.document';
export declare class ServiciosService extends GenericService<ServiciosDocument> {
    private readonly logger;
    private storage;
    private readonly bucketName;
    constructor();
    createService(titulo: string, descripcion: string, categoria: string, imageBuffer: Buffer, imageName: string, contentType: string): Promise<ServiciosDocument>;
    updateImageDocument(id: string, updateData: Partial<ServiciosDocument>, newImageBuffer: Buffer, newImageName: string, newImageContentType: string): Promise<void>;
    deleteService(id: string): Promise<void>;
    private uploadImageToFirebase;
    private deleteImageFromFirebase;
    getServiciosPaginated(page: number, categoria?: string): Promise<ServiciosDocument[]>;
}
