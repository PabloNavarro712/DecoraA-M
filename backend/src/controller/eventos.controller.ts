import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventosService } from '../service/eventos.service';
import { EventosDocument } from 'src/todos/document/eventos.document';
import { createGenericController } from 'src/shared/generic.controller';

// Crear el controlador genérico para 'eventos'
const endpoint = 'api/eventos';

// Crear el controlador genérico para 'eventos'
const GenericEventosController = createGenericController<EventosDocument>(
  EventosDocument.collectionName,
  endpoint,
);

@Controller(endpoint)
export class EventosController extends GenericEventosController {
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
}
