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
interface ClientesEstadisticas {
  totalClientesAtendidos: number;
  clienteConMasEventos: {
    id: string;
    nombreCompleto: string;
    eventos: number;
  };
  totalClientesQueCancelaron: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  totalClientes: ClientesEstadisticas | null = null;

  monthNames: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  isYearView: boolean = false;
  totalEventosMes : number =0;
  gananciasTotales: { [key: string]: number } = {};
  eventosPorMes: { [key: string]: { [key: string]: number } } = {};
  eventosTotales: { [key: string]: { [key: string]: number } } = {};
    eventosCancelados: number = 0;
  totalGananciaMes: number = 0;
  isLoading: boolean = true;
  errorMessage: string = '';
  mesActual: string = '';
  totalEventosAnio:number = 0;
  totalGananciaAnio:number = 0;
  isMonthView: boolean = true; // Variable para alternar entre vista de mes y año
  chartGananciasTotales: Partial<ChartOptions> | any;
  chartGananciasMensuales: Partial<ChartOptions> | any;
  chartEventosPorMes: Partial<ChartOptions> | any;
  chartEventosPorEstado: Partial<ChartOptions> | any;
  chartClientesPastel: Partial<ChartOptions> | any;
  chartEventosPorAnio: Partial<ChartOptions> | any;
  chartEvtnosPorTipo: Partial<ChartOptions> | any;
  chartGananciasAnuales: Partial<ChartOptions> | any;
  constructor(private graficasService: GraficasService) {
    const today = new Date();
    this.currentMonth = today.getMonth(); // Mes actual (0-11)
    this.currentYear = today.getFullYear(); // Año actual
  }

  ngOnInit() {
    this.mesActual = this.obtenerMesActual()
    this.cargarDatosGraficas();
    this.cargarEventosPorMes();
    this.cargarEventosPorAnio();
  }
  obtenerMesActual(): string {
    const fecha = new Date();
    return `${fecha.getFullYear()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}`;
  }

  // Método para cargar eventos del mes actual
  cargarEventosPorMes() {
    const monthNumber = this.currentMonth + 1; // Convertir a formato 1-12
    this.graficasService.getEventosPorMes(monthNumber.toString()).subscribe(
      (response) => {
        if (response) {
          this.configurarGraficaEventosPorMes(response.eventosTotales);
              // Configurar gráfica de pastel para eventos por estado
        this.configurarGraficaEventosPorEstado(response.eventosPorEstado);

        // Actualizar la barra de progreso con el total de 
        this.totalEventosMes = response.totalEventoMes || 0;
        } else {
          console.warn('Respuesta inesperada de la API', response);
          this.configurarGraficaEventosPorMes({
            bodas: 0,
            xvAnos: 0,
            babyShower: 0,
            eventoCorporativo: 0,
            fiestaInfantil: 0,
          });
          this.configurarGraficaEventosPorEstado({
            
          });
          this.totalEventosMes = 0;
        }
      },
      (error) => {
        console.error('Error al cargar eventos por mes', error);
        // Configura la gráfica con valores vacíos en caso de error
        this.configurarGraficaEventosPorMes({
          bodas: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
        });
      }
    );
    this.graficasService.getGananciasPorMes(monthNumber.toString()).subscribe(
      (response) => {
        if (response) {
          this. configurarGraficaGananciasPorMes(response.gananciasTotales);


        // Actualizar la barra de progreso con el total de 
        this.totalGananciaMes = response.totalGananciaMes|| 0;
        } else {
          console.warn('Respuesta inesperada de la API', response);
          this.configurarGraficaEventosPorMes({
            bodas: 0,
            xvAnos: 0,
            babyShower: 0,
            eventoCorporativo: 0,
            fiestaInfantil: 0,
          });
          this.configurarGraficaEventosPorEstado({
            
          });
          this.totalGananciaMes = 0;
        }
      },
      (error) => {
        console.error('Error al cargar eventos por mes', error);
        // Configura la gráfica con valores vacíos en caso de error
        this.configurarGraficaEventosPorMes({
          bodas: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
        });
      }
    );
  }
  
// Función para cambiar entre vista de mes y vista de año
toggleView() {
  this.isYearView = !this.isYearView;
  this.isMonthView = !this.isMonthView;
  if (this.isYearView) {
    // Lógica para mostrar gráficos por año
    this.loadYearlyData();
  } else {
    // Lógica para mostrar gráficos por mes
    this.loadMonthlyData();
  }
}

