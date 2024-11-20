import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventosService} from '../../../../Data/Services/eventos.service';

@Component({
  selector: 'app-eventos-admin',
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.css']
})
export class EventosAdminComponent implements OnInit {
  reservas = [
    {
      id_del_cliente: "cliente123",
      usuario: "usuarioTest",
      descripcion: "Decoración de bodas elegante y sofisticada.",
      servicio_seleccionado: "Decoración floral y montaje de mesas",
      estado_evento: "activo",
      tipo_evento: "Boda",
      nombre_contacto: "Juan Pérez",
      numero_telefono: "1234567890",
      direccion_local: "Calle Ficticia 123, Ciudad, País",
      fecha_evento: "2024-11-16T06:00:00.000Z",
      hora: "18:00"
    },
    {
      id_del_cliente: "cliente124",
      usuario: "usuarioRosa",
      descripcion: "Fiesta de XV años con temática de cuento de hadas.",
      servicio_seleccionado: "Montaje de escenario y luces",
      estado_evento: "pendiente",
      tipo_evento: "XV Años",
      nombre_contacto: "María Gómez",
      numero_telefono: "9876543210",
      direccion_local: "Avenida Principal 456, Ciudad, País",
      fecha_evento: "2024-12-05T20:00:00.000Z",
      hora: "20:00"
    },
    {
      id_del_cliente: "cliente125",
      usuario: "usuarioEvento1",
      descripcion: "Decoración para un baby shower cálido y acogedor.",
      servicio_seleccionado: "Arreglo floral y mesas de dulces",
      estado_evento: "activo",
      tipo_evento: "Baby Shower",
      nombre_contacto: "Laura Martínez",
      numero_telefono: "1230984567",
      direccion_local: "Plaza Central 789, Ciudad, País",
      fecha_evento: "2024-11-25T14:00:00.000Z",
      hora: "14:00"
    },
    {
      id_del_cliente: "cliente126",
      usuario: "usuarioCarlos",
      descripcion: "Decoración corporativa para una conferencia.",
      servicio_seleccionado: "Pantallas y diseño de escenario",
      estado_evento: "activo",
      tipo_evento: "Evento Corporativo",
      nombre_contacto: "Carlos Mendoza",
      numero_telefono: "4567890123",
      direccion_local: "Centro de Convenciones, Ciudad, País",
      fecha_evento: "2024-12-10T10:00:00.000Z",
      hora: "10:00"
    },
    {
      id_del_cliente: "cliente127",
      usuario: "usuarioFiesta",
      descripcion: "Fiesta infantil con temática de superhéroes.",
      servicio_seleccionado: "Animación y decoración temática",
      estado_evento: "cancelado",
      tipo_evento: "Fiesta Infantil",
      nombre_contacto: "Luis Ramírez",
      numero_telefono: "3216549870",
      direccion_local: "Parque Infantil 321, Ciudad, País",
      fecha_evento: "2024-11-20T16:00:00.000Z",
      hora: "16:00"
    },
    {
      id_del_cliente: "cliente128",
      usuario: "usuarioRocio",
      descripcion: "Celebración de aniversario con decoración romántica.",
      servicio_seleccionado: "Montaje de escenario y pista de baile",
      estado_evento: "activo",
      tipo_evento: "Evento Corporativo",
      nombre_contacto: "Rocío Hernández",
      numero_telefono: "7891234560",
      direccion_local: "Restaurante Elegante 456, Ciudad, País",
      fecha_evento: "2024-11-30T20:00:00.000Z",
      hora: "20:00"
    },
    {
      id_del_cliente: "cliente129",
      usuario: "usuarioSofia",
      descripcion: "Boda temática vintage en un jardín.",
      servicio_seleccionado: "Decoración floral y mesas temáticas",
      estado_evento: "pendiente",
      tipo_evento: "Boda",
      nombre_contacto: "Sofía Álvarez",
      numero_telefono: "4561237890",
      direccion_local: "Jardín Principal, Ciudad, País",
      fecha_evento: "2024-12-15T17:00:00.000Z",
      hora: "17:00"
    },
    {
      id_del_cliente: "cliente130",
      usuario: "usuarioPedro",
      descripcion: "Reunión corporativa de fin de año.",
      servicio_seleccionado: "Proyección audiovisual y catering",
      estado_evento: "activo",
      tipo_evento: "Evento Corporativo",
      nombre_contacto: "Pedro Castillo",
      numero_telefono: "8527419630",
      direccion_local: "Edificio Central, Ciudad, País",
      fecha_evento: "2024-12-22T19:00:00.000Z",
      hora: "19:00"
    },
    {
      id_del_cliente: "cliente131",
      usuario: "usuarioInfantil",
      descripcion: "Fiesta infantil con temática de dinosaurios.",
      servicio_seleccionado: "Decoración temática y juegos inflables",
      estado_evento: "activo",
      tipo_evento: "Fiesta Infantil",
      nombre_contacto: "Ana Torres",
      numero_telefono: "9513578520",
      direccion_local: "Salón de Fiestas 789, Ciudad, País",
      fecha_evento: "2024-11-28T15:00:00.000Z",
      hora: "15:00"
    },
    {
      id_del_cliente: "cliente132",
      usuario: "usuarioEvento2",
      descripcion: "Baby shower íntimo en casa.",
      servicio_seleccionado: "Decoración y catering",
      estado_evento: "pendiente",
      tipo_evento: "Baby Shower",
      nombre_contacto: "Gabriela López",
      numero_telefono: "9632587410",
      direccion_local: "Residencia Familiar 321, Ciudad, País",
      fecha_evento: "2024-12-01T11:00:00.000Z",
      hora: "11:00"
    },
    // Replicar y ajustar para completar los 20 registros
  ];
  

  filtros = {
    fecha: '',
    tipoEvento: '',
    estadoEvento: ''
  };

  reservasFiltradas = this.reservas;
  reservaSeleccionada: any = null;
  modoEdicion = false;

  ngOnInit(): void {
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.reservasFiltradas = this.reservas.filter(reserva => {
      const cumpleFecha = !this.filtros.fecha || new Date(reserva.fecha_evento).toISOString().split('T')[0] === this.filtros.fecha;
      const cumpleTipo = !this.filtros.tipoEvento || reserva.tipo_evento === this.filtros.tipoEvento;
      const cumpleEstado = !this.filtros.estadoEvento || reserva.estado_evento === this.filtros.estadoEvento;
      return cumpleFecha && cumpleTipo && cumpleEstado;
    });
  }

  verDetalles(reserva: any): void {
    this.reservaSeleccionada = { ...reserva };
    this.modoEdicion = false;
  }

  activarEdicion(): void {
    this.modoEdicion = true;
  }

  cerrarModal(): void {
    this.reservaSeleccionada = null;
    this.modoEdicion = false;
  }

  guardarCambios(): void {
    if (this.reservaSeleccionada) {
      const index = this.reservas.findIndex(reserva => reserva.id_del_cliente === this.reservaSeleccionada.id_del_cliente);
      if (index > -1) {
        this.reservas[index] = { ...this.reservaSeleccionada };
        this.aplicarFiltros();
      }
      this.cerrarModal();
    }
  }
}