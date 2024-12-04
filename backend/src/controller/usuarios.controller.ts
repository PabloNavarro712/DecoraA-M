import {
  Controller,
  Post,
  Body,
  Logger,
  BadRequestException,
} from '@nestjs/common';

import { UsuariosService } from '../service/usuarios.service';
import { UsuariosDocument } from 'src/todos/document/usuarios.document';
import { createGenericController } from 'src/shared/generic.controller';

// Crear el controlador genérico para 'studentDocs'
const endpoint = 'api/usuarios';

// Crear el controlador genérico para 'studentDocs'
const GenericUsuariosController = createGenericController<UsuariosDocument>(
  UsuariosDocument.collectionName,

  endpoint,
);

@Controller(endpoint)
export class UsuariosController extends GenericUsuariosController {
  private readonly logger = new Logger(UsuariosController.name);
  constructor(private readonly usuariosService: UsuariosService) {
    super(); // Llama al constructor del controlador genérico
  }

  @Post('/crear')
  async crearUsuario(@Body() usuario: UsuariosDocument) {
    try {
      return await this.usuariosService.verificarYCrearUsuario(usuario);
    } catch (error) {
      this.logger.error(`Error al crear usuario: ${error.message}`);
      if (error instanceof BadRequestException) {
        return { message: error.message };
      }
      throw error;
    }
  }
}
