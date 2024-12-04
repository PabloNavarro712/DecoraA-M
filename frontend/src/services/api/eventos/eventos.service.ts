import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvento } from 'src/models/ievento.metadata';
import { GenericServiceService } from 'src/app/shared/generic.service.service';

// Definir la interfaz del evento
@Injectable({
  providedIn: 'root'
}) 
export class EventosService extends GenericServiceService<any> {

  constructor(protected override http: HttpClient) {
   super(http, 'eventos'); // Define el endpoint base
 }


  // Obtener solo las fechas de eventos activos
  getFechasEventos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}${this.endpoint}/fechas`);
  }

  // Obtener eventos por estado
  getEventosByEstado(estado: string): Observable<IEvento[]> {
    return this.http.get<IEvento[]>(`${this.url}${this.endpoint}/estado/${estado}`);
  }

  // Método para obtener eventos próximos a la fecha actual
  getEventosProximos(): Observable<IEvento[]> {
    return this.http.get<IEvento[]>(`${this.url}${this.endpoint}/proximos`);
  }

  // Obtener eventos por id del cliente
  getEventosByCliente(id_del_cliente: string): Observable<IEvento[]> {
    return this.http.get<IEvento[]>(`${this.url}${this.endpoint}/cliente/${id_del_cliente}`);
  }
    // Obtener eventos ordenados por prioridad y estado
    getEventosOrdenados(): Observable<IEvento[]> {
      return this.http.get<IEvento[]>(`${this.url}${this.endpoint}/ordenados`);
    }
}
