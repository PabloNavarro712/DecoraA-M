import { Component, Input, OnInit } from '@angular/core';
import { Servicio } from 'src/app/Data/Interfaces/servicio';
import { NgForm } from '@angular/forms';
import { EventosService } from 'src/app/Data/Services/eventos.service';
import { Evento } from 'src/app/Data/Interfaces/evento';
import Swal from 'sweetalert2';

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
  tiposDeEvento: string[] = ['Boda', 'XV Años', 'Baby Shower', 'Evento Corporativo', 'Fiesta Infantil'];
evento = {
  tipo_evento: '------'
};


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
      const descripcion = `Reserva del servicio: ${this.servicioSeleccionado.titulo}\nPrecio total: $${this.calcularPrecioTotal()}\n\nOpciones seleccionadas:\n` +
        this.servicioSeleccionado.opciones
          .filter(opcion => opcion.seleccionada)
          .map(opcion => `- ${opcion.nombre}: $${opcion.precio}`)
          .join('\n');
  
      const evento = {
        id_del_cliente: this.idCliente,
        usuario: this.usuario,
        descripcion,
        servicio_seleccionado: this.servicioSeleccionado.titulo,
        estado_evento: 'por confirmar',
        tipo_evento: form.value.tipoEvento,
        nombre_contacto: form.value.nombre,
        numero_telefono: form.value.numero,
        direccion_local: `Direccion ${form.value.direccion}, \n localidad ${form.value.localidad}`, 
        fecha_evento: this.fechaSeleccionada.toISOString(),
        hora: form.value.hora,
        precio: this.calcularPrecioTotal()
      };
  
      this.eventosService.createEvento(evento).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Reserva confirmada!',
            text: 'Tu evento ha sido agendado con éxito. Nos pondremos en contacto en breve.',
            confirmButtonText: 'Aceptar',
          });
          form.resetForm();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al agendar el evento',
            text: 'Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonText: 'Aceptar',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, llena todos los campos obligatorios.',
        confirmButtonText: 'Aceptar',
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
