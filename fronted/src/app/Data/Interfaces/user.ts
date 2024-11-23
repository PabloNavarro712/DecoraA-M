export interface User {
  id?: string;
  nombreCompleto: string;
  usuario: string;
  correo: string;
  contrasena: string;
  esAdministrador: boolean;
}