import { Injectable, Logger } from '@nestjs/common';
import { Firestore, Timestamp } from '@google-cloud/firestore';
import { EventosDocument } from '../todos/document/eventos.document';
import { UsuariosDocument } from '../todos/document/usuarios.document';
@Injectable()
export class GraficasService {
  private readonly logger = new Logger(GraficasService.name);
  private readonly firestore = new Firestore();
  private readonly eventosCollection = EventosDocument.collectionName;
  private readonly usuariosCollection = UsuariosDocument.collectionName; // Nombre de la colección de usuarios
  constructor(private readonly collectionName: string) {}

  // Obtener estadísticas de eventos por mes
  async getEventosPorMes(mes: string): Promise<any> {
    try {
      const mesNumero = parseInt(mes, 10); // Convertir el mes recibido a número
      if (isNaN(mesNumero) || mesNumero < 1 || mesNumero > 12) {
        throw new Error('Mes inválido. Debe ser un número entre 1 y 12.');
      }

      const eventosRef = this.firestore.collection(this.collectionName);
      const snapshot = await eventosRef
        .where('mes', '==', mesNumero) // Filtrar por mes
        .get();

      let eventosTotales = {
        bodas: 0,
        xvAnos: 0,
        babyShower: 0,
        eventoCorporativo: 0,
        fiestaInfantil: 0,
      };

      let eventosPorEstado = {
        pendiente: 0,
        cancelado: 0,
        aceptado: 0,
        rechazado: 0,
      };

      // Iterar sobre los documentos para contar por tipo y estado
      snapshot.forEach((doc) => {
        const evento: EventosDocument = doc.data() as EventosDocument;

        // Contabilizar por tipo de evento
        switch (evento.tipoEvento) {
          case 'Boda':
            eventosTotales.bodas++;
            break;
          case 'XV años':
            eventosTotales.xvAnos++;
            break;
          case 'Baby Shower':
            eventosTotales.babyShower++;
            break;
          case 'Evento Corporativo':
            eventosTotales.eventoCorporativo++;
            break;
          case 'Fiesta Infantil':
            eventosTotales.fiestaInfantil++;
            break;
        }

        // Contabilizar por estado
        switch (evento.estado) {
          case 'pendiente':
            eventosPorEstado.pendiente++;
            break;
          case 'cancelado':
            eventosPorEstado.cancelado++;
            break;
          case 'aceptado':
            eventosPorEstado.aceptado++;
            break;
          case 'reechazado':
            eventosPorEstado.rechazado++;
            break;
        }
      });

      // Calcular el total de eventos en el mes
      const totalEventoMes =
        eventosTotales.bodas +
        eventosTotales.xvAnos +
        eventosTotales.babyShower +
        eventosTotales.eventoCorporativo +
        eventosTotales.fiestaInfantil;

      return {
        eventosTotales,
        eventosPorEstado,
        totalEventoMes, // Total de eventos del mes
      };
    } catch (error) {
      this.logger.error('Error al obtener los eventos por mes', error);
      throw new Error('Error al obtener los eventos por mes');
    }
  }

