import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importaciones del cliente
import { InicioComponent } from './vista-cliente/_inicio/inicio/inicio.component';
import { NuestraHistoriaComponent } from './vista-cliente/_NuestraHistoria/nuestra-historia/nuestra-historia.component';
import { ServiciosComponent } from './vista-cliente/_Servicios/servicios/servicios.component';
// Importaciones del administrador
import { HomeAdminComponent } from './vista-admin/home/home-admin/home-admin.component';
import { PanelEdicionComponent } from './vista-admin/salpicadero/panel-edicion/panel-edicion.component';
// Ruteo de vistas
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { ClientTemplateComponent } from './template_cliente/client-template/client-template.component';

const routes: Routes = [
  // Rutas del cliente
  {
    path: 'cliente',
    component: ClientTemplateComponent, // Template para cliente
    children: [
      { path: 'inicio', component: InicioComponent },  // Vista de inicio
      { path: 'nuestra-historia', component: NuestraHistoriaComponent }, // Vista de nuestra historia
      { path: 'servicios', component: ServiciosComponent } // Vista de servicios
    ]
  },
  // Rutas del administrador
  {
    path: 'admin',
    component: AdminTemplateComponent, // Template para admin
    children: [
      { path: '', component: HomeAdminComponent },
      { path: 'home_a', component: HomeAdminComponent }, // Vista home para admin
      { path: 'salpicadero', component: PanelEdicionComponent } // Vista de panel de edición
    ]
  },

  // Ruta por defecto
  { path: '', redirectTo: '/cliente/inicio', pathMatch: 'full' },  // Redirige la raíz a /cliente/inicio

  // Manejo de rutas no encontradas
  { path: '**', redirectTo: '/cliente/inicio', pathMatch: 'full' } // Redirige rutas no encontradas a /inicio
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
