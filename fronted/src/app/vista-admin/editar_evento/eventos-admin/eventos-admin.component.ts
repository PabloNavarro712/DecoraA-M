import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventosService, Evento } from './../../../servises/eventos.service';

@Component({
  selector: 'app-eventos-admin',
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.css']
})
export class EventosAdminComponent implements OnInit {
  eventosPorConfirmar: Evento[] = [];
  eventosActivos: Evento[] = [];
  eventosCancelados: Evento[] = [];
  showModal = false;
  eventoForm: FormGroup;
  eventoSeleccionado: Evento | null = null;

  constructor(
    private fb: FormBuilder,
    private eventosService: EventosService
  ) {
    this.eventoForm = this.fb.group({
      descripcion: ['', Validators.required],
      nombre_contacto: ['', Validators.required],
      numero_telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      direccion_local: ['', Validators.required],
      fecha_evento: ['', Validators.required],
      hora: ['', Validators.required],
      estado_evento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.eventosService.getEventosByEstado('por confirmar').subscribe(eventos => {
      this.eventosPorConfirmar = eventos;
    });
    this.eventosService.getEventosByEstado('activo').subscribe(eventos => {
      this.eventosActivos = eventos;
    });
    this.eventosService.getEventosByEstado('cancelado').subscribe(eventos => {
      this.eventosCancelados = eventos;
    });
  }

  openModal(evento: Evento): void {
    this.showModal = true;
    this.eventoSeleccionado = evento;
    this.eventoForm.setValue({
      descripcion: evento.descripcion,
      nombre_contacto: evento.nombre_contacto,
      numero_telefono: evento.numero_telefono,
      direccion_local: evento.direccion_local,
      fecha_evento: evento.fecha_evento.split('T')[0],
      hora: evento.hora,
      estado_evento: evento.estado_evento
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.eventoSeleccionado = null;
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      const confirmacion = confirm('¿Estás seguro de que quieres modificar el evento?');
      if (confirmacion) {
        const eventoActualizado: Evento = {
          ...this.eventoSeleccionado!,
          ...this.eventoForm.value
        };
        this.eventosService.updateEvento(eventoActualizado.id!, eventoActualizado).subscribe(
          response => {
            alert('Evento actualizado correctamente');
            this.closeModal();
            this.ngOnInit(); 
          },
          error => {
            alert('Error al actualizar el evento');
          }
        );
      }
    }
  }
}
