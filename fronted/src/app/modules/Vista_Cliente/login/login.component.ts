import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginVisible = true;
  loginData = { usuario: '', contrasena: '' };
  registerData = { nombre: '', correo: '', usuario: '', contrasena: '' };

  constructor(private http: HttpClient) {}

  toggleForm(event: Event) {
    event.preventDefault();
    this.isLoginVisible = !this.isLoginVisible;
  }

  login() {
    this.http.post('http://localhost:3000/api/login', this.loginData).subscribe(
      (response: any) => {
        console.log('Login exitoso:', response);
        // Aquí puedes manejar la lógica después de un inicio de sesión exitoso
      },
      (error) => {
        console.error('Error en el login:', error);
        // Aquí puedes manejar el error de login
      }
    );
  }

  register() {
    this.http.post('http://localhost:3000/api/usuarios', this.registerData).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
        // Aquí puedes manejar la lógica después de un registro exitoso
      },
      (error) => {
        console.error('Error en el registro:', error);
        // Aquí puedes manejar el error de registro
      }
    );
  }
}
