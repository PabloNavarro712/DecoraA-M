import { GenericService } from '../shared/generic.service';
import { EventosDocument } from '../todos/document/eventos.document';
export declare class EventosService extends GenericService<EventosDocument> {
    private readonly logger;
    constructor();
    getEventosOrdenados(): Promise<EventosDocument[]>;
    getFechasEventosPendientesYAceptados(): Promise<string[]>;
    getFechasEventosAceptados(): Promise<string[]>;
    getFechasEventosPendientes(): Promise<string[]>;
    getEventosByEstado(estado: 'aceptado' | 'reechazado' | 'pendiente' | 'cancelado'): Promise<EventosDocument[]>;
    getEventosProximos(fechaBase: Date): Promise<EventosDocument[]>;
    getEventosByCliente(idCliente: string): Promise<EventosDocument[]>;
    getEventosPorFecha(fechaInicio: Date): Promise<EventosDocument[]>;
    actualizarEstadoEvento(idEvento: string, nuevoEstado: 'aceptado' | 'reechazado'): Promise<EventosDocument>;
    reagendarEvento(id: string, nvfecha: Date): Promise<void>;
}
