export class GaleryDocument {
    static collectionName = 'Galery';
    id: string;
    categoria: string;
    imagen: string; // Imagen convertida en texto (base64, por ejemplo)
    descripcion: string;
  
    constructor(partial: Partial<GaleryDocument>) {
      Object.assign(this, partial);
    }
  }