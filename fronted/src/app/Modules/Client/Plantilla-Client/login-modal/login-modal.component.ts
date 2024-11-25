// login-modal.component.ts
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/data/Services/internal/modal.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  activeModal: string | null = null;
  user: any;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de estado del modal desde el servicio
    this.modalService.activeModal$.subscribe(modal => {
      this.activeModal = modal;
    });
    this.user = JSON.parse(sessionStorage.getItem('user')!);
    console.log(this.user);  
  }

  // Cierra el modal al hacer clic fuera del contenido
  close(event: Event) {
    if (event.target === event.currentTarget) {
      this.modalService.closeModal();
    }
  }

  // Evita el cierre del modal al hacer clic dentro del contenido
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  // Cierra el modal llamando al servicio
  closeModal() {
    this.modalService.closeModal();
  }
 
}
