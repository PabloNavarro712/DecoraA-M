"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AspiranteModule = void 0;
const common_1 = require("@nestjs/common");
const firestore_module_1 = require("../firestore/firestore.module");
const aspirante_service_1 = require("../service/aspirante.service");
const aspirante_controller_1 = require("../controller/aspirante.controller");
const convocatoria_module_1 = require("./convocatoria.module");
let AspiranteModule = class AspiranteModule {
};
exports.AspiranteModule = AspiranteModule;
exports.AspiranteModule = AspiranteModule = __decorate([
    (0, common_1.Module)({
        imports: [firestore_module_1.FirestoreModule, convocatoria_module_1.ConvocatoriaModule],
        controllers: [aspirante_controller_1.AspiranteController],
        providers: [aspirante_service_1.AspiranteService],
    })
], AspiranteModule);
//# sourceMappingURL=aspirante.module.js.map