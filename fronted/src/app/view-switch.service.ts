// view-switch.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewSwitchService {
  private isAdminView: boolean = false; // Vista inicial de cliente

  constructor() {}

  toggleView() {
    this.isAdminView = !this.isAdminView;
  }

  getCurrentView(): boolean {
    return this.isAdminView;
  }
}
