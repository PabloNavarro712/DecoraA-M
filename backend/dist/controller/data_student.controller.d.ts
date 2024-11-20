import { DataStudentService } from 'src/service/data_student.service';
import { DataStudent } from 'src/todos/document/data_student.document';
declare const GenericStudentDocController: {
    new (): {
        readonly genericService: import("../shared/generic.service").GenericService<DataStudent>;
        findAll(): Promise<DataStudent[]>;
        findById(id: string): Promise<DataStudent>;
        create(data: DataStudent): Promise<DataStudent>;
        update(id: string, data: Partial<DataStudent>): Promise<void>;
        delete(id: string): Promise<void>;
    };
};
export declare class DataStudentController extends GenericStudentDocController {
    private readonly dataStudentService;
    constructor(dataStudentService: DataStudentService);
    getByAspiranteId(aspiranteId: string): Promise<DataStudent>;
}
export {};
