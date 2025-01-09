import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesEventosComponent } from './detalles-eventos/detalles-eventos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { VistaServiciosComponent } from './vista-servicios/vista-servicios.component';

import { PlantillaComponent } from './plantilla/plantilla.component';
import { InicioClienteComponent } from './inicio-cliente/inicio-cliente.component';
const routes: Routes = [
    {
      path: '',
      component: PlantillaComponent, // Contenedor principal
      children: [
        { path: '', component: InicioClienteComponent }, // Página de inicio
        { path: 'nuestra-historia', component: NosotrosComponent }, // Página de "Nosotros"
        { path: 'servicios', component: VistaServiciosComponent }, // Página de servicios
        { path: 'mis-servicios', component: DetallesEventosComponent }, // Página de detalles de eventos
      ],
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VClienteRoutingModule {}
