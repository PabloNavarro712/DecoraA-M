import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/Servicio_modal/modal.service'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  activeModal: string | null = null;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.activeModal$.subscribe(modal => {
      this.activeModal = modal;
    });
  }

  close(event: Event) {
    if (event.target === event.currentTarget) {
      this.modalService.closeModal();
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
