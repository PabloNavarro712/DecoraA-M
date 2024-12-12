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

  async getEventosOrdenados(): Promise<EventosDocument[]> {
    try {
      const snapshot = await this.firestore
        .collection(this.collectionName)
        .where('estado', 'in', ['pendiente', 'rechazado', 'cancelado'])
        .get();

      const eventos = snapshot.docs.map(
        (doc) => new EventosDocument(doc.data() as Partial<EventosDocument>),
      );

      // Ordenar según los criterios establecidos
      const eventosOrdenados = eventos.sort((a, b) => {
        if (a.estado === b.estado) {
          // Si el estado es igual y es "pendiente", ordenar por solicitud_cancelar y reagendar
          if (a.estado === 'pendiente') {
            if (a.solicitud_cancelar && a.reagendar) return -1;
            if (a.solicitud_cancelar && !a.reagendar) return -1;
            return 1;
          }
          return 0;
        }
        // Ordenar pendiente primero, luego rechazado, y finalmente cancelado
        return (
          ['pendiente', 'rechazado', 'cancelado'].indexOf(a.estado) -
          ['pendiente', 'rechazado', 'cancelado'].indexOf(b.estado)
        );
      });

      return eventosOrdenados;
    } catch (error) {
      console.error(`Error al obtener los eventos ordenados: ${error.message}`);
      throw error;
    }
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
  // Obtener eventos por estado, pero solo las fechas
  async getFechasEventosAceptados(): Promise<string[]> {
    try {
      const snapshot = await this.firestore
        .collection(this.collectionName)
        .where('estado', 'in', ['aceptado'])
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

  // Obtener eventos por estado, pero solo las fechas
  async getFechasEventosPendientes(): Promise<string[]> {
    try {
      const snapshot = await this.firestore
        .collection(this.collectionName)
        .where('estado', 'in', ['pendiente'])
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
  // Obtener eventos por fecha
  async getEventosPorFecha(fechaInicio: Date): Promise<EventosDocument[]> {
    try {
      // Convertir la fecha de inicio a un string en formato ISO
      const fechaInicioStr = fechaInicio.toISOString();

      // Obtener los eventos que tengan la misma fecha de evento
      const snapshot = await this.firestore
        .collection(this.collectionName)
        .where('fechaEvento', '==', fechaInicioStr) // Comparar como string
        .get();

      // Mapear los resultados a objetos EventosDocument
      return snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as EventosDocument,
      );
    } catch (error) {
      this.logger.error(`Error al obtener eventos por fecha: ${error.message}`);
      throw error;
    }
  }
  // Actualizar estado de un evento
  async actualizarEstadoEvento(
    idEvento: string,
    nuevoEstado: 'aceptado' | 'reechazado',
  ): Promise<EventosDocument> {
    try {
      const eventoRef = this.firestore
        .collection(this.collectionName)
        .doc(idEvento);

      // Obtener el documento para verificar si existe
      const eventoDoc = await eventoRef.get();

      if (!eventoDoc.exists) {
        throw new Error('Evento no encontrado');
      }

      // Actualizar el estado del evento
      await eventoRef.update({
        estado: nuevoEstado,
        // Añadir una fecha de actualización o cualquier otro dato necesario
        fechaActualizacion: Timestamp.now(),
      });

      // Obtener el evento actualizado
      const eventoActualizado = await eventoRef.get();
      return new EventosDocument(
        eventoActualizado.data() as Partial<EventosDocument>,
      );
    } catch (error) {
      this.logger.error(
        `Error al actualizar el estado del evento: ${error.message}`,
      );
      throw error;
    }
  }
}
