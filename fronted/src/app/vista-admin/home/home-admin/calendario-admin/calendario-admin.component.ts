import { Component } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendario-admin',
  templateUrl: './calendario-admin.component.html',
  styleUrls: ['./calendario-admin.component.css']
})
export class CalendarioAdminComponent {
  selectedDate: Date = new Date();
  selectedEvent: { date: Date; description: string } | null = null;
  events: { date: Date; description: string }[] = [
    { date: new Date(2023, 9, 2), description: 'Evento Corporativo' },
    { date: new Date(2023, 9, 4), description: 'Reunión Privada' },
    { date: new Date(2023, 9, 6), description: 'Fiesta Anual' }
  ];

  notes: string[] = []; // Array para almacenar notas
  newEventDate: Date | null = null; // Para el formulario
  newEventDescription: string = ''; // Descripción del nuevo evento

  selectDate(date: Date | null) {
    this.selectedDate = date || new Date();
    this.selectedEvent = this.events.find(event =>
      event.date.getDate() === this.selectedDate.getDate() &&
      event.date.getMonth() === this.selectedDate.getMonth() &&
      event.date.getFullYear() === this.selectedDate.getFullYear()
    ) || null;
  }

  previousMonth() {
    const newDate = new Date(this.selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    this.selectedDate = newDate;
  }

  nextMonth() {
    const newDate = new Date(this.selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    this.selectedDate = newDate;
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const event = this.events.find(event =>
      event.date.getDate() === cellDate.getDate() &&
      event.date.getMonth() === cellDate.getMonth() &&
      event.date.getFullYear() === cellDate.getFullYear()
    );
    return event ? 'event-day' : '';
  };

  addEvent() {
    if (this.newEventDate && this.newEventDescription) {
      this.events.push({ date: this.newEventDate, description: this.newEventDescription });
      this.newEventDate = null; // Reinicia el campo de fecha
      this.newEventDescription = ''; // Reinicia la descripción
    }
  }

  addNote(note: string) {
    if (note) {
      this.notes.push(note);
    }
  }

  getUpcomingEvents(): { date: Date; description: string }[] {
    const today = new Date();
    return this.events.filter(event => event.date >= today);
  }
}
