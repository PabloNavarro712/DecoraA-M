// toggle-view.component.ts
import { Component } from '@angular/core';
import { ViewSwitchService } from '../view-switch.service';

@Component({
  selector: 'app-toggle-view',
  templateUrl: './toggle-view.component.html',
  styleUrls: ['./toggle-view.component.css'],
})
export class ToggleViewComponent {
  isAdminView: boolean = false;

  constructor(private viewSwitchService: ViewSwitchService) {
    this.isAdminView = this.viewSwitchService.getCurrentView();
  }

  toggleView() {
    this.viewSwitchService.toggleView();
    this.isAdminView = this.viewSwitchService.getCurrentView();
  }
}
