import { Component } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {
  imagenes = [
    { src: 'https://centrosdemesa.co/wp-content/uploads/2018/09/OROideas-de-regalos-para-bodas-de-oro.jpg', alt: 'Decoración 1', texto: 'Decoración 1' },
    { src: 'https://th.bing.com/th/id/OIP.nXwwBV9vQb5btktvSgY49gHaE8?rs=1&pid=ImgDetMain', alt: 'Decoración 2', texto: 'Decoración 2' },
    { src: 'https://th.bing.com/th/id/OIP.keElq1HBZcOil9MXdWYNVgHaGX?rs=1&pid=ImgDetMain', alt: 'Decoración 3', texto: 'Decoración 3' },
    { src: 'https://i.etsystatic.com/iap/b3ac95/4379370919/iap_300x300.4379370919_oq2qvauj.jpg?version=0', alt: 'Decoración 4', texto: 'Decoración 4' },
    { src: 'https://th.bing.com/th/id/OIP.ph6un28m828vDFBsMVe3mAHaE8?rs=1&pid=ImgDetMain', alt: 'Decoración 5', texto: 'Decoración 5' },
    { src: 'https://img1.wsimg.com/isteam/ip/94578872-5cb4-4626-9889-1e874274e2d8/2021-07-22%2000.57.12.jpg/:/cr=t:12.45%25,l:0%25,w:100%25,h:75.1%25/rs=w:360,h:360,cg:true', alt: 'Decoración 6', texto: '1234567' },
    { src: 'https://centrosdemesa.co/wp-content/uploads/2018/09/OROideas-de-regalos-para-bodas-de-oro.jpg', alt: 'Decoración 1', texto: 'Decoración 1' },
    { src: 'https://th.bing.com/th/id/OIP.nXwwBV9vQb5btktvSgY49gHaE8?rs=1&pid=ImgDetMain', alt: 'Decoración 2', texto: 'Decoración 2' },
    { src: 'https://th.bing.com/th/id/OIP.keElq1HBZcOil9MXdWYNVgHaGX?rs=1&pid=ImgDetMain', alt: 'Decoración 3', texto: 'Decoración 3' },
    { src: 'https://i.etsystatic.com/iap/b3ac95/4379370919/iap_300x300.4379370919_oq2qvauj.jpg?version=0', alt: 'Decoración 4', texto: 'Decoración 4' },
    { src: 'https://th.bing.com/th/id/OIP.ph6un28m828vDFBsMVe3mAHaE8?rs=1&pid=ImgDetMain', alt: 'Decoración 5', texto: 'Decoración 5' },
    { src: 'https://img1.wsimg.com/isteam/ip/94578872-5cb4-4626-9889-1e874274e2d8/2021-07-22%2000.57.12.jpg/:/cr=t:12.45%25,l:0%25,w:100%25,h:75.1%25/rs=w:360,h:360,cg:true', alt: 'Decoración 6', texto: '1234567' },
  
  ];
}
