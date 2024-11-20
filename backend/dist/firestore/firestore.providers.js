"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreCollectionProviders = exports.FirestoreOptionsProvider = exports.FirestoreDatabaseProvider = void 0;
const aspirante_document_1 = require("../todos/document/aspirante.document");
const todos_document_1 = require("../todos/document/todos.document");
const convocatoria_document_1 = require("../todos/document/convocatoria.document");
const data_student_document_1 = require("../todos/document/data_student.document");
const studentdoc_document_1 = require("../todos/document/studentdoc.document");
const about_document_1 = require("../todos/document/about.document");
exports.FirestoreDatabaseProvider = 'firestoredb';
exports.FirestoreOptionsProvider = 'firestoreOptions';
exports.FirestoreCollectionProviders = [
    todos_document_1.TodoDocument.collectionName,
    aspirante_document_1.AspiranteDocument.collectionName,
    convocatoria_document_1.ConvocatoriaDocument.collectionName,
    data_student_document_1.DataStudent.collectionName,
    studentdoc_document_1.StudentDocDocument.collectionName,
    about_document_1.AboutDocument.collectionName,
];
//# sourceMappingURL=firestore.providers.js.map