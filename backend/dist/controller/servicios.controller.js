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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiciosController = void 0;
const common_1 = require("@nestjs/common");
const servicios_service_1 = require("../service/servicios.service");
const servicios_document_1 = require("../todos/document/servicios.document");
const generic_controller_1 = require("../shared/generic.controller");
const endpoint = 'api/servicios';
const GenericServiciosController = (0, generic_controller_1.createGenericController)(servicios_document_1.ServiciosDocument.collectionName, endpoint);
let ServiciosController = class ServiciosController extends GenericServiciosController {
    constructor(studentdocService) {
        super();
        this.studentdocService = studentdocService;
    }
};
exports.ServiciosController = ServiciosController;
exports.ServiciosController = ServiciosController = __decorate([
    (0, common_1.Controller)(endpoint),
    __metadata("design:paramtypes", [servicios_service_1.ServiciosService])
], ServiciosController);
//# sourceMappingURL=servicios.controller.js.map