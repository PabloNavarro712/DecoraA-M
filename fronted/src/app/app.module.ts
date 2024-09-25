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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

