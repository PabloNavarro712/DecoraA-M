import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarCollapsed = true; // Inicialmente el menú está colapsado

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed; // Cambia el estado de colapso
  }

  closeNavbar() {
    this.isNavbarCollapsed = true; // Cierra el menú al hacer clic en un enlace
  }
}
