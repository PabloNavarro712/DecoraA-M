"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStudentModule = void 0;
const common_1 = require("@nestjs/common");
const data_student_service_1 = require("../service/data_student.service");
const firestore_module_1 = require("../firestore/firestore.module");
const data_student_controller_1 = require("../controller/data_student.controller");
let DataStudentModule = class DataStudentModule {
};
exports.DataStudentModule = DataStudentModule;
exports.DataStudentModule = DataStudentModule = __decorate([
    (0, common_1.Module)({
        imports: [firestore_module_1.FirestoreModule],
        providers: [data_student_service_1.DataStudentService],
        controllers: [data_student_controller_1.DataStudentController],
    })
], DataStudentModule);
//# sourceMappingURL=data_student.module.js.map