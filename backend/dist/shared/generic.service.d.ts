import { Firestore } from '@google-cloud/firestore';
import { IGenericService } from '../interfaces/generic-service.interface';
export declare class GenericService<T> implements IGenericService<T> {
    protected firestore: Firestore;
    protected collectionName: string;
    constructor(collectionName: string);
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    create(data: T): Promise<T>;
    update(id: string, data: Partial<T>): Promise<void>;
    delete(id: string): Promise<void>;
}
