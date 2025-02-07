import { Component, OnInit } from '@angular/core';
import { GaleriaService } from 'src/services/api/galeria/galeria.service';
import { IItem } from 'src/models/iiteam.metadata'
import Swal from 'sweetalert2'; // Importa SweetAlert2

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent  implements OnInit {
  items: IItem[] = [];
  newItem: Partial<IItem> = {
    Categoria: '',
    Descripcion: '',
  };
  itemToEdit: IItem | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private galeriaService: GaleriaService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.galeriaService.getAll().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.items = response.data;
          if (this.items.length === 0) {
            Swal.fire('Sin datos', 'No se encontraron elementos en la galería.', 'info');
          }
        } else {
          Swal.fire('Error', response.msg || 'No se encontraron elementos en la galería.', 'error');
        }
      },
      error: (error) => {
        Swal.fire('Error', 'Error al cargar los elementos de la galería.', 'error');
        console.error('Error al cargar los elementos:', error);
      }
    });
  }
  

  addItem(): void {
    if (!this.selectedFile || !this.newItem.Categoria || !this.newItem.Descripcion) {
      Swal.fire('Error', 'Todos los campos y la imagen son obligatorios.', 'error');
      return;
    }

    this.galeriaService
      .createItem(this.selectedFile, this.newItem.Categoria, this.newItem.Descripcion)
      .subscribe(
        (item) => {
          this.items.push(item);
          Swal.fire('Éxito', 'El elemento fue agregado correctamente.', 'success');
          this.resetForm();
          this.loadItems();
        },
        (error) => {
          Swal.fire('Error', 'Error al agregar el elemento.', 'error');
        }
      );
  }

  deleteItem(id: string | undefined): void {
    if (!id) {
      Swal.fire('Error', 'El ID del elemento es indefinido.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el elemento de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.galeriaService.deleteItem(id).subscribe(
          () => {
            this.items = this.items.filter((item) => item.id !== id);
            Swal.fire('Eliminado', 'El elemento fue eliminado con éxito.', 'success');
            this.loadItems();
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el elemento.', 'error');
          }
        );
      }
    });
  }


  onEdit(item: IItem): void {
    this.itemToEdit = item;
    this.newItem = { ...item };
    this.imagePreview = item.Imagen;
    this.selectedFile
  }

  updateItem(): void {
    if (!this.itemToEdit || !this.selectedFile) {
      Swal.fire('Error', 'Debe seleccionar un archivo para actualizar.', 'error');
      return;
    }
  
    const updateData: Partial<IItem> = {
      Categoria: this.newItem.Categoria,
      Descripcion: this.newItem.Descripcion,
     // Pasar el archivo para la actualización
    };
  
    this.galeriaService.updateItem(this.itemToEdit.id!, updateData,  this.selectedFile).subscribe(
      () => {
        const index = this.items.findIndex((item) => item.id === this.itemToEdit?.id);
        if (index > -1 && this.itemToEdit) {
          this.items[index] = {
            ...this.itemToEdit,
            Categoria: updateData.Categoria ?? this.itemToEdit.Categoria,
            Descripcion: updateData.Descripcion ?? this.itemToEdit.Descripcion,
          };
        }
        Swal.fire('Éxito', 'El elemento fue actualizado correctamente.', 'success');
        this.resetForm();
        this.loadItems();
      },
      (error) => {
        Swal.fire('Error', 'Error al actualizar el elemento.', 'error');
      }
    );
  }
  

  resetForm(): void {
    this.newItem = { Categoria: '', Descripcion: '' };
    this.itemToEdit = null;
    this.imagePreview = null;
    this.selectedFile = null;
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.onerror = (error) => {
        Swal.fire('Error', 'Error al leer la imagen.', 'error');
      };
      reader.readAsDataURL(file);
    } else {
      Swal.fire('Advertencia', 'No se seleccionó ningún archivo.', 'warning');
    }
  }
}
