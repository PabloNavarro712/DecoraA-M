import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericServiceService } from 'src/app/shared/generic.service.service';

@Injectable({
  providedIn: 'root'
})
export class GraficasService extends GenericServiceService<any> {
  constructor(protected override http: HttpClient) {
    super(http, 'graficas'); // Define el endpoint base
  }

  // Método para obtener eventos por mes
  getEventosPorMes(mes: string): Observable<any> {
    return this.http.get(`${this.url}graficas/eventos/${mes}`);
  }

  // Método para obtener ganancias por mes
  getGananciasPorMes(mes: string): Observable<any> {
    return this.http.get(`${this.url}graficas/ganancias/${mes}`);
  }

  // Método para obtener estadísticas por año
  getEstadisticasPorAnio(anio: string): Observable<any> {
    return this.http.get(`${this.url}graficas/estadisticas/${anio}`);
  }

  // Método para obtener estadísticas de clientes atendidos
  getClientesEstadisticas(): Observable<any> {
    return this.http.get(`${this.url}graficas/clientes/estadisticas`);
  }
}
