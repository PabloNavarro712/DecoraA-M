import { InstitutionDocument } from "src/todos/document/Institution.document"
import { TodoDocument } from "src/todos/document/todos.document"; 
import { GaleryDocument } from "src/todos/document/galery.document";


export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
    TodoDocument.collectionName,
    InstitutionDocument.collectionName,
    GaleryDocument.collectionName
];