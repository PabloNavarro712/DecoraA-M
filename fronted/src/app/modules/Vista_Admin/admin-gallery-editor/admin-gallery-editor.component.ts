import { Component } from '@angular/core';
import { IGalery } from './igalery.metadata';
import { GaleryService } from '../../../../services/api/galery.service';  // Asegúrate de usar la ruta correcta
import { Observable } from 'rxjs';

interface Category {
  id?: string
  name: string;
  photos: IGalery[];
}

@Component({
  selector: 'app-admin-gallery-editor',
  templateUrl: './admin-gallery-editor.component.html',
  styleUrls: ['./admin-gallery-editor.component.css']
})
export class AdminGalleryEditorComponent {
  categories: Category[] = [
    { name: 'Bodas', photos: [] },
    { name: 'Fiestas Infantiles', photos: [] },
    { name: 'Baby Shower', photos: [] },
    { name: 'XV Años', photos: [] },
  ];

  newPhotoSrc: string = '';
  newPhotoAlt: string = '';
  selectedCategory: string = '';
  editIndex: number | null = null;  // Para saber si estamos editando

  constructor(private galeryService: GaleryService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newPhotoSrc = e.target.result;  // Almacena la imagen en formato base64
      };
      reader.readAsDataURL(file);  // Lee el archivo como URL de datos (base64)
    }
  }

  addOrEditPhoto() {
    const newPhoto: IGalery = {
      id: this.editIndex !== null ? this.categories.find(cat => cat.name === this.selectedCategory)?.photos[this.editIndex]?.id : undefined, // ID solo para edición
      categoria: this.selectedCategory,
      imagen: this.newPhotoSrc,
      descripcion: this.newPhotoAlt
    };
  
    if (this.editIndex !== null && newPhoto.id !== undefined) {
      // Editar la foto existente
      this.galeryService.update(newPhoto.id, newPhoto).subscribe({
        next: () => {
          this.updateLocalPhoto(newPhoto);
          this.resetForm();
        },
        error: (err) => console.error('Error al actualizar la foto:', err)
      });
    } else {
      // Agregar una nueva foto
      const newPhotoToCreate: Omit<IGalery, 'id'> = {
        categoria: newPhoto.categoria,
        imagen: newPhoto.imagen,
        descripcion: newPhoto.descripcion
      };
      
      // Llamar al método addgalery del servicio
      this.galeryService.addgalery(newPhotoToCreate).subscribe({
        next: (response) => {
          if (!response.error && response.data) {
            this.addLocalPhoto({ ...response.data }); // Se añade el ID proporcionado por el servidor
          } else {
            console.error(response.msg);
          }
          this.resetForm();
        },
        error: (err) => console.error('Error al agregar la foto:', err)
      });
    }
  }
  
  

  private addLocalPhoto(photo: IGalery) {
    const category = this.categories.find(cat => cat.name === this.selectedCategory);
    if (category) {
      category.photos.push(photo);
    }
  }

  private updateLocalPhoto(photo: IGalery) {
    const category = this.categories.find(cat => cat.name === this.selectedCategory);
    if (category) {
      category.photos[this.editIndex!] = photo; // Usa el índice de edición
    }
  }

  removePhoto(categoryName: string, photoIndex: number) {
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category) {
      const photoToRemove = category.photos[photoIndex];
      if (photoToRemove && photoToRemove.id !== undefined) { // Asegúrate de que el ID no sea undefined
        this.galeryService.delete(photoToRemove.id).subscribe({
          next: () => {
            category.photos.splice(photoIndex, 1);
          },
          error: (err) => console.error('Error al eliminar la foto:', err)
        });
      } else {
        console.error('No se pudo eliminar la foto, ID no disponible.');
      }
    }
  }
  

  editPhoto(categoryName: string, photoIndex: number) {
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category) {
      this.newPhotoSrc = category.photos[photoIndex].imagen; // Cambia 'src' a 'imagen'
      this.newPhotoAlt = category.photos[photoIndex].descripcion; // Cambia 'alt' a 'descripcion'
      this.selectedCategory = categoryName;
      this.editIndex = photoIndex;
    }
  }

  resetForm() {
    this.newPhotoSrc = '';
    this.newPhotoAlt = '';
    this.editIndex = null;
    this.selectedCategory = '';
  }
}
