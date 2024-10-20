import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
