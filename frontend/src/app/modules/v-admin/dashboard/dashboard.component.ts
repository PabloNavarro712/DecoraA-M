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
  ApexTitleSubtitle,
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
  styleUrls: ['./dashboard.component.css'],
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

    // Obtener estadísticas de clientes
    this.graficasService.getClientesEstadisticas().subscribe(
      (response) => {
        this.totalClientes = response.data.totalClientes;
        this.configurarGraficaClientesPastel();
      },
      (error) => {
        this.errorMessage = 'Error al cargar estadísticas de clientes';
        console.error(this.errorMessage, error);
      },
    );

    // Obtener ganancias mensuales
    this.graficasService.getGananciasPorMes("2").subscribe(
      (response) => {
        this.gananciasMensuales = response.data;
        this.configurarGraficaGananciasMensuales();
      },
      (error) => {
        this.errorMessage = 'Error al cargar ganancias mensuales';
        console.error(this.errorMessage, error);
      },
    );

    // Obtener eventos por mes
    this.graficasService.getEventosPorMes("2").subscribe(
      (response) => {
        this.eventosPorMes = response.data;
        this.configurarGraficaEventosPorMes();
      },
      (error) => {
        this.errorMessage = 'Error al cargar eventos por mes';
        console.error(this.errorMessage, error);
      },
    );

    // Obtener estadísticas anuales
    this.graficasService.getEstadisticasPorAnio("2025").subscribe(
      (response) => {
        this.gananciasTotales = response.data.totalGanancias;
        this.configurarGraficaGananciasTotales();
      },
      (error) => {
        this.errorMessage = 'Error al cargar estadísticas anuales';
        console.error(this.errorMessage, error);
      },
    );

    this.isLoading = false;
  }

  configurarGraficaGananciasTotales() {
    this.chartGananciasTotales = {
      series: [this.gananciasTotales],
      chart: {
        type: 'bar',
        height: 350,
      },
      title: {
        text: 'Ganancia Total Acumulada',
      },
      xaxis: {
        categories: ['Ganancias'],
      },
    };
  }

  configurarGraficaGananciasMensuales() {
    const nombresMeses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const mesesNumericos = Object.keys(this.gananciasMensuales);
    const meses = mesesNumericos.map(
      (num) => nombresMeses[parseInt(num) - 1] || num,
    );
    const valores = Object.values(this.gananciasMensuales);

    this.chartGananciasMensuales = {
      series: [
        {
          name: 'Ganancias',
          data: valores,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      title: {
        text: 'Ganancias Mensuales',
      },
      xaxis: {
        categories: meses,
      },
    };
  }

  configurarGraficaEventosPorMes() {
    const nombresMeses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const mesesNumericos = Object.keys(this.eventosPorMes);
    const meses = mesesNumericos.map(
      (num) => nombresMeses[parseInt(num) - 1] || num,
    );
    const eventosTotales = mesesNumericos.map((num) =>
      Object.values(this.eventosPorMes[num]).reduce((a, b) => a + b, 0),
    );

    this.chartEventosPorMes = {
      series: [
        {
          name: 'Totales',
          data: eventosTotales,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      title: {
        text: 'Eventos por Mes',
      },
      xaxis: {
        categories: meses,
      },
    };
  }

  configurarGraficaClientesPastel() {
    this.chartClientesPastel = {
      series: [this.totalClientes, 100 - this.totalClientes],
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: ['Clientes Activos', 'Inactivos'],
      title: {
        text: 'Clientes',
      },
    };
  }
}
