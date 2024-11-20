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
exports.AspiranteService = void 0;
const common_1 = require("@nestjs/common");
const firestore_1 = require("@google-cloud/firestore");
const aspirante_document_1 = require("../todos/document/aspirante.document");
const convocatoria_service_1 = require("./convocatoria.service");
let AspiranteService = class AspiranteService {
    constructor(convocatoriaService) {
        this.convocatoriaService = convocatoriaService;
        this.firestore = new firestore_1.Firestore();
    }
    async checkDuplicates(curp, correo) {
        const snapshot = await this.firestore.collection('aspirantes')
            .where('curp', '==', curp)
            .where('correo', '==', correo)
            .get();
        return !snapshot.empty;
    }
    async createAspirante(aspirante) {
        try {
            const aspirantesCollection = this.firestore.collection(aspirante_document_1.AspiranteDocument.collectionName);
            const existingCurpQuerySnapshot = await aspirantesCollection.where('curp', '==', aspirante.curp).get();
            if (!existingCurpQuerySnapshot.empty) {
                throw new common_1.ConflictException('El CURP ya está registrado.');
            }
            const existingCorreoQuerySnapshot = await aspirantesCollection.where('correo', '==', aspirante.correo).get();
            if (!existingCorreoQuerySnapshot.empty) {
                throw new common_1.ConflictException('El correo electrónico ya está registrado.');
            }
            const convocatoriaAbierta = await this.convocatoriaService.getCurrentConvocatoria();
            if (convocatoriaAbierta.availableCupo <= 0) {
                throw new common_1.HttpException('No quedan cupos disponibles en la convocatoria.', common_1.HttpStatus.BAD_REQUEST);
            }
            const docRef = aspirantesCollection.doc();
            const id = docRef.id;
            const newAspirante = {
                ...aspirante,
                id,
                convocatoriaId: convocatoriaAbierta.id,
            };
            await docRef.set(newAspirante);
            await this.convocatoriaService.updateCuposOnInscription(convocatoriaAbierta.id, convocatoriaAbierta.cupo - 1, convocatoriaAbierta.availableCupo - 1, (convocatoriaAbierta.occupiedCupo || 0) + 1);
            return newAspirante;
        }
        catch (error) {
            console.error('Error al crear el aspirante:', error.message);
            throw error;
        }
    }
    async authenticate(correo, curp) {
        const snapshot = await this.firestore.collection('Aspirantes')
            .where('correo', '==', correo)
            .where('curp', '==', curp)
            .get();
        if (snapshot.empty) {
            throw new common_1.ConflictException('Usuario no encontrado o credenciales incorrectas');
        }
        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();
        return {
            id: userDoc.id,
            nombresCompletos: userData.nombresCompletos,
            esAdministrador: userData.esAdministrador || false
        };
    }
    async getAllAspirantes() {
        const snapshot = await this.firestore.collection('Aspirantes').get();
        if (snapshot.empty) {
            throw new common_1.HttpException('No se encontraron aspirantes', common_1.HttpStatus.NOT_FOUND);
        }
        const aspirantes = [];
        snapshot.forEach(doc => {
            aspirantes.push(doc.data());
        });
        return aspirantes;
    }
    async getAspiranteById(id) {
        const doc = await this.firestore.collection('Aspirantes').doc(id).get();
        if (!doc.exists) {
            throw new common_1.HttpException('Aspirante no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        return doc.data();
    }
    async updateAspirante(id, aspiranteDto) {
        const docRef = this.firestore.collection('Aspirantes').doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            throw new common_1.HttpException('Aspirante no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        await docRef.update(aspiranteDto);
    }
    async deleteAspirante(id) {
        const docRef = this.firestore.collection('Aspirantes').doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            throw new common_1.HttpException('Aspirante no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        const aspirante = doc.data();
        const convocatoriaId = aspirante.convocatoriaId;
        await docRef.delete();
        const convocatoria = await this.convocatoriaService.getById(convocatoriaId);
        if (convocatoria) {
            const newAvailableCupo = convocatoria.availableCupo + 1;
            const newCupo = convocatoria.cupo + 1;
            const newOccupiedCupo = Math.max((convocatoria.occupiedCupo || 0) - 1, 0);
            await this.convocatoriaService.updateCuposOnDeletion(convocatoriaId, newCupo, newAvailableCupo, newOccupiedCupo);
        }
    }
    async getAspiranteByCurp(curp) {
        console.log(`Buscando aspirante con CURP: ${curp}`);
        const snapshot = await this.firestore.collection('Aspirantes')
            .where('curp', '==', curp)
            .get();
        if (snapshot.empty) {
            throw new common_1.HttpException('Aspirante no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        const aspiranteDoc = snapshot.docs[0];
        return aspiranteDoc.id;
    }
};
exports.AspiranteService = AspiranteService;
exports.AspiranteService = AspiranteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [convocatoria_service_1.ConvocatoriaService])
], AspiranteService);
//# sourceMappingURL=aspirante.service.js.map