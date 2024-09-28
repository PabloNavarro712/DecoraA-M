import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Método para iniciar sesión
  login(role: 'cliente' | 'administrador', email: string, password: string) {
    // Aquí puedes agregar la lógica para verificar el correo y la contraseña
    console.log('Rol:', role);
    console.log('Correo:', email);
    console.log('Contraseña:', password);
    // Agregar lógica de autenticación...
  }
}
