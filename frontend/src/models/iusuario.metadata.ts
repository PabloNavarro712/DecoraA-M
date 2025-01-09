
import { IBaseModel } from 'src/app/shared/base-model';
export class IUser implements IBaseModel {
    id?: string;
    nombreCompleto!:  string;
    usuario!:  string;
    correo!:  string;
    bloqueado?:  boolean;
    contrasena!:  string;
    esAdministrador!:  boolean;
  }