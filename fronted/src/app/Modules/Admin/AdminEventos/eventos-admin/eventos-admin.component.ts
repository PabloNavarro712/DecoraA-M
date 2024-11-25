import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/data/Services/eventos.service';
import { Evento } from 'src/app/data/Interfaces/evento';
import Swal from 'sweetalert2';

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
        Swal.fire('Error', 'Hubo un error al cargar los eventos.', 'error');
      }
    );
  }

  // Aplicar filtros a las reservas
  aplicarFiltros(): void {
    this.reservasFiltradas = this.reservas.filter((reserva) => {
      const cumpleFecha =
        !this.filtros.fecha || new Date(reserva.fechaEvento).toISOString().split('T')[0] === this.filtros.fecha;
      const cumpleTipo = !this.filtros.tipoEvento || reserva.tipoEvento === this.filtros.tipoEvento;
      const cumpleEstado = !this.filtros.estadoEvento || reserva.estado === this.filtros.estadoEvento;
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
            (reserva) => reserva.idCliente === this.reservaSeleccionada?.idCliente
          );
          if (index > -1) {
            this.reservas[index] = actualizado;
            this.aplicarFiltros();
          }
          this.cerrarModal();
          Swal.fire('Actualizado', 'El evento se ha actualizado con éxito.', 'success');
        },
        (error) => {
          Swal.fire('Error', 'Hubo un problema al actualizar el evento.', 'error');
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

 // Confirmar y eliminar un evento
 eliminarEvento(id: string): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.eventosService.deleteEvento(id).subscribe(
        () => {
          this.reservas = this.reservas.filter((reserva) => reserva.idCliente !== id);
          this.aplicarFiltros();
          Swal.fire('Eliminado', 'El evento ha sido eliminado.', 'success');
        },
        (error) => {
          Swal.fire('Error', 'Hubo un problema al eliminar el evento.', 'error');
        }
      );
    }
  });
}
  limpiarFiltros(): void {
  this.filtros = {
    fecha: '',
    tipoEvento: '',
    estadoEvento: ''
  };
  this.aplicarFiltros();
  Swal.fire('Filtros limpiados', 'Se han eliminado los filtros.', 'info');
}

}
