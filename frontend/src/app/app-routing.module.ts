import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantillaComponent } from './modules/v-cliente/plantilla/plantilla.component';
import { InicioClienteComponent } from './modules/v-cliente/inicio-cliente/inicio-cliente.component';
import { VistaServiciosComponent } from './modules/v-cliente/vista-servicios/vista-servicios.component';
import { NosotrosComponent } from './modules/v-cliente/nosotros/nosotros.component';
import { DetallesEventosComponent } from './modules/v-cliente/detalles-eventos/detalles-eventos.component';
import { PlantillaAdminComponent } from './modules/v-admin/plantilla-admin/plantilla-admin.component';
import { ServiciosComponent } from './modules/v-admin/servicios/servicios.component';
import { GaleriaComponent } from './modules/v-admin/galeria/galeria.component';
import { EventosComponent } from './modules/v-admin/eventos/eventos.component';
const routes: Routes = [
  {
    path: 'cliente',
    component: PlantillaComponent,
    children: [
      { path: '', component: InicioClienteComponent  },  // Vista de inicio
      { path: 'nuestra-historia', component: NosotrosComponent }, // Vista de nuestra historia
      { path: 'servicios', component: VistaServiciosComponent },
      // { path: 'faq', component: FaqComponent }, // Vista de preguntas frecuentes
      { path: 'mis-servicios', component: DetallesEventosComponent } // Vista de preguntas frecuente
    ],
  },
  // Rutas del administrador
  {
    path: 'admin',
    component: PlantillaAdminComponent, // Template para admin
    children: [
      // { path: '', component: HomeAdminComponent },
      // { path: 'home_a', component: HomeAdminComponent }, // Vista home para admin
      { path: 'gestion-galeria', component: GaleriaComponent }, // Vista de panel de edición
       { path: 'gestion_servicios', component: ServiciosComponent}, // Vista para editar servicios
      { path: 'gestion-eventos', component: EventosComponent }, // Vista de panel de edición
    ]
  },


  // { path: 'login', component: LoginComponent },
  // { path: 'student', component: StudentPortalComponent },
  { path: '**', redirectTo: 'cliente', pathMatch: 'full' },
  // { path: 'admin', component: HomeAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
