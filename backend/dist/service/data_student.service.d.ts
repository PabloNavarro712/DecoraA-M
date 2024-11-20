import { GenericService } from '../shared/generic.service';
import { DataStudent } from 'src/todos/document/data_student.document';
export declare class DataStudentService extends GenericService<DataStudent> {
    constructor();
    findByAspiranteId(aspiranteId: string): Promise<DataStudent>;
}
