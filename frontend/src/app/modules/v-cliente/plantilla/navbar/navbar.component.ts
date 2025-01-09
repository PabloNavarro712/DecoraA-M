import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/services/global/modal/modal.service';
import { EventosService } from 'src/services/api/eventos/eventos.service';
import { IEvento } from 'src/models/ievento.metadata';
declare var bootstrap: any; // Importamos Bootstrap para manejar el modal

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed = true;
  user: any;
  serviciosPedidos: IEvento[] = []; // Cambiamos `any` a `Evento` para tipar correctamente

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
  openServiciosPedidosModal() {
    const modalElement = document.getElementById('serviciosPedidosModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
