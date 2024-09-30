import { IBaseModel } from "src/app/shared/base_model";

export class IGalery implements IBaseModel {
    id?: number; 
    categoria!: string;
    imagen!: string; // Imagen convertida en texto (base64, por ejemplo)
    descripcion!: string;
  
}