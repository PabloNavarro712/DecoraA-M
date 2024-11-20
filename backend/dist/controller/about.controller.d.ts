import { AboutService } from '../service/about.service';
import { AboutDocument } from 'src/todos/document/about.document';
export declare class AboutController {
    private readonly aboutService;
    constructor(aboutService: AboutService);
    createAboutInfo(data: AboutDocument): Promise<{
        message: string;
        document: AboutDocument;
    }>;
    getAboutInfo(): Promise<AboutDocument[]>;
    getAboutInfoById(id: string): Promise<AboutDocument>;
    updateAboutInfoById(id: string, updateData: {
        mission?: string;
        vision?: string;
        directorName?: string;
    }): Promise<{
        message: string;
        document: AboutDocument;
    }>;
    deleteAboutInfoById(id: string): Promise<{
        message: string;
    }>;
}
