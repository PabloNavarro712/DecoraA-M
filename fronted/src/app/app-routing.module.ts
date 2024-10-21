import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './vista-cliente/_inicio/inicio/inicio.component';
// Importaciones del cliente
import { NuestraHistoriaComponent } from './vista-cliente/_NuestraHistoria/nuestra-historia/nuestra-historia.component';
import { ServiciosComponent } from './vista-cliente/_Servicios/servicios/servicios.component';
// Importaciones del administrador
import { HomeAdminComponent } from './vista-admin/home/home-admin/home-admin.component';
import { PanelEdicionComponent } from './vista-admin/salpicadero/panel-edicion/panel-edicion.component';

const routes: Routes = [
  // Rutas del cliente
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },  // Redirige la raíz a /inicio
  { path: 'inicio', component: InicioComponent },          // Ruta para el componente InicioComponent
  { path: 'nuestra-historia', component: NuestraHistoriaComponent }, // Ruta para Nuestra Historia
  { path: 'servicios', component: ServiciosComponent },    // Ruta para Servicios

  // Rutas del administrador
  { path: 'home_a', component: HomeAdminComponent},
  { path: 'salpicadero', component: PanelEdicionComponent},
   

  // Manejo de rutas no encontradas
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' } // Redirige rutas no encontradas a /inicio
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
