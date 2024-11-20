export declare class ConvocatoriaDocument {
    static collectionName: string;
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    status: boolean;
    cupo: number;
    availableCupo: number;
    occupiedCupo: number;
    constructor(partial: Partial<ConvocatoriaDocument>);
}
