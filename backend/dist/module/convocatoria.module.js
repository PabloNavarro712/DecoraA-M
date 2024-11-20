"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvocatoriaModule = void 0;
const common_1 = require("@nestjs/common");
const convocatoria_service_1 = require("../service/convocatoria.service");
const firestore_module_1 = require("../firestore/firestore.module");
const convocatoria_controller_1 = require("../controller/convocatoria.controller");
let ConvocatoriaModule = class ConvocatoriaModule {
};
exports.ConvocatoriaModule = ConvocatoriaModule;
exports.ConvocatoriaModule = ConvocatoriaModule = __decorate([
    (0, common_1.Module)({
        imports: [firestore_module_1.FirestoreModule],
        providers: [convocatoria_service_1.ConvocatoriaService],
        controllers: [convocatoria_controller_1.ConvocatoriaController],
        exports: [convocatoria_service_1.ConvocatoriaService],
    })
], ConvocatoriaModule);
//# sourceMappingURL=convocatoria.module.js.map