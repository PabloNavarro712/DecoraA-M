export class GaleriaDocument {
  static collectionName = 'galeria prueba';
  id: string;
  Categoria: string;
  Descripcion: string;
  Imagen: string;

  constructor(partial: Partial<GaleriaDocument>) {
    Object.assign(this, partial);
  }
}
