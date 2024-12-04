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
    return this.http.post<{ message: string }>(`${this.url}${this.endpoint}/crear`, usuario).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error al crear usuario:', error);
        return throwError(() => new Error(error.error?.message || 'Error desconocido'));
      })
    );
  }
}
