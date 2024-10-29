import { Component, Input } from '@angular/core';
import { Servicio } from './../../../servises/servicio.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  @Input() servicioSeleccionado?: Servicio;
  diasDeLaSemana: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  dias: number[] = [];
  mes: number = new Date().getMonth();
  anio: number = new Date().getFullYear();
  fechaSeleccionada: Date | null = null;

  // Fechas no seleccionables (deberías llenarlas desde tu futura conexión a la base de datos)
  fechasNoSeleccionables: Date[] = [
    new Date(2024, 10, 5), // Ejemplo: 5 de noviembre de 2024
    new Date(2024, 10, 10) // Agrega más fechas según sea necesario
  ];

  constructor() {
    this.generarDias(); 
  }

  generarDias() {
    this.dias = [];
    const fecha = new Date(this.anio, this.mes + 1, 0);
    const totalDias = fecha.getDate();
    const primerDiaDelMes = new Date(this.anio, this.mes, 1).getDay();

    // Generar días vacíos para alineación
    for (let i = 0; i < primerDiaDelMes; i++) {
      this.dias.push(0); // Añadir días vacíos
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      this.dias.push(dia);
    }
  }

  navegarMes(direccion: number) {
    this.mes += direccion;
    if (this.mes < 0) {
      this.mes = 11; // Diciembre
      this.anio--;
    } else if (this.mes > 11) {
      this.mes = 0; // Enero
      this.anio++;
    }
    this.generarDias();
  }

  seleccionarFecha(dia: number) {
    if (this.isSelectable(dia)) {
      this.fechaSeleccionada = new Date(this.anio, this.mes, dia);
      console.log('Fecha seleccionada:', this.fechaSeleccionada);
    }
  }

  isToday(dia: number): boolean {
    const hoy = new Date();
    return hoy.getFullYear() === this.anio && hoy.getMonth() === this.mes && hoy.getDate() === dia;
  }

  // Verifica si el día es seleccionable
  isSelectable(dia: number): boolean {
    if (dia <= 0) return false;

    const fechaSeleccionada = new Date(this.anio, this.mes, dia);
    const hoy = new Date();
    const maniana = new Date(hoy);
maniana.setDate(hoy.getDate() + 1);

    // No permitir seleccionar días anteriores a hoy ni el día siguiente
    const esPasado = fechaSeleccionada < maniana|| fechaSeleccionada.toDateString() === hoy.toDateString();
    const esDiaNoSeleccionable = this.fechasNoSeleccionables.some(fecha => fecha.toDateString() === fechaSeleccionada.toDateString());
    
    return !esPasado && !esDiaNoSeleccionable;
  }

  enviarFormulario(form: NgForm) {
    if (form.valid) {
      console.log('Formulario enviado', form.value);
      form.reset(); // Resetear el formulario después de enviarlo si es necesario
    }
  }

  calcularPrecioTotal(): number {
    if (!this.servicioSeleccionado) return 0;
    let precioTotal = this.servicioSeleccionado.precio;
    this.servicioSeleccionado.opciones?.forEach(opcion => {
      if (opcion.seleccionada) {
        precioTotal += opcion.precio;
      }
    });
    return precioTotal;
  }
}
