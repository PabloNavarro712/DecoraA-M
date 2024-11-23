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
const endpoint = 'api/galeria-prueba';

@Controller(endpoint)
export class GaleriaController {
  constructor(private readonly galeriaService: GaleriaService) {}
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
  @Patch(':id') // Método PATCH con ID en la ruta
  async updateImageDocument(
    @Param('id') id: string, // Parámetro en la ruta
    @Body() updateData: Partial<GaleriaDocument>, // Datos enviados en el cuerpo de la solicitud
  ): Promise<void> {
    // Validar que se proporciona un ID y que no está vacío
    if (!id || !id.trim()) {
      throw new BadRequestException('El ID es obligatorio en la ruta.');
    }

    // Llamar al servicio para manejar la actualización
    await this.galeriaService.updateImageDocument(id, updateData);
  }
  @Delete(':id')
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
