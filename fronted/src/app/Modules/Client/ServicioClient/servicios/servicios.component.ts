import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/data/Services/servicio.service'; 
import { Servicio } from 'src/app/data/Interfaces/servicio';
import { ReservaService } from 'src/app/data/Services/internal/reserva.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  servicioSeleccionado: Servicio | undefined;
  mensajeError: string = ''; // Variable para el mensaje de error

  constructor(
    private serviciosService: ServiciosService,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    this.serviciosService.getServicios().subscribe(
      (data: Servicio[]) => {
        this.servicios = data.map(servicio => ({
          ...servicio,
          precioTotal: servicio.precio,
          mostrarOpciones: false
        }));
      },
      error => {
        console.error('Error al cargar los servicios', error);
      }
    );
  }

  toggleOpciones(servicio: Servicio) {
    servicio.mostrarOpciones = !servicio.mostrarOpciones;
  }

  actualizarPrecio(servicio: Servicio, opcion: any) {
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

  abrirModalReserva(servicio: Servicio) {
    // Verificar si el usuario está autenticado
    const user = JSON.parse(sessionStorage.getItem('user')!);

    if (!user) {
      // Si no está autenticado, mostrar un mensaje de error
      this.mensajeError = '¡Debes iniciar sesión para realizar una reserva!';
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
}
