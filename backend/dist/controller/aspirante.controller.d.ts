import { AspiranteService } from '../service/aspirante.service';
import { AspiranteDocument } from 'src/todos/document/aspirante.document';
export declare class AspiranteController {
    private readonly aspiranteService;
    constructor(aspiranteService: AspiranteService);
    create(aspirante: AspiranteDocument): Promise<{
        message: string;
        aspirante: AspiranteDocument;
    }>;
    login(credentials: {
        correo: string;
        curp: string;
    }): Promise<{
        message: string;
        token: string;
        id: string;
        nombresCompletos: string;
        esAdministrador: boolean;
    }>;
    getAll(): Promise<{
        aspirantes: AspiranteDocument[];
    }>;
    getById(id: string): Promise<{
        aspirante: AspiranteDocument;
    }>;
    update(id: string, aspiranteDto: Partial<AspiranteDocument>): Promise<{
        message: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
    getByCurp(curp: string): Promise<{
        aspiranteId: string;
    }>;
}
