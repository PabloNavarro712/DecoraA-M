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
exports.DataStudentController = void 0;
const common_1 = require("@nestjs/common");
const data_student_service_1 = require("../service/data_student.service");
const data_student_document_1 = require("../todos/document/data_student.document");
const generic_controller_1 = require("../shared/generic.controller");
const endpoint = 'api/datastudents';
const GenericStudentDocController = (0, generic_controller_1.createGenericController)(data_student_document_1.DataStudent.collectionName, endpoint);
let DataStudentController = class DataStudentController extends GenericStudentDocController {
    constructor(dataStudentService) {
        super();
        this.dataStudentService = dataStudentService;
    }
    async getByAspiranteId(aspiranteId) {
        try {
            const dataStudent = await this.dataStudentService.findByAspiranteId(aspiranteId);
            if (!dataStudent) {
                throw new common_1.HttpException('DataStudent no encontrado', common_1.HttpStatus.NOT_FOUND);
            }
            return dataStudent;
        }
        catch (error) {
            throw new common_1.HttpException({ message: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.DataStudentController = DataStudentController;
__decorate([
    (0, common_1.Get)('/aspirante/:aspiranteId'),
    __param(0, (0, common_1.Param)('aspiranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataStudentController.prototype, "getByAspiranteId", null);
exports.DataStudentController = DataStudentController = __decorate([
    (0, common_1.Controller)(endpoint),
    __metadata("design:paramtypes", [data_student_service_1.DataStudentService])
], DataStudentController);
//# sourceMappingURL=data_student.controller.js.map