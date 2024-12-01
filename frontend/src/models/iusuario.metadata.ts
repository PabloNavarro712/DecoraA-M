
import { IBaseModel } from 'src/app/shared/base-model';
export class IUser implements IBaseModel {
    id?: string;
    nombreCompleto!:  string;
    usuario!:  string;
    correo!:  string;
    contrasena!:  string;
    esAdministrador!:  boolean;
  }