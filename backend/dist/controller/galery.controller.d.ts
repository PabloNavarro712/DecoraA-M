import { GaleryService } from 'src/service/galery.service';
import { GaleryDocument } from 'src/todos/document/galery.document';
export declare class GaleryController {
    private readonly galeryService;
    constructor(galeryService: GaleryService);
    findAll(): Promise<GaleryDocument[]>;
    findById(id: string): Promise<GaleryDocument>;
    create(galery: GaleryDocument): Promise<GaleryDocument>;
    update(id: string, galery: Partial<GaleryDocument>): Promise<void>;
    delete(id: string): Promise<void>;
}
