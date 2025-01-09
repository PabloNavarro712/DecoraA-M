import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private activeModalSource = new BehaviorSubject<string  | null>(null);
  private closeModalSubject = new Subject<void>();
  activeModal$ = this.activeModalSource.asObservable();
  closeModal$ = this.closeModalSubject.asObservable();
  constructor() {}


  // Método para abrir el modal con el nombre o TemplateRef
  openModal(modal: string ) {
    this.activeModalSource.next(modal);
  }
  closeModal() {
    this.activeModalSource.next(null);
  }
  triggerCloseModal() {
    this.closeModalSubject.next();
  }
}
