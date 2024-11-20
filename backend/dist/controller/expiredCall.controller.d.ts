import { ExpiredStudentService } from 'src/service/expiredCall.service';
export declare class ExpiredStudentController {
    private readonly expiredStudentService;
    constructor(expiredStudentService: ExpiredStudentService);
    getDaysUntilNextRun(): {
        daysUntilNextRun: number;
    };
    getDaysUntilDelete(): Promise<any[]>;
}