  cargarDatosGraficas() {
    console.log("cargando datos");
    this.isLoading = true;

 // Obtener estadísticas y configurar gráficos
 this.graficasService.getClientesEstadisticas().subscribe({
  next: (response) => {
    this.totalClientes = response.data as ClientesEstadisticas;
    console.log("cargando datos", this.totalClientes);
    this.configurarGraficaClientesPastel();
  },
  error: (error) => {
    this.errorMessage = 'Error al cargar estadísticas de clientes';
    console.error(this.errorMessage, error);
  }
});

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

  

  configurarGraficaClientesPastel() {
    if (!this.totalClientes) {
      console.error('No hay datos de clientes para configurar la gráfica');
      return;
    }
  
    const clientesAtendidos = this.totalClientes.totalClientesAtendidos || 0;
    const clientesInactivos = this.totalClientes.totalClientesQueCancelaron || 0;
  
    // Paleta de colores personalizada
    const coloresClientes = ['#28a745', '#dc3545']; // Verde para atendidos, rojo para cancelados
  
    this.chartClientesPastel = {
      series: [clientesAtendidos, clientesInactivos], // Datos de la gráfica
      chart: {
        type: 'pie', // Gráfico tipo pastel
        height: 400, // Altura del gráfico
        width: '100%', // Ancho adaptable
        toolbar: {
          show: true, // Herramientas interactivas
        },
        animations: {
          enabled: true, // Animaciones activadas
          easing: 'easeinout', // Animación suave
          speed: 800, // Velocidad de la animación
        },
      },
      title: {
        text: 'Distribución de Clientes', // Título de la gráfica
        align: 'center', // Centrado
        style: {
          fontSize: '20px',
          color: '#333',
        },
      },
      labels: ['Clientes Atendidos', 'Clientes Cancelados'], // Etiquetas de los segmentos
      colors: coloresClientes, // Colores personalizados
      plotOptions: {
        pie: {
          expandOnClick: true, // Ampliar segmento al hacer clic
          dataLabels: {
            offset: -5, // Etiquetas dentro del gráfico
            style: {
              fontSize: '14px',
              colors: ['#fff'], // Texto blanco para contraste
            },
          },
        },
      },
      legend: {
        position: 'bottom', // Posición de la leyenda
        markers: {
          radius: 12, // Marcadores circulares
        },
        labels: {
          colors: '#555', // Color del texto de la leyenda
        },
      },
      tooltip: {
        enabled: true, // Activar tooltip
        y: {
          formatter: (val: number) => `${val} clientes`, // Texto del tooltip
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300, // Ancho reducido en dispositivos pequeños
            },
            legend: {
              position: 'bottom', // Cambiar posición de la leyenda
            },
          },
        },
      ],
    };
  }
  

// Configurar gráfica con datos del mes actual
configurarGraficaEventosPorMes(eventosTotales: { [key: string]: number }) {
  const categorias = Object.keys(eventosTotales);
  const valores = Object.values(eventosTotales);

  this.chartEventosPorMes = {
    series: [
      {
        name: 'Eventos',
        data: valores,
      },
    ],
    chart: {
      type: 'bar', // Gráfico tipo barra
      height: 400, // Altura ajustada
      toolbar: {
        show: true, // Muestra opciones para descargar o interactuar
      },
      zoom: {
        enabled: true, // Permite hacer zoom en el gráfico
      },
    },
    title: {
      text: `Eventos por Tipo (${this.monthNames[this.currentMonth]})`,
      align: 'center', // Centra el título
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
        color: '#333',
      },
    },
    xaxis: {
      categories: categorias, // Etiquetas dinámicas
      title: {
        text: 'Tipos de Eventos',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#555',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Cantidad de Eventos',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#555',
        },
      },
    },
    colors:['#e5be01', '#737373', '#ffd700', '#b0b98b',  '#6fb7c8'], // Colores personalizados
    dataLabels: {
      enabled: true, // Activa etiquetas en las barras
      style: {
        fontSize: '12px',
        colors: ['#000'], // Texto negro para contraste
      },
      formatter: (val: number) => val.toString(), // Formato del valor
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `${val} eventos`, // Texto descriptivo en el tooltip
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4, // Bordes redondeados
        horizontal: false, // Barras verticales
        dataLabels: {
          position: 'top', // Posición de etiquetas en la parte superior
        },
      },
    },
    legend: {
      show: false, // Oculta la leyenda para gráficos simples
    },
  };
}
anioAnterior() {
  
    this.currentYear--;
  
    this.cargarEventosPorAnio();
}

