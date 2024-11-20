import { AdminService } from '../service/admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboardData(): Promise<any>;
}
