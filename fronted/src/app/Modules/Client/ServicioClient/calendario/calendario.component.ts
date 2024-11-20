import { Component, Input, OnInit } from '@angular/core';
import { Servicio } from 'src/app/Data/Interfaces/servicio';
import { NgForm } from '@angular/forms';
import { EventosService } from 'src/app/Data/Services/eventos.service';
import { Evento } from 'src/app/Data/Interfaces/evento';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  mensajeBanner: { mensaje: string, clase: string } | null = null;
  @Input() servicioSeleccionado?: Servicio;
  diasDeLaSemana: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  dias: number[] = [];
  mes: number = new Date().getMonth();
  anio: number = new Date().getFullYear();
  fechaSeleccionada: Date | null = null;
  fechasNoSeleccionables: Date[] = []; 

  usuario: string = '';  
  idCliente: string = '';

  constructor(private eventosService: EventosService) {}

  ngOnInit() {
    // Cargar los datos de sessionStorage en lugar de los valores estáticos
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.usuario = user.usuario; // Asignar el usuario desde sessionStorage
      this.idCliente = user.id; // Asignar el id del cliente desde sessionStorage, asegúrate de que este campo esté disponible
    }

    this.generarDias(); 
    this.obtenerFechasNoSeleccionables();
  }

  obtenerFechasNoSeleccionables() {
    this.eventosService.getFechasEventos().subscribe(fechas => {
      this.fechasNoSeleccionables = fechas.map(fechaString => new Date(fechaString));
    });
  }

  generarDias() {
    this.dias = [];
    const fecha = new Date(this.anio, this.mes + 1, 0);
    const totalDias = fecha.getDate();
    const primerDiaDelMes = new Date(this.anio, this.mes, 1).getDay();

    for (let i = 0; i < primerDiaDelMes; i++) {
      this.dias.push(0);
    }
    for (let dia = 1; dia <= totalDias; dia++) {
      this.dias.push(dia);
    }
  }

  navegarMes(direccion: number) {
    this.mes += direccion;
    if (this.mes < 0) {
      this.mes = 11;
      this.anio--;
    } else if (this.mes > 11) {
      this.mes = 0;
      this.anio++;
    }
    this.generarDias();
  }

  seleccionarFecha(dia: number) {
    if (this.isSelectable(dia)) {
      this.fechaSeleccionada = new Date(this.anio, this.mes, dia);
      console.log('Fecha seleccionada:', this.fechaSeleccionada);
    }
  }

  isToday(dia: number): boolean {
    const hoy = new Date();
    return hoy.getFullYear() === this.anio && hoy.getMonth() === this.mes && hoy.getDate() === dia;
  }

  isSelectable(dia: number): boolean {
    if (dia <= 0) return false;

    const fechaSeleccionada = new Date(this.anio, this.mes, dia);
    const hoy = new Date();
    const maniana = new Date(hoy);
    maniana.setDate(hoy.getDate() + 1);

    const esPasado = fechaSeleccionada < maniana || fechaSeleccionada.toDateString() === hoy.toDateString();
    const esDiaNoSeleccionable = this.fechasNoSeleccionables.some(
      fecha => fecha.toDateString() === fechaSeleccionada.toDateString()
    );

    return !esPasado && !esDiaNoSeleccionable;
  }

  enviarFormulario(form: NgForm) {
    if (form.valid && this.servicioSeleccionado && this.fechaSeleccionada) {
      // Comenzamos con el título y el precio total
      let descripcion = `Reserva del servicio: ${this.servicioSeleccionado.titulo}\n`;
      descripcion += `Precio total: $${this.calcularPrecioTotal()}\n\n`;
  
      // Desglose de las opciones seleccionadas
      descripcion += "Opciones seleccionadas:\n";
      this.servicioSeleccionado.opciones.forEach(opcion => {
        if (opcion.seleccionada) {
          descripcion += `- ${opcion.nombre}: $${opcion.precio}\n`;
        }
      });
  
      const evento = {
        id_del_cliente: this.idCliente,
        usuario: this.usuario,
        descripcion: descripcion,
        servicio_seleccionado: this.servicioSeleccionado.titulo,
        estado_evento: 'por confirmar',
        tipo_evento: '------',
        nombre_contacto: form.value.nombre,
        numero_telefono: form.value.numero,
        direccion_local: form.value.direccion,
        fecha_evento: this.fechaSeleccionada.toISOString(),
        hora: form.value.hora,
        precio: this.calcularPrecioTotal()
      };
  
      this.eventosService.createEvento(evento).subscribe({
        next: (respuesta) => {
          console.log('Evento guardado con éxito:', respuesta);
          form.resetForm();
          this.mensajeBanner = {
            mensaje: '¡Evento agendado con éxito! Estás en espera, en breve nos pondremos en contacto contigo.',
            clase: 'exito'
          };
  
          // Actualizar las fechas no seleccionables y regenerar el calendario
          this.obtenerFechasNoSeleccionables();
          this.generarDias();
  
          // Ocultar el banner después de 5 segundos
          setTimeout(() => {
            this.mensajeBanner = null;
          }, 5000);
        },
        error: (error) => {
          console.error('Error al guardar el evento:', error);
          this.mensajeBanner = {
            mensaje: 'Hubo un problema al agendar el evento. Intenta nuevamente más tarde.',
            clase: 'error'
          };
  
          // Ocultar el banner de error después de 5 segundos
          setTimeout(() => {
            this.mensajeBanner = null;
          }, 5000);
        }
      });
    }
  }
  
  
  

  calcularPrecioTotal(): number {
    if (this.servicioSeleccionado) {
      // Inicia con el precio base del servicio
      let precioTotal = this.servicioSeleccionado.precio;
      
      // Añadir el precio de las opciones seleccionadas
      precioTotal += this.servicioSeleccionado.opciones.reduce((total, opcion) => {
        return opcion.seleccionada ? total + opcion.precio : total;
      }, 0);
      
      return precioTotal;
    }
    return 0;
  }
}
