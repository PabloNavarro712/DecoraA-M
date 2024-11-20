"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../service/app.service");
const config_1 = require("@nestjs/config");
const firestore_module_1 = require("../firestore/firestore.module");
const convocatoria_module_1 = require("./convocatoria.module");
const aspirante_module_1 = require("./aspirante.module");
const data_student_module_1 = require("./data_student.module");
const studentdoc_module_1 = require("./studentdoc.module");
const generic_service_1 = require("../shared/generic.service");
const about_module_1 = require("../module/about.module");
const admin_module_1 = require("./admin.module");
const expiredCall_module_1 = require("../module/expiredCall.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            firestore_module_1.FirestoreModule.forRoot({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    keyFilename: configService.get('SA_KEY'),
                }),
                inject: [config_1.ConfigService],
            }),
            aspirante_module_1.AspiranteModule,
            convocatoria_module_1.ConvocatoriaModule,
            data_student_module_1.DataStudentModule,
            studentdoc_module_1.StudentDocModule,
            about_module_1.AboutModule,
            admin_module_1.AdminModule,
            expiredCall_module_1.ExpiredCallModule,
        ],
        controllers: [],
        providers: [app_service_1.AppService, generic_service_1.GenericService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map