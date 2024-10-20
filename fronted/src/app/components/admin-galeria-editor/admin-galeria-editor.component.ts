
import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../Core/services/galeria.service';


interface Item {
  id?: string;
  Categoria: string;
  Descripcion: string;
  Imagen: string;
}
@Component({
  selector: 'app-admin-galeria-editor',
  templateUrl: './admin-galeria-editor.component.html',
  styleUrls: ['./admin-galeria-editor.component.css']
})
export class AdminGaleriaEditorComponent {


  items: Item[] = [];

  newItem: Item = {
    Categoria: '',
    Descripcion: '',
    Imagen: ''
  };

  itemToEdit: Item | null = null; // Variable para el item que se está editando
  imagePreview: string | ArrayBuffer | null = null; // Para mostrar la imagen seleccionada

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
    this.imagePreview = item.Imagen; // Cargar la imagen en la vista previa
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
    this.imagePreview = null; // Limpiar la vista previa de la imagen
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      
      // Subir la imagen a Firebase Storage
      this.galeriaService.uploadImage(file).subscribe(response => {
        this.newItem.Imagen = response.imageUrl; // Guardar la URL de la imagen en newItem

        // Mostrar una vista previa de la imagen cargada
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result; // Asignar la imagen cargada a la vista previa
        };
        reader.readAsDataURL(file);
      }, error => {
        console.error('Error al subir la imagen:', error);
      });
    }
  }
}
