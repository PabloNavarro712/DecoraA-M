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
exports.ExpiredStudentController = void 0;
const common_1 = require("@nestjs/common");
const expiredCall_service_1 = require("../service/expiredCall.service");
let ExpiredStudentController = class ExpiredStudentController {
    constructor(expiredStudentService) {
        this.expiredStudentService = expiredStudentService;
    }
    getDaysUntilNextRun() {
        const daysUntilNextRun = this.expiredStudentService.getDaysUntilNextRun();
        return { daysUntilNextRun };
    }
    async getDaysUntilDelete() {
        return this.expiredStudentService.getDaysUntilDelete();
    }
};
exports.ExpiredStudentController = ExpiredStudentController;
__decorate([
    (0, common_1.Get)('days-until-next-run'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ExpiredStudentController.prototype, "getDaysUntilNextRun", null);
__decorate([
    (0, common_1.Get)('days-until-delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExpiredStudentController.prototype, "getDaysUntilDelete", null);
exports.ExpiredStudentController = ExpiredStudentController = __decorate([
    (0, common_1.Controller)('expired-students'),
    __metadata("design:paramtypes", [expiredCall_service_1.ExpiredStudentService])
], ExpiredStudentController);
//# sourceMappingURL=expiredCall.controller.js.map