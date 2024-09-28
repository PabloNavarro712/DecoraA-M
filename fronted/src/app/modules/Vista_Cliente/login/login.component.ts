import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service'; // Verifica la ruta aquí

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';           // Propiedad para almacenar el correo electrónico
  password: string = '';        // Propiedad para almacenar la contraseña
  role: 'cliente' | 'administrador' | null = null; // Propiedad para almacenar el rol

  constructor(private authService: AuthService) {}

  // Método que se llama al iniciar sesión
  onLogin() {
    if (this.email && this.password && this.role) { // Verifica que todos los campos estén llenos
      // Aquí puedes incluir la lógica para autenticar al usuario
      this.authService.login(this.role, this.email, this.password); // Llama a tu servicio de autenticación
    } else {
      // Manejo de errores: si no se llenan todos los campos
      alert('Por favor, completa todos los campos.');
    }
  }
}
