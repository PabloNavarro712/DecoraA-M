import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { VistaClienteModule } from './Modules/Client/vista-cliente.module';
import { VistaAdminModule } from './Modules/Admin/vista-admin.module';
import { ClientTemplateComponent } from './Modules/Client/Plantilla-Client/client-template/client-template.component';
import { NavbarComponent } from './Modules/Client/Plantilla-Client/navbar/navbar.component';
import { FooterComponent } from './Modules/Client/Plantilla-Client/footer/footer.component';
import { FloatingButtonComponent } from './Modules/Client/Plantilla-Client/floating-button/floating-button.component';
import { LoginComponent } from './Modules/Client/Plantilla-Client/login/login.component';
import { LoginModalComponent } from './Modules/Client/Plantilla-Client/login-modal/login-modal.component';
import { AdminTemplateComponent } from './Modules/Admin/Plantilla-Admin/admin-template/admin-template.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetallerEventoClienteComponent } from './Modules/Client/detaller-evento-cliente/detaller-evento-cliente.component';
@NgModule({
  declarations: [

    AdminTemplateComponent,
    FooterComponent,
    FloatingButtonComponent,
    LoginComponent,
    LoginModalComponent,
    AppComponent,
    ClientTemplateComponent,
    NavbarComponent,
    DetallerEventoClienteComponent
    

   ],
  imports: [
    VistaAdminModule,
    VistaClienteModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

