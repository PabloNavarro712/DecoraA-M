import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './modules/Vista_Cliente/navbar/navbar.component';
import { CarouselComponent } from './modules/Vista_Cliente/carousel/carousel.component';
import { GaleriaComponent } from './modules/Vista_Cliente/galeria/galeria.component';
import { ServicesComponent } from './modules/Vista_Cliente/services/services.component';
import { InicioComponent } from './modules/Vista_Cliente/inicio/inicio.component';
import { BodasComponent } from './modules/Vista_Cliente/bodas/bodas.component';
import { XvanosComponent } from './modules/Vista_Cliente/xvanos/xvanos.component';
import { CumpleanosComponent } from './modules/Vista_Cliente/cumpleanos/cumpleanos.component';
import { BabyshowerComponent } from './modules/Vista_Cliente/babyshower/babyshower.component';
import { FiestasTematicasComponent } from './modules/Vista_Cliente/fiestas-tematicas/fiestas-tematicas.component';
import { OtrosServiciosComponent } from './modules/Vista_Cliente/otros-servicios/otros-servicios.component';
import { TestimoniosComponent } from './modules/Vista_Cliente/testimonios/testimonios.component';
import { SobreNosotrosComponent } from './modules/Vista_Cliente/sobre-nosotros/sobre-nosotros.component';
import { ContactoComponent } from './modules/Vista_Cliente/contacto/contacto.component';
import { CotizacionComponent } from './modules/Vista_Cliente/cotizacion/cotizacion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    GaleriaComponent,
    ServicesComponent,
    InicioComponent,
    BodasComponent,
    XvanosComponent,
    CumpleanosComponent,
    BabyshowerComponent,
    FiestasTematicasComponent,
    OtrosServiciosComponent,
    TestimoniosComponent,
    SobreNosotrosComponent,
    ContactoComponent,
    CotizacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

