// shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../modules/v-cliente/plantilla/login/login.component';
import { NavbarComponent } from '../modules/v-cliente/plantilla/navbar/navbar.component';
import { FloatingButtonComponent } from '../modules/v-cliente/plantilla/floating-button/floating-button.component';
import { FooterComponent } from '../modules/v-cliente/plantilla/footer/footer.component';
@NgModule({
  declarations: [
    LoginComponent,
    NavbarComponent,
    FloatingButtonComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoginComponent,
    NavbarComponent,
    FloatingButtonComponent,
    FooterComponent
  ]
})
export class SharedModule { }
