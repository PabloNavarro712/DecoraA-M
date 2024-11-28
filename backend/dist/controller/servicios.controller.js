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
exports.ServiciosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const servicios_service_1 = require("../service/servicios.service");
const servicios_document_1 = require("../todos/document/servicios.document");
const generic_controller_1 = require("../shared/generic.controller");
const endpoint = 'api/servicios';
const GenericServiciosController = (0, generic_controller_1.createGenericController)(servicios_document_1.ServiciosDocument.collectionName, endpoint);
let ServiciosController = class ServiciosController extends GenericServiciosController {
    constructor(serviciosService) {
        super();
        this.serviciosService = serviciosService;
    }
    async createService(body, image) {
        if (!image) {
            throw new common_1.BadRequestException('La imagen es obligatoria.');
        }
        const { buffer, originalname, mimetype } = image;
        return this.serviciosService.createService(body.titulo, body.descripcion, body.categoria, buffer, originalname, mimetype);
    }
    async updateImageDocument(id, updateData, newImage) {
        if (!newImage) {
            throw new common_1.BadRequestException('La nueva imagen es obligatoria.');
        }
        const { buffer, originalname, mimetype } = newImage;
        await this.serviciosService.updateImageDocument(id, updateData, buffer, originalname, mimetype);
    }
    async deleteService(id) {
        await this.serviciosService.deleteService(id);
    }
    async getServiciosPaginated(page = 1, categoria) {
        try {
            const servicios = await this.serviciosService.getServiciosPaginated(page, categoria);
            return servicios;
        }
        catch (error) {
            throw new common_1.HttpException({ message: error.message }, error instanceof common_1.HttpException
                ? error.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ServiciosController = ServiciosController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServiciosController.prototype, "createService", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('newImage')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ServiciosController.prototype, "updateImageDocument", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiciosController.prototype, "deleteService", null);
__decorate([
    (0, common_1.Get)('/services'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('categoria')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ServiciosController.prototype, "getServiciosPaginated", null);
exports.ServiciosController = ServiciosController = __decorate([
    (0, common_1.Controller)(endpoint),
    __metadata("design:paramtypes", [servicios_service_1.ServiciosService])
], ServiciosController);
//# sourceMappingURL=servicios.controller.js.map