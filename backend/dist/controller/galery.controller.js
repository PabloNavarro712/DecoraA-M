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
exports.GaleriaController = void 0;
const common_1 = require("@nestjs/common");
const galery_service_1 = require("../service/galery.service");
const galery_document_1 = require("../todos/document/galery.document");
const platform_express_1 = require("@nestjs/platform-express");
const generic_controller_1 = require("../shared/generic.controller");
const endpoint = 'api/galeria-prueba';
const GenericGController = (0, generic_controller_1.createGenericController)(galery_document_1.GaleriaDocument.collectionName, endpoint);
let GaleriaController = class GaleriaController extends GenericGController {
    constructor(galeriaService) {
        super();
        this.galeriaService = galeriaService;
    }
    async createGallery(file, categoria, descripcion) {
        if (!file) {
            throw new common_1.BadRequestException('El archivo de imagen es necesario.');
        }
        if (!categoria || !descripcion) {
            throw new common_1.BadRequestException('Los campos categoria y descripcion son necesarios.');
        }
        const validMimeTypes = ['image/jpeg', 'image/png'];
        if (!validMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('El tipo de archivo debe ser JPEG o PNG.');
        }
        const imageBuffer = file.buffer;
        const imageName = file.originalname;
        const contentType = file.mimetype;
        return await this.galeriaService.createGallery(categoria, descripcion, imageBuffer, imageName, contentType);
    }
    async getByCategory(categoria) {
        if (!categoria) {
            throw new common_1.BadRequestException('La categoría es un parámetro necesario.');
        }
        return await this.galeriaService.getImagesByCategory(categoria);
    }
    async updateImageDocument(id, updateData) {
        if (!id || !id.trim()) {
            throw new common_1.BadRequestException('El ID es obligatorio en la ruta.');
        }
        await this.galeriaService.updateImageDocument(id, updateData);
    }
    async deleteImage(id) {
        if (!id || !id.trim()) {
            throw new common_1.BadRequestException('El ID es obligatorio en la ruta.');
        }
        await this.galeriaService.deleteImageById(id);
    }
};
exports.GaleriaController = GaleriaController;
__decorate([
    (0, common_1.Post)('/crear'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('categoria')),
    __param(2, (0, common_1.Body)('descripcion')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], GaleriaController.prototype, "createGallery", null);
__decorate([
    (0, common_1.Get)('/buscar/:categoria'),
    __param(0, (0, common_1.Param)('categoria')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GaleriaController.prototype, "getByCategory", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GaleriaController.prototype, "updateImageDocument", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GaleriaController.prototype, "deleteImage", null);
exports.GaleriaController = GaleriaController = __decorate([
    (0, common_1.Controller)(endpoint),
    __metadata("design:paramtypes", [galery_service_1.GaleriaService])
], GaleriaController);
//# sourceMappingURL=galery.controller.js.map