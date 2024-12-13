import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/services/api/usuario/usuario.service';
import { IUser} from 'src/models/iusuario.metadata';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  // Filtros y paginación
  categorias = ['Todos', 'Bodas', 'XV Años','Fiestas Infantiles','Baby Shower']; // Puedes ajustar las categorías según sea necesario
  categoriaSeleccionada = 'Todos';
  paginaActual = 1;
  currentPage = 1; //para la paginacion
  servicios: IUser[] = [];
  servicio: IUser| null = null;
  filteredSer: IUser[] = [];
  totalPages = 0; 
  imagenInvalida: boolean = false;
  editForm: FormGroup;
  selectedFile: File | null = null;
  showCancelModal = false;
  noMoreServicios = false; // No hay más servicios
  isLoading: boolean = false;

  servicioIdSeleccionado: string | null = null;

  constructor(
    private fbs: FormBuilder, 
    private servicioService: UsuarioService
  ) {
    this.editForm = this.fbs.group({
      etitulo: [Validators.required],
      edescripcion: [ Validators.required],
      ecategoria: [ Validators.required],
      eelementos: this.fbs.array([], Validators.required),
      eprecio: [ [Validators.required, Validators.min(0)]],

      eopciones: this.fbs.array([], Validators.required)
    });

  }

  ngOnInit(): void {
    this.loadServicios(); // Cargar servicios al iniciar

  }

    // Cargar servicios según la página actual y categoría seleccionada
  loadServicios() {
    this.isLoading = true;

    // Si la categoría seleccionada es 'Todos', se envía un valor especial (por ejemplo, '' o 'todos')
    const categoria = this.categoriaSeleccionada === 'Todos' ? '' : this.categoriaSeleccionada;

    this.servicioService.getUsuariosPorNombre(this.currentPage, categoria).subscribe(
      (response: any) => {
        if (!response.error) {
          this.servicios = response.data || [];
          this.filteredSer = this.servicios; 
          this.noMoreServicios = this.servicios.length === 0;

          // Mostrar alerta si no se encuentran servicios para la categoría seleccionada
          if (this.servicios.length === 0 && this.categoriaSeleccionada !== 'Todos') {
            Swal.fire(
              'Aviso',
              'Actualmente no hay más servicios disponibles.',
              'warning'
            );
          }
        } else {
          Swal.fire(
            'Aviso',
            'No se encontraron servicios con la categoría seleccionada.',
            'warning'
          );
          this.currentPage = this.currentPage - 1; // Volver a la página anterior si no hay más
          this.categoriaSeleccionada = 'Todos';
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching servicios:', error);
        this.isLoading = false;
      }
    );
  }

  // Cambiar de página
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadServicios();
    }
  }

  // Obtener un arreglo de páginas para mostrar los botones de paginación
  getPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  // Filtrar por categoría
  onCategoriaChange() {
    this.currentPage = 1; // Reiniciar a la primera página cuando cambie la categoría
    this.loadServicios();  // Volver a cargar los servicios con la categoría seleccionada
  }

  // Editar servicio
  editarServicio(id: string | undefined): void {
    if (id) {  // Comprobamos si 'id' está definido
      console.log(`Editando servicio con ID: ${id}`);
      // Lógica de edición
    } else {
      console.error('El ID del servicio es undefined');
    }
  }

get elementosArray() {
  return this.editForm.get('eelementos') as FormArray;
}

get opcionesArray() {
  return this.editForm.get('eopciones') as FormArray;
}

agregarElemento(eelemento: string) {
  if (eelemento.trim()) {
    this.elementosArray.push(this.fbs.control(eelemento.trim()));
  }
}

eliminarElemento(index: number) {
  this.elementosArray.removeAt(index);
}

agregarOpcion(nombre: string, precio: number) {
  if (nombre.trim() && precio >= 0) {
    const opcionGroup = this.fbs.group({
      nombre: [nombre.trim(), Validators.required],
      precio: [precio, [Validators.required, Validators.min(0)]],
      seleccionada: [false]
    });
    this.opcionesArray.push(opcionGroup);
  }
}
// Función para abrir el modal
openModal(): void {
this.showCancelModal = true;
}


// Función para cerrar el modal
closeCancelModal(): void {
  this.showCancelModal = false;

}

eliminarOpcion(index: number) {
  this.opcionesArray.removeAt(index);
}



onFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file && file.type.startsWith('image/')) {
    this.selectedFile = file;
    this.imagenInvalida = false;
  } else {
    this.selectedFile = null;
    this.imagenInvalida = true;
  }
}



 // Esta función se ejecuta cuando se hace clic en el botón
 seleccionarServicio(id: string): void {


  this.servicioIdSeleccionado = id;
  this.obtenerServicioPorId(id); 
  console.log("click sobre " ,this.servicioIdSeleccionado)
}

obtenerServicioPorId(id: string): void {
  console.log("traerservicio")
  this.servicioService.getById(id).subscribe(
    (response) => {
      if (!response.error) {
        this.servicio = response.data; // Asignamos el servicio obtenido a la variable
        console.log("click sobre ", this.servicio)
      } else {
        console.error('Error al obtener el servicio:', response.msg);
      }
    },
    (error) => {
      console.error('Error en la solicitud:', error);
    }
  );
}

}