import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GenericService } from '../shared/generic.service';
import { UsuariosDocument } from '../todos/document/usuarios.document';
import { Firestore } from '@google-cloud/firestore';

@Injectable()
export class UsuariosService extends GenericService<UsuariosDocument> {
  private readonly logger = new Logger(UsuariosService.name);
  constructor() {
    super(UsuariosDocument.collectionName);
    this.firestore = new Firestore();
  }
  async verificarYCrearUsuario(
    usuario: UsuariosDocument,
  ): Promise<{ message: string }> {
    try {
      const usuariosRef = this.firestore.collection(
        UsuariosDocument.collectionName,
      );

      // Verificar si el usuario ya existe
      const usuarioSnapshot = await usuariosRef
        .where('usuario', '==', usuario.usuario)
        .get();
      if (!usuarioSnapshot.empty) {
        throw new BadRequestException('El usuario ya existe.');
      }

      // Verificar si el correo ya existe
      const correoSnapshot = await usuariosRef
        .where('correo', '==', usuario.correo)
        .get();
      if (!correoSnapshot.empty) {
        throw new BadRequestException('El correo ya está registrado.');
      }

      // Crear el usuario si no hay conflictos
      await usuariosRef.add({ ...usuario });
      return { message: 'Usuario creado exitosamente.' }; // Devuelve el objeto con el mensaje
    } catch (error) {
      this.logger.error(`Error al crear usuario: ${error.message}`);
      throw error; // Mantener el error para que el controlador lo maneje
    }
  }
  async getUsuariosPaginated(
    page: number,
    nombreCompleto?: string,
  ): Promise<UsuariosDocument[]> {
    try {
      const limit = 20; // Límite de documentos por página

      // Crear consulta paginada
      let query = this.firestore
        .collection(UsuariosDocument.collectionName)
        .orderBy('id', 'desc') // Asegúrate de tener un campo "id" o similar para ordenar
        .offset((page - 1) * limit)
        .limit(limit);

      if (nombreCompleto) {
        query = query.where('nombreCompleto', '==', nombreCompleto);
      }
      const snapshot = await query.get();

      if (snapshot.empty) {
        this.logger.warn(`No se encontraron usuarios para la página ${page}.`);
        throw new NotFoundException('No se encontraron usuarios.');
      }

      const usuarios: UsuariosDocument[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as UsuariosDocument;
        usuarios.push(data);
      });

      return usuarios;
    } catch (error) {
      this.logger.error(
        `Error al obtener usuarios paginados: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al procesar la solicitud.');
    }
  }
  async updateUsuarioBloqueado(
    id: string,
    bloqueado: boolean,
  ): Promise<{ message: string }> {
    try {
      const usuarioRef = this.firestore
        .collection(UsuariosDocument.collectionName)
        .doc(id);

      const usuarioDoc = await usuarioRef.get();

      if (!usuarioDoc.exists) {
        throw new BadRequestException('El usuario no existe.');
      }

      await usuarioRef.update({ bloqueado });

      return {
        message: `La propiedad "bloqueado" ha sido actualizada a ${bloqueado}.`,
      };
    } catch (error) {
      this.logger.error(
        `Error al actualizar la propiedad "bloqueado": ${error.message}`,
      );
      throw error;
    }
  }
}
