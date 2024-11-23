import { Injectable, Logger } from '@nestjs/common';
import { GenericService } from '../shared/generic.service';
import { ServiciosDocument } from '../todos/document/servicios.document';
import { Firestore } from '@google-cloud/firestore';

@Injectable()
export class ServiciosService extends GenericService<ServiciosDocument> {
  private readonly logger = new Logger(ServiciosService.name);
  constructor() {
    super(ServiciosDocument.collectionName);
    this.firestore = new Firestore();
  }
}
