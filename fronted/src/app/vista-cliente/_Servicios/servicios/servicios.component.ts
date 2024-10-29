import { Component, OnInit } from '@angular/core';
import { ServiciosService, Servicio } from './../../../servises/servicio.service';
import { ReservaService } from './../../../servises/reserva.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  servicioSeleccionado: Servicio | undefined;


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

  abrirModalReserva(servicio: Servicio) {
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
