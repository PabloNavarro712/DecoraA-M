import { Injectable } from '@nestjs/common';
import { GenericService } from '../service/generic.service'; // Ajusta el path según tu estructura
import { GaleryDocument } from '../todos/document/galery.document';

@Injectable()
export class GaleryService extends GenericService<GaleryDocument> {
  constructor() {
    super(GaleryDocument.collectionName); // Usando la colección definida en el documento
  }
}