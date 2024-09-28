import { Component } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})

export class GalleryComponent {
  showBodas: boolean = false;
  showBabyShower: boolean = false;

  imagenesBodas = [
    { src: 'url_imagen_boda4.jpg', alt: 'Boda 4' },
    { src: 'url_imagen_boda5.jpg', alt: 'Boda 5' },
    // Añadir más imágenes de bodas
  ];

  imagenesBabyShower = [
    { src: 'url_imagen_baby4.jpg', alt: 'Baby Shower 4' },
    { src: 'url_imagen_baby5.jpg', alt: 'Baby Shower 5' },
    { src: 'https://th.bing.com/th/id/R.22334b50d49da6b929decf91f7468e6b?rik=7qG0G1v2APRjVA&pid=ImgRaw&r=0', alt: 'Baby Shower 5' },
    // Añadir más imágenes de baby shower
  ];
  imagenesXVAnos = [
    { src: 'url_imagen_baby4.jpg', alt: 'Baby Shower 4' },
    { src: 'url_imagen_baby5.jpg', alt: 'Baby Shower 5' },
    { src: 'https://th.bing.com/th/id/R.22334b50d49da6b929decf91f7468e6b?rik=7qG0G1v2APRjVA&pid=ImgRaw&r=0', alt: 'Baby Shower 5' },
    // Añadir más imágenes de baby shower
  ];
  imagenesfiestasInf = [
    { src: 'url_imagen_baby4.jpg', alt: 'Baby Shower 4' },
    { src: 'url_imagen_baby5.jpg', alt: 'Baby Shower 5' },
    { src: 'https://th.bing.com/th/id/R.22334b50d49da6b929decf91f7468e6b?rik=7qG0G1v2APRjVA&pid=ImgRaw&r=0', alt: 'Baby Shower 5' },
    // Añadir más imágenes de baby shower
  ];


  toggleGallery(categoria: string) {
    if (categoria === 'bodas') {
      this.showBodas = !this.showBodas;
    } else if (categoria === 'babyShower') {
      this.showBabyShower = !this.showBabyShower;
    }
    // Repite la lógica para las demás categorías
  }
}

