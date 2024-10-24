import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGaleriaEditorComponent } from './salpicadero/admin-galeria-editor/admin-galeria-editor.component';
import { FormsModule } from '@angular/forms';
import { HomeAdminComponent } from './home/home-admin/home-admin.component';
import { CalendarioAdminComponent } from './home/home-admin/calendario-admin/calendario-admin.component';
import { PanelEdicionComponent } from './salpicadero/panel-edicion/panel-edicion.component';

// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker'; // AÑADIR ESTE MÓDULO
import { MatNativeDateModule } from '@angular/material/core'; // AÑADIR ESTE MÓDULO

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AdminGaleriaEditorComponent,
    HomeAdminComponent,
    CalendarioAdminComponent,
    PanelEdicionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule
  ]
})
export class VistaAdminModule { }
