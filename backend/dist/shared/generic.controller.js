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
exports.createGenericController = createGenericController;
const common_1 = require("@nestjs/common");
const generic_service_1 = require("./generic.service");
function createGenericController(collectionName, endpoint) {
    let GenericController = class GenericController {
        constructor() {
            this.genericService = new generic_service_1.GenericService(collectionName);
        }
        async findAll() {
            try {
                return await this.genericService.findAll();
            }
            catch (error) {
                throw new common_1.HttpException('Error retrieving data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async findById(id) {
            try {
                const item = await this.genericService.findById(id);
                if (!item) {
                    throw new common_1.HttpException('Item not found', common_1.HttpStatus.NOT_FOUND);
                }
                return item;
            }
            catch (error) {
                if (error.message === 'Documento no encontrado') {
                    throw new common_1.HttpException('Item not found', common_1.HttpStatus.NOT_FOUND);
                }
                throw new common_1.HttpException('Error retrieving item', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async create(data) {
            try {
                return await this.genericService.create(data);
            }
            catch (error) {
                throw new common_1.HttpException('Error creating item', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async update(id, data) {
            try {
                await this.genericService.update(id, data);
            }
            catch (error) {
                if (error.message.includes('No document to update')) {
                    throw new common_1.HttpException('Item not found', common_1.HttpStatus.NOT_FOUND);
                }
                throw new common_1.HttpException('Error updating item', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async delete(id) {
            try {
                await this.genericService.delete(id);
            }
            catch (error) {
                if (error.message.includes('No document to delete')) {
                    throw new common_1.HttpException('Item not found', common_1.HttpStatus.NOT_FOUND);
                }
                throw new common_1.HttpException('Error deleting item', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    };
    __decorate([
        (0, common_1.Get)('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], GenericController.prototype, "findAll", null);
    __decorate([
        (0, common_1.Get)('/:id'),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], GenericController.prototype, "findById", null);
    __decorate([
        (0, common_1.Post)('/'),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], GenericController.prototype, "create", null);
    __decorate([
        (0, common_1.Put)('/:id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], GenericController.prototype, "update", null);
    __decorate([
        (0, common_1.Delete)('/:id'),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], GenericController.prototype, "delete", null);
    GenericController = __decorate([
        (0, common_1.Controller)(endpoint),
        __metadata("design:paramtypes", [])
    ], GenericController);
    return GenericController;
}
//# sourceMappingURL=generic.controller.js.map