import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from 'src/app/data/Interfaces/item';


@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
  private apiUrl = 'http://localhost:3000/api/galeria-prueba'; // Cambia la URL si es necesario


  constructor(private http: HttpClient) { }

  // Crear un nuevo elemento
  createItem(file: File, categoria: string, descripcion: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // Archivo de imagen
    formData.append('categoria', categoria);
    formData.append('descripcion', descripcion);

    return this.http.post<any>(`${this.apiUrl}/crear`, formData);
  }

  // Obtener todos los elementos
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  updateItem(
    id: string,
    updateData: Partial<Item>,
    file: File, // Añadido: el archivo de la nueva imagen
  ): Observable<void> {
    const formData = new FormData();
  
    // Añadir los datos de actualización del documento al FormData
    formData.append('updateData', JSON.stringify(updateData));
  
    // Añadir el archivo de la imagen al FormData
    formData.append('file', file);
  
    return this.http.patch<void>(`${this.apiUrl}/update/${id}`, formData);
  }

  // Eliminar un elemento por ID
  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }


// Obtener elementos filtrados por categoría
getItemsByCategoria(categoria: string): Observable<Item[]> {
  return this.http.get<Item[]>(`${this.apiUrl}/buscar/${categoria}`);
}



}

