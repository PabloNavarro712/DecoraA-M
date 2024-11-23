import { Injectable, Logger } from '@nestjs/common';
import { GenericService } from '../shared/generic.service';
import { EventosDocument } from '../todos/document/eventos.document';
import { Firestore } from '@google-cloud/firestore';

@Injectable()
export class EventosService extends GenericService<EventosDocument> {
  private readonly logger = new Logger(EventosService.name);
  constructor() {
    super(EventosDocument.collectionName);
    this.firestore = new Firestore();
  }

  async getEventosByEstado(
    estado: 'aceptado' | 'reechazado' | 'pendiente',
  ): Promise<EventosDocument[]> {
    try {
      const snapshot = await this.firestore
        .collection(this.collectionName)
        .where('estado', '==', estado)
        .get();

      return snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as EventosDocument,
      );
    } catch (error) {
      this.logger.error(
        `Error al obtener eventos por estado: ${error.message}`,
      );
      throw error;
    }
  }

  async getEventosProximos(fechaBase: Date): Promise<EventosDocument[]> {
    try {
      const fechaInicio = new Date(fechaBase);
      const fechaFin = new Date(fechaBase);
      fechaFin.setDate(fechaInicio.getDate() + 7);

      const snapshot = await this.firestore
        .collection(this.collectionName)
        .where('fechaEvento', '>=', fechaInicio)
        .where('fechaEvento', '<=', fechaFin)
        .get();

      return snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as EventosDocument,
      );
    } catch (error) {
      this.logger.error(`Error al obtener eventos próximos: ${error.message}`);
      throw error;
    }
  }
  async getEventosByCliente(idCliente: string): Promise<EventosDocument[]> {
    try {
      const snapshot = await this.firestore
        .collection(this.collectionName)
        .where('idCliente', '==', idCliente)
        .get();

      return snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as EventosDocument,
      );
    } catch (error) {
      this.logger.error(
        `Error al obtener eventos por ID del cliente: ${error.message}`,
      );
      throw error;
    }
  }
}
