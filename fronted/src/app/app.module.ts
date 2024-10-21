import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { VistaClienteModule } from './vista-cliente/vista-cliente.module';
import { VistaAdminModule } from './vista-admin/vista-admin.module';

import { ClientTemplateComponent } from './template_cliente/client-template/client-template.component';
import { NavbarComponent } from './template_cliente/navbar/navbar.component';
import { FooterComponent } from './template_cliente/footer/footer.component';
import { FloatingButtonComponent } from './template_cliente/floating-button/floating-button.component';
import { LoginComponent } from './template_cliente/login/login.component';
import { LoginModalComponent } from './template_cliente/login-modal/login-modal.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
@NgModule({
  declarations: [

    AdminTemplateComponent,
    FooterComponent,
    FloatingButtonComponent,
    LoginComponent,
    LoginModalComponent,
    AppComponent,
    ClientTemplateComponent,
    NavbarComponent 
    

  ],
  imports: [
    VistaAdminModule,
    VistaClienteModule,
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

