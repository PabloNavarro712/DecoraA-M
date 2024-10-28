import { Component, Input } from '@angular/core';
import { Servicio } from './../../../servises/servicio.service'; // Asegúrate de que la ruta sea correcta
import { NgForm } from '@angular/forms'; 
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  @Input() servicioSeleccionado?: Servicio; // Permite que sea opcional
  diasDeLaSemana: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  dias: number[] = [];
  mes: number = new Date().getMonth();
  anio: number = new Date().getFullYear();
  fechaSeleccionada: Date | null = null;

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
    if (dia > 0) {
      this.fechaSeleccionada = new Date(this.anio, this.mes, dia);
      console.log('Fecha seleccionada:', this.fechaSeleccionada);
    }
  }

  isToday(dia: number): boolean {
    const hoy = new Date();
    return hoy.getFullYear() === this.anio && hoy.getMonth() === this.mes && hoy.getDate() === dia;
  }

  enviarFormulario(form: NgForm) {
    if (form.valid) {
      console.log('Formulario enviado', form.value);
      // Aquí puedes agregar lógica para manejar el envío (como enviar a un backend)
      form.reset(); // Resetear el formulario después de enviarlo si es necesario
    }
  }

}
