import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Servicio } from 'src/app/data/Interfaces/servicio';



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
// Crear un nuevo servicio con imagen
createServicioConImagen(servicio: Partial<Servicio>, file: File): Observable<Servicio> {
  const formData = new FormData();
  formData.append('titulo', servicio.titulo || '');
  formData.append('descripcion', servicio.descripcion || '');
  formData.append('categoria', servicio.categoria || '');
  formData.append('image', file);

  return this.http.post<Servicio>(`${this.apiUrl}/create`, formData);
}
 // Actualizar un servicio existente con nueva imagen
 updateServicioConImagen(id: string, servicio: Partial<Servicio>, file: File): Observable<Servicio> {
  const formData = new FormData();
  formData.append('titulo', servicio.titulo || '');
  formData.append('descripcion', servicio.descripcion || '');
  formData.append('categoria', servicio.categoria || '');
  formData.append('newImage', file);

  return this.http.put<Servicio>(`${this.apiUrl}/update/${id}`, formData);
}
  // Eliminar un servicio
  deleteServicio(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Crear un nuevo servicio
  createServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrl, servicio);
  }

  // Actualizar un servicio existente
  updateServicio(id: string, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.apiUrl}/${id}`, servicio);
  }

  // Obtener un servicio específico por ID (opcional, si deseas ver los detalles individuales antes de editar)
  getServicioById(id: string): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/${id}`);
  }

  
   // Obtener servicios con paginación y filtrado por categoría
   getServiciosPorCategoria(page: number, categoria?: string):  Observable<{ error: boolean; msg: string; data: Servicio[] | null }> {
    // Configuramos los parámetros para la consulta
    let params = new HttpParams().set('page', page.toString());
    if (categoria) {
      params = params.set('categoria', categoria);
    }

    return this.http.get<Servicio[]>(`${this.apiUrl}/services`, { params }).pipe(
      map((servicios) => ({
        error: false,
        msg: 'Estudiantes inscritos obtenidos con éxito',
        data: servicios, // El backend devuelve directamente la lista de estudiantes
      })),
      catchError((error) => {
        const errorMessage = 
          error.error?.message || 'Error al obtener estudiantes no inscritos.';
        return of({
          error: true,
          msg: errorMessage,
          data: null,
        });
      })
    );
  }
}
