import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Servicio {
  titulo: string;
  descripcion: string;
  imagen: string;
  elementos: string[];
  precio: number;
  precioTotal: number; // Agregada propiedad precioTotal
  mostrarOpciones: boolean; // Agregada propiedad mostrarOpciones
  opciones: { nombre: string; precio: number; seleccionada: boolean }[];
}

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = 'http://localhost:3000/api/servicios'; // Cambia esto si es necesario

  constructor(private http: HttpClient) {}

  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }

  // Puedes agregar otros métodos aquí, como crear, actualizar o eliminar servicios
}
