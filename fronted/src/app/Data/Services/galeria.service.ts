import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Item {
  id?: string;
  Categoria: string;
  Descripcion: string;
  Imagen: string;
}
@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
  private apiUrl = 'http://localhost:3000/api/galeria-prueba'; // Cambia la URL si es necesario
  private uploadUrl = 'http://localhost:3000/api/upload'; // Ruta para la subida de imágenes

  constructor(private http: HttpClient) { }

  // Crear un nuevo elemento
  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  // Obtener todos los elementos
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  // Actualizar un elemento
  updateItem(id: string | undefined, updatedItem: Item): Observable<Item> {
    return this.http.put<Item>(`http://localhost:3000/api/galeria-prueba/${id}`, updatedItem);
  }

  // Eliminar un elemento
  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Subir imagen a Firebase Storage
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{ imageUrl: string }>(this.uploadUrl, formData);
  }
  // debuelbe imagenes por categoria
// galeria.service.ts
// galeria.service.ts
getItemsByCategoria(categoria: string): Observable<Item[]> {
  return this.http.get<Item[]>(`${this.apiUrl}/galeria-prueba?categoria=${encodeURIComponent(categoria)}`);
}



}

