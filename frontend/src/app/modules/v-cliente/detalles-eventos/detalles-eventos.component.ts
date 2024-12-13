import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener el parámetro ID de la URL
import { EventosService } from 'src/services/api/eventos/eventos.service';
import { ServiciosService } from 'src/services/api/servicio/servicio.service';
import { IEvento } from 'src/models/ievento.metadata';
import { IServicio} from 'src/models/iservicios.metadata';
import Swal from 'sweetalert2';
import { TemplateRef } from '@angular/core';
@Component({
  selector: 'app-detalles-eventos',
  templateUrl: './detalles-eventos.component.html',
  styleUrls: ['./detalles-eventos.component.css']
})
export class DetallesEventosComponent implements OnInit {
  eventos: IEvento[] = []; // Para almacenar los eventos
  idCliente!: string; // ID del cliente obtenido
  servicio!: IServicio; // Servicio asociado a un evento
  detallesAbiertos: boolean[] = [];
  eventoSeleccionado!: IEvento | null;
  motivoCancelacion: string = '';
  showCancelModal = false;  // Control para mostrar/ocultar el modal
  selectedEventoId: string | null = null;  // Evento seleccionado para cancelar
  deseaReagendar: boolean = false;
  cancelReason: string = '';
  diasDeLaSemana: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  dias: number[] = [];
  mes: number = new Date().getMonth();
  anio: number = new Date().getFullYear();
  fechaSeleccionada: Date = new Date(); // Inicializa con la fecha actual
  fechasNoSeleccionables: Date[] = []; 
  constructor(
    private elRef: ElementRef,
    private eventoService: EventosService, // Inyección del servicio
    private serveService: ServiciosService, // Inyección del servicio
    private route: ActivatedRoute, // Para obtener parámetros de la URL

  ) {}

  ngOnInit(): void {
    // Obtener el ID del cliente desde la URL
    const storedUser = sessionStorage.getItem('user');
    console.log(this.idCliente)
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.idCliente = user.id; // Asignar el id del cliente desde sessionStorage, asegúrate de que este campo esté disponible
    }

    this.route.paramMap.subscribe(params => {

      if (this.idCliente) {
        this.cargarEventos(this.idCliente); // Cargar los eventos del cliente
      }
    });
  }
  generarDias() {
    this.dias = [];
    const fecha = new Date(this.anio, this.mes + 1, 0);
    const totalDias = fecha.getDate();
    const primerDiaDelMes = new Date(this.anio, this.mes, 1).getDay();

    for (let i = 0; i < primerDiaDelMes; i++) {
      this.dias.push(0);
    }
    for (let dia = 1; dia <= totalDias; dia++) {
      this.dias.push(dia);
    }
  }
  navegarMes(direccion: number) {
    this.mes += direccion;
    if (this.mes < 0) {
      this.mes = 11;
      this.anio--;
    } else if (this.mes > 11) {
      this.mes = 0;
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

isSelectable(dia: number): boolean {
  if (dia <= 0) return false;

  const fechaSeleccionada = new Date(this.anio, this.mes, dia);
  const hoy = new Date();
  const maniana = new Date(hoy);
  maniana.setDate(hoy.getDate() + 1);

  const esPasado = fechaSeleccionada < maniana || fechaSeleccionada.toDateString() === hoy.toDateString();
  const esDiaNoSeleccionable = this.fechasNoSeleccionables.some(
    fecha => fecha.toDateString() === fechaSeleccionada.toDateString()
  );

  return !esPasado && !esDiaNoSeleccionable;
}
    // Función para abrir el modal
    openCancelModal(eventoId: string) {
      this.selectedEventoId = eventoId;
      this.showCancelModal = true;
    }
  

  // Función para cerrar el modal
  closeCancelModal() {
    this.showCancelModal = false;
    this.selectedEventoId = null;
  }


  // Función para alternar la visualización de los detalles
  toggleDetalles(index: number) {
    this.detallesAbiertos[index] = !this.detallesAbiertos[index];
  }
  cargarEventos(idCliente: string): void {
    this.eventoService.getEventosByCliente(idCliente).subscribe({
      next: (eventos: IEvento[]) => {
        // Ordenar los eventos según el estado en el orden especificado
        const estadoPrioridad = {
          rechazado: 1,
          aceptado: 2,
          pendiente: 3,
          cancelado: 4
        };
        
        this.eventos = eventos.sort((a, b) => {
          const prioridadA = estadoPrioridad[a.estado.toLowerCase() as keyof typeof estadoPrioridad] || 5;
          const prioridadB = estadoPrioridad[b.estado.toLowerCase() as keyof typeof estadoPrioridad] || 5;
          return prioridadA - prioridadB;
        });
  
        // Si hay eventos, cargar el servicio relacionado
        if (this.eventos.length > 0) {
          const idServicio = this.eventos[0].idServicio ?? ''; 
          if (idServicio) {
            this.cargarServicio(idServicio);
          } else {
            console.warn('El evento no tiene un idServicio asociado.');
          }
        }
      },
      error: (error) => {
        console.error('Error al obtener eventos:', error);
      },
    });
  }
  
  
  cargarServicio(idServicio: string): void {
    this.serveService.getById(idServicio).subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.servicio = response.data; // Guardar el servicio obtenido
          console.log('Servicio cargado con éxito:', response.msg || 'Sin mensaje');
        } else {
          console.error('Error al obtener el servicio:', response.msg);
        }
      },
      error: (error) => {
        console.error('Error inesperado al obtener el servicio:', error);
      }
    });
  }
  


cancelarReserva(eventoId: string): void {
  // Encuentra el evento en la lista
  const evento = this.eventos.find(e => e.id === eventoId);
 
  if (evento) {
    if (this.deseaReagendar && (!this.fechaSeleccionada || isNaN(new Date(this.fechaSeleccionada).getTime()))) {
      Swal.fire('Error', 'Debes proporcionar una fecha válida para reagendar.', 'error');
      return;
    }
    // Crea un nuevo objeto con el estado actualizado
    const eventoActualizado: IEvento = { 
      ...evento, 
      solicitud_cancelar: true,
      reagendar: this.deseaReagendar,
      nvfecha: this.deseaReagendar ? new Date(this.fechaSeleccionada!) : undefined,
      Motivo: this.motivoCancelacion,  // Asigna el motivo de la cancelación
    };

    // Llama al servicio para actualizar
    this.eventoService.update(eventoId, eventoActualizado).subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          console.log(`Reserva cancelada para el evento con ID: ${eventoId}`);
                  // Muestra el mensaje de confirmación
                 
          // Actualiza la lista local de eventos
          this.eventos = this.eventos.map(e =>
            e.id === eventoId ? response.data! : e
          );
        } else {
          console.error('Error al cancelar la reserva:', response.msg);
          
          // Muestra un mensaje de error
          Swal.fire({
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Se ha enviado solicitud para la cancelacion del evento.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          });
          this.closeCancelModal();
        }
      },
      error: (error) => {
        console.error('Error inesperado al cancelar la reserva:', error);

        // Muestra un mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cancelar la reserva. Intenta nuevamente.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  } else {
    console.warn(`No se encontró un evento con ID: ${eventoId}`);
  
    // Muestra un mensaje de advertencia si el evento no se encuentra
    Swal.fire({
      icon: 'warning',
      title: 'Evento No Encontrado',
      text: 'No se encontró un evento con el ID especificado.',
      confirmButtonColor: '#ffc107',
      confirmButtonText: 'Aceptar'
    });
  }
}



  
}
