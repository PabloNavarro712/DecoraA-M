import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { IServicio } from 'src/models/iservicios.metadata';
import { GenericServiceService } from 'src/app/shared/generic.service.service';



@Injectable({
  providedIn: 'root'
})
export class ServiciosService extends GenericServiceService<any> {

  constructor(protected override http: HttpClient) {
   super(http, 'servicios'); // Define el endpoint base
 }


// Crear un nuevo servicio con imagen
createServicioConImagen(servicio: Partial<IServicio>, file: File): Observable<IServicio> {
  const formData = new FormData();
  formData.append('titulo', servicio.titulo || '');
  formData.append('descripcion', servicio.descripcion || '');
  formData.append('categoria', servicio.categoria || '');
  formData.append('image', file);

  return this.http.post<IServicio>(`${this.url}${this.endpoint}/create`, formData);
}
 // Actualizar un servicio existente con nueva imagen
 updateServicioConImagen(id: string, servicio: Partial<IServicio>, file: File): Observable<IServicio> {
  const formData = new FormData();
  formData.append('titulo', servicio.titulo || '');
  formData.append('descripcion', servicio.descripcion || '');
  formData.append('categoria', servicio.categoria || '');
  formData.append('newImage', file);

  return this.http.put<IServicio>(`${this.url}${this.endpoint}/update/${id}`, formData);
}
  // Eliminar un servicio
  deleteServicio(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}${this.endpoint}/delete/${id}`);
  }



  
   // Obtener servicios con paginación y filtrado por categoría
   getServiciosPorCategoria(page: number, categoria?: string):  Observable<{ error: boolean; msg: string; data: IServicio[] | null }> {
    // Configuramos los parámetros para la consulta
    let params = new HttpParams().set('page', page.toString());
    if (categoria) {
      params = params.set('categoria', categoria);
    }

    return this.http.get<IServicio[]>(`${this.url}${this.endpoint}/services`, { params }).pipe(
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
