import { Component, OnInit } from '@angular/core';
import { ModalService } from './../../../services/Servicio_modal/modal.service';

declare var bootstrap: any; // Importamos Bootstrap para manejar el modal

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isNavbarCollapsed = true;
  user: any;  
  serviciosPedidos: any[] = [];

  constructor(private modalService: ModalService) {}

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

  mostrarServiciosPedidos() {
    this.serviciosPedidos = [
      { nombre: 'Decoración de boda', estado: 'activo' },
      { nombre: 'Fiesta de cumpleaños', estado: 'por confirmar' },
      { nombre: 'Evento corporativo', estado: 'cancelado' }
    ];

    const modalElement = document.getElementById('serviciosPedidosModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  cancelarServicio(servicio: any) {
    servicio.estado = 'cancelado';
  }
}
