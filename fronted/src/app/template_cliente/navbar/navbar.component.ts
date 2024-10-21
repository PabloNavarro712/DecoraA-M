import { Component } from '@angular/core';
import { ModalService } from './../../../services/Servicio_modal/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarCollapsed = true;

  constructor(private modalService: ModalService) {}

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  closeNavbar() {
    this.isNavbarCollapsed = true;
  }

  openModal(modal: string) {
    this.modalService.openModal(modal);
  }
}
