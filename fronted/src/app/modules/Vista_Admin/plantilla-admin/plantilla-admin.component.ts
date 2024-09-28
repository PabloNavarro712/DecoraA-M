import { Component } from '@angular/core';

@Component({
  selector: 'app-plantilla-admin',
  templateUrl: './plantilla-admin.component.html',
  styleUrls: ['./plantilla-admin.component.css']
})
export class PlantillaAdminComponent {


    isNavbarCollapsed = true;
  
    // Alternar el estado del menú
    toggleNavbar() {
      this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }
  
    // Cerrar el menú al hacer clic en una opción
    closeNavbar() {
      this.isNavbarCollapsed = true;
    }
  }
  