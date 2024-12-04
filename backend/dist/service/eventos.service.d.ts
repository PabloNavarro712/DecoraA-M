import { GenericService } from '../shared/generic.service';
import { EventosDocument } from '../todos/document/eventos.document';
export declare class EventosService extends GenericService<EventosDocument> {
    private readonly logger;
    constructor();
    getEventosOrdenados(): Promise<EventosDocument[]>;
    getFechasEventosPendientesYAceptados(): Promise<string[]>;
    getEventosByEstado(estado: 'aceptado' | 'reechazado' | 'pendiente' | 'cancelado'): Promise<EventosDocument[]>;
    getEventosProximos(fechaBase: Date): Promise<EventosDocument[]>;
    getEventosByCliente(idCliente: string): Promise<EventosDocument[]>;
}
