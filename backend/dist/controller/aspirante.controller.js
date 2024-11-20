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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AspiranteController = void 0;
const common_1 = require("@nestjs/common");
const aspirante_service_1 = require("../service/aspirante.service");
const aspirante_document_1 = require("../todos/document/aspirante.document");
const jwt = require("jsonwebtoken");
let AspiranteController = class AspiranteController {
    constructor(aspiranteService) {
        this.aspiranteService = aspiranteService;
    }
    async create(aspirante) {
        try {
            const newAspirante = await this.aspiranteService.createAspirante(aspirante);
            return { message: 'Aspirante creado con éxito', aspirante: newAspirante };
        }
        catch (error) {
            if (error.message === 'El CURP ya está registrado') {
                throw new common_1.HttpException({ message: 'Error creando el aspirante', details: 'El CURP ya está registrado' }, common_1.HttpStatus.CONFLICT);
            }
            if (error.message === 'El correo electrónico ya está registrado') {
                throw new common_1.HttpException({ message: 'Error creando el aspirante', details: 'El correo electrónico ya está registrado' }, common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException({ message: 'Error interno del servidor', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(credentials) {
        const { correo, curp } = credentials;
        try {
            const result = await this.aspiranteService.authenticate(correo, curp);
            const token = jwt.sign({ sub: result.nombresCompletos, esAdministrador: result.esAdministrador }, 'mi-llave-secreta', { expiresIn: '1h' });
            return {
                message: 'Inicio de sesión exitoso',
                token,
                id: result.id,
                nombresCompletos: result.nombresCompletos,
                esAdministrador: result.esAdministrador
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw new common_1.HttpException({ message: error.message }, common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException({ message: 'Error interno del servidor', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAll() {
        try {
            const aspirantes = await this.aspiranteService.getAllAspirantes();
            return { aspirantes };
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Error obteniendo aspirantes', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id) {
        try {
            const aspirante = await this.aspiranteService.getAspiranteById(id);
            return { aspirante };
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Error obteniendo aspirante', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, aspiranteDto) {
        try {
            await this.aspiranteService.updateAspirante(id, aspiranteDto);
            return { message: 'Aspirante actualizado exitosamente' };
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Error actualizando aspirante', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            await this.aspiranteService.deleteAspirante(id);
            return { message: 'Aspirante eliminado exitosamente' };
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Error eliminando aspirante', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getByCurp(curp) {
        try {
            const aspiranteId = await this.aspiranteService.getAspiranteByCurp(curp);
            return { aspiranteId };
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Error obteniendo aspirante por CURP', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AspiranteController = AspiranteController;
__decorate([
    (0, common_1.Post)('crearAspirante'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aspirante_document_1.AspiranteDocument]),
    __metadata("design:returntype", Promise)
], AspiranteController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AspiranteController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('obtenerAspirantes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AspiranteController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('obtenerAspirante/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AspiranteController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)('actualizarAspirante/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AspiranteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('eliminarAspirante/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AspiranteController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('obtenerAspirantePorCurp/:curp'),
    __param(0, (0, common_1.Param)('curp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AspiranteController.prototype, "getByCurp", null);
exports.AspiranteController = AspiranteController = __decorate([
    (0, common_1.Controller)('api/aspirante/'),
    __metadata("design:paramtypes", [aspirante_service_1.AspiranteService])
], AspiranteController);
//# sourceMappingURL=aspirante.controller.js.map