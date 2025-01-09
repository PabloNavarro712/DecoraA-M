import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/services/api/servicio/servicio.service';
import { IServicio } from 'src/models/iservicios.metadata';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css']
})
export class ListaServiciosComponent implements OnInit {

  // Filtros y paginación
  categorias = ['Todos', 'Bodas', 'XV Años','Fiestas Infantiles','Baby Shower']; // Puedes ajustar las categorías según sea necesario
  categoriaSeleccionada = 'Todos';
  paginaActual = 1;
  currentPage = 1; //para la paginacion
  servicios: IServicio[] = [];
  servicio: IServicio | null = null;
  filteredSer: IServicio[] = [];
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
    private servicioService: ServiciosService
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

    this.servicioService.getServiciosPorCategoria(this.currentPage, categoria).subscribe(
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

// Eliminar servicio en la UI y enviar la solicitud al backend
eliminarServicio(id: string | undefined): void {
  if (id) {
    console.log(`Eliminando servicio con ID: ${id}`);
    this.servicioService.deleteServicio(id).subscribe({
      next: () => {
        this.servicios = this.servicios.filter(s => s.id !== id); // Actualiza la lista en la UI
        console.log('Servicio eliminado con éxito.');
        this.loadServicios();
      },
      error: (error) => {
        console.error('Error al eliminar el servicio:', error);
      }
    });
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

onSubmit() {
  if (this.editForm.valid) {
    // Convertir FormArrays a arrays planos
    const elementos = this.elementosArray.value
      .map((elemento: string) => elemento.trim())
      .filter(Boolean);

    const opciones = this.opcionesArray.value.map((opcion: any) => ({
      nombre: opcion.nombre.trim(),
      precio: opcion.precio,
      seleccionada: opcion.seleccionada,
    }));

    // Preparar los datos del servicio
    const servicioData = {
      titulo: this.editForm.get('etitulo')?.value,
      descripcion: this.editForm.get('edescripcion')?.value,
      categoria: this.editForm.get('ecategoria')?.value,
      precio: this.editForm.get('eprecio')?.value,
      precioTotal: this.editForm.get('eprecioTotal')?.value || this.editForm.get('eprecio')?.value,
      elementos: elementos,
      opciones: opciones,
      mostrarOpciones: false,
    };

    // Si hay una nueva imagen seleccionada
    if (this.servicio?.id && this.selectedFile) {
      this.servicioService.updateServicioConImagen(this.servicio.id, servicioData, this.selectedFile).subscribe(
        (response) => {
          Swal.fire({
            title: 'Servicio actualizado',
            text: 'El servicio ha sido actualizado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.loadServicios();
          this.resetForm();
          this.closeCancelModal();
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el servicio.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          console.error('Error:', error);
        }
      );
    } else if (this.servicio?.id) {
      // Actualizar solo los datos sin imagen
      this.servicioService.update(this.servicio.id, servicioData).subscribe(
        (response) => {
          if (!response.error) {
            Swal.fire({
              title: 'Servicio actualizado',
              text: response.msg,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              
            });
            this.loadServicios();
            this.resetForm();
            this.closeCancelModal();
          } else {
            Swal.fire({
              title: 'Error',
              text: response.msg,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Error al conectar con el servidor.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          console.error('Error:', error);
        }
      );
    } else {
      this.imagenInvalida = !this.selectedFile;
      this.editForm.markAllAsTouched();
      Swal.fire({
        title: 'Error',
        text: 'Se debe actualizar la imagen.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  } else {
    this.editForm.markAllAsTouched();
  }
}



// Método para validar si el archivo es una imagen válida
private isValidImage(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return validTypes.includes(file.type);
}

// Método para resetear el formulario completamente
resetForm() {
  this.editForm.reset();
  this.elementosArray.clear();
  this.opcionesArray.clear();
  this.selectedFile = null;
  this.imagenInvalida = false;
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
        this.cargarDatosEnFormulario();
      } else {
        console.error('Error al obtener el servicio:', response.msg);
      }
    },
    (error) => {
      console.error('Error en la solicitud:', error);
    }
  );
}
cargarDatosEnFormulario(): void {
  console.log("cargando datos ", this.servicio)
  if (this.servicio) {
    console.log("empezandoo ")
    this.editForm.patchValue({
      etitulo: this.servicio.titulo,
      edescripcion: this.servicio.descripcion,
      ecategoria: this.servicio.categoria,
      eprecio: this.servicio.precio,
      // Aquí puedes añadir más campos si tu servicio tiene más propiedades
    });  // Limpiar los arrays antes de agregarlos
    const elementosArray = this.editForm.get('eelementos') as FormArray;
    const opcionesArray = this.editForm.get('eopciones') as FormArray;

    // Limpiamos los FormArrays
    elementosArray.clear();
    opcionesArray.clear();

    // Cargamos los elementos en el FormArray
    if (this.servicio.elementos && this.servicio.elementos.length) {
      this.servicio.elementos.forEach((elemento: string) => {
        elementosArray.push(this.fbs.control(elemento));
      });
    }

    // Cargamos las opciones en el FormArray
    if (this.servicio.opciones && this.servicio.opciones.length) {
      this.servicio.opciones.forEach((opcion: any) => {
        opcionesArray.push(this.fbs.group({
          nombre: [opcion.nombre, Validators.required],
          precio: [opcion.precio, [Validators.required, Validators.min(0)]],
          seleccionada: [opcion.seleccionada],
        }));
      });
    }

    console.log("Formulario cargado:", this.editForm.value);
  }
}
}