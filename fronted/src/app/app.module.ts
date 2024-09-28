import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './modules/Vista_Cliente/navbar/navbar.component';
import { CarouselComponent } from './modules/Vista_Cliente/carousel/carousel.component';

import { ServicesComponent } from './modules/Vista_Cliente/services/services.component';
import { InicioComponent } from './modules/Vista_Cliente/inicio/inicio.component';
import { SobreNosotrosComponent } from './modules/Vista_Cliente/sobre-nosotros/sobre-nosotros.component';
import { FooterComponent } from './modules/Vista_Cliente/footer/footer.component';
import { BiembenidaComponent } from './modules/Vista_Cliente/biembenida/biembenida.component';
import { IndexClienteComponent } from './modules/Vista_Cliente/index-cliente/index-cliente.component';
import { LoginComponent } from './modules/Vista_Cliente/login/login.component';
import { GalleryComponent } from './modules/Vista_Cliente/galeria/galeria.component';
import { PlantillaAdminComponent } from './modules/Vista_Admin/plantilla-admin/plantilla-admin.component';
import { AdminComponent } from './modules/Vista_Admin/admin/admin.component';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule aquí



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    ServicesComponent,
    InicioComponent,
    SobreNosotrosComponent,
    BiembenidaComponent,
    FooterComponent,
    IndexClienteComponent,
    LoginComponent,
    GalleryComponent,
    PlantillaAdminComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // Asegúrate de añadir FormsModule aquí

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

