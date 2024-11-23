import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private activeModalSource = new BehaviorSubject<string | null>(null);
  activeModal$ = this.activeModalSource.asObservable();

  constructor() {}

  openModal(modal: string) {
    this.activeModalSource.next(modal);
  }

  closeModal() {
    this.activeModalSource.next(null);
  }
}
