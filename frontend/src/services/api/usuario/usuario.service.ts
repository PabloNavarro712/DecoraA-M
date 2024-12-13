import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUser } from 'src/models/iusuario.metadata';
import { map, catchError } from 'rxjs/operators';
import { GenericServiceService } from 'src/app/shared/generic.service.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends GenericServiceService<any> {
  constructor(protected override http: HttpClient) {
    super(http, 'usuarios'); // Define el endpoint base
  }

  crearUsuario(usuario: IUser): Observable<{ message: string }> {
    console.log('Intentando crear usuario con los siguientes datos:', usuario);

    return this.http
      .post<{ message: string }>(`${this.url}${this.endpoint}/crear`, usuario)
      .pipe(
        map((response) => {
          console.log('Respuesta exitosa del backend:', response);
          return response;
        }),
        catchError((error) => {
          console.error('Error al crear usuario:', error);
          if (error.error && error.error.message) {
            console.error(
              'Mensaje de error desde el backend:',
              error.error.message,
            );
            return throwError(() => new Error(error.error.message));
          } else if (error.message) {
            console.error('Mensaje de error general:', error.message);
            return throwError(() => new Error(error.message));
          } else {
            return throwError(() => new Error('Error desconocido'));
          }
        }),
      );
  }
  // Obtener servicios con paginación y filtrado por categoría
  getUsuariosPorNombre(
    page: number,
    nombreCompleto?: string,
  ): Observable<{ error: boolean; msg: string; data: IUser[] | null }> {
    // Configuramos los parámetros para la consulta
    let params = new HttpParams().set('page', page.toString());
    if (nombreCompleto) {
      params = params.set('nombreCompleto', nombreCompleto);
    }

    return this.http
      .get<IUser[]>(`${this.url}${this.endpoint}/paginados`, { params })
      .pipe(
        map((servicios) => ({
          error: false,
          msg: 'Estudiantes inscritos obtenidos con éxito',
          data: servicios, // El backend devuelve directamente la lista de estudiantes
        })),
        catchError((error) => {
          const errorMessage =
            error.error?.message ||
            'Error al obtener estudiantes no inscritos.';
          return of({
            error: true,
            msg: errorMessage,
            data: null,
          });
        }),
      );
  }
  updateUsuarioBloqueado(id: string, bloqueado: boolean): Observable<{ message: string }> {
    if (typeof bloqueado !== 'boolean') {
      console.error('El valor de "bloqueado" debe ser un booleano.');
      return throwError(() => new Error('El valor de "bloqueado" debe ser un booleano.'));
    }
  
    return this.http
      .patch<{ message: string }>(`${this.url}${this.endpoint}/${id}/bloqueado`, { bloqueado })
      .pipe(
        map((response) => {
          console.log('Estado de "bloqueado" actualizado exitosamente:', response);
          return response;
        }),
        catchError((error) => {
          console.error('Error al actualizar el estado de "bloqueado":', error);
          const errorMessage =
            error.error?.message || 'Error al actualizar el estado de "bloqueado".';
          return throwError(() => new Error(errorMessage));
        })
      );
  }
  
}