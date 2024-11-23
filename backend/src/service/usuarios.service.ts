import { Injectable, Logger } from '@nestjs/common';
import { GenericService } from '../shared/generic.service';
import { UsuariosDocument } from '../todos/document/usuarios.document';
import { Firestore } from '@google-cloud/firestore';

@Injectable()
export class UsuariosService extends GenericService<UsuariosDocument> {
  private readonly logger = new Logger(UsuariosService.name);
  constructor() {
    super(UsuariosDocument.collectionName);
    this.firestore = new Firestore();
  }
}
