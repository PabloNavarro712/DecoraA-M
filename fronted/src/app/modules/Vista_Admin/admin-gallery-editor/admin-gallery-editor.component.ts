import { Component } from '@angular/core';

interface Photo {
  src: string;
  alt: string;
}

interface Category {
  name: string;
  photos: Photo[];
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

  addOrEditPhoto() {
    const category = this.categories.find(cat => cat.name === this.selectedCategory);
    if (category) {
      if (this.editIndex !== null) {
        // Editar la foto existente
        category.photos[this.editIndex] = { src: this.newPhotoSrc, alt: this.newPhotoAlt };
        this.editIndex = null;  // Reseteamos el estado de edición
      } else {
        // Agregar una nueva foto
        category.photos.push({ src: this.newPhotoSrc, alt: this.newPhotoAlt });
      }
      this.newPhotoSrc = '';
      this.newPhotoAlt = '';
    }
  }

  removePhoto(categoryName: string, photoIndex: number) {
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category) {
      category.photos.splice(photoIndex, 1);
    }
  }

  editPhoto(categoryName: string, photoIndex: number) {
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category) {
      this.newPhotoSrc = category.photos[photoIndex].src;
      this.newPhotoAlt = category.photos[photoIndex].alt;
      this.selectedCategory = categoryName;
      this.editIndex = photoIndex;
    }
  }

  resetForm() {
    this.newPhotoSrc = '';
    this.newPhotoAlt = '';
    this.editIndex = null;
  }
}
