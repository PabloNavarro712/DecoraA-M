import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Collapse } from 'bootstrap';
@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent {
  constructor(private router: Router) { }

  isNavbarCollapsed = true;

  // Alternar el estado del menú
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  // Cerrar el menú al hacer clic en una opción
  closeNavbar() {
    this.isNavbarCollapsed = true;
  }
    // Función para colapsar el menú
    closeMenu() {
      // Obtiene el menú colapsable por su ID
      const menu = document.getElementById('editMenu');
      
      // Si el menú está expandido, lo colapsa
      if (menu && menu.classList.contains('show')) {
        const bsCollapse = new Collapse(menu, {
          toggle: true // Esto hará que el menú se colapse
        });
        bsCollapse.hide(); // Colapsa el menú
      }
    }
}
