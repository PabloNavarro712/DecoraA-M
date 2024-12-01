
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
    tipoEvento!: string; // Tipo de evento
    horaEvento!: string; // Hora del evento
    fechaEvento!: Date; // Fecha del evento
    estado!:'aceptado' | 'reechazado' | 'pendiente' | 'cancelado';
    precio_final!:number;
    adiciones!:Adiciones[]; 


    constructor(partial: Partial<IEvento>) {
    Object.assign(this, partial);
  }
}