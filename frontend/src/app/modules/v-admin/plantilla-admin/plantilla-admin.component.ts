import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collapse } from 'bootstrap';
@Component({
  selector: 'app-plantilla-admin',
  templateUrl: './plantilla-admin.component.html',
  styleUrls: ['./plantilla-admin.component.css']
})
export class PlantillaAdminComponent  implements OnInit{
  user: any;
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
    ngOnInit(): void {
      // Obtener el usuario desde sessionStorage
      this.user = JSON.parse(sessionStorage.getItem('user')!);
      console.log(this.user);  // Para verificar que los datos se obtienen correctamente
    }
}
