import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { GraficasService } from '../service/graficas.service';

@Controller('api/graficas')
export class GraficasController {
  constructor(private readonly graficasService: GraficasService) {}

  @Get('eventos-por-mes')
  async getEventosPorMes() {
    try {
      const data = await this.graficasService.getEventosPorMes();
      return { success: true, data };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener eventos por mes',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('ganancias-mensuales')
  async getGananciasMensuales() {
    try {
      const data = await this.graficasService.getGananciasMensuales();
      return { success: true, data };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener ganancias mensuales',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('total-clientes')
  async getTotalClientes() {
    try {
      const data = await this.graficasService.getTotalClientes();
      return { success: true, data };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener total de clientes',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('total-eventos-cancelados')
  async getTotalEventosCancelados() {
    try {
      const data = await this.graficasService.getTotalEventosCancelados();
      return { success: true, data };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener total de eventos cancelados',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('ganancia-acumulada-anual')
  async getGananciaAcumuladaAnual() {
    try {
      const data = await this.graficasService.getGananciaAcumuladaAnual();
      return { success: true, data };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener ganancia acumulada anual',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
