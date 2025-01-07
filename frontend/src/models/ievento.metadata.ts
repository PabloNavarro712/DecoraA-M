
import { IBaseModel } from 'src/app/shared/base-model';

export interface Adiciones {
    nombre: string;
    precio: number;
  }

export class IEvento implements IBaseModel {
    id?: string;
    idServicio?: string; // id del servicio
    idCliente!: string;
    nombre!: string;
    contacto!:string;
    correoElectronico!: string; // Correo electrónico
    fechaHoraReserva!: Date; // Fecha y hora de la reserva
    ubicacionEvento!: string; // Ubicación del evento
    mes!: string;
    anio!: string;
    tipoEvento!: string; // Tipo de evento
    horaEvento!: string; // Hora del evento
    fechaEvento!: string; // Fecha del evento
    estado!:'aceptado' | 'reechazado' | 'pendiente' | 'cancelado';
    precio_final!:number;
    adiciones!:Adiciones[]; 
    solicitud_cancelar!: boolean;
    reagendar!: boolean;
    Motivo!: string;
    Respuesta!: string;
    nvfecha?: Date;
    constructor(partial: Partial<IEvento>) {
    Object.assign(this, partial);
  }
}