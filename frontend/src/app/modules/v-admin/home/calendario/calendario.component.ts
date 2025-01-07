
import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/services/api/eventos/eventos.service';
import { IEvento } from 'src/models/ievento.metadata';
import { formatDate } from '@angular/common';
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
  acceptedDates: Set<string> = new Set();  // Fechas aceptadas como cadenas ISO (fecha completa)

  pendingDates: Set<string> = new Set();
  eventos: IEvento[] = [];
  showCancelModal: boolean = false;  
  constructor(private yourService: EventosService) {}

  ngOnInit() {

    this.loadAcceptedDates();
    this.loadPendingDates();
  }
  loadAcceptedDates() {
    this.yourService.getFechasAceptadas().subscribe(dates => {
      // Guardamos las fechas como objetos completos Date (no solo el día)
      this.acceptedDates = new Set(dates.map(date => new Date(date).toISOString()));  // Guardamos la fecha completa
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
      this.pendingDates = new Set(dates.map(date => new Date(date).toISOString()));  // Gua
    });
  }
  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.refreshCalendar();
  }
  
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.refreshCalendar();
  }
  refreshCalendar() {
    this.clearDayStyles(); // Limpiar estilos anteriores
    // Recalcula los días y los estados de las fechas al cambiar el mes
    this.getDaysInMonth(this.currentMonth);
    this.getFirstDayOffset(this.currentMonth);
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  getDaysInMonth(month: number): number[] {
    const date = new Date(this.currentYear, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
  getFirstDayOffset(monthIndex: number): number[] {
    const firstDay = new Date(this.currentYear, monthIndex, 1).getDay();
    return Array(firstDay).fill(null);
  }

  isToday(day: number, monthIndex: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentMonth === today.getMonth() &&
      this.currentYear === today.getFullYear()
    );
  }
  formatFechaEvento(fecha: string | Date): string {
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaObj = new Date(fecha);
    return new Intl.DateTimeFormat('es-ES', opciones).format(fechaObj);
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

  hasEventOnDay(day: number, month: number): boolean {
    // Filtrar eventos del mes actual
    return this.eventos.some(evento => {
      const eventoFecha = new Date(evento.fechaEvento);
      return (
        eventoFecha.getDate() === day &&
        eventoFecha.getMonth() === month &&
        eventoFecha.getFullYear() === this.currentYear
      );
    });
  }
  clearDayStyles(): void {
    const days = document.querySelectorAll('.day.has-event');
    days.forEach(day => day.classList.remove('has-event'));
  }
  isAccepted(day: number, month: number, year: number): boolean {
    // Recorremos las fechas aceptadas y comparamos el día, mes y año
    return Array.from(this.acceptedDates).some(date => {
      const acceptedDate = new Date(date);
      return acceptedDate.getDate() === day && acceptedDate.getMonth() === month && acceptedDate.getFullYear() === year;
    });
  }

  isPending(day: number, month: number, year: number): boolean {
    return Array.from(this.pendingDates).some(date => {
      const pendingDates = new Date(date);
      return pendingDates.getDate() === day && pendingDates.getMonth() === month && pendingDates.getFullYear() === year;
    });
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