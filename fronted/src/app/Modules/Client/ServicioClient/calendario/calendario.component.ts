import { Component, Input, OnInit } from '@angular/core';
import { Servicio } from 'src/app/data/Interfaces/servicio';
import { NgForm } from '@angular/forms';
import { EventosService } from 'src/app/data/Services/eventos.service';
import { Evento } from 'src/app/data/Interfaces/evento';
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



  constructor(private eventosService: EventosService) {}

  ngOnInit() {
    // Cargar los datos de sessionStorage en lugar de los valores estáticos
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.usuario = user.correo; // Asignar el usuario desde sessionStorage
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
        idServicio: this.servicioSeleccionado?.id,
        idCliente: this.idCliente,
        nombre: form.value.nombre, // Asumiendo que el nombre del evento viene del formulario
        contacto: form.value.numero, // Asumiendo que es el número de teléfono
        correoElectronico: this.usuario || '', // Asegúrate de agregar este campo si es necesario
        fechaHoraReserva: new Date(),
        ubicacionEvento: `Dirección: ${form.value.direccion}, Localidad: ${form.value.localidad}`,
        tipoEvento: this.servicioSeleccionado?.categoria,
        horaEvento: form.value.hora,
        fechaEvento: new Date(this.fechaSeleccionada), 
        estado: 'pendiente' as 'pendiente', // Asegurando el tipo literal
        precio_final: this.calcularPrecioTotal(),
        adiciones: this.obtenerOpcionesSeleccionadas() 
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
  obtenerOpcionesSeleccionadas(): { nombre: string; precio: number }[] {
    if (this.servicioSeleccionado?.opciones) {
      return this.servicioSeleccionado.opciones
        .filter(opcion => opcion.seleccionada) // Filtrar solo las opciones seleccionadas
        .map(opcion => ({
          nombre: opcion.nombre,
          precio: opcion.precio
        })); // Transformar a un formato compatible con 'adiciones'
    }
    return [];
  }
  
}
