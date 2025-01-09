  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantillaComponent } from './modules/v-cliente/plantilla/plantilla.component';
import { InicioClienteComponent } from './modules/v-cliente/inicio-cliente/inicio-cliente.component';
import { VistaServiciosComponent } from './modules/v-cliente/vista-servicios/vista-servicios.component';
import { NosotrosComponent } from './modules/v-cliente/nosotros/nosotros.component';
import { DetallesEventosComponent } from './modules/v-cliente/detalles-eventos/detalles-eventos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/cliente',
    pathMatch: 'full',
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./modules/v-cliente/v-cliente.module').then((m) => m.VClienteModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/v-admin/v-admin.module').then((m) => m.VAdminModule),
  },
  {
    path: '**',
    redirectTo: '/cliente', // Ruta por defecto si no se encuentra ninguna
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}



