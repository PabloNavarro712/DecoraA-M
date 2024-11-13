import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService, User } from '../../servises/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();

  isLoginVisible = true;
  loginData = { usuario: '', contrasena: '' };
  registerData = { nombreCompleto: '', correo: '', usuario: '', contrasena: '', esAdministrador: false };
  loginErrorMessage: string = '';
  registerErrorMessage: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  toggleForm(event: Event) {
    event.preventDefault();
    this.isLoginVisible = !this.isLoginVisible;
    this.clearErrorMessages();
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
          sessionStorage.setItem('user', JSON.stringify(user));

          // Emitir el evento de inicio de sesión exitoso
          this.loginSuccess.emit();

          if (user.esAdministrador) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/cliente/inicio']);
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

    if (!this.registerData.nombreCompleto || !this.registerData.usuario || !this.registerData.correo || !this.registerData.contrasena) {
      this.registerErrorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.usuarioService.createUser(newUser).subscribe(
      (response: User) => {
        console.log('Registro exitoso:', response);

        // Limpiar los datos de registro
        this.registerData = { nombreCompleto: '', correo: '', usuario: '', contrasena: '', esAdministrador: false };

        // Mostrar la vista de login tras el registro exitoso
        this.isLoginVisible = true;
        this.registerErrorMessage = ''; // Limpiar cualquier mensaje de error
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      },
      (error) => {
        console.error('Error en el registro:', error);
        this.registerErrorMessage = 'Este correo ya está registrado o hubo un error al crear la cuenta.';
      }
    );
  }
} 
