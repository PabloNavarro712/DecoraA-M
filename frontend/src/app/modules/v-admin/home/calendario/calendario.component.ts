
import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/services/api/eventos/eventos.service';
import { IEvento } from 'src/models/ievento.metadata';
declare var $: any; // Asegúrate de que jQuery esté disponible
interface Event {
  date: Date;
  title: string;
  description?: string;
}
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  weekDays: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  events: Event[] = [];
  isCollapsed: boolean = false;
  acceptedDates: Set<number> = new Set();  // Fechas aceptadas
  pendingDates: Set<number> = new Set();   // Fechas pendientes
  eventos: IEvento[] = [];
  showCancelModal: boolean = false;  
  constructor(private yourService: EventosService) {}

  ngOnInit() {

    this.loadAcceptedDates();
    this.loadPendingDates();
  }
  loadAcceptedDates() {
    this.yourService.getFechasAceptadas().subscribe(dates => {
      this.acceptedDates = new Set(dates.map(date => new Date(date).getDate()));
    });
  }
    // Función para cerrar el modal
    closeCancelModal(): void {
      this.showCancelModal = false;
    }
  
  // Función para abrir el modal
  openModal(): void {
    this.showCancelModal = true;
  }
  loadPendingDates() {
    this.yourService.getFechasPendientes().subscribe(dates => {
      this.pendingDates = new Set(dates.map(date => new Date(date).getDate()));
    });
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  getDaysInMonth(monthIndex: number): number[] {
    const daysInMonth = new Date(this.currentYear, monthIndex + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  getFirstDayOffset(monthIndex: number): number[] {
    const firstDay = new Date(this.currentYear, monthIndex, 1).getDay();
    return Array(firstDay).fill(null);
  }

  isToday(day: number, monthIndex: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      monthIndex === today.getMonth() &&
      this.currentYear === today.getFullYear()
    );
  }

 // Método para manejar la selección de la fecha
 selectDate(day: number, monthIndex: number) {
  // Crear la fecha seleccionada con el día y mes seleccionados
  const selectedDate = new Date(this.currentYear, monthIndex, day);
  console.log('Fecha seleccionada:', selectedDate);

  // Convertir la fecha a formato ISO y obtener los eventos
  const fechaSeleccionadaISO = selectedDate.toISOString();
  
  // Llamar al servicio para obtener los eventos de la fecha seleccionada
  this.getEventosPorFecha(fechaSeleccionadaISO);

}

 // Llamar al servicio para obtener los eventos por fecha
 getEventosPorFecha(fechaInicio: string) {
  this.yourService.getEventosPorFecha(fechaInicio).subscribe((data) => {
    this.eventos = data;  // Asignar los eventos obtenidos a la variable eventos
    console.log('Eventos obtenidos para la fecha:', this.eventos);
  });
}
  addEvent(event: Event) {
    this.events.push(event);
  }

  removeEvent(event: Event) {
    this.events = this.events.filter(e => e !== event);
  }

  hasEventOnDay(day: number, monthIndex: number): boolean {
    return this.events.some(event =>
      event.date.getFullYear() === this.currentYear &&
      event.date.getMonth() === monthIndex &&
      event.date.getDate() === day
    );
  }
  isAccepted(day: number): boolean {
    return this.acceptedDates.has(day);
  }

  isPending(day: number): boolean {
    return this.pendingDates.has(day);
  }
// Función para actualizar el estado del evento
updateEstado(evento: IEvento, nuevoEstado: 'aceptado' | 'reechazado'): void {
  if (!evento.id) {
    console.error('El evento no tiene un ID válido');
    return;
  }

  // Actualizamos el estado del evento en el frontend
  evento.estado = nuevoEstado; 

  // Llamamos al servicio para actualizar el estado en el backend
  this.yourService.actualizarEstado(evento.id!, nuevoEstado).subscribe(
    (response) => {
      console.log('Estado actualizado', response);
    },
    (error) => {
      console.error('Error al actualizar el estado', error);
    }
  );
}
}