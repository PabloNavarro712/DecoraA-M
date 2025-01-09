import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UploadedFile,
  Param,
  BadRequestException,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { GaleriaService } from '../service/galery.service';
import { GaleriaDocument } from 'src/todos/document/galery.document';
import { FileInterceptor } from '@nestjs/platform-express';
import { createGenericController } from 'src/shared/generic.controller';

const endpoint = 'api/galeria-prueba';

// Crear el controlador genérico para 'eventos'
const GenericGController = createGenericController<GaleriaDocument>(
  GaleriaDocument.collectionName,
  endpoint,
);

@Controller(endpoint)
export class GaleriaController extends GenericGController {
  constructor(private readonly galeriaService: GaleriaService) {
    super();
  }

  @Post('/crear')
  @UseInterceptors(FileInterceptor('file'))
  async createGallery(
    @UploadedFile() file: Express.Multer.File,
    @Body('categoria') categoria: string,
    @Body('descripcion') descripcion: string,
  ): Promise<any> {
    if (!file) {
      throw new BadRequestException('El archivo de imagen es necesario.');
    }

    if (!categoria || !descripcion) {
      throw new BadRequestException(
        'Los campos categoria y descripcion son necesarios.',
      );
    }

    // Validar tipo de archivo
    const validMimeTypes = ['image/jpeg', 'image/png'];
    if (!validMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('El tipo de archivo debe ser JPEG o PNG.');
    }

    const imageBuffer = file.buffer;
    const imageName = file.originalname;
    const contentType = file.mimetype;

    return await this.galeriaService.createGallery(
      categoria,
      descripcion,
      imageBuffer,
      imageName,
      contentType,
    );
  }
  @Get('/buscar/:categoria')
  async getByCategory(
    @Param('categoria') categoria: string,
  ): Promise<GaleriaDocument[]> {
    if (!categoria) {
      throw new BadRequestException('La categoría es un parámetro necesario.');
    }
    return await this.galeriaService.getImagesByCategory(categoria);
  }
  // Ruta para actualizar un documento específico por ID
  // Ruta para actualizar un documento específico por ID y reemplazar la imagen
  @Patch('/update/:id') // Método PATCH con ID en la ruta
  @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar la subida de archivos
  async updateImageDocument(
    @Param('id') id: string, // Parámetro en la ruta
    @Body() updateData: Partial<GaleriaDocument>, // Datos enviados en el cuerpo de la solicitud
    @UploadedFile() file: Express.Multer.File, // Archivo de la nueva imagen
  ): Promise<void> {
    // Validar que se proporciona un ID y que no está vacío
    if (!id || !id.trim()) {
      throw new BadRequestException('El ID es obligatorio en la ruta.');
    }

    // Validar que el archivo esté presente
    if (!file) {
      throw new BadRequestException('El archivo de imagen es necesario.');
    }

    // Validar tipo de archivo
    const validMimeTypes = ['image/jpeg', 'image/png'];
    if (!validMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('El tipo de archivo debe ser JPEG o PNG.');
    }

    // Llamar al servicio para manejar la actualización de la imagen y el documento
    const imageBuffer = file.buffer;
    const imageName = file.originalname;
    const contentType = file.mimetype;

    await this.galeriaService.updateImageDocument(
      id,
      updateData, // Actualiza otros campos del documento
      imageBuffer, // Nueva imagen
      imageName, // Nombre de la nueva imagen
      contentType, // Tipo de la nueva imagen
    );
  }
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // Respuesta con código 204 en caso de éxito
  async deleteImage(@Param('id') id: string): Promise<void> {
    // Validar que el ID no esté vacío
    if (!id || !id.trim()) {
      throw new BadRequestException('El ID es obligatorio en la ruta.');
    }

    // Llamar al servicio para eliminar la imagen
    await this.galeriaService.deleteImageById(id);
  }
}
