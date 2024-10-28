// src/app/services/eventos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definir la interfaz del evento
export interface Evento {
  id?: string;
  Descripcion: string;
  InformacionContacto: {
    Nombre: string;
    Numero: string;
    Direccion: string;
  };
  FechaEvento: string;
  EstadoEvento: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://localhost:3000/api/eventos'; // URL de tu API en el backend

  constructor(private http: HttpClient) {}

  // Obtener todos los eventos
  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  // Obtener un evento por ID
  getEventoById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo evento
  createEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, evento);
  }

  // Actualizar un evento existente
  updateEvento(id: string, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento);
  }

  // Eliminar un evento
  deleteEvento(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
