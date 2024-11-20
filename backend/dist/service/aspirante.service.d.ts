import { AspiranteDocument } from '../todos/document/aspirante.document';
import { AuthResult } from 'src/module/auth-result.interface';
import { ConvocatoriaService } from './convocatoria.service';
export declare class AspiranteService {
    private readonly convocatoriaService;
    private firestore;
    constructor(convocatoriaService: ConvocatoriaService);
    private checkDuplicates;
    createAspirante(aspirante: AspiranteDocument): Promise<AspiranteDocument>;
    authenticate(correo: string, curp: string): Promise<AuthResult & {
        id: string;
    }>;
    getAllAspirantes(): Promise<AspiranteDocument[]>;
    getAspiranteById(id: string): Promise<AspiranteDocument>;
    updateAspirante(id: string, aspiranteDto: Partial<AspiranteDocument>): Promise<void>;
    deleteAspirante(id: string): Promise<void>;
    getAspiranteByCurp(curp: string): Promise<string>;
}
