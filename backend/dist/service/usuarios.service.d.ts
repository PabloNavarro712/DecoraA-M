import { GenericService } from '../shared/generic.service';
import { UsuariosDocument } from '../todos/document/usuarios.document';
export declare class UsuariosService extends GenericService<UsuariosDocument> {
    private readonly logger;
    constructor();
    verificarYCrearUsuario(usuario: UsuariosDocument): Promise<string>;
}
