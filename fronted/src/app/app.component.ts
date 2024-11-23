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
export class AppComponent {
  activeModal: string | null = null; // Control del modal activo

  // Abre el modal
  openModal(modal: string) {
    this.activeModal = modal;
  }

  // Cierra el modal
  closeModal() {
    this.activeModal = null;
  }
}
