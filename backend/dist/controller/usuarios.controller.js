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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("../service/usuarios.service");
const usuarios_document_1 = require("../todos/document/usuarios.document");
const generic_controller_1 = require("../shared/generic.controller");
const endpoint = 'api/usuarios';
const GenericUsuariosController = (0, generic_controller_1.createGenericController)(usuarios_document_1.UsuariosDocument.collectionName, endpoint);
let UsuariosController = class UsuariosController extends GenericUsuariosController {
    constructor(studentdocService) {
        super();
        this.studentdocService = studentdocService;
    }
};
exports.UsuariosController = UsuariosController;
exports.UsuariosController = UsuariosController = __decorate([
    (0, common_1.Controller)(endpoint),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map