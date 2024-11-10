import { Component, OnInit } from '@angular/core';
import { EventosService, Evento } from './../../../servises/eventos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, startOfDay } from 'date-fns';

@Component({
  selector: 'app-eventos-admin',
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.css']
})
export class EventosAdminComponent implements OnInit {
  eventosActivos: Evento[] = [];
  eventosCancelados: Evento[] = [];
  eventosPorConfirmar: Evento[] = [];
  eventoForm: FormGroup;
  editMode = false;
  eventoSeleccionado: Evento | null = null;

  // Variables para el calendario
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh: number = 0; // Agregar esta línea

  constructor(
    private eventosService: EventosService,
    private fb: FormBuilder
  ) {
    // Crear el formulario de eventos
    this.eventoForm = this.fb.group({
      Descripcion: ['', Validators.required],
      FechaEvento: ['', Validators.required],
      EstadoEvento: ['', Validators.required],
      InformacionContacto: this.fb.group({
        Nombre: ['', Validators.required],
        Numero: ['', Validators.required],
        Direccion: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.cargarEventos();
  }

  // Método para cargar eventos y asignarlos a los distintos estados
  cargarEventos(): void {
    this.eventosService.getEventos().subscribe(eventos => {
      this.eventosActivos = eventos.filter(evento => evento.EstadoEvento.toLowerCase() === 'activo');
      this.eventosCancelados = eventos.filter(evento => evento.EstadoEvento.toLowerCase() === 'cancelado');
      this.eventosPorConfirmar = eventos.filter(evento => evento.EstadoEvento.toLowerCase() === 'por confirmar');

      // Mapea los eventos para marcarlos en el calendario
      this.events = eventos.map(evento => ({
        start: startOfDay(new Date(evento.FechaEvento)),
        title: evento.Descripcion,
        color: this.getEventColor(evento.EstadoEvento),
        allDay: true,
      }));

      this.refresh++; // Incrementar el refresh para forzar la actualización del calendario
    });
  }

  // Método para asignar colores según el estado del evento
  getEventColor(estado: string): { primary: string; secondary: string } {
    switch (estado.toLowerCase()) {
      case 'activo':
        return { primary: '#28a745', secondary: '#e6ffe6' }; // Verde
      case 'cancelado':
        return { primary: '#dc3545', secondary: '#ffe6e6' }; // Rojo
      case 'por confirmar':
        return { primary: '#ffc107', secondary: '#fff5e6' }; // Amarillo
      default:
        return { primary: '#007bff', secondary: '#e6f0ff' }; // Azul
    }
  }

  // Iniciar formulario para crear nuevo evento
  iniciarNuevoEvento(): void {
    this.editMode = false;
    this.eventoForm.reset();
    this.eventoSeleccionado = null;
  } 

  // Editar evento existente
  editarEvento(evento: Evento): void {
    this.editMode = true;
    this.eventoSeleccionado = evento;
    this.eventoForm.patchValue(evento);
  }

  // Guardar o actualizar evento
  guardarEvento(): void {
    if (this.eventoForm.invalid) return;

    const evento = this.eventoForm.value as Evento;

    if (this.editMode && this.eventoSeleccionado) {
      this.eventosService.updateEvento(this.eventoSeleccionado.id!, evento).subscribe(() => {
        this.cargarEventos();
        this.iniciarNuevoEvento();
      });
    } else {
      this.eventosService.createEvento(evento).subscribe(() => {
        this.cargarEventos();
        this.iniciarNuevoEvento();
      });
    }
  }

  // Cambiar estado de un evento
  cambiarEstado(evento: Evento, nuevoEstado: string): void {
    evento.EstadoEvento = nuevoEstado;
    this.eventosService.updateEvento(evento.id!, evento).subscribe(() => {
      this.cargarEventos(); // Recargar eventos después de actualizar el estado
    });
  }
}
