import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericServiceService } from 'src/app/shared/generic.service.service';

@Injectable({
  providedIn: 'root'
})
export class GraficasService  extends GenericServiceService<any> {

  constructor(protected override http: HttpClient) {
    super(http, 'graficas'); // Define el endpoint base
  }


  getEventosPorMes(): Observable<any> {
    return this.http.get(`${this.url}graficas/eventos-por-mes`);
  }

  getGananciasMensuales(): Observable<any> {
    return this.http.get(`${this.url}graficas/ganancias-mensuales`);
  }

  getTotalClientes(): Observable<any> {
    return this.http.get(`${this.url}graficas/total-clientes`);
  }

  getTotalEventosCancelados(): Observable<any> {
    return this.http.get(`${this.url}graficas/total-eventos-cancelados`);
  }

  getGananciaAcumuladaAnual(): Observable<any> {
    return this.http.get(`${this.url}graficas/ganancia-acumulada-anual`);
  }
}
