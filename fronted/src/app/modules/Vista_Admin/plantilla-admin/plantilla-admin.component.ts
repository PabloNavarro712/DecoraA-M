import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plantilla-admin',
  templateUrl: './plantilla-admin.component.html',
  styleUrls: ['./plantilla-admin.component.css']
})
export class PlantillaAdminComponent {

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.router.navigate(['/administrador/home']);  // Redirecciona automáticamente a /administrador/home
  }
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
  