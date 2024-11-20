import { ConvocatoriaService } from './convocatoria.service';
import { StudenDocService } from '../service/studentdoc.service';
import { AspiranteService } from './aspirante.service';
export declare class AdminService {
    private readonly convocatoriaService;
    private readonly aspiranteService;
    private readonly studentDocService;
    private firestore;
    constructor(convocatoriaService: ConvocatoriaService, aspiranteService: AspiranteService, studentDocService: StudenDocService);
    getDashboardData(): Promise<any>;
}
