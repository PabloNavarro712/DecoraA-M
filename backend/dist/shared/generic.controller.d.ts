import { GenericService } from './generic.service';
export declare function createGenericController<T>(collectionName: string, endpoint: string): {
    new (): {
        readonly genericService: GenericService<T>;
        findAll(): Promise<T[]>;
        findById(id: string): Promise<T>;
        create(data: T): Promise<T>;
        update(id: string, data: Partial<T>): Promise<void>;
        delete(id: string): Promise<void>;
    };
};
