import { Controller } from '@nestjs/common';

import { ServiciosService } from '../service/servicios.service';
import { ServiciosDocument } from 'src/todos/document/servicios.document';
import { createGenericController } from 'src/shared/generic.controller';

// Crear el controlador genérico para 'studentDocs'
const endpoint = 'api/servicios';

// Crear el controlador genérico para 'studentDocs'
const GenericServiciosController = createGenericController<ServiciosDocument>(
  ServiciosDocument.collectionName,
  endpoint,
);

@Controller(endpoint)
export class ServiciosController extends GenericServiciosController {
  constructor(private readonly studentdocService: ServiciosService) {
    super(); // Llama al constructor del controlador genérico
  }
}
