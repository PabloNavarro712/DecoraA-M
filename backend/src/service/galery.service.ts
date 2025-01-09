import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GenericService } from '../shared/generic.service';
import { GaleriaDocument } from '../todos/document/galery.document';
import { Firestore } from '@google-cloud/firestore';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class GaleriaService extends GenericService<GaleriaDocument> {
  private readonly logger = new Logger(GaleriaService.name);
  private storage: Storage;

  constructor() {
    super(GaleriaDocument.collectionName);
    this.firestore = new Firestore();
    this.storage = new Storage();
  }
  async createGallery(
    categoria: string,
    descripcion: string,
    imageBuffer: Buffer,
    imageName: string,
    contentType: string,
  ): Promise<GaleriaDocument> {
    // Generar un ID único para el documento
    const id = this.firestore
      .collection(GaleriaDocument.collectionName)
      .doc().id;
    const fileName = `${id}_${imageName}`;
    try {
      // Subir imagen a Firebase Storage
      const imageUrl = await this.uploadImageToFirebase(
        imageBuffer,
        categoria,
        fileName,
        contentType,
      );
      // Crear el documento de la galería
      const galeriaData: GaleriaDocument = {
        id,
        Categoria: categoria,
        Descripcion: descripcion,
        Imagen: imageUrl,
      };
      // Guardar en Firestore
      await this.firestore
        .collection(GaleriaDocument.collectionName)
        .doc(id) // Especificar el ID del documento
        .set(galeriaData);
      this.logger.log(`Galería creada con éxito: ${id}`);
      return galeriaData;
    } catch (error) {
      this.logger.error('Error al crear la galería', error);
      throw new Error('No se pudo crear la galería');
    }
  }

  async getImagesByCategory(category: string): Promise<GaleriaDocument[]> {
    this.logger.log('Executing getImagesByCategory endpoint');
    try {
      const snapshot = await this.firestore
        .collection(GaleriaDocument.collectionName)
        .where('Categoria', '==', category)
        .get();

      if (snapshot.empty) {
        this.logger.warn(`No hay imagenes con la categoria : ${category}`);
        return [];
      }

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GaleriaDocument[];
    } catch (error) {
      this.logger.error(`Fallo al traer las imagenes: ${error.message}`);
      throw error;
    }
  }

  private async uploadImageToFirebase(
    imageBuffer: Buffer,
    categoria: string,
    imageName: string,
    contentType: string,
  ): Promise<string> {
    const bucketName = 'equipo-4---decoram-ef008.firebasestorage.app';
    const fileName = `${categoria}_${imageName}.${contentType}`;

    try {
      const bucket = this.storage.bucket(bucketName);
      const file = bucket.file(fileName);

      // Subir la imagen al bucket
      await file.save(imageBuffer, {
        metadata: { contentType }, // Cambia si usas otro formato
        resumable: false,
      });

      // Generar la URL pública
      await file.makePublic();

      // Devuelve la URL del archivo subido
      this.logger.log(`Imagen subida correctamente: ${fileName}`);
      return `https://storage.googleapis.com/${bucketName}/${fileName}`;
    } catch (error) {
      this.logger.error('Error al subir la imagen a Firebase Storage', error);
      throw new Error('No se pudo subir la imagen a Firebase Storage');
    }
  }

  private async deleteImageFromFirebase(imageUrl: string): Promise<void> {
    const bucketName = 'equipo-4---decoram-ef008.firebasestorage.app';

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
  async updateImageDocument(
    id: string,
    updateData: Partial<GaleriaDocument>, // Los datos que se quieren actualizar
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
        .collection(GaleriaDocument.collectionName)
        .doc(id);
      const imageDoc = await imageDocRef.get();

      if (!imageDoc.exists) {
        throw new NotFoundException(
          `No se encontró un documento con el ID: ${id}.`,
        );
      }

      // Obtener los datos actuales del documento
      const currentData = imageDoc.data() as GaleriaDocument;
      const currentImageUrl = currentData.Imagen;

      if (!currentImageUrl) {
        throw new Error('No se encontró la URL de la imagen actual.');
      }

      // Eliminar la imagen actual de Firebase Storage
      await this.deleteImageFromFirebase(currentImageUrl);
      console.log(`Imagen eliminada de Firebase Storage: ${currentImageUrl}`);
      const fileName = `${id}_${newImageName}`;
      // Subir la nueva imagen a Firebase Storage
      const newImageUrl = await this.uploadImageToFirebase(
        newImageBuffer,
        newImageName,
        fileName,
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

  async deleteImageById(id: string): Promise<void> {
    try {
      // Validar parámetro de entrada
      if (!id.trim()) {
        throw new BadRequestException(
          'Falta el ID requerido para eliminar la imagen.',
        );
      }

      // Buscar el documento por su ID
      const imageDoc = await this.firestore
        .collection(GaleriaDocument.collectionName)
        .doc(id)
        .get();

      if (!imageDoc.exists) {
        throw new NotFoundException(
          `No se encontró un documento con el ID: ${id}.`,
        );
      }

      // Obtener los datos del documento
      const imageData = imageDoc.data() as GaleriaDocument;

      // Verificar si la imagen existe
      const imageUrl = imageData.Imagen;
      if (imageUrl) {
        // Eliminar la imagen del Firebase Storage
        await this.deleteImageFromFirebase(imageUrl);

        // Eliminar el documento de la colección
        await this.firestore
          .collection(GaleriaDocument.collectionName)
          .doc(id)
          .delete();

        console.log(
          `Imagen asociada al documento con ID ${id} eliminada correctamente.`,
        );
      } else {
        throw new NotFoundException(
          'No se encontró la URL de la imagen para eliminar.',
        );
      }
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error interno al intentar eliminar la imagen. Por favor, inténtelo de nuevo más tarde.',
        );
      }
    }
  }

  async updateDocumentAndReplaceImage(
    id: string,
    newImageBuffer: Buffer,
    newImageName: string,
    newImageContentType: string,
    updatedData: { Categoria: string; Descripcion: string },
  ): Promise<void> {
    try {
      // Get the existing document
      const docRef = this.firestore
        .collection(GaleriaDocument.collectionName)
        .doc(id);
      const docSnapshot = await docRef.get();

      if (!docSnapshot.exists) {
        throw new Error(`Document with ID ${id} not found`);
      }

      const documentData = docSnapshot.data();
      const existingImageUrl = documentData?.Imagen;

      if (!existingImageUrl) {
        throw new Error('No existing image URL found for the document');
      }

      // Delete the existing image from Firebase Storage
      const bucket = this.storage.bucket('albergue-57e14.appspot.com');
      const existingFileName = existingImageUrl.split('/').pop();
      await bucket.file(existingFileName).delete();
      this.logger.log(`Existing image deleted: ${existingFileName}`);

      // Upload the new image to Firebase Storage
      const newImageUrl = await this.uploadImageToFirebase(
        newImageBuffer,
        updatedData.Categoria,
        newImageName,
        newImageContentType,
      );

      // Update the document in Firestore
      await docRef.update({
        Categoria: updatedData.Categoria,
        Descripcion: updatedData.Descripcion,
        Imagen: newImageUrl,
      });

      this.logger.log(`Document updated: ${id}`);
    } catch (error) {
      this.logger.error(
        `Error updating document or replacing image: ${error.message}`,
        error.stack,
      );
      throw new Error(
        'Failed to update document and replace its associated image',
      );
    }
  }
}
