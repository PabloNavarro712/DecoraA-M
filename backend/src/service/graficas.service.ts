import { Injectable, Logger } from '@nestjs/common';
import { Firestore, Timestamp } from '@google-cloud/firestore';
import { EventosDocument } from '../todos/document/eventos.document';

@Injectable()
export class GraficasService {
  private readonly logger = new Logger(GraficasService.name);
  private readonly firestore = new Firestore();

  constructor(private readonly collectionName: string) {}

  // Obtener estadísticas de eventos por mes
  async getEventosPorMes(): Promise<any> {
    try {
      const eventosSnapshot = await this.firestore
        .collection(this.collectionName)
        .get();
      const eventos = eventosSnapshot.docs.map(
        (doc) => doc.data() as EventosDocument,
      );

      const eventosPorMes = eventos.reduce((acc, evento) => {
        const fechaEvento =
          evento.fechaEvento instanceof Timestamp
            ? evento.fechaEvento.toDate()
            : new Date(evento.fechaEvento);
        const mes = fechaEvento.getMonth();
        const categoria = evento.tipoEvento;

        if (!acc[mes]) acc[mes] = {};
        if (!acc[mes][categoria]) acc[mes][categoria] = 0;

        acc[mes][categoria] += 1;
        return acc;
      }, {});

      return eventosPorMes;
    } catch (error) {
      this.logger.error(`Error al obtener eventos por mes: ${error.message}`);
      throw error;
    }
  }

  // Obtener ganancias mensuales desglosadas por eventos
  async getGananciasMensuales(): Promise<any> {
    try {
      const eventosSnapshot = await this.firestore
        .collection(this.collectionName)
        .get();
      const eventos = eventosSnapshot.docs.map(
        (doc) => doc.data() as EventosDocument,
      );

      const gananciasMensuales = eventos.reduce((acc, evento) => {
        const fechaEvento =
          evento.fechaEvento instanceof Timestamp
            ? evento.fechaEvento.toDate()
            : new Date(evento.fechaEvento);
        const mes = fechaEvento.getMonth();

        if (!acc[mes]) acc[mes] = 0;
        acc[mes] += evento.precio_final;

        return acc;
      }, {});

      return gananciasMensuales;
    } catch (error) {
      this.logger.error(
        `Error al obtener ganancias mensuales: ${error.message}`,
      );
      throw error;
    }
  }

  // Obtener total de clientes que realizaron su evento
  async getTotalClientes(): Promise<number> {
    try {
      const eventosSnapshot = await this.firestore
        .collection(this.collectionName)
        .where('estado', '==', 'aceptado')
        .get();

      const clientesUnicos = new Set(
        eventosSnapshot.docs.map((doc) => doc.data().idCliente),
      );
      return clientesUnicos.size;
    } catch (error) {
      this.logger.error(`Error al obtener total de clientes: ${error.message}`);
      throw error;
    }
  }

  // Obtener total de eventos cancelados
  async getTotalEventosCancelados(): Promise<number> {
    try {
      const eventosSnapshot = await this.firestore
        .collection(this.collectionName)
        .where('estado', '==', 'cancelado')
        .get();

      return eventosSnapshot.size;
    } catch (error) {
      this.logger.error(
        `Error al obtener eventos cancelados: ${error.message}`,
      );
      throw error;
    }
  }

  // Obtener ganancia acumulada del año
  async getGananciaAcumuladaAnual(): Promise<number> {
    try {
      const eventosSnapshot = await this.firestore
        .collection(this.collectionName)
        .get();
      const eventos = eventosSnapshot.docs.map(
        (doc) => doc.data() as EventosDocument,
      );

      const currentYear = new Date().getFullYear();
      const gananciaAcumulada = eventos.reduce((acc, evento) => {
        const fechaEvento =
          evento.fechaEvento instanceof Timestamp
            ? evento.fechaEvento.toDate()
            : new Date(evento.fechaEvento);
        if (
          fechaEvento.getFullYear() === currentYear &&
          evento.estado === 'aceptado'
        ) {
          acc += evento.precio_final;
        }
        return acc;
      }, 0);

      return gananciaAcumulada;
    } catch (error) {
      this.logger.error(
        `Error al obtener ganancia acumulada anual: ${error.message}`,
      );
      throw error;
    }
  }
}
