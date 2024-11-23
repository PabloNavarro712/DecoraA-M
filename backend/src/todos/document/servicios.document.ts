export class ServiciosDocument {
  static collectionName = 'servicios';
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  elementos: [];
  imagen: string;
  opciones: {
    nombre: string;
    precio: number;
  }[];
  precio: string;

  constructor(partial: Partial<ServiciosDocument>) {
    Object.assign(this, partial);
  }
}
