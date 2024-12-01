import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from 'src/models/iiteam.metadata';
import { GenericServiceService } from 'src/app/shared/generic.service.service';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService extends GenericServiceService<any> {

  constructor(protected override http: HttpClient) {
   super(http, 'galeria-prueba'); // Define el endpoint base
 }


  // Crear un nuevo elemento
  createItem(file: File, categoria: string, descripcion: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // Archivo de imagen
    formData.append('categoria', categoria);
    formData.append('descripcion', descripcion);

    return this.http.post<any>(`${this.url}${this.endpoint}/crear`, formData);
  }


  updateItem(
    id: string,
    updateData: Partial< IItem >,
    file: File, // Añadido: el archivo de la nueva imagen
  ): Observable<void> {
    const formData = new FormData();
  
    // Añadir los datos de actualización del documento al FormData
    formData.append('updateData', JSON.stringify(updateData));
  
    // Añadir el archivo de la imagen al FormData
    formData.append('file', file);
  
    return this.http.patch<void>(`${this.url}galeria-prueba/update/${id}`, formData);
  }

  // Eliminar un elemento por ID
  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}galeria-prueba/delete/${id}`);
  }


// Obtener elementos filtrados por categoría
getItemsByCategoria(categoria: string): Observable< IItem []> {
  return this.http.get< IItem []>(`${this.url}${this.endpoint}}/buscar/${categoria}`);
}



}

