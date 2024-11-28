import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGaleriaEditorComponent } from './AdminGaleria/admin-galeria-editor/admin-galeria-editor.component';
import { FormsModule } from '@angular/forms';
import { HomeAdminComponent } from './HomeAdmin/home-admin/home-admin.component';
import { PanelEdicionComponent } from './AdminGaleria/panel-edicion/panel-edicion.component';

// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker'; // AÑADIR ESTE MÓDULO
import { MatNativeDateModule } from '@angular/material/core'; // AÑADIR ESTE MÓDULO

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AgregarServiciosComponent } from 'src/app/Modules/Admin/AdminServcio/editar-servicio/agregar-servicios/agregar-servicios.component';
import { EditarServicioComponent } from './AdminServcio/editar-servicio/editar-servicio.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventosAdminComponent } from './AdminEventos/eventos-admin/eventos-admin.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AdminGaleriaEditorComponent,
    HomeAdminComponent,
    PanelEdicionComponent,
    EditarServicioComponent,
    EventosAdminComponent,
    AgregarServiciosComponent,

  ],
  imports: [
    FullCalendarModule,
    NgbModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule, 
  ]
})
export class VistaAdminModule { }
