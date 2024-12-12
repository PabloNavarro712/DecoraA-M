import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/iusuario.metadata';
import { map, catchError } from 'rxjs/operators';
import { GenericServiceService } from 'src/app/shared/generic.service.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService  extends GenericServiceService<any> {

  constructor(protected override http: HttpClient) {
    super(http, 'usuarios'); // Define el endpoint base
  }

  crearUsuario(usuario: IUser): Observable<{ message: string }> {
    console.log('Intentando crear usuario con los siguientes datos:', usuario);
  
    return this.http.post<{ message: string }>(`${this.url}${this.endpoint}/crear`, usuario).pipe(
      map((response) => {
        console.log('Respuesta exitosa del backend:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Error al crear usuario:', error);
        if (error.error && error.error.message) {
          console.error('Mensaje de error desde el backend:', error.error.message);
          return throwError(() => new Error(error.error.message));
        } else if (error.message) {
          console.error('Mensaje de error general:', error.message);
          return throwError(() => new Error(error.message));
        } else {
          return throwError(() => new Error('Error desconocido'));
        }
      })
    );
  }
  
}