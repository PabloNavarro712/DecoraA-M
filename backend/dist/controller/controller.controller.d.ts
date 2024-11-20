import { ServiceService } from 'src/service/service.service';
export declare class ControllerController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    createData(data: any): Promise<void>;
    getData(): Promise<any>;
}
