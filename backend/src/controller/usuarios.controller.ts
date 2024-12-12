import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Logger,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { UsuariosService } from '../service/usuarios.service';
import { UsuariosDocument } from 'src/todos/document/usuarios.document';
import { createGenericController } from 'src/shared/generic.controller';

// Crear el controlador genérico para 'studentDocs'
const endpoint = 'api/usuarios';
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
        // Retornar un BadRequest con el mensaje
        throw new HttpException(
          { message: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
      // Rethrow other errors
      throw error;
    }
  }
  @Get('/paginados')
  async getUsuariosPaginated(
    @Query('page') page: number = 1,
    @Query('nombreCompleto') nombreCompleto?: string,
  ) {
    try {
      const usuarios = await this.usuariosService.getUsuariosPaginated(
        page,
        nombreCompleto,
      );
      return usuarios;
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Patch('/:id/bloqueado')
  async updateUsuarioBloqueado(
    @Param('id') id: string,
    @Body('bloqueado') bloqueado: boolean,
  ) {
    try {
      if (typeof bloqueado !== 'boolean') {
        throw new BadRequestException(
          'El valor de "bloqueado" debe ser un booleano.',
        );
      }
      return await this.usuariosService.updateUsuarioBloqueado(id, bloqueado);
    } catch (error) {
      this.logger.error(
        `Error al actualizar la propiedad "bloqueado": ${error.message}`,
      );
      if (error instanceof BadRequestException) {
        throw new HttpException(
          { message: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }
}
