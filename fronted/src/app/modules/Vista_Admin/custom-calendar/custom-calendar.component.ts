import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css'],
})
export class CustomCalendarComponent {
  currentDate: Date = new Date();
  selectedDate: Date | null = null; // Inicializar como null
  events: Array<{ date: string; title: string }> = [];
  newEventTitle: string = ''; // Título del nuevo evento

  // Obtener el primer día del mes actual
  getFirstDayOfMonth(): Date {
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
  }

  // Obtener el último día del mes actual
  getLastDayOfMonth(): Date {
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
  }

  // Obtener las fechas para mostrar en el calendario
  getCalendarDays(): Date[] {
    const days: Date[] = [];
    const firstDay = this.getFirstDayOfMonth();
    const lastDay = this.getLastDayOfMonth();

    // Rellenar con días vacíos antes del primer día del mes
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), -1 * (i + 1)));
    }

    // Rellenar con días del mes
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), i));
    }

    return days;
  }

  // Manejar la selección de fecha
  onDateSelect(date: Date): void {
    this.selectedDate = date;
    console.log('Fecha seleccionada:', this.selectedDate);
  }

  // Agregar un evento a la lista
  addEvent(): void {
    if (this.newEventTitle && this.selectedDate) {
      this.events.push({
        date: this.selectedDate.toISOString().split('T')[0],
        title: this.newEventTitle,
      });
      this.newEventTitle = ''; // Limpiar el campo de entrada
      console.log(`Evento agregado: ${this.selectedDate} - ${this.newEventTitle}`);
    }

  }

  // Eliminar un evento de la lista
  deleteEvent(eventToDelete: { date: string; title: string }): void {
    this.events = this.events.filter(event => event !== eventToDelete);
    console.log(`Evento eliminado: ${eventToDelete.title} en la fecha ${eventToDelete.date}`);
  }

  // Comprobar si la fecha es hoy
  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }
  hasEvent(date: Date): boolean {
    const dateString = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    return this.events.some(event => event.date === dateString);
  }
}
