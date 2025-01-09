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

  @Post('/create')
  @UseInterceptors(FileInterceptor('image')) // Usar FileInterceptor para manejar la imagen
  async createServicio(
    @Body() servicioData: any, // Aceptamos el cuerpo como cualquier tipo para poder manejarlo como una cadena
    @UploadedFile() file: Express.Multer.File, // Obtener el archivo cargado
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    try {
      // Si servicioData es una cadena JSON, parseamos a objeto
      const servicio = JSON.parse(servicioData.servicioData);

      console.log(servicio); // Los datos del servicio convertidos en objeto
      console.log(file); // El archivo subido

      const imageBuffer = file.buffer; // Obtener el buffer de la imagen
      const imageName = file.originalname; // Obtener el nombre original del archivo
      const contentType = file.mimetype; // Obtener el tipo MIME del archivo

      // Llamar al servicio para crear el servicio con los datos y la imagen
      return await this.serviciosService.createService(
        servicio, // Pasa el objeto servicio (después de parsear)
        imageBuffer, // Pasa el buffer de la imagen
        imageName, // Pasa el nombre de la imagen
        contentType, // Pasa el tipo MIME de la imagen
      );
    } catch (error) {
      // Manejo de errores si no se puede parsear el JSON
      console.error('Error al parsear el JSON:', error);
      throw new Error('Error al procesar los datos del servicio');
    }
  }

  // Actualizar un documento con una nueva imagen
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('newImage'))
  async updateImageDocument(
    @Param('id') id: string,
    @Body() updateData: any, // Aceptamos el cuerpo como cualquier tipo para manejarlo como una cadena
    @UploadedFile() newImage: Express.Multer.File,
  ) {
    if (!newImage) {
      throw new BadRequestException('La nueva imagen es obligatoria.');
    }
    try {
      // Si updateData es una cadena JSON, parseamos a objeto
      const servicioData = JSON.parse(updateData.servicioData); // Asegúrate de que 'servicioData' sea el nombre correcto del campo en el cuerpo

      console.log(servicioData); // Los datos del servicio convertidos en objeto
      console.log(newImage); // El archivo subido

      // Extraemos la información de la nueva imagen
      const { buffer, originalname, mimetype } = newImage;

      // Llamamos al servicio para actualizar el documento con los nuevos datos y la nueva imagen
      await this.serviciosService.updateImageDocument(
        id, // ID del documento a actualizar
        servicioData, // Los datos del servicio (después de parsear)
        buffer, // Buffer de la nueva imagen
        originalname, // Nombre original de la imagen
        mimetype, // Tipo MIME de la imagen
      );

      return { message: 'Servicio actualizado exitosamente' };
    } catch (error) {
      // Manejo de errores si no se puede parsear el JSON o si hay algún otro problema
      console.error('Error al procesar los datos del servicio:', error);
      throw new Error('Error al procesar los datos del servicio o la imagen.');
    }
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
