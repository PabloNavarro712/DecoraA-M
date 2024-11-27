import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  HttpException,
  HttpStatus,
  Query,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ServiciosService } from '../service/servicios.service';
import { ServiciosDocument } from 'src/todos/document/servicios.document';
import { createGenericController } from 'src/shared/generic.controller';

// Crear el controlador genérico para 'studentDocs'
const endpoint = 'api/servicios';

// Crear el controlador genérico para 'studentDocs'
const GenericServiciosController = createGenericController<ServiciosDocument>(
  ServiciosDocument.collectionName,
  endpoint,
);

@Controller(endpoint)
export class ServiciosController extends GenericServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {
    super(); // Llama al constructor del controlador genérico
  }

  // Crear un nuevo servicio con imagen
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createService(
    @Body() body: { titulo: string; descripcion: string; categoria: string },
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('La imagen es obligatoria.');
    }

    const { buffer, originalname, mimetype } = image;
    return this.serviciosService.createService(
      body.titulo,
      body.descripcion,
      body.categoria,
      buffer,
      originalname,
      mimetype,
    );
  }

  // Actualizar un documento con una nueva imagen
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('newImage'))
  async updateImageDocument(
    @Param('id') id: string,
    @Body() updateData: Partial<ServiciosDocument>,
    @UploadedFile() newImage: Express.Multer.File,
  ) {
    if (!newImage) {
      throw new BadRequestException('La nueva imagen es obligatoria.');
    }

    const { buffer, originalname, mimetype } = newImage;
    await this.serviciosService.updateImageDocument(
      id,
      updateData,
      buffer,
      originalname,
      mimetype,
    );
  }

  // Eliminar un servicio por ID
  @Delete('delete/:id')
  async deleteService(@Param('id') id: string) {
    await this.serviciosService.deleteService(id);
  }

  // Obtener servicios paginados con filtro por categoría
  @Get('/services')
  async getServiciosPaginated(
    @Query('page') page: number = 1,
    @Query('categoria') categoria?: string,
  ) {
    try {
      const servicios = await this.serviciosService.getServiciosPaginated(
        page,
        categoria,
      );
      return servicios;
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
