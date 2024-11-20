import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../Interfaces/servicio';



@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = 'http://localhost:3000/api/servicios'; // Cambia esto si es necesario

  constructor(private http: HttpClient) {}

  // Obtener todos los servicios
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }

  // Crear un nuevo servicio
  createServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrl, servicio);
  }

  // Actualizar un servicio existente
  updateServicio(id: string, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.apiUrl}/${id}`, servicio);
  }

  // Eliminar un servicio
  deleteServicio(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener un servicio específico por ID (opcional, si deseas ver los detalles individuales antes de editar)
  getServicioById(id: string): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/${id}`);
  }
  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file);
  
    return this.http.post<{ imageUrl: string }>('http://localhost:3000/api/upload', formData);
  }
  
}
