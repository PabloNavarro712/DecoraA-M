import { AboutDocument } from '../todos/document/about.document';
export declare class AboutService {
    private firestore;
    private collection;
    constructor();
    createAboutInfo(data: AboutDocument): Promise<{
        message: string;
        document: AboutDocument;
    }>;
    getAboutInfo(): Promise<AboutDocument[]>;
    getAboutInfoById(id: string): Promise<AboutDocument>;
    updateAboutInfoById(id: string, data: Partial<AboutDocument>): Promise<{
        message: string;
        document: AboutDocument;
    }>;
    deleteAboutInfoById(id: string): Promise<{
        message: string;
    }>;
}
