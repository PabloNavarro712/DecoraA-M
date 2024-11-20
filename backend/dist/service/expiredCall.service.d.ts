import { OnModuleInit } from '@nestjs/common';
export declare class ExpiredStudentService implements OnModuleInit {
    private readonly logger;
    private firestore;
    private storage;
    private readonly intervalTime;
    private nextRunTime;
    constructor();
    onModuleInit(): void;
    private scheduleTask;
    private removeExpiredUnenrolledStudents;
    private deleteStudentData;
    private deleteDocumentForAspirante;
    private deletePdfFromFirebase;
    getDaysUntilNextRun(): number;
    getDaysUntilDelete(): Promise<any[]>;
}
