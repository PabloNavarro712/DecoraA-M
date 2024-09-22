import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar componentes que serán las secciones
import { InicioComponent } from './modules/Vista_Cliente/inicio/inicio.component';

import { SobreNosotrosComponent } from './modules/Vista_Cliente/sobre-nosotros/sobre-nosotros.component';
import { ServicesComponent } from "./modules/Vista_Cliente/services/services.component";

const routes: Routes = [
  { path: '', component: InicioComponent },

  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  {path: 'services',component:ServicesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
