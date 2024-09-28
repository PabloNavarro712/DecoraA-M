import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarCollapsed = true; // Inicialmente el menú está colapsado
  activeModal: string | null = null; // Control del modal activo

  // Alterna el estado de colapso del menú
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  // Cierra el menú al hacer clic en un enlace
  closeNavbar() {
    this.isNavbarCollapsed = true;
  }

  // Abre el modal de login
  openModal(modal: string) {
    this.activeModal = modal;
  }

  // Cierra el modal
  closeModal(event?: Event) {
    this.activeModal = null;
    if (event) {
      event.stopPropagation();  // Detener la propagación del evento
    }
  }

  // Evita que el clic dentro del contenido del modal cierre el modal
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
