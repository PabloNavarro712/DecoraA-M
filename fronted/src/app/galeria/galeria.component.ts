import { Component } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {
  imagenes = [
    { src: 'https://via.placeholder.com/400x500', alt: 'Decoración 1', texto: 'Decoración 1' },
    { src: 'https://via.placeholder.com/400x300', alt: 'Decoración 2', texto: 'Decoración 2' },
    { src: 'https://via.placeholder.com/400x400', alt: 'Decoración 3', texto: 'Decoración 3' },
    { src: 'https://via.placeholder.com/400x600', alt: 'Decoración 4', texto: 'Decoración 4' },
    { src: 'https://via.placeholder.com/400x350', alt: 'Decoración 5', texto: 'Decoración 5' },
    { src: 'https://via.placeholder.com/400x450', alt: 'Decoración 6', texto: 'Decoración 6' },
  ];
}
