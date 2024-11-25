"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EventosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventosService = void 0;
const common_1 = require("@nestjs/common");
const generic_service_1 = require("../shared/generic.service");
const eventos_document_1 = require("../todos/document/eventos.document");
const firestore_1 = require("@google-cloud/firestore");
let EventosService = EventosService_1 = class EventosService extends generic_service_1.GenericService {
    constructor() {
        super(eventos_document_1.EventosDocument.collectionName);
        this.logger = new common_1.Logger(EventosService_1.name);
        this.firestore = new firestore_1.Firestore();
    }
    async getFechasEventosPendientesYAceptados() {
        try {
            const snapshot = await this.firestore
                .collection(this.collectionName)
                .where('estado', 'in', ['aceptado', 'pendiente'])
                .get();
            return snapshot.docs.map((doc) => {
                const data = doc.data();
                const fechaEvento = data.fechaEvento;
                return fechaEvento.toDate().toISOString();
            });
        }
        catch (error) {
            this.logger.error(`Error al obtener fechas de eventos: ${error.message}`);
            throw error;
        }
    }
    async getEventosByEstado(estado) {
        try {
            const snapshot = await this.firestore
                .collection(this.collectionName)
                .where('estado', '==', estado)
                .get();
            return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        }
        catch (error) {
            this.logger.error(`Error al obtener eventos por estado: ${error.message}`);
            throw error;
        }
    }
    async getEventosProximos(fechaBase) {
        try {
            const fechaInicio = new Date(fechaBase);
            const fechaFin = new Date(fechaBase);
            fechaFin.setDate(fechaInicio.getDate() + 7);
            const snapshot = await this.firestore
                .collection(this.collectionName)
                .where('fechaEvento', '>=', fechaInicio)
                .where('fechaEvento', '<=', fechaFin)
                .get();
            return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        }
        catch (error) {
            this.logger.error(`Error al obtener eventos próximos: ${error.message}`);
            throw error;
        }
    }
    async getEventosByCliente(idCliente) {
        try {
            const snapshot = await this.firestore
                .collection(this.collectionName)
                .where('idCliente', '==', idCliente)
                .get();
            return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        }
        catch (error) {
            this.logger.error(`Error al obtener eventos por ID del cliente: ${error.message}`);
            throw error;
        }
    }
};
exports.EventosService = EventosService;
exports.EventosService = EventosService = EventosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EventosService);
//# sourceMappingURL=eventos.service.js.map