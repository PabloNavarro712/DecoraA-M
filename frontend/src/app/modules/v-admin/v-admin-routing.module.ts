import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './eventos/eventos.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { HomeComponent } from './home/home.component';
import { PlantillaAdminComponent } from './plantilla-admin/plantilla-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: PlantillaAdminComponent, // Plantilla principal para administrador
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'gestion-galeria', component: GaleriaComponent },
      { path: 'gestion-servicios', component: ServiciosComponent },
      { path: 'gestion-eventos', component: EventosComponent },
      { path: 'graficas', component: DashboardComponent },
      { path: 'usuarios', component: UsuariosComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VAdminRoutingModule {}
