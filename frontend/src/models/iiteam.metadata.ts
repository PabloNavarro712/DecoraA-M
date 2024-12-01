
import { IBaseModel } from 'src/app/shared/base-model';
export class IItem implements IBaseModel {
    id?: string;
    Categoria!: string;
    Descripcion!: string;
    Imagen!: string;
  }
  