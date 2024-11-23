export declare class ServiciosDocument {
    static collectionName: string;
    id: string;
    titulo: string;
    descripcion: string;
    categoria: string;
    elementos: [];
    imagen: string;
    opciones: {
        nombre: string;
        precio: number;
    }[];
    precio: string;
    constructor(partial: Partial<ServiciosDocument>);
}
