import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/services/api/servicio/servicio.service';
import { IServicio } from 'src/models/iservicios.metadata';
import { ReservaService } from 'src/services/global/reserva/reserva.service';
declare var bootstrap: any; // Importamos Bootstrap para manejar el modal
import { ModalService } from 'src/services/global/modal/modal.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vista-servicios',
  templateUrl: './vista-servicios.component.html',
  styleUrls: ['./vista-servicios.component.css']
})
export class VistaServiciosComponent implements OnInit {
  servicios: IServicio[] = [];
  servicioSeleccionado: IServicio | undefined;
  mensajeError: string = ''; // Variable para el mensaje de error

  constructor(
    private serviciosService: ServiciosService,
    private reservaService: ReservaService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.modalService.closeModal$.subscribe(() => this.cerrarModal());
    this.cargarServicios();
  }
  cargarServicios() {
    this.serviciosService.getAll().subscribe(
      response => {
        if (!response.error && response.data) {
          this.servicios = response.data.map(servicio => ({
            ...servicio,
            precioTotal: servicio.precio,
            mostrarOpciones: false
          }));
          console.log('Servicios cargados con éxito:', response.msg);
        } else {
          console.error('Error al cargar los servicios:', response.msg);
        }
      },
      error => {
        console.error('Error inesperado al cargar los servicios:', error);
      }
    );
  }
  
  toggleOpciones(servicio: IServicio) {
    servicio.mostrarOpciones = !servicio.mostrarOpciones;
  }

  actualizarPrecio(servicio: IServicio, opcion: any) {
    opcion.seleccionada = !opcion.seleccionada;
    servicio.precioTotal = servicio.precio;

    for (const opt of servicio.opciones) {
      if (opt.seleccionada) {
        servicio.precioTotal += opt.precio;
      }
    }
  }

    // Verificar si el usuario está autenticado
    isUserAuthenticated(): boolean {
      const user = JSON.parse(sessionStorage.getItem('user')!);
      return !!user; // Retorna true si hay un usuario, false si no
    }
  // Verificar si el usuario está bloqueado
isUserBlocked(): boolean {
  const user = JSON.parse(sessionStorage.getItem('user')!);
  return user?.bloqueado ?? false; // Retorna true si está bloqueado, false si no
}
  abrirModalReserva(servicio: IServicio) {
    // Verificar si el usuario está autenticado
    const user = JSON.parse(sessionStorage.getItem('user')!);

    if (!user) {
      // Si no está autenticado, mostrar un mensaje de error
      this.mensajeError = '¡Debes iniciar sesión para realizar una reserva!';
      return; // Salir de la función sin abrir el modal
    }
 // Verificar si el usuario está bloqueado
 if (user.bloqueado) {
  Swal.fire({
    icon: 'error',
    title: 'Acceso Denegado',
    text: 'Tu cuenta está bloqueada. Por favor, contacta al administrador.',
  });
  this.cerrarModal();
  return; // Salir de la función sin abrir el modal
 
}
    // Si el usuario está autenticado, proceder con la reserva
    this.mensajeError = ''; // Limpiar el mensaje de error

    const opcionesSeleccionadas = servicio.opciones.filter(opcion => opcion.seleccionada);
    this.reservaService.guardarReserva(servicio, servicio.precioTotal, opcionesSeleccionadas);
    this.servicioSeleccionado = servicio;

    const modalElement = document.getElementById('reservaModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      document.querySelector('.modal-backdrop')?.remove();
      modal.show();
      modalElement.addEventListener('hidden.bs.modal', () => {
        document.body.classList.remove('modal-open');
        document.querySelector('.modal-backdrop')?.remove();
      });
    }
  }
  cerrarModal() {
    // Código para cerrar el modal, dependiendo de cómo lo creaste
    const modalElement = document.getElementById('reservaModal');
    if (modalElement) {
      modalElement.style.display = 'none'; // o usa Bootstrap: $('#modalId').modal('hide');
    }
  }
}
