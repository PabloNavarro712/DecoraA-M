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
    private readonly usuariosService;
    private readonly logger;
    constructor(usuariosService: UsuariosService);
    crearUsuario(usuario: UsuariosDocument): Promise<{
        message: string;
    }>;
    getUsuariosPaginated(page?: number, nombreCompleto?: string): Promise<UsuariosDocument[]>;
    updateUsuarioBloqueado(id: string, bloqueado: boolean): Promise<{
        message: string;
    }>;
}
export {};
