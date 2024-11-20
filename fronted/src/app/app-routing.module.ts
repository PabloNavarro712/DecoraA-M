import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importaciones del cliente
import { InicioComponent } from './Modules/Client/InicioClient/inicio/inicio.component';
import { NuestraHistoriaComponent } from './Modules/Client/NuestraHistoriaClient/nuestra-historia/nuestra-historia.component';
import { ServiciosComponent } from './Modules/Client/ServicioClient/servicios/servicios.component';
// Importaciones del administrador
import { HomeAdminComponent } from './Modules/Admin/HomeAdmin/home-admin/home-admin.component';
import { PanelEdicionComponent } from './Modules/Admin/AdminGaleria/panel-edicion/panel-edicion.component';
// Ruteo de vistas
import { AdminTemplateComponent } from './Modules/Admin/Plantilla-Admin/admin-template/admin-template.component';
import { ClientTemplateComponent } from './Modules/Client/Plantilla-Client/client-template/client-template.component';
import { EditarServicioComponent } from './Modules/Admin/AdminServcio/editar-servicio/editar-servicio.component';
import { FaqComponent } from './Modules/Client/ServicioClient/faq/faq.component';
import { EventosAdminComponent } from './Modules/Admin/AdminEventos/eventos-admin/eventos-admin.component';
import { AdminServiciosComponent } from './Modules/Admin/AdminServcio/admin-servicios/admin-servicios.component';
const routes: Routes = [
  // Rutas del cliente
  {
    path: 'cliente',
    component: ClientTemplateComponent, // Template para cliente
    children: [
      { path: 'inicio', component: InicioComponent },  // Vista de inicio
      { path: 'nuestra-historia', component: NuestraHistoriaComponent }, // Vista de nuestra historia
      { path: 'servicios', component: ServiciosComponent }, // Vista de servicios
      { path: 'faq', component: FaqComponent } // Vista de preguntas frecuentes
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
      { path: 'editar_servicio', component: EditarServicioComponent}, // Vista para editar servicios
      { path: 'editar_evento', component: EventosAdminComponent}
    ]
  },

  // Ruta por defecto
  { path: '', redirectTo: '/cliente/inicio', pathMatch: 'full' },  // Redirige la raíz a /cliente/inicio

  // Manejo de rutas no encontradas
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
