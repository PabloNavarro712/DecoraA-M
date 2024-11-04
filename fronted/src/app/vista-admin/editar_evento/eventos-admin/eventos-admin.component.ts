import { Component, OnInit } from '@angular/core';
import { EventosService, Evento } from './../../../servises/eventos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  // Método para cargar y dividir eventos por estado
  cargarEventos(): void {
    this.eventosService.getEventos().subscribe(eventos => {
      this.eventosActivos = eventos.filter(evento => evento.EstadoEvento.toLowerCase() === 'activo');
      this.eventosCancelados = eventos.filter(evento => evento.EstadoEvento.toLowerCase() === 'cancelado');
      this.eventosPorConfirmar = eventos.filter(evento => evento.EstadoEvento.toLowerCase() === 'por confirmar');
    });
  }

  // Método para preparar el formulario para crear un nuevo evento
  iniciarNuevoEvento(): void {
    this.editMode = false;
    this.eventoForm.reset();
    this.eventoSeleccionado = null;
  } 

  // Método para preparar el formulario para editar un evento existente
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
      // Actualizar evento existente
      this.eventosService.updateEvento(this.eventoSeleccionado.id!, evento).subscribe(() => {
        this.cargarEventos();
        this.iniciarNuevoEvento();
      });
    } else {
      // Crear nuevo evento
      this.eventosService.createEvento(evento).subscribe(() => {
        this.cargarEventos();
        this.iniciarNuevoEvento();
      });
    }
  }
}
