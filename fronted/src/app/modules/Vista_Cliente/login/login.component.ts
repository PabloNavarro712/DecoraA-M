import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginVisible: boolean = true; // Por defecto, mostramos el formulario de inicio de sesión

  toggleForm(event: Event) {
    event.preventDefault(); // Evitar la acción predeterminada del enlace
    event.stopPropagation(); // Evitar que el evento se propague al modal
    this.isLoginVisible = !this.isLoginVisible; // Cambiar entre login y registro
  }
}
