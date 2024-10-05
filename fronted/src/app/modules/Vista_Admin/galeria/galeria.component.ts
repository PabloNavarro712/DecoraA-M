import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../../services/galeria.service';

interface Item {
  id?: string;
  Categoria: string;
  Descripcion: string;
  Imagen: string;
}

@Component({
  selector: 'app-gal',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
  items: Item[] = [];

  newItem: Item = {
    Categoria: '',
    Descripcion: '',
    Imagen: ''
  };

  itemToEdit: Item | null = null; // Variable para el item que se está editando

  constructor(private galeriaService: GaleriaService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.galeriaService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  addItem(): void {
    this.galeriaService.createItem(this.newItem).subscribe(item => {
      this.items.push(item); // Agregar el nuevo item a la lista
      this.resetForm();
    });
  }

  deleteItem(id: string | undefined): void {
    if (id) {
      this.galeriaService.deleteItem(id).subscribe(() => {
        this.items = this.items.filter(item => item.id !== id); // Eliminar el item de la lista
      });
    } else {
      console.error('El id es indefinido');
    }
  }

  onEdit(item: Item): void {
    this.itemToEdit = item; // Guardar el item que se está editando
    this.newItem = { ...item }; // Cargar datos en el formulario
  }

  updateItem(): void {
    if (this.itemToEdit) {
      this.galeriaService.updateItem(this.itemToEdit.id, this.newItem).subscribe(updatedItem => {
        const index = this.items.findIndex(item => item.id === this.itemToEdit?.id);
        if (index > -1) {
          this.items[index] = updatedItem; // Actualizar el item en la lista
        }
        this.resetForm(); // Limpiar el formulario
      });
    }
  }

  resetForm(): void {
    this.newItem = { Categoria: '', Descripcion: '', Imagen: '' }; // Limpiar el formulario
    this.itemToEdit = null; // Resetear el item a editar
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.newItem.Imagen = e.target.result; // Guardar la imagen en newItem
      };

      reader.readAsDataURL(file); // Leer el archivo como una URL de datos
    }
  }
}
