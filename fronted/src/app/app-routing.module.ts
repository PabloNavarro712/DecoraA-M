import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from 'src/app/admin-template/admin-template.component';
import { ClientTemplateComponent } from 'src/app/template_cliente/client-template/client-template.component';
import { HomeAdminComponent } from 'src/app/vista-admin/home/home-admin/home-admin.component';
import { PanelEdicionComponent } from 'src/app/vista-admin/salpicadero/panel-edicion/panel-edicion.component';
import { InicioComponent } from 'src/app/vista-cliente/_inicio/inicio/inicio.component';
import { NuestraHistoriaComponent } from 'src/app/vista-cliente/_NuestraHistoria/nuestra-historia/nuestra-historia.component';
import { ServiciosComponent } from 'src/app/vista-cliente/_Servicios/servicios/servicios.component';
import { AdminServiciosComponent } from './vista-admin/home/home-admin/admin-servicios/admin-servicios.component';

const routes: Routes = [
  // Rutas del cliente
  {
    path: 'cliente',
    component: ClientTemplateComponent, // Template para cliente
    children: [
      { path: 'inicio', component: InicioComponent }, // Vista de inicio
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
      { path: 'salpicadero', component: PanelEdicionComponent }, // Vista de panel de edición
      { path: 'Servicios', component: AdminServiciosComponent}
    // Vista de servicios (admin)
    ]
  },

  // Ruta por defecto
  { path: '', redirectTo: '/cliente/inicio', pathMatch: 'full' }, // Redirige la raíz a /cliente/inicio

  // Manejo de rutas no encontradas
  { path: '**', redirectTo: '/cliente/inicio', pathMatch: 'full' } // Redirige rutas no encontradas a /inicio
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
