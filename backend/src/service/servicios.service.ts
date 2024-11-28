import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { GenericService } from '../shared/generic.service';
import { ServiciosDocument } from '../todos/document/servicios.document';
import { Firestore } from '@google-cloud/firestore';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class ServiciosService extends GenericService<ServiciosDocument> {
  private readonly logger = new Logger(ServiciosService.name);
  private storage: Storage;
  private readonly bucketName = 'equipo-4-f104b.appspot.com';
  constructor() {
    super(ServiciosDocument.collectionName);
    this.firestore = new Firestore();
    this.storage = new Storage();
  }

  // Crear un nuevo documento con imagen
  async createService(
    titulo: string,
    descripcion: string,
    categoria: string,
    imageBuffer: Buffer,
    imageName: string,
    contentType: string,
  ): Promise<ServiciosDocument> {
    const id = this.firestore
      .collection(ServiciosDocument.collectionName)
      .doc().id;
    const fileName = `${id}_${imageName}`;

    try {
      const imageUrl = await this.uploadImageToFirebase(
        imageBuffer,
        fileName,
        contentType,
      );

      const newService: ServiciosDocument = {
        id,
        titulo,
        descripcion,
        categoria,
        elementos: [],
        imagen: imageUrl,
        opciones: [],
        precioTotal: '0',
        mostrarOpciones: false,
        precio: 0,
      };

      await this.firestore
        .collection(ServiciosDocument.collectionName)
        .doc(id)
        .set(newService);
      this.logger.log(`Servicio creado exitosamente: ${id}`);
      return newService;
    } catch (error) {
      this.logger.error('Error al crear el servicio', error);
      throw new Error('No se pudo crear el servicio.');
    }
  }

  async updateImageDocument(
    id: string,
    updateData: Partial<ServiciosDocument>, // Los datos que se quieren actualizar
    newImageBuffer: Buffer, // El nuevo buffer de imagen
    newImageName: string, // El nombre del archivo de la nueva imagen
    newImageContentType: string, // El tipo de contenido de la nueva imagen
  ): Promise<void> {
    try {
      // Validar parámetros de entrada
      if (!id.trim()) {
        throw new BadRequestException(
          'Falta el ID requerido para actualizar el documento.',
        );
      }

      // Buscar el documento por su ID
      const imageDocRef = this.firestore
        .collection(ServiciosDocument.collectionName)
        .doc(id);
      const imageDoc = await imageDocRef.get();

      if (!imageDoc.exists) {
        throw new NotFoundException(
          `No se encontró un documento con el ID: ${id}.`,
        );
      }

      // Obtener los datos actuales del documento
      const currentData = imageDoc.data() as ServiciosDocument;
      const currentImageUrl = currentData.imagen;

      if (!currentImageUrl) {
        throw new Error('No se encontró la URL de la imagen actual.');
      }

      // Eliminar la imagen actual de Firebase Storage
      await this.deleteImageFromFirebase(currentImageUrl);
      console.log(`Imagen eliminada de Firebase Storage: ${currentImageUrl}`);
      // Subir la nueva imagen a Firebase Storage
      const newImageUrl = await this.uploadImageToFirebase(
        newImageBuffer,
        newImageName,
        newImageContentType,
      );
      console.log(`Nueva imagen cargada a Firebase Storage: ${newImageUrl}`);

      // Actualizar los datos del documento en Firestore con la nueva imagen y cualquier otro cambio
      await imageDocRef.update({
        ...updateData, // Actualiza otros campos si es necesario
        Imagen: newImageUrl, // Asegurarse de que la nueva URL de la imagen se guarde
      });
      console.log(`Documento con ID: ${id} actualizado exitosamente.`);
    } catch (error) {
      console.error(
        `Error al actualizar la imagen del documento: ${error.message}`,
      );
      throw new Error('Error al actualizar la imagen y el documento.');
    }
  }

  // Eliminar un documento por ID
  async deleteService(id: string): Promise<void> {
    try {
      const docRef = this.firestore
        .collection(ServiciosDocument.collectionName)
        .doc(id);
      const docSnapshot = await docRef.get();

      if (!docSnapshot.exists) {
        throw new NotFoundException(
          `No se encontró un servicio con el ID: ${id}`,
        );
      }

      const data = docSnapshot.data() as ServiciosDocument;
      if (data.imagen) {
        await this.deleteImageFromFirebase(data.imagen);
      }

      await docRef.delete();
      this.logger.log(`Servicio eliminado exitosamente: ${id}`);
    } catch (error) {
      this.logger.error('Error al eliminar el servicio', error);
      throw new InternalServerErrorException(
        'Error interno al intentar eliminar el servicio.',
      );
    }
  }

  // Subir imagen a Firebase Storage
  private async uploadImageToFirebase(
    imageBuffer: Buffer,
    imageName: string,
    contentType: string,
  ): Promise<string> {
    const fileName = `${imageName}.${contentType}`;
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(fileName);

      await file.save(imageBuffer, {
        metadata: { contentType },
        resumable: false,
      });

      await file.makePublic();
      this.logger.log(`Imagen subida correctamente: ${fileName}`);
      return `https://storage.googleapis.com/${this.bucketName}/${fileName}`;
    } catch (error) {
      this.logger.error('Error al subir la imagen a Firebase Storage', error);
      throw new InternalServerErrorException(
        'No se pudo subir la imagen a Firebase Storage',
      );
    }
  }

  // Eliminar imagen de Firebase Storage
  private async deleteImageFromFirebase(imageUrl: string): Promise<void> {
    const bucketName = 'equipo-4-f104b.appspot.com';

    try {
      // Extraer el nombre del archivo de la URL
      const fileName = imageUrl.split(
        `https://storage.googleapis.com/${bucketName}/`,
      )[1];

      if (!fileName) {
        throw new Error(
          'No se pudo extraer el nombre del archivo de la URL proporcionada.',
        );
      }

      const bucket = this.storage.bucket(bucketName);
      const file = bucket.file(fileName);

      // Eliminar el archivo del bucket
      await file.delete();

      console.log(
        `Archivo ${fileName} eliminado correctamente de Firebase Storage.`,
      );
    } catch (error) {
      console.error('Error al eliminar la imagen de Firebase Storage:', error);
      throw new Error('No se pudo eliminar la imagen de Firebase Storage.');
    }
  }

  async getServiciosPaginated(page: number, categoria?: string): Promise<ServiciosDocument[]> {
    try {
      const limit = 10;
      let query = this.firestore
        .collection('servicios')
        .orderBy('id', 'desc')
        .offset((page - 1) * limit)
        .limit(limit);
  
      console.log('Categoría recibida:', categoria);
  
      if (categoria) {
        query = query.where('categoria', '==', categoria);
      }
  
      const snapshot = await query.get();
  
      if (snapshot.empty) {
        console.warn('No se encontraron servicios con la categoría:', categoria);
        throw new NotFoundException('No se encontraron servicios.');
      }
  
      const servicios: ServiciosDocument[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as ServiciosDocument;
        console.log('Documento recuperado:', data);
        servicios.push(data);
      });
  
      return servicios;
  
    } catch (error) {
      console.error('Error en la consulta de servicios:', error);
      throw new InternalServerErrorException('Error al procesar la solicitud.');
    }
  }
}