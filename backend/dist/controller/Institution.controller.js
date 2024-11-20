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
exports.InstitutionController = void 0;
const common_1 = require("@nestjs/common");
const institution_service_1 = require("../service/institution.service");
let InstitutionController = class InstitutionController {
    constructor(institutionsService) {
        this.institutionsService = institutionsService;
    }
    async createNewInstitution(newInstitution) {
        const institution = await this.institutionsService.createInstitution(newInstitution);
        return { message: 'Institución creada con éxito' };
    }
    async getAllInstitutions() {
        const institution = await this.institutionsService.getAllInstitutions();
        return institution;
    }
    async getInstitutionById(institutionId) {
        const institution = await this.institutionsService.getInstitutionById(institutionId);
        return institution;
    }
    async deleteInstitutionById(institutionId) {
        await this.institutionsService.deleteInstitutionById(institutionId);
        return { message: 'Institución eliminada con éxito' };
    }
    async updateInstitution(institutionId, updatedInstitution) {
        const updatedInstitutionName = await this.institutionsService.updateInstitutionName(institutionId, updatedInstitution);
        return { message: 'Institución actualizada con éxito' };
    }
};
exports.InstitutionController = InstitutionController;
__decorate([
    (0, common_1.Post)('/api/createInstitution'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstitutionController.prototype, "createNewInstitution", null);
__decorate([
    (0, common_1.Get)('/api/institutions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstitutionController.prototype, "getAllInstitutions", null);
__decorate([
    (0, common_1.Get)('/api/institution/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstitutionController.prototype, "getInstitutionById", null);
__decorate([
    (0, common_1.Delete)('/api/deleteInstitution/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstitutionController.prototype, "deleteInstitutionById", null);
__decorate([
    (0, common_1.Put)('/api/updateInstitution/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InstitutionController.prototype, "updateInstitution", null);
exports.InstitutionController = InstitutionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [institution_service_1.InstitutionService])
], InstitutionController);
//# sourceMappingURL=Institution.controller.js.map