  // Obtener estadísticas de ganancias por mes
  async getGananciasPorMes(mes: string): Promise<any> {
    try {
      const mesNumero = parseInt(mes, 10); // Convertir el mes recibido a número
      if (isNaN(mesNumero) || mesNumero < 1 || mesNumero > 12) {
        throw new Error('Mes inválido. Debe ser un número entre 1 y 12.');
      }

      const eventosRef = this.firestore.collection(this.collectionName);
      const snapshot = await eventosRef
        .where('mes', '==', mesNumero) // Filtrar por mes numérico
        .where('estado', '==', 'aceptado') // Solo considerar los eventos aceptados
        .get();

      let gananciasTotales = {
        bodas: 0,
        xvAnos: 0,
        babyShower: 0,
        eventoCorporativo: 0,
        fiestaInfantil: 0,
      };

      // Iterar sobre los documentos para sumar las ganancias por tipo de evento
      snapshot.forEach((doc) => {
        const evento: EventosDocument = doc.data() as EventosDocument;

        // Sumar las ganancias por tipo de evento
        switch (evento.tipoEvento) {
          case 'Boda':
            gananciasTotales.bodas += evento.precio_final;
            break;
          case 'XV años':
            gananciasTotales.xvAnos += evento.precio_final;
            break;
          case 'Baby Shower':
            gananciasTotales.babyShower += evento.precio_final;
            break;
          case 'Evento Corporativo':
            gananciasTotales.eventoCorporativo += evento.precio_final;
            break;
          case 'Fiesta Infantil':
            gananciasTotales.fiestaInfantil += evento.precio_final;
            break;
        }
      });
      const totalGananciaMes =
        gananciasTotales.bodas +
        gananciasTotales.xvAnos +
        gananciasTotales.babyShower +
        gananciasTotales.eventoCorporativo +
        gananciasTotales.fiestaInfantil;
      return { gananciasTotales, totalGananciaMes };
    } catch (error) {
      this.logger.error('Error al obtener las ganancias por mes', error);
      throw new Error('Error al obtener las ganancias por mes');
    }
  }
  async getEventosPorAnio(anio: string): Promise<any> {
    try {
      const anioNumero = parseInt(anio, 10); // Convertir el año recibido a número
      if (isNaN(anioNumero) || anioNumero < 1900 || anioNumero > 2100) {
        throw new Error('Año inválido. Debe ser un número entre 1900 y 2100.');
      }

      const eventosRef = this.firestore.collection(this.collectionName);
      const snapshot = await eventosRef
        .where('anio', '==', anioNumero) // Filtrar por año
        .get();

      // Inicializar las variables para las estadísticas
      const eventosPorMes = {
        1: {
          Boda: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
          ganancias: 0,
          cancelados: 0,
        },
        2: {
          Boda: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
          ganancias: 0,
          cancelados: 0,
        },
        3: {
          Boda: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
          ganancias: 0,
          cancelados: 0,
        },
        4: {
          Boda: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
          ganancias: 0,
          cancelados: 0,
        },
        5: {
          Boda: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
          ganancias: 0,
          cancelados: 0,
        },
        6: {
          Boda: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
          ganancias: 0,
          cancelados: 0,
        },
        7: {
          Boda: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
          ganancias: 0,
          cancelados: 0,
        },
        8: {
          Boda: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
          ganancias: 0,
          cancelados: 0,
        },
        9: {
          Boda: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
          ganancias: 0,
          cancelados: 0,
        },
        10: {
          Boda: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
          ganancias: 0,
          cancelados: 0,
        },
        11: {
          Boda: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
          ganancias: 0,
          cancelados: 0,
        },
        12: {
          Boda: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
          ganancias: 0,
          cancelados: 0,
        },
      };

      let totalEventosAnio = 0;
      let totalGananciasAnio = 0;

      // Iterar sobre los documentos para contar por mes, tipo de evento y ganancias
      snapshot.forEach((doc) => {
        const evento: EventosDocument = doc.data() as EventosDocument;

        // Obtener mes y tipo de evento
        const mes = evento.mes;
        const tipoEvento = evento.tipoEvento;
        const precioFinal = evento.precio_final;
        const estado = evento.estado;

        // Contabilizar eventos por mes y tipo de evento
        if (eventosPorMes[mes]) {
          if (tipoEvento === 'Boda') eventosPorMes[mes].Boda++;
          if (tipoEvento === 'XV años') eventosPorMes[mes].xvAnos++;
          if (tipoEvento === 'Baby Shower') eventosPorMes[mes].babyShower++;
          if (tipoEvento === 'Evento Corporativo')
            eventosPorMes[mes].eventoCorporativo++;
          if (tipoEvento === 'Fiesta Infantil')
            eventosPorMes[mes].fiestaInfantil++;

          // Sumar ganancias por mes y tipo de evento
          if (estado === 'aceptado') {
            eventosPorMes[mes].ganancias += precioFinal;
            totalGananciasAnio += precioFinal;
          }

          // Contabilizar eventos cancelados por mes
          if (estado === 'cancelado') {
            eventosPorMes[mes].cancelados++;
          }
        }

        // Incrementar el total de eventos del año
        if (estado === 'aceptado') {
          totalEventosAnio++;
        }
      });

      return {
        eventosPorMes,
        totalEventosAnio,
        totalGananciasAnio,
      };
    } catch (error) {
      this.logger.error('Error al obtener los eventos por año', error);
      throw new Error('Error al obtener los eventos por año');
    }
  }
  async getClientesEstadisticas(): Promise<any> {
    try {
      const eventosSnapshot = await this.firestore
        .collection(this.eventosCollection)
        .get();
      const eventos = eventosSnapshot.docs.map((doc) => doc.data());

      const usuariosSnapshot = await this.firestore
        .collection(this.usuariosCollection)
        .get();
      const usuarios = usuariosSnapshot.docs.map((doc) => ({
        id: doc.id, // Agregar el ID del documento
        ...(doc.data() as UsuariosDocument), // Incluir todas las propiedades del documento
      }));

      const clientesAtendidosSet = new Set<string>();
      const clienteEventosMap: Record<
        string,
        { nombreCompleto: string; eventos: number }
      > = {};
      let clientesQueCancelaron = 0;

      eventos.forEach((evento) => {
        const idCliente = evento.idCliente;
        const estado = evento.estado;

        if (idCliente) {
          clientesAtendidosSet.add(idCliente);

          if (!clienteEventosMap[idCliente]) {
            // Buscar al usuario asociado
            const usuario = usuarios.find((user) => user.id === idCliente);
            clienteEventosMap[idCliente] = {
              nombreCompleto:
                usuario && typeof usuario.nombreCompleto === 'string'
                  ? usuario.nombreCompleto
                  : 'Desconocido',
              eventos: 0,
            };
          }
          clienteEventosMap[idCliente].eventos++;
        }

        if (estado === 'cancelado') {
          clientesQueCancelaron++;
        }
      });

      const clienteConMasEventos = Object.entries(clienteEventosMap).reduce(
        (max, [id, data]) => {
          if (data.eventos > max.eventos) {
            return { id, ...data };
          }
          return max;
        },
        { id: '', nombreCompleto: '', eventos: 0 },
      );

      return {
        totalClientesAtendidos: clientesAtendidosSet.size,
        clienteConMasEventos,
        totalClientesQueCancelaron: clientesQueCancelaron,
      };
    } catch (error) {
      this.logger.error('Error al obtener estadísticas de clientes', error);
      throw new Error('Error al obtener estadísticas de clientes');
    }
  }
}
