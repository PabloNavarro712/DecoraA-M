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
    estado: 'aceptado' | 'reechazado' | 'pendiente' | 'cancelado';
    precio_final: number;
    adiciones: {
        nombre: string;
        precio: number;
    }[];
    solicitud_cancelar?: boolean;
    reagendar?: boolean;
    Motivo?: string;
    Respuesta?: string;
    constructor(partial: Partial<EventosDocument>);
}
