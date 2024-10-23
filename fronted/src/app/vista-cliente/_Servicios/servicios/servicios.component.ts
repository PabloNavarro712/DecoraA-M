import { Component, OnInit } from '@angular/core';
import { ServiciosService, Servicio } from './../../../servises/servicio.service'; // Asegúrate de que la ruta sea correcta
import * as bootstrap from 'bootstrap'; 
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = []; // Array para almacenar los servicios
  servicioSeleccionado: Servicio | null = null; // Inicializa la variable para almacenar el servicio seleccionado

  constructor(private serviciosService: ServiciosService) {}

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    this.serviciosService.getServicios().subscribe(
      (data: Servicio[]) => {
        this.servicios = data.map(servicio => ({
          ...servicio,
          precioTotal: servicio.precio, // Inicializa precioTotal con el precio base
          mostrarOpciones: false // Inicializa mostrarOpciones como falso
        }));
      },
      (error) => {
        console.error('Error al cargar los servicios', error);
      }
    );
  }

  toggleOpciones(servicio: Servicio) {
    servicio.mostrarOpciones = !servicio.mostrarOpciones;
  }

  actualizarPrecio(servicio: Servicio, opcion: any) {
    opcion.seleccionada = !opcion.seleccionada;

    // Actualizar el precio total basado en la selección de la opción
    servicio.precioTotal = servicio.precio; // Reiniciar el precio total a la base

    // Sumar el precio de las opciones seleccionadas
    for (const opt of servicio.opciones) {
      if (opt.seleccionada) {
        servicio.precioTotal += opt.precio;
      }
    }
  }

  abrirModalReserva(servicio: Servicio) {
    this.servicioSeleccionado = servicio; // Establece el servicio seleccionado
    // Aquí puedes agregar la lógica para abrir el modal, por ejemplo:
    const modalElement = document.getElementById('reservaModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement); // Si usas Bootstrap 5
      modal.show();
    }
  }
}

