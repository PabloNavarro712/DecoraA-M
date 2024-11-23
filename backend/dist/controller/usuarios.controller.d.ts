import { UsuariosService } from '../service/usuarios.service';
import { UsuariosDocument } from 'src/todos/document/usuarios.document';
declare const GenericUsuariosController: {
    new (): {
        readonly genericService: import("../shared/generic.service").GenericService<UsuariosDocument>;
        findAll(): Promise<UsuariosDocument[]>;
        findById(id: string): Promise<UsuariosDocument>;
        create(data: UsuariosDocument): Promise<UsuariosDocument>;
        update(id: string, data: Partial<UsuariosDocument>): Promise<void>;
        delete(id: string): Promise<void>;
    };
};
export declare class UsuariosController extends GenericUsuariosController {
    private readonly studentdocService;
    constructor(studentdocService: UsuariosService);
}
export {};
