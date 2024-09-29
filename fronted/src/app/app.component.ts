import { Component } from '@angular/core';
import { AuthService } from './auth.service'; // Verifica la ruta correcta


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  isAdmin() {
    return this.authService.isAdmin();
  }
    }