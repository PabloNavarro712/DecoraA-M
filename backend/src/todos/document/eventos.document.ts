export class EventosDocument {
  static collectionName = 'eventos';
  id: string;
  idServicio: string; // id del servicio
  idCliente: string;
  nombre: string;
  contacto: string;
  correoElectronico: string; // Correo electrónico
  fechaHoraReserva: Date; // Fecha y hora de la reserva
  ubicacionEvento: string; // Ubicación del evento
  tipoEvento: string; // Tipo de evento
  horaEvento: string; // Hora del evento
  fechaEvento: Date; // Fecha del evento
  mes!: string;
  anio!: string;
  estado: 'aceptado' | 'reechazado' | 'pendiente' | 'cancelado';
  precio_final: number;
  adiciones: {
    nombre: string;
    precio: number;
  }[];
  solicitud_cancelar?: boolean;
  reagendar?: boolean;
  nvfecha?: Date;
  Motivo?: string;
  Respuesta?: string;
  constructor(partial: Partial<EventosDocument>) {
    Object.assign(this, partial);
  }
}
