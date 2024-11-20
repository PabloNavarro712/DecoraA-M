export declare class AspiranteDocument {
    static collectionName: string;
    id: string;
    nombresCompletos: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    curp: string;
    correo: string;
    esAdministrador?: boolean;
    periodoinscripcion?: string;
    statusinscripcion?: boolean;
    convocatoriaId: string;
    constructor(partial: Partial<AspiranteDocument>);
}
