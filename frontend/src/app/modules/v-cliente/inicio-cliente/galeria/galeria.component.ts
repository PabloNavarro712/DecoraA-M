import { Component } from '@angular/core';
import { GaleriaService } from 'src/services/api/galeria/galeria.service';
import { IItem } from 'src/models/iiteam.metadata';
@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {

  items: IItem[] = [];
  categorias: { [key: string]: IItem[] } = {};
  categoriaSeleccionada: string = ''; // Nueva propiedad para la categoría seleccionada

  constructor(private galeriaService: GaleriaService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.galeriaService.getAll().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.items = response.data;
          this.groupItemsByCategory(); // Llamar a la función de agrupación si los datos son válidos
          console.log('Items cargados con éxito');
        } else {
          console.error('Error al cargar los items:', response.msg);
          // Puedes mostrar un mensaje de error al usuario si es necesario
        }
      },
      error: (error) => {
        console.error('Error inesperado al cargar los items:', error);
        // Manejar el error mostrando un mensaje o realizando alguna acción adicional
      }
    });
  }
  

  groupItemsByCategory(): void {
    this.items.forEach(item => {
      if (!this.categorias[item.Categoria]) {
        this.categorias[item.Categoria] = [];
      }
      this.categorias[item.Categoria].push(item);
    });
  }

  // Método para seleccionar la categoría
  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
  }

  // Método para verificar si hay una categoría seleccionada
  mostrarItems(): IItem[] {
    return this.categoriaSeleccionada ? this.categorias[this.categoriaSeleccionada] : this.items;
  }


}
