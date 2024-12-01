import { IBaseModel } from 'src/app/shared/base-model';
export class IServicio implements IBaseModel {
    id?: string;
    titulo!: string;
    descripcion!: string;
    categoria!: string;
    imagen!: string;
    elementos!: string[];
    precio!: number;
    precioTotal!: number; // Agregada propiedad precioTotal
    mostrarOpciones!: boolean; // Agregada propiedad mostrarOpciones
    opciones!: { nombre: string; precio: number; seleccionada: boolean }[];
  }