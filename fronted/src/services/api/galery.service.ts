import { Injectable } from '@angular/core';
import { GenericServiceService } from '../../app/shared/generic.service.service'; // Asegúrate de usar la ruta correcta
import { IGalery } from '../../app/modules/Vista_Admin/admin-gallery-editor/igalery.metadata'; // Importa la interfaz del modelo
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GaleryService extends GenericServiceService<IGalery> {
  constructor(protected override http: HttpClient) {
    super(http, 'galery')
  }

  addgalery( newGalery: IGalery): Observable<{error:boolean; msg: string; data: IGalery | null }>{
    return this.create('galery/',newGalery);
  }

}
