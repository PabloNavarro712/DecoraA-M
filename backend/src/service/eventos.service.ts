import { Injectable, Logger } from '@nestjs/common';
import { GenericService } from '../shared/generic.service';
import { EventosDocument } from '../todos/document/eventos.document';
import { Firestore, Timestamp } from '@google-cloud/firestore';

@Injectable()
export class EventosService extends GenericService<EventosDocument> {
  private readonly logger = new Logger(EventosService.name);

  constructor() {
    super(EventosDocument.collectionName);
    this.firestore = new Firestore();
  }

  // Obtener eventos por estado, pero solo las fechas
  async getFechasEventosPendientesYAceptados(): Promise<string[]> {
    try {
      const snapshot = await this.firestore
        .collection(this.collectionName)
        .where('estado', 'in', ['aceptado', 'pendiente'])
        .get();

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        let fechaEvento = data.fechaEvento;

        // Si no es un Timestamp, intentar convertirlo
        if (!(fechaEvento instanceof Timestamp)) {
          if (typeof fechaEvento === 'string') {
            fechaEvento = Timestamp.fromDate(new Date(fechaEvento));
          } else if (typeof fechaEvento === 'number') {
            fechaEvento = Timestamp.fromMillis(fechaEvento);
          } else {
            throw new Error(`Formato de fecha no compatible: ${fechaEvento}`);
          }
        }

        return fechaEvento.toDate().toISOString();
      });
    } catch (error) {
      this.logger.error(`Error al obtener fechas de eventos: ${error.message}`);
      throw error;
    }
  }
  async getEventosByEstado(
    estado: 'aceptado' | 'reechazado' | 'pendiente' | 'cancelado',
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
