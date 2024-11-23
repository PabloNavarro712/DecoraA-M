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
var ServiciosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiciosService = void 0;
const common_1 = require("@nestjs/common");
const generic_service_1 = require("../shared/generic.service");
const servicios_document_1 = require("../todos/document/servicios.document");
const firestore_1 = require("@google-cloud/firestore");
let ServiciosService = ServiciosService_1 = class ServiciosService extends generic_service_1.GenericService {
    constructor() {
        super(servicios_document_1.ServiciosDocument.collectionName);
        this.logger = new common_1.Logger(ServiciosService_1.name);
        this.firestore = new firestore_1.Firestore();
    }
};
exports.ServiciosService = ServiciosService;
exports.ServiciosService = ServiciosService = ServiciosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ServiciosService);
//# sourceMappingURL=servicios.service.js.map