import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../../services/galeria.service';

interface Item {
  id?: string;
  Categoria: string;
  Descripcion: string;
  Imagen: string;
}

@Component({
  selector: 'app-categoria-galeria',
  templateUrl: './categoria-galeria.component.html',
  styleUrls: ['./categoria-galeria.component.css']
})
export class CategoriaGaleriaComponent implements OnInit {
  items: Item[] = [];
  categorias: { [key: string]: Item[] } = {};
  categoriaSeleccionada: string = ''; // Nueva propiedad para la categoría seleccionada

  constructor(private galeriaService: GaleriaService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.galeriaService.getItems().subscribe(data => {
      this.items = data;
      this.groupItemsByCategory();
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
  mostrarItems(): Item[] {
    return this.categoriaSeleccionada ? this.categorias[this.categoriaSeleccionada] : this.items;
  }
}
