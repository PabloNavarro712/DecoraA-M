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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsuariosController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("../service/usuarios.service");
const usuarios_document_1 = require("../todos/document/usuarios.document");
const generic_controller_1 = require("../shared/generic.controller");
const endpoint = 'api/usuarios';
const GenericUsuariosController = (0, generic_controller_1.createGenericController)(usuarios_document_1.UsuariosDocument.collectionName, endpoint);
let UsuariosController = UsuariosController_1 = class UsuariosController extends GenericUsuariosController {
    constructor(usuariosService) {
        super();
        this.usuariosService = usuariosService;
        this.logger = new common_1.Logger(UsuariosController_1.name);
    }
    async crearUsuario(usuario) {
        try {
            return await this.usuariosService.verificarYCrearUsuario(usuario);
        }
        catch (error) {
            this.logger.error(`Error al crear usuario: ${error.message}`);
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.HttpException({ message: error.message }, common_1.HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }
    async getUsuariosPaginated(page = 1, nombreCompleto) {
        try {
            const usuarios = await this.usuariosService.getUsuariosPaginated(page, nombreCompleto);
            return usuarios;
        }
        catch (error) {
            throw new common_1.HttpException({ message: error.message }, error instanceof common_1.HttpException
                ? error.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUsuarioBloqueado(id, bloqueado) {
        try {
            if (typeof bloqueado !== 'boolean') {
                throw new common_1.BadRequestException('El valor de "bloqueado" debe ser un booleano.');
            }
            return await this.usuariosService.updateUsuarioBloqueado(id, bloqueado);
        }
        catch (error) {
            this.logger.error(`Error al actualizar la propiedad "bloqueado": ${error.message}`);
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.HttpException({ message: error.message }, common_1.HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }
    async login(usuario, contrasena) {
        try {
            return await this.usuariosService.login(usuario, contrasena);
        }
        catch (error) {
            this.logger.error(`Error en el endpoint login: ${error.message}`);
            throw error;
        }
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, common_1.Post)('/crear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuarios_document_1.UsuariosDocument]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "crearUsuario", null);
__decorate([
    (0, common_1.Get)('/paginados'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('nombreCompleto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "getUsuariosPaginated", null);
__decorate([
    (0, common_1.Patch)('/:id/bloqueado'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('bloqueado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "updateUsuarioBloqueado", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)('usuario')),
    __param(1, (0, common_1.Body)('contrasena')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "login", null);
exports.UsuariosController = UsuariosController = UsuariosController_1 = __decorate([
    (0, common_1.Controller)(endpoint),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map