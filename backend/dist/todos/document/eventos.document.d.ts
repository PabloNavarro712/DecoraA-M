export declare class EventosDocument {
    static collectionName: string;
    id: string;
    idServicio: string;
    idCliente: string;
    nombre: string;
    contacto: string;
    correoElectronico: string;
    fechaHoraReserva: Date;
    ubicacionEvento: string;
    tipoEvento: string;
    horaEvento: string;
    fechaEvento: Date;
    estado: 'aceptado' | 'reechazado' | 'pendiente';
    precio_final: number;
    adiciones: {
        nombre: string;
        precio: number;
    }[];
    constructor(partial: Partial<EventosDocument>);
}
