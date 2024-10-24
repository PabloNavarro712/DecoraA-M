
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { NuestraHistoriaComponent } from './pages/nuestra-historia/nuestra-historia.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { FaqComponent } from './components/faq/faq.component';

const routes: Routes = [
 /*  {path: 'adminHome',component:AdminHomeComponent }, */
  { path: 'inicio', component: InicioComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'nuestra-historia', component: NuestraHistoriaComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' },
  { path: 'faq',component: FaqComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
