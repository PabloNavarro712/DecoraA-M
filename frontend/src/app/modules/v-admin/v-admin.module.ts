import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosComponent } from './eventos/eventos.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { HomeComponent } from './home/home.component';
import { PlantillaAdminComponent } from './plantilla-admin/plantilla-admin.component';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { FormsModule } from '@angular/forms';
import { CalendarioComponent } from './home/calendario/calendario.component';
import { BotoneditarComponent } from './servicios/botoneditar/botoneditar.component';
import { BotonagregarComponent } from './servicios/botonagregar/botonagregar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaServiciosComponent } from './servicios/lista-servicios/lista-servicios.component';  // Agrega FormsModule aquí


@NgModule({
  declarations: [
    EventosComponent,
    GaleriaComponent,
    ServiciosComponent,
    HomeComponent,
    PlantillaAdminComponent,
    CalendarioComponent,
    BotoneditarComponent,
    BotonagregarComponent,
    ListaServiciosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ]
})
export class VAdminModule { }
