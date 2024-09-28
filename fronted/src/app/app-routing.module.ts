import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar componentes que serán las secciones
import { InicioComponent } from './modules/Vista_Cliente/inicio/inicio.component';
import { SobreNosotrosComponent } from './modules/Vista_Cliente/sobre-nosotros/sobre-nosotros.component';
import { ServicesComponent } from "./modules/Vista_Cliente/services/services.component";
import { AdminComponent } from './modules/Vista_Admin/admin/admin.component'; // Importar el componente de admin

// Rutas para clientes
const clienteRoutes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'services', component: ServicesComponent },
];

// Rutas para administradores
const adminRoutes: Routes = [
  { path: '', component: AdminComponent }, // Cambia esto por el componente principal del admin
  // Agrega más rutas para el admin según sea necesario
];

const routes: Routes = [
  { path: 'clientes', children: clienteRoutes }, // Rutas para clientes
  { path: 'administrador', children: adminRoutes }, // Rutas para administradores
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }, // Redireccionar a clientes por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
