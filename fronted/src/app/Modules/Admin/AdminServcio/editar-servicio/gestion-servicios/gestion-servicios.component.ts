import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/data/Services/servicio.service';
import { Servicio } from 'src/app/data/Interfaces/servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-servicios',
  templateUrl: './gestion-servicios.component.html',
  styleUrls: ['./gestion-servicios.component.css']
})
export class GestionServiciosComponent implements OnInit {

  // Filtros y paginación
  categorias = ['Todos', 'Bodas', 'XV Años']; // Puedes ajustar las categorías según sea necesario
  categoriaSeleccionada = 'Todos';
  paginaActual = 1;
  currentPage = 1; //para la paginacion
  servicios: Servicio[] = [];
  filteredSer: Servicio[] = [];
  totalPages = 0; 
  noMoreServicios = false; // No hay más servicios
  isLoading: boolean = false;

  constructor(
    private servicioService: ServiciosService
  ) {}

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
      },
      error: (error) => {
        console.error('Error al eliminar el servicio:', error);
      }
    });
  } else {
    console.error('El ID del servicio es undefined');
  }
}

}