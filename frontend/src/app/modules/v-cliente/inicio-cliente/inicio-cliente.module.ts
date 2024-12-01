import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarruselComponent } from './carrusel/carrusel.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { GradienteComponent } from './gradiente/gradiente.component';
import { InicioClienteComponent } from './inicio-cliente.component';
import { TextoComponent } from './texto/texto.component';

@NgModule({
  declarations: [
    CarruselComponent,
    InicioClienteComponent,
    GaleriaComponent,
    GradienteComponent,
    TextoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InicioClienteModule { }
