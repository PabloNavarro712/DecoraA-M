import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
<<<<<<< HEAD
import { CarouselComponent } from './carousel/carousel.component';
import { GaleriaComponent } from './galeria/galeria.component';
=======
import { ServicesComponent } from './modules/services/services.component';
>>>>>>> origin/main

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
<<<<<<< HEAD
    CarouselComponent,
    GaleriaComponent
  
=======
    ServicesComponent
>>>>>>> origin/main
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
