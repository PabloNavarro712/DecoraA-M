export interface Servicio {
    id?: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    elementos: string[];
    precio: number;
    precioTotal: number; // Agregada propiedad precioTotal
    mostrarOpciones: boolean; // Agregada propiedad mostrarOpciones
    opciones: { nombre: string; precio: number; seleccionada: boolean }[];
  }