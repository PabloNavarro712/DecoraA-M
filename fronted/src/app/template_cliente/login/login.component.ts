import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importa Router para redireccionar
import { UsuarioService, User } from '../../servises/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  isLoginVisible = true;
  loginData = { usuario: '', contrasena: '' };
  registerData = { nombreCompleto: '', correo: '', usuario: '', contrasena: '', esAdministrador: false };
  
  // Mensajes de error
  loginErrorMessage: string = '';
  registerErrorMessage: string = '';
  
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  toggleForm(event: Event) {
    event.preventDefault();
    this.isLoginVisible = !this.isLoginVisible;
    this.clearErrorMessages(); // Limpiar mensajes de error al cambiar de formulario
  }

  clearErrorMessages() {
    this.loginErrorMessage = '';
    this.registerErrorMessage = '';
  }

  login() {
    this.usuarioService.getUsers().subscribe(
      (usuarios: User[]) => {
        const user = usuarios.find(u => u.usuario === this.loginData.usuario && u.contrasena === this.loginData.contrasena);
        if (user) {
          console.log('Login exitoso:', user);
          
          // Guardar el usuario y la id en sessionStorage (o localStorage)
          sessionStorage.setItem('user', JSON.stringify(user));

          // Redireccionar según el rol del usuario
          if (user.esAdministrador) {
            this.router.navigate(['/admin']); // Ruta de administrador
          } else {
            this.router.navigate(['/cliente/inicio']); // Ruta de cliente
          }
        } else {
          this.loginErrorMessage = 'Usuario o contraseña incorrectos';
        }
      },
      (error) => {
        console.error('Error en el login:', error);
        this.loginErrorMessage = 'Hubo un error al intentar iniciar sesión. Intenta de nuevo.';
      }
    );
  }

  register() {
    const newUser: User = {
      nombreCompleto: this.registerData.nombreCompleto,
      correo: this.registerData.correo,
      usuario: this.registerData.usuario,
      contrasena: this.registerData.contrasena,
      esAdministrador: false
    };

    // Validación básica de campos requeridos
    if (!this.registerData.nombreCompleto || !this.registerData.usuario || !this.registerData.correo || !this.registerData.contrasena) {
      this.registerErrorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.usuarioService.createUser(newUser).subscribe(
      (response: User) => {
        console.log('Registro exitoso:', response);
        // Aquí puedes redirigir o hacer algo después del registro exitoso
      },
      (error) => {
        console.error('Error en el registro:', error);
        this.registerErrorMessage = 'Este correo ya está registrado o hubo un error al crear la cuenta.';
      }
    );
  }
}
