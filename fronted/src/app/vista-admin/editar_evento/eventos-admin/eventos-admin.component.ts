import { Component, OnInit } from '@angular/core';
import { EventosService, Evento } from './../../../servises/eventos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, startOfDay } from 'date-fns';

@Component({
  selector: 'app-eventos-admin',
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.css']
})
export class EventosAdminComponent  {
  
}
