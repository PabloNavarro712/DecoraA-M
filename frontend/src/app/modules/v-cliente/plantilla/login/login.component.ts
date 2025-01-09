import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/services/api/usuario/usuario.service';
import { IUser } from 'src/models/iusuario.metadata';
import { ModalService } from 'src/services/global/modal/modal.service';

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
  activeModal: string | null = null;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalService: ModalService
  ) {
    const userFromSession = sessionStorage.getItem('user');
    if (userFromSession) {
      this.currentUser = JSON.parse(userFromSession);  // Recuperar usuario de la sesión si está logueado
    }
  }
  openModal(modalType: string) {
    this.activeModal = modalType;
  }
  ngOnInit(): void {
    // Suscribirse a los cambios de estado del modal desde el servicio
    this.modalService.activeModal$.subscribe(modal => {
      this.activeModal = modal;
    });
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
  
    // Validación de campos
    if (!this.registerData.nombreCompleto || !this.registerData.usuario || !this.registerData.correo || !this.registerData.contrasena) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
  
    this.usuarioService.crearUsuario(newUser).subscribe({
      next: (response) => {
        console.log('Servicio creado:', response);
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Se ha registrado con exito.',
          confirmButtonText: 'Aceptar',
        });
        this.registerData = { nombreCompleto: '', correo: '', usuario: '', contrasena: '', esAdministrador: false };
        this.isLoginVisible = true;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: err.message,
          confirmButtonText: 'Intentar nuevamente',
        });
      },
    });
   
  
  }
  closeModal() {
    this.modalService.closeModal();
  }

  logout() {
    sessionStorage.removeItem('user');
    this.currentUser = null;
    window.location.reload();
    this.router.navigate(['/']);  // Redirigir a la página de inicio o login
  }
}
