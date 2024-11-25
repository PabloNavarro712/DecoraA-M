
import { ModalService } from 'src/app/data/Services/internal/modal.service';
import { Component, OnInit } from '@angular/core';
import { EventosService} from '../../../../data/Services/eventos.service'; // Asegúrate de que la ruta sea correcta
import { Evento } from 'src/app/data/Interfaces/evento';
declare var bootstrap: any; // Importamos Bootstrap para manejar el modal

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed = true;
  user: any;
  serviciosPedidos: Evento[] = []; // Cambiamos `any` a `Evento` para tipar correctamente

  constructor(private eventosService: EventosService, private modalService:ModalService) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')!);
    console.log(this.user);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  closeNavbar() {
    this.isNavbarCollapsed = true;
  }

  openModal(modal: string) {
    this.modalService.openModal(modal);
  }

  // mostrarServiciosPedidos() {
  //   if (this.user && this.user.id) {
  //     this.eventosService.getEventosByCliente(this.user.id).subscribe(
  //       (eventos) => {
  //         this.serviciosPedidos = eventos.filter(evento => evento.estado !== 'activo');
  //         this.openServiciosPedidosModal();
  //       },
  //       (error) => {
  //         console.error('Error al cargar los eventos:', error);
  //       }
  //     );
  //   }
  // }

  openServiciosPedidosModal() {
    const modalElement = document.getElementById('serviciosPedidosModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // cancelarServicio(servicio: Evento) {
  //   // Confirmación para cancelar el servicio
  //   const confirmacion = confirm('¿Está seguro de que desea cancelar la reservación?');
    
  //   if (confirmacion) {
  //     servicio.estado = 'cancelado'; // Cambiar estado del evento a "cancelado"
      
  //     // Actualizar el evento llamando al método del servicio
  //     this.eventosService.updateEvento(servicio.id!, servicio).subscribe(
  //       () => {
  //         console.log('El servicio fue cancelado exitosamente.');
  //       },
  //       (error) => {
  //         console.error('Error al cancelar el servicio:', error);
  //         alert('Ocurrió un error al cancelar el servicio. Inténtelo de nuevo más tarde.');
  //       }
  //     );
  //   }
  // }
}
