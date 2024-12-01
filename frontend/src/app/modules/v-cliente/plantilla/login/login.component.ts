import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/services/api/usuario/usuario.service';
import { IUser } from 'src/models/iusuario.metadata';

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
  currentUser: IUser | null = null;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    const userFromSession = sessionStorage.getItem('user');
    if (userFromSession) {
      this.currentUser = JSON.parse(userFromSession);  // Recuperar usuario de la sesión si está logueado
    }
  }

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
    this.usuarioService.getAll().subscribe(
      (response) => {
        const usuarios = response.data;
  
        if (usuarios && usuarios.length > 0) {
          const user = usuarios.find(u => u.usuario === this.loginData.usuario && u.contrasena === this.loginData.contrasena);
  
          if (user) {
            console.log('Login exitoso:', user);
            sessionStorage.setItem('user', JSON.stringify(user));
  
            // Emitir el evento de inicio de sesión exitoso
            this.loginSuccess.emit();
            Swal.fire({
              title: 'Bienvenido',
              text: "Ha iniciado Sesión Correctamente",
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.currentUser = user;
  
            if (user.esAdministrador) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/cliente/inicio']);
              window.location.reload();
            }
            
          } else {
            this.loginErrorMessage = 'Usuario o contraseña incorrectos';
            Swal.fire({
              title: 'Error',
              text: this.loginErrorMessage,
              icon: 'error',
              confirmButtonText: 'Intentar de nuevo'
            });
          }
        } else {
          this.loginErrorMessage = 'No se encontraron usuarios en el sistema';
          Swal.fire({
            title: 'Error',
            text: this.loginErrorMessage,
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
          });
        }
      },
      (error) => {
        console.error('Error en el login:', error);
        this.loginErrorMessage = 'Hubo un error al intentar iniciar sesión. Intenta de nuevo.';
        Swal.fire({
          title: 'Error',
          text: this.loginErrorMessage,
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    );
  }
  
  register() {
    const newUser: IUser = {
      nombreCompleto: this.registerData.nombreCompleto,
      correo: this.registerData.correo,
      usuario: this.registerData.usuario,
      contrasena: this.registerData.contrasena,
      esAdministrador: false
    };
  
    // Validating the input fields
    if (!this.registerData.nombreCompleto || !this.registerData.usuario || !this.registerData.correo || !this.registerData.contrasena) {
      this.registerErrorMessage = 'Todos los campos son obligatorios';
      Swal.fire({
        title: 'Error',
        text: this.registerErrorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
  
    this.usuarioService.create('usuarios', newUser).subscribe(
      (response) => {
        if (response.error) {
          console.error('Error en el registro:', response.msg);
          this.registerErrorMessage = response.msg;
  
          // Show SweetAlert2 error message for registration failure
          Swal.fire({
            title: 'Error',
            text: this.registerErrorMessage,
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
          });
        } else {
          console.log('Registro exitoso:', response.data);
  
          // Limpiar los datos de registro
          this.registerData = { nombreCompleto: '', correo: '', usuario: '', contrasena: '', esAdministrador: false };
  
          // Mostrar la vista de login tras el registro exitoso
          this.isLoginVisible = true;
          this.registerErrorMessage = ''; // Limpiar cualquier mensaje de error
  
          // Show SweetAlert2 success message for successful registration
          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Ahora puedes iniciar sesión.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      (error) => {
        console.error('Error en el registro:', error);
        this.registerErrorMessage = 'Este correo ya está registrado o hubo un error al crear la cuenta.';
        
        // Show SweetAlert2 error message for registration failure
        Swal.fire({
          title: 'Error',
          text: this.registerErrorMessage,
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    );
  }
  
  logout() {
    sessionStorage.removeItem('user');
    this.currentUser = null;
    window.location.reload();
    this.router.navigate(['/']);  // Redirigir a la página de inicio o login
  }
}
