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
exports.AboutController = void 0;
const common_1 = require("@nestjs/common");
const about_service_1 = require("../service/about.service");
const about_document_1 = require("../todos/document/about.document");
let AboutController = class AboutController {
    constructor(aboutService) {
        this.aboutService = aboutService;
    }
    async createAboutInfo(data) {
        try {
            const newInfo = await this.aboutService.createAboutInfo(data);
            return newInfo;
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Error al crear la información', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAboutInfo() {
        try {
            const aboutInfo = await this.aboutService.getAboutInfo();
            return aboutInfo;
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Error al obtener la información', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAboutInfoById(id) {
        try {
            const aboutInfo = await this.aboutService.getAboutInfoById(id);
            return aboutInfo;
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Error al obtener la información', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAboutInfoById(id, updateData) {
        try {
            if ((updateData.mission && updateData.mission.trim() === '') ||
                (updateData.vision && updateData.vision.trim() === '') ||
                (updateData.directorName && updateData.directorName.trim() === '')) {
                throw new common_1.BadRequestException('No se permiten campos vacíos');
            }
            const updatedInfo = await this.aboutService.updateAboutInfoById(id, updateData);
            return updatedInfo;
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Error al actualizar la información', details: error.message }, error instanceof common_1.BadRequestException
                ? common_1.HttpStatus.BAD_REQUEST
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteAboutInfoById(id) {
        try {
            return await this.aboutService.deleteAboutInfoById(id);
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Error al eliminar la información',
                details: error.message,
            }, error instanceof common_1.NotFoundException
                ? common_1.HttpStatus.NOT_FOUND
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AboutController = AboutController;
__decorate([
    (0, common_1.Post)('/info'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [about_document_1.AboutDocument]),
    __metadata("design:returntype", Promise)
], AboutController.prototype, "createAboutInfo", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AboutController.prototype, "getAboutInfo", null);
__decorate([
    (0, common_1.Get)('/about/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AboutController.prototype, "getAboutInfoById", null);
__decorate([
    (0, common_1.Put)('/updateInfo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AboutController.prototype, "updateAboutInfoById", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AboutController.prototype, "deleteAboutInfoById", null);
exports.AboutController = AboutController = __decorate([
    (0, common_1.Controller)('api/about'),
    __metadata("design:paramtypes", [about_service_1.AboutService])
], AboutController);
//# sourceMappingURL=about.controller.js.map