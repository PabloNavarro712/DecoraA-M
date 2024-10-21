import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent {



  constructor(private router: Router) { }
  ngOnInit(): void {
    this.router.navigate(['/home_a']);  // Redirecciona automáticamente a /administrador/home
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
  