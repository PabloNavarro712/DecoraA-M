export declare class Aspirante {
    id: string;
    nombresCompletos: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    curp: string;
    correo: string;
    esAdministrador?: boolean;
    constructor(partial: Partial<Aspirante>);
}
