export declare class UsuariosDocument {
    static collectionName: string;
    id: string;
    usuario: string;
    correo: string;
    contrasena: string;
    esAdministrador: boolean;
    nombreCompleto: string;
    constructor(partial: Partial<UsuariosDocument>);
}
