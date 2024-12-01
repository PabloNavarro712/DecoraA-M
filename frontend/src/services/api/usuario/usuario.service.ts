import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/iusuario.metadata';
import { map } from 'rxjs/operators';
import { GenericServiceService } from 'src/app/shared/generic.service.service';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService  extends GenericServiceService<any> {

   constructor(protected override http: HttpClient) {
    super(http, 'usuarios'); // Define el endpoint base
  }


}
