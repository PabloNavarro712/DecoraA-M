import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientTemplateComponent } from './layouts/client-template/client-template.component';



import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { CarouselItemComponent } from './shared/components/carousel-item/carousel-item.component';
import { CarouselControlsComponent } from './shared/components/carousel-controls/carousel-controls.component';
import { ComponenteCarruselComponent } from './shared/components/componente-carrusel/componente-carrusel.component';
import { TextoImagenComponent } from './shared/components/texto-imagen/texto-imagen.component';
import { GradienteComponent } from './shared/components/gradiente/gradiente.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { NuestraHistoriaComponent } from './pages/nuestra-historia/nuestra-historia.component';



import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { GaleriaCategoriaComponent } from './components/galeria-categoria/galeria-categoria.component';
import { AdminTemplateComponent } from './layouts/admin-template/admin-template.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminSalpicaderoComponent } from './pages/admin-salpicadero/admin-salpicadero.component';
import { AdminOrdenesComponent } from './pages/admin-ordenes/admin-ordenes.component';
import { AdminProductosComponent } from './pages/admin-productos/admin-productos.component';
import { AdminClientelaComponent } from './pages/admin-clientela/admin-clientela.component';
import { AdminGaleriaEditorComponent } from './components/admin-galeria-editor/admin-galeria-editor.component';
import { FaqComponent } from './components/faq/faq.component';
@NgModule({
  declarations: [
    CarouselComponent,
    CarouselControlsComponent,
    CarouselItemComponent,
    ComponenteCarruselComponent,
    TextoImagenComponent,
    GradienteComponent,
    AppComponent,
    ClientTemplateComponent,
    InicioComponent,
    ServiciosComponent,
    NuestraHistoriaComponent,
    NavbarComponent,
    LoginModalComponent,
    FloatingButtonComponent,
    LoginComponent,
    FooterComponent,
    GaleriaCategoriaComponent,
    AdminTemplateComponent,
    AdminHomeComponent,
    AdminSalpicaderoComponent,
    AdminOrdenesComponent,
    AdminProductosComponent,
    AdminClientelaComponent,
    AdminGaleriaEditorComponent,
    FaqComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
