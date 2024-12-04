import { Controller, Get, Param, Query, Logger } from '@nestjs/common';
import { EventosService } from '../service/eventos.service';
import { EventosDocument } from 'src/todos/document/eventos.document';
import { createGenericController } from 'src/shared/generic.controller';

const endpoint = 'api/eventos';

// Crear el controlador genérico para 'eventos'
const GenericEventosController = createGenericController<EventosDocument>(
  EventosDocument.collectionName,
  endpoint,
);

@Controller(endpoint)
export class EventosController extends GenericEventosController {
  private readonly logger = new Logger(EventosController.name);

  constructor(private readonly eventosService: EventosService) {
    super(); // Llama al constructor del controlador genérico
  }

  /**
   * Obtiene los eventos por estado
   * @param estado Estado del evento ('aceptado' | 'reechazado' | 'pendiente')
   */
  @Get('/estado/:estado')
  async getEventosByEstado(
    @Param('estado') estado: 'aceptado' | 'reechazado' | 'pendiente',
  ) {
    return this.eventosService.getEventosByEstado(estado);
  }

  /**
   * Obtiene los eventos próximos a la fecha proporcionada
   * @param fechaBase Fecha base para calcular los eventos próximos
   */
  @Get('/proximos')
  async getEventosProximos(@Query('fechaBase') fechaBase: string) {
    const fecha = new Date(fechaBase);
    return this.eventosService.getEventosProximos(fecha);
  }

  /**
   * Obtiene los eventos por ID de cliente
   * @param idCliente ID del cliente
   */
  @Get('/cliente/:idCliente')
  async getEventosByCliente(@Param('idCliente') idCliente: string) {
    return this.eventosService.getEventosByCliente(idCliente);
  }

  // Endpoint para obtener solo las fechas de los eventos con estado 'aceptado' o 'pendiente'
  @Get('/fechas')
  async getFechasEventosPendientesYAceptados(): Promise<string[]> {
    try {
      return await this.eventosService.getFechasEventosPendientesYAceptados();
    } catch (error) {
      this.logger.error(`Error al obtener fechas de eventos: ${error.message}`);
      throw error;
    }
  }

  @Get('/ordenados')
  async getEventosOrdenados() {
    try {
      return await this.eventosService.getEventosOrdenados();
    } catch (error) {
      this.logger.error(`Error al obtener eventos ordenados: ${error.message}`);
      throw error;
    }
  }
}
