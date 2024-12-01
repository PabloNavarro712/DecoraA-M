import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoginModalComponent } from './modules/v-cliente/plantilla/login-modal/login-modal.component';
import { RouterModule, Routes } from '@angular/router';
import { PlantillaComponent } from './modules/v-cliente/plantilla/plantilla.component';
import { VClienteModule } from './modules/v-cliente/v-cliente.module';
import { VAdminModule } from './modules/v-admin/v-admin.module';

const routes: Routes = [];
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
  VClienteModule,
  VAdminModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
