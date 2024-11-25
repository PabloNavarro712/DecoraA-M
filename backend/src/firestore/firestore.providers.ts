import { TodoDocument } from 'src/todos/document/todos.document';
import { EventosDocument } from 'src/todos/document/eventos.document';
import { ServiciosDocument } from 'src/todos/document/servicios.document';
import { UsuariosDocument } from 'src/todos/document/usuarios.document';
import { GaleriaDocument } from 'src/todos/document/galery.document';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  TodoDocument.collectionName,
  EventosDocument.collectionName,
  ServiciosDocument.collectionName,
  UsuariosDocument.collectionName,
  GaleriaDocument.collectionName,
];
