import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Para interacción como selección

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  events: any[] = []; // Array para almacenar los eventos

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    dateClick: this.handleDateClick.bind(this), // Al hacer clic en una fecha
    events: this.events // Mostrar los eventos
  };

  handleDateClick(arg: any) {
    const title = prompt('Introduce el título del evento:');
    if (title) {
      this.events.push({ title, date: arg.dateStr });
    }
  }
}
