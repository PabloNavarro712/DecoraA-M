import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './InicioClient/inicio/inicio.component';
import { CarruselComponent } from './InicioClient/carrusel/carrusel.component';
import { GaleriaCategoriaComponent } from './InicioClient/galeria-categoria/galeria-categoria.component';
import { GradienteComponent } from './InicioClient/gradiente/gradiente.component';
import { TextoImagenComponent } from './InicioClient/texto-imagen/texto-imagen.component';
import { ServiciosComponent } from './ServicioClient/servicios/servicios.component';
import { NuestraHistoriaComponent } from './NuestraHistoriaClient/nuestra-historia/nuestra-historia.component';
import { CalendarioComponent } from './ServicioClient/calendario/calendario.component'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FaqComponent } from './ServicioClient/faq/faq.component';

@NgModule({
  declarations: [

    InicioComponent,
    CarruselComponent,
    GaleriaCategoriaComponent,
    GradienteComponent,
    TextoImagenComponent,
    ServiciosComponent,
    NuestraHistoriaComponent,
    CalendarioComponent,
    FaqComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule,


  ],
  exports: [
    InicioComponent
  ]
})
export class VistaClienteModule {


}
