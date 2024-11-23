import { Controller } from '@nestjs/common';

import { UsuariosService } from '../service/usuarios.service';
import { UsuariosDocument } from 'src/todos/document/usuarios.document';
import { createGenericController } from 'src/shared/generic.controller';

// Crear el controlador genérico para 'studentDocs'
const endpoint = 'api/usuarios';

// Crear el controlador genérico para 'studentDocs'
const GenericUsuariosController = createGenericController<UsuariosDocument>(
  UsuariosDocument.collectionName,
  endpoint,
);

@Controller(endpoint)
export class UsuariosController extends GenericUsuariosController {
  constructor(private readonly studentdocService: UsuariosService) {
    super(); // Llama al constructor del controlador genérico
  }
}
