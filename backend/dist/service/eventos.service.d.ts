import { GenericService } from '../shared/generic.service';
import { EventosDocument } from '../todos/document/eventos.document';
export declare class EventosService extends GenericService<EventosDocument> {
    private readonly logger;
    constructor();
    getEventosByEstado(estado: 'aceptado' | 'reechazado' | 'pendiente'): Promise<EventosDocument[]>;
    getEventosProximos(fechaBase: Date): Promise<EventosDocument[]>;
    getEventosByCliente(idCliente: string): Promise<EventosDocument[]>;
}
