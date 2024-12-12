import { Injectable, Logger, BadRequestException } from '@nestjs/common';
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
}
