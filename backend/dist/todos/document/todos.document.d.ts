import { Timestamp } from "@google-cloud/firestore";
export declare class TodoDocument {
    static collectionName: string;
    id: string;
    name: string;
    dueDate: Timestamp;
}
