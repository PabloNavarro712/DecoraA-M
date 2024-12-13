import { Component, OnInit } from '@angular/core';
import { GraficasService } from 'src/services/api/graficas/graficas.service';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  ApexXAxis,
  ApexDataLabels,
  ApexAxisChartSeries,
  ApexTitleSubtitle
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  chart: ApexChart;
  responsive?: ApexResponsive[];
  labels?: string[];
  xaxis?: ApexXAxis;
  legend?: ApexLegend;
  dataLabels?: ApexDataLabels;
  title?: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalClientes: number = 0;
  gananciasMensuales: { [key: string]: number } = {};
  eventosPorMes: { [key: string]: { [key: string]: number } } = {};
  eventosCancelados: number = 0;
  gananciasTotales: number = 0;
  isLoading: boolean = true;
  errorMessage: string = '';

  chartGananciasTotales: Partial<ChartOptions> | any;
  chartGananciasMensuales: Partial<ChartOptions> | any;
  chartEventosPorMes: Partial<ChartOptions> | any;
  chartClientesPastel: Partial<ChartOptions> | any;

  constructor(private graficasService: GraficasService) {}

  ngOnInit() {
    this.cargarDatosGraficas();
  }

  cargarDatosGraficas() {
    this.isLoading = true;

    this.graficasService.getTotalClientes().subscribe(
      response => {
        this.totalClientes = response.data;
        this.configurarGraficaClientesPastel();
      },
      error => {
        this.errorMessage = 'Error al cargar total de clientes';
        console.error(this.errorMessage, error);
      }
    );

    this.graficasService.getGananciasMensuales().subscribe(
      response => {
        this.gananciasMensuales = response.data;
        this.configurarGraficaGananciasMensuales();
      },
      error => {
        this.errorMessage = 'Error al cargar ganancias mensuales';
        console.error(this.errorMessage, error);
      }
    );

    this.graficasService.getEventosPorMes().subscribe(
      response => {
        this.eventosPorMes = response.data;
        this.configurarGraficaEventosPorMes();
      },
      error => {
        this.errorMessage = 'Error al cargar eventos por mes';
        console.error(this.errorMessage, error);
      }
    );

    this.graficasService.getGananciaAcumuladaAnual().subscribe(
      response => {
        this.gananciasTotales = response.data;
        this.configurarGraficaGananciasTotales();
      },
      error => {
        this.errorMessage = 'Error al cargar ganancia acumulada';
        console.error(this.errorMessage, error);
      }
    );

    this.graficasService.getTotalEventosCancelados().subscribe(
      response => {
        this.eventosCancelados = response.data;
        this.configurarGraficaEventosPorMes();
      },
      error => {
        this.errorMessage = 'Error al cargar eventos cancelados';
        console.error(this.errorMessage, error);
      }
    );

    this.isLoading = false;
  }

  configurarGraficaGananciasTotales() {
    this.chartGananciasTotales = {
      series: [this.gananciasTotales],
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        text: 'Ganancia Total Acumulada'
      },
      xaxis: {
        categories: ['Ganancias']
      }
    };
  }

  configurarGraficaGananciasMensuales() {
    const nombresMeses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
  
    const mesesNumericos = Object.keys(this.gananciasMensuales);
    const meses = mesesNumericos.map(num => nombresMeses[parseInt(num) - 1] || num); // Convierte números a nombres
    const valores = Object.values(this.gananciasMensuales);
  
    this.chartGananciasMensuales = {
      series: [{
        name: 'Ganancias',
        data: valores
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        text: 'Ganancias Mensuales'
      },
      xaxis: {
        categories: meses // Ahora usa los nombres de los meses
      }
    };
  }
  

  configurarGraficaEventosPorMes() {
    const nombresMeses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
  
    const mesesNumericos = Object.keys(this.eventosPorMes);
    const meses = mesesNumericos.map(num => nombresMeses[parseInt(num) - 1] || num); // Convierte números a nombres
    const eventosTotales = mesesNumericos.map(num => 
      Object.values(this.eventosPorMes[num]).reduce((a, b) => a + b, 0)
    );
    const eventosCancelados = Array(meses.length).fill(this.eventosCancelados);
  
    this.chartEventosPorMes = {
      series: [
        {
          name: 'Totales',
          data: eventosTotales
        },
        {
          name: 'Cancelados',
          data: eventosCancelados
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        text: 'Eventos por Mes'
      },
      xaxis: {
        categories: meses // Ahora usa los nombres de los meses
      }
    };
  }
  

  configurarGraficaClientesPastel() {
    this.chartClientesPastel = {
      series: [this.totalClientes, 10 - this.totalClientes], // Asume 100 como total ejemplo
      chart: {
        type: 'pie',
        height: 350
      },
      labels: ['Clientes con Pedido', 'Otros'],
      title: {
        text: 'Total de Clientes con Pedido'
      }
    };
  }
}
