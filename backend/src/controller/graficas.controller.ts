import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { GraficasService } from '../service/graficas.service';

@Controller('api/graficas')
export class GraficasController {
  constructor(private readonly graficasService: GraficasService) {}
  // Endpoint para obtener eventos por mes
  @Get('/eventos/:mes')
  async getEventosPorMes(@Param('mes') mes: string) {
    try {
      // Validar que el mes sea un número entre 01 y 12
      if (!/^([1-9]|1[0-2])$/.test(mes)) {
        throw new HttpException(
          'Mes inválido. Debe ser un número entre 01 y 12.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const eventos = await this.graficasService.getEventosPorMes(mes);
      return eventos;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al obtener los eventos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // Endpoint para obtener ganancias por mes
  @Get('/ganancias/:mes')
  async getGananciasPorMes(@Param('mes') mes: string) {
    try {
      // Validar que el mes sea un número entre 01 y 12
      if (!/^([1-9]|1[0-2])$/.test(mes)) {
        throw new HttpException(
          'Mes inválido. Debe ser un número entre 01 y 12.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const ganancias = await this.graficasService.getGananciasPorMes(mes);
      return ganancias;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al obtener las ganancias',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('estadisticas/:anio')
  async getEstadisticasPorAnio(@Param('anio') anio: string): Promise<any> {
    try {
      if (!anio) {
        throw new HttpException('El parámetro "anio" es requerido.', HttpStatus.BAD_REQUEST);
      }

      const estadisticas = await this.graficasService.getEventosPorAnio(anio);
      return {
        message: 'Estadísticas obtenidas correctamente.',
        data: estadisticas,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al obtener las estadísticas de eventos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
   // Endpoint para obtener estadísticas de clientes atendidos
   @Get('clientes/estadisticas')
   async getClientesEstadisticas(): Promise<any> {
     try {
       const estadisticasClientes = await this.graficasService.getClientesEstadisticas();
       return {
         message: 'Estadísticas de clientes obtenidas correctamente.',
         data: estadisticasClientes,
       };
     } catch (error) {
       throw new HttpException(
         error.message || 'Error al obtener las estadísticas de clientes.',
         HttpStatus.INTERNAL_SERVER_ERROR,
       );
     }
   }
}