// Cambiar al mes siguiente
anioSiguiente() {
  this.currentYear++;
  
  this.cargarEventosPorAnio();
}

  // Cambiar al mes anterior
  mesAnterior() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11; // Cambiar a diciembre del año anterior
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.cargarEventosPorMes();
  }

  // Cambiar al mes siguiente
  mesSiguiente() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0; // Cambiar a enero del próximo año
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.cargarEventosPorMes();
  }
  configurarGraficaEventosPorEstado(eventosPorEstado: { [key: string]: number }) {
    const estados = Object.keys(eventosPorEstado || {}); // Claves de los estados
    const valoresEstados = Object.values(eventosPorEstado || {}); // Valores de eventos por estado
  
    // Colores personalizados para los segmentos del gráfico
    const coloresEstados = ['#ffe440', '#d93a21', '#64bf3f', '#d26336', '#FF33A6'];
  
    this.chartEventosPorEstado = {
      series: valoresEstados, // Valores para cada estado
      chart: {
        type: 'pie', // Gráfico tipo pastel
        height: 350, // Altura del gráfico
        width: '100%', // Ancho adaptable
        toolbar: {
          show: true, // Herramientas interactivas
        },
        animations: {
          enabled: true, // Activar animaciones
          easing: 'easeinout', // Animación suave
          speed: 800, // Velocidad de la animación
        },
      },
      title: {
        text: `Eventos por Estado (${this.monthNames[this.currentMonth]})`, // Título dinámico
        align: 'center', // Centrado
        style: {
          fontSize: '15px',
          color: '#333',
        },
      },
      labels: estados, // Etiquetas dinámicas según los estados
      colors: coloresEstados, // Colores personalizados
      plotOptions: {
        pie: {
          expandOnClick: true, // Ampliar segmento al hacer clic
          dataLabels: {
            offset: -5, // Etiquetas dentro del gráfico
            style: {
              fontSize: '14px',
              colors: ['#fff'], // Texto blanco para contraste
            },
          },
        },
      },
      legend: {
        position: 'bottom', // Posición de la leyenda
        markers: {
          radius: 12, // Marcadores circulares
        },
        labels: {
          colors: '#555', // Color de texto de la leyenda
        },
      },
      tooltip: {
        enabled: true, // Activar tooltip
        y: {
          formatter: (val: number) => `${val} eventos`, // Texto del tooltip
        },
      },
    };
  }
  
  
  configurarGraficaGananciasPorMes(gananciasTotales: { [key: string]: number }) {
    const categorias = Object.keys(gananciasTotales);
    const valores = Object.values(gananciasTotales);
  
    this.chartGananciasMensuales = {
      series: [
        {
          name: 'Ganancias',
          data: valores,
        },
      ],
      chart: {
        type: 'bar', // Gráfico de barras
        height: 400,
        width: '100%',
        toolbar: {
          show: true, // Herramientas interactivas
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      title: {
        text: `Ganancias Mensuales (${this.monthNames[this.currentMonth]})`, // Título dinámico
        align: 'center',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#333',
        },
      },
      xaxis: {
        categories: categorias, // Nombres de los meses
        title: {
          text: 'Tipo eventos',
          style: {
            color: '#666',
            fontSize: '14px',
          },
        },
        labels: {
          style: {
            colors: '#555',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Ganancias ($)',
          style: {
            color: '#666',
            fontSize: '14px',
          },
        },
        labels: {
          formatter: (val: number) => `$${val.toLocaleString()}`, // Formato de moneda
          style: {
            colors: '#555',
            fontSize: '12px',
          },
        },
      },
      colors: ['#e5be01', '#737373', '#ffd700', '#b0b98b',  '#6fb7c8'], // Color principal de las barras
      plotOptions: {
        bar: {
          borderRadius: 8, // Bordes redondeados en las barras
          dataLabels: {
            position: 'top', // Mostrar etiquetas en la parte superior
          },
        },
      },
      dataLabels: {
        enabled: true, // Mostrar etiquetas en las barras
        formatter: (val: number) => `$${val.toLocaleString()}`,
        offsetY: -10,
        style: {
          fontSize: '12px',
          colors: ['#333'],
        },
      },
      grid: {
        borderColor: '#e0e0e0', // Color de las líneas de la cuadrícula
        strokeDashArray: 4,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val: number) => `$${val.toLocaleString()}`, // Tooltip con formato de moneda
        },
      },
    };
  }
  
  loadMonthlyData() {
    this.cargarDatosGraficas();
    this.cargarEventosPorMes();
  }

  loadYearlyData() {
   
  }

  cargarEventosPorAnio() {
    const yearNumber = this.currentYear; // Convertir a formato 1-12
    this.graficasService.getEstadisticasPorAnio(yearNumber.toString()).subscribe(
      (response) => {
        if (response && response.data) {
          const eventosPorMes = response.data.eventosPorMes;
          let totalEventosAnio = 0;
          let totalGananciasAnio = 0;
          const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
          ];

          // Inicializamos los valores para la gráfica de eventos
          const eventosTotales = {
            bodas: 0,
            xvAnos: 0,
            babyShower: 0,
            eventoCorporativo: 0,
            fiestaInfantil: 0,
          };
   // Inicializamos el array de eventos por mes
        const eventosPorMesData = meses.map((mes, index) => eventosPorMes[index + 1]?.totalmes || 0);
        const ganaciasPorMesData = meses.map((mes, index) => eventosPorMes[index + 1]?.ganancias || 0);
    // Llamada para configurar la gráfica de eventos por mes
    this.configurarGraficaEventosPorasanio(eventosPorMesData);
    console.log(`Total de eventos en el año: ${eventosPorMesData}`);
    this.configurarGraficaGanancias(ganaciasPorMesData);
    console.log(`Total de eventos en el año: ${ganaciasPorMesData}`);
          // Procesamos los eventos por mes
          Object.keys(eventosPorMes).forEach((mes) => {
            const eventosMes = eventosPorMes[mes];
            
            // Sumamos los eventos por tipo
            eventosTotales.bodas += eventosMes.Boda;
            eventosTotales.xvAnos += eventosMes.xvAnos;
            eventosTotales.babyShower += eventosMes.babyShower;
            eventosTotales.eventoCorporativo += eventosMes.eventoCorporativo;
            eventosTotales.fiestaInfantil += eventosMes.fiestaInfantil;
  
            // Sumamos las ganancias del mes
            totalGananciasAnio += eventosMes.ganancias;
  
            // Sumamos el total de eventos en el año
            totalEventosAnio += eventosMes.totalmes;
          });
  
          // Llamada para configurar la gráfica con los eventos totales
          this.configurarGraficaEventosPorAnio(eventosTotales);
          console.log(`Total de eventos en el año: ${JSON.stringify(eventosTotales)}`);

          // Mostrar el resumen total de eventos y ganancias
          console.log(`Total de eventos en el año: ${totalEventosAnio}`);
          console.log(`Total de ganancias en el año: ${totalGananciasAnio}`);
  
 
  
          this.totalEventosAnio = totalEventosAnio;
          this.totalGananciaAnio = totalGananciasAnio;
          
        } else {
          console.warn('Respuesta inesperada de la API', response);
          // Configura la gráfica con valores vacíos en caso de que no haya respuesta
          this.configurarGraficaEventosPorAnio({
            bodas: 0,
            xvAnos: 0,
            babyShower: 0,
            eventoCorporativo: 0,
            fiestaInfantil: 0,
          });
          this.configurarGraficaGanancias([]);
          this.totalEventosAnio = 0;
          this.totalGananciaAnio = 0;
        }
      },
      (error) => {
        console.error('Error al cargar eventos por año', error);
        // Configura las gráficas con valores vacíos en caso de error
        
        this.configurarGraficaEventosPorAnio({
          bodas: 0,
          xvAnos: 0,
          babyShower: 0,
          eventoCorporativo: 0,
          fiestaInfantil: 0,
        });
        this.configurarGraficaGanancias([]);
        this.totalEventosAnio = 0;
        this.totalGananciaAnio = 0;
      }
    );
  }
  
  configurarGraficaEventosPorAnio(eventosTotales: any) {
    const tiposEventos = ['bodas', 'xvAnos', 'babyShower', 'eventoCorporativo', 'fiestaInfantil'];
    const etiquetasEventos = ['Bodas', 'XV Años', 'Baby Shower', 'Evento Corporativo', 'Fiesta Infantil'];
  
    // Colores personalizados para los segmentos del gráfico
    const coloresEventos = ['#e5be01', '#737373', '#ffd700', '#b0b98b',  '#6fb7c8'];
  
    // Extraemos los valores de eventosTotales asegurándonos de usar claves correctas
    const valoresEventos = tiposEventos.map(tipo => eventosTotales[tipo] || 0);
  
    this.chartEvtnosPorTipo = {
      series: valoresEventos, // Valores de cada tipo de evento
      chart: {
        type: 'pie', // Tipo de gráfico
        height: 400, // Altura del gráfico
        width: '100%', // Ancho adaptable
        toolbar: {
          show: true, // Herramientas interactivas
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      title: {
        text: `Eventos por Tipo (${this.currentYear})`, // Título dinámico
        align: 'center', // Centrado
        style: {
          fontSize: '20px',
          color: '#333',
        },
      },
      labels: etiquetasEventos, // Etiquetas para los segmentos
      colors: coloresEventos, // Colores personalizados
      plotOptions: {
        pie: {
          expandOnClick: true, // Ampliar segmento al hacer clic
          dataLabels: {
            offset: -5, // Etiquetas dentro del gráfico
            style: {
              fontSize: '14px',
              colors: ['#fff'], // Texto blanco para contraste
            },
          },
        },
      },
      legend: {
        position: 'bottom', // Posición de la leyenda
        markers: {
          radius: 12, // Marcadores circulares
        },
        labels: {
          colors: '#555',
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val: number) => `${val} eventos`, // Texto del tooltip
        },
      },
    };
  }

  configurarGraficaGanancias(gananciasPorMesData: number[]) {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
  
    this.chartGananciasAnuales = {
      series: [
        {
          name: 'Ganancias',
          data: gananciasPorMesData,
        },
      ],
      chart: {
        type: 'bar',
        height: 400, // Altura ajustada
        width: '100%', // Ancho ajustable al contenedor
        toolbar: {
          show: true, // Mostrar opciones de interacción
        },
        animations: {
          enabled: true,
          easing: 'easeinout', // Animaciones suaves
          speed: 800,
        },
      },
      title: {
        text: `Ganancias por Mes (${this.currentYear})`,
        align: 'center', // Centrado
        style: {
          fontSize: '20px',
          color: '#333', // Color elegante
        },
      },
      plotOptions: {
        bar: {
          distributed: true, // Colores diferentes para cada barra
          borderRadius: 8, // Bordes redondeados
          columnWidth: '60%', // Ancho ajustado
        },
      },
      colors: [
        '#e5be01', '#737373', '#ffd700', '#b0b98b', '#e5be01', '#c1a442',
        '#d3b12e', '#ceaf18', '#b0b98b', '#ffd700', '#b0b98b', '#e8ca38',
      ], // Colores personalizados
      xaxis: {
        categories: meses,
        labels: {
          style: {
            colors: '#555',
            fontSize: '14px',
          },
        },
        title: {
          text: 'Meses del Año',
          style: {
            fontSize: '16px',
            color: '#333',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (val: number) => `$${val.toFixed(2)}`, // Formato de dinero
          style: {
            fontSize: '14px',
            colors: '#555',
          },
        },
        title: {
          text: 'Ganancias (MXN)',
          style: {
            fontSize: '16px',
            color: '#333',
          },
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val: number) => `$${val.toFixed(2)} MXN`, // Tooltip con formato de moneda
        },
      },
      legend: {
        show: false, // Ocultamos la leyenda para gráficos simples
      },
    };
  }
  
  configurarGraficaEventosPorasanio(eventosPorMes: any) {
   // Nombres de los meses
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  this.chartEventosPorAnio = {
    series: [
      {
        name: 'Eventos',
        data: eventosPorMes,
      },
    ],
    chart: {
      type: 'bar',
      height: 400, // Altura mejorada para mejor visualización
      width: '100%', // Adaptación automática al contenedor
      toolbar: {
        show: true, // Mostrar opciones de descarga y zoom
      },
      animations: {
        enabled: true,
        easing: 'easeout', // Animación suave
        speed: 800,
      },
    },
    title: {
      text: `Eventos Realizados en el Año (${this.currentYear})`,
      align: 'center', // Centrar el título
      style: {
        fontSize: '20px',
        color: '#333', // Color elegante para el texto
      },
    },
    plotOptions: {
      bar: {
        distributed: true, // Colores únicos por barra
        borderRadius: 5, // Bordes redondeados
        columnWidth: '60%', // Ancho de las barras
      },
    },
    colors: [
      '#e5be01', '#737373', '#ffd700', '#b0b98b', '#e5be01', '#c1a442',
      '#d3b12e', '#ceaf18', '#b0b98b', '#ffd700', '#b0b98b', '#e8ca38',
    ],// Colores personalizados por mes
    xaxis: {
      categories: meses,
      labels: {
        style: {
          colors: '#555', // Color de etiquetas
          fontSize: '14px', // Tamaño de las etiquetas
        },
      },
      title: {
        text: 'Meses del Año',
        style: {
          fontSize: '16px',
          color: '#333',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `${val}`, // Formato de valores en el eje Y
        style: {
          fontSize: '14px',
          colors: '#555',
        },
      },
      title: {
        text: 'Número de Eventos',
        style: {
          fontSize: '16px',
          color: '#333',
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `${val} eventos`, // Formato del tooltip
      },
    },
    legend: {
      show: false, // Ocultamos la leyenda para gráficos de barras simples
    },
  };
}
  }

