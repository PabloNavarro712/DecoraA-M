import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar componentes que serán las secciones
import { InicioComponent } from './modules/Vista_Cliente/inicio/inicio.component';
import { SobreNosotrosComponent } from './modules/Vista_Cliente/sobre-nosotros/sobre-nosotros.component';
import { ServicesComponent } from './modules/Vista_Cliente/services/services.component';
import { AdminComponent } from './modules/Vista_Admin/admin/admin.component';
import { HomeComponent } from './modules/Vista_Admin/home/home.component';  // Importar HomeComponent

// Rutas para clientes
const clienteRoutes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'services', component: ServicesComponent },
];

// Rutas para administradores
const adminRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  // Redirigir a Home por defecto
  { path: 'home', component: HomeComponent },  // Ruta para el Home del administrador
  // Otras rutas del admin
];


const routes: Routes = [
  { path: 'clientes', children: clienteRoutes }, // Rutas para clientes
  { path: 'administrador', children: adminRoutes }, // Rutas para administradores
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }, // Redireccionar a clientes por defecto
  { path: '**', redirectTo: '/clientes', pathMatch: 'full' } // Redireccionar cualquier ruta no válida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
