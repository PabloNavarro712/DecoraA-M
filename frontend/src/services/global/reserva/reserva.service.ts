import { Injectable } from '@angular/core';
import { IServicio } from 'src/models/iservicios.metadata';
interface Reserva {
  servicio: IServicio;
  precioTotal: number;
  opcionesSeleccionadas: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservaActual: Reserva | null = null;

  guardarReserva(servicio: IServicio, precioTotal: number, opcionesSeleccionadas: any[]): void {
    this.reservaActual = { servicio, precioTotal, opcionesSeleccionadas };
  }

  obtenerReserva(): Reserva | null {
    return this.reservaActual;
  }

  limpiarReserva(): void {
    this.reservaActual = null;
  }
}
