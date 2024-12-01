import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlantillaComponent } from './plantilla.component';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { FormsModule } from '@angular/forms';  // Agrega FormsModule aquí
@NgModule({
  declarations: [

  PlantillaComponent,
    FloatingButtonComponent,
         FooterComponent,
         LoginComponent,
         LoginModalComponent,
         NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule  // Asegúrate de importar FormsModule aquí
  ]
})
export class PlantillaModule { }
