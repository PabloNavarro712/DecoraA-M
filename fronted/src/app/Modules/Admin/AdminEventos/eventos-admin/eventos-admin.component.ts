import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../../../Data/Services/eventos.service';
import { Evento } from '../../../../Data/Interfaces/evento';

@Component({
  selector: 'app-eventos-admin',
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.css']
})
export class EventosAdminComponent implements OnInit {
  reservas: Evento[] = [];
  reservasFiltradas: Evento[] = [];
  filtros = {
    fecha: '',
    tipoEvento: '',
    estadoEvento: ''
  };
  reservaSeleccionada: Evento | null = null;
  modoEdicion = false;

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.cargarReservas();
    
  }

  // Cargar todas las reservas desde el servicio
  cargarReservas(): void {
    this.eventosService.getEventos().subscribe(
      (eventos) => {
        this.reservas = eventos; 
        this.aplicarFiltros();
      },
      (error) => {
        console.error('Error al cargar los eventos:', error);
      }
    );
  }

  // Aplicar filtros a las reservas
  aplicarFiltros(): void {
    this.reservasFiltradas = this.reservas.filter((reserva) => {
      const cumpleFecha =
        !this.filtros.fecha || new Date(reserva.fecha_evento).toISOString().split('T')[0] === this.filtros.fecha;
      const cumpleTipo = !this.filtros.tipoEvento || reserva.tipo_evento === this.filtros.tipoEvento;
      const cumpleEstado = !this.filtros.estadoEvento || reserva.estado_evento === this.filtros.estadoEvento;
      return cumpleFecha && cumpleTipo && cumpleEstado;
    });
  }

  // Ver detalles de una reserva
  verDetalles(reserva: Evento): void {
    this.reservaSeleccionada = { ...reserva };
    this.modoEdicion = false;
  }

  // Activar modo edición
  activarEdicion(): void {
    this.modoEdicion = true;
  }

  // Cerrar el modal
  cerrarModal(): void {
    this.reservaSeleccionada = null;
    this.modoEdicion = false;
  }

  // Guardar cambios en el evento
  guardarCambios(): void {
    if (this.reservaSeleccionada) {
      this.eventosService.updateEvento(this.reservaSeleccionada.id!, this.reservaSeleccionada).subscribe(
        (actualizado) => {
          const index = this.reservas.findIndex(
            (reserva) => reserva.id_del_cliente === this.reservaSeleccionada?.id_del_cliente
          );
          if (index > -1) {
            this.reservas[index] = actualizado;
            this.aplicarFiltros();
          }
          this.cerrarModal();
        },
        (error) => {
          console.error('Error al actualizar el evento:', error);
        }
      );
    }
  }

  // Crear un nuevo evento
  crearEvento(evento: Evento): void {
    this.eventosService.createEvento(evento).subscribe(
      (nuevoEvento) => {
        this.reservas.push(nuevoEvento);
        this.aplicarFiltros();
      },
      (error) => {
        console.error('Error al crear el evento:', error);
      }
    );
  }

  // Eliminar un evento
  eliminarEvento(id: string): void {
    this.eventosService.deleteEvento(id).subscribe(
      () => {
        this.reservas = this.reservas.filter((reserva) => reserva.id_del_cliente !== id);
        this.aplicarFiltros();
      },
      (error) => {
        console.error('Error al eliminar el evento:', error);
      }
    );
  }

  limpiarFiltros(): void {
  this.filtros = {
    fecha: '',
    tipoEvento: '',
    estadoEvento: ''
  };
  this.aplicarFiltros();
}

}
