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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const firestore_1 = require("@google-cloud/firestore");
const convocatoria_service_1 = require("./convocatoria.service");
const studentdoc_service_1 = require("../service/studentdoc.service");
const aspirante_service_1 = require("./aspirante.service");
let AdminService = class AdminService {
    constructor(convocatoriaService, aspiranteService, studentDocService) {
        this.convocatoriaService = convocatoriaService;
        this.aspiranteService = aspiranteService;
        this.studentDocService = studentDocService;
        this.firestore = new firestore_1.Firestore();
    }
    async getDashboardData() {
        try {
            const adminSnapshot = await this.firestore
                .collection('Aspirantes')
                .where('esAdministrador', '==', true)
                .limit(1)
                .get();
            if (adminSnapshot.empty) {
                throw new common_1.HttpException('No se encontró administrador', common_1.HttpStatus.NOT_FOUND);
            }
            const adminData = adminSnapshot.docs[0].data();
            const adminName = adminData.nombresCompletos;
            const convocatoria = await this.convocatoriaService.getCurrentConvocatoria();
            const studentDocsSnapshot = await this.firestore.collection('StudentDocDocument').get();
            const aspirantes = studentDocsSnapshot.docs;
            let totalAspirantes = 0;
            let aspirantesInscritos = 0;
            let aspirantesNoInscritos = 0;
            let aspirantesConDocumentosCompletos = 0;
            let aspirantesConDocumentosPendientes = 0;
            for (const doc of aspirantes) {
                const data = doc.data();
                if (!data.esAdministrador || data.esAdministrador === false) {
                    totalAspirantes++;
                    if (data.enrollmentStatus === true) {
                        aspirantesInscritos++;
                        const documentos = data.Documents || [];
                        const allApproved = documentos.length === 12 && documentos.every(d => d.status === 'approved');
                        if (allApproved) {
                            aspirantesConDocumentosCompletos++;
                        }
                        else {
                            aspirantesConDocumentosPendientes++;
                        }
                    }
                    else {
                        aspirantesNoInscritos++;
                    }
                }
            }
            const plazasOcupadas = convocatoria.occupiedCupo || 0;
            const plazasDisponibles = convocatoria.availableCupo || 0;
            const cupoTotal = plazasOcupadas + plazasDisponibles;
            return {
                adminName,
                alumnos: {
                    total: totalAspirantes,
                    inscritos: aspirantesInscritos,
                    porInscribirse: aspirantesNoInscritos,
                },
                documentos: {
                    porInscribirse: aspirantesNoInscritos,
                    completos: aspirantesConDocumentosCompletos,
                    pendientes: aspirantesNoInscritos,
                },
                albergue: {
                    cupoTotal,
                    plazasOcupadas,
                    plazasDisponibles,
                },
            };
        }
        catch (error) {
            console.error('Error al obtener datos del tablero:', error.message);
            throw new common_1.HttpException({ message: 'Error al obtener datos del tablero', details: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [convocatoria_service_1.ConvocatoriaService,
        aspirante_service_1.AspiranteService,
        studentdoc_service_1.StudenDocService])
], AdminService);
//# sourceMappingURL=admin.service.js.map