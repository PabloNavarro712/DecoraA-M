import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: 'cliente' | 'administrador' | null = null;
  private email: string | null = null; // Agregado para almacenar el correo
  private password: string | null = null; // Agregado para almacenar la contraseña

  constructor(private router: Router) {}

  // Método para simular el login
  login(role: 'cliente' | 'administrador', email: string, password: string) {
    this.userRole = role;
    this.email = email;
    this.password = password;

    // Aquí podrías agregar lógica para validar el correo y la contraseña

    // Redireccionar según el rol
    if (this.userRole === 'administrador') {
      this.router.navigate(['/administrador']);
    } else {
      this.router.navigate(['/clientes']);
    }
  }

  // Método para obtener el rol actual del usuario
  getUserRole() {
    return this.userRole;
  }

  // Método para cerrar sesión
  logout() {
    this.userRole = null;
    this.email = null; // Limpiar el correo al cerrar sesión
    this.password = null; // Limpiar la contraseña al cerrar sesión
    this.router.navigate(['/clientes']); // Redirigir a clientes al cerrar sesión
  }

  // Método para verificar si el usuario es un administrador
  isAdmin() {
    return this.userRole === 'administrador';
  }
}
