// app.component.ts
import { Component, OnInit } from '@angular/core';
import { ViewSwitchService } from './view-switch.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAdminView: boolean = false;

  constructor(private viewSwitchService: ViewSwitchService) {}

  ngOnInit() {
    // Establecer la vista inicial como la vista de cliente
    this.isAdminView = this.viewSwitchService.getCurrentView();
  }
}
