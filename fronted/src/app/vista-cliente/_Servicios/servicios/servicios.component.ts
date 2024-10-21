import { Component } from '@angular/core';

interface OpcionAdicional {
  id: string;
  nombre: string;
  precio: number;
  seleccionado: boolean;
}

interface Servicio {
  nombre: string;
  precioBase: number;
  precioTotal: number;
  imagen: string;
  opciones: OpcionAdicional[];
}


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {










  servicios: Servicio[] = [
    {
      nombre: 'Bodas',
      precioBase: 500,
      precioTotal: 500,
      imagen: 'data:image/jpeg;base64,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',
      opciones: [
        { id: 'flores', nombre: 'Flores Adicionales', precio: 50, seleccionado: false },
        { id: 'iluminacion', nombre: 'Iluminación Especial', precio: 100, seleccionado: false },
        { id: 'musica', nombre: 'Música en Vivo', precio: 200, seleccionado: false }
      ]
    },
    {
      nombre: 'Cumpleaños',
      precioBase: 300,
      precioTotal: 300,
      imagen: 'https://th.bing.com/th/id/R.c27cbf52a757b2ce8ff254b9aaf8af9d?rik=K%2bdbvbhBWrBfmQ&pid=ImgRaw&r=0',
      opciones: [
        { id: 'globos', nombre: 'Globos Personalizados', precio: 30, seleccionado: false },
        { id: 'dj', nombre: 'Servicio de DJ', precio: 150, seleccionado: false },
        { id: 'fotografia', nombre: 'Fotografía Profesional', precio: 80, seleccionado: false }
      ]
    },
    {
      nombre: 'XV Años',
      precioBase: 700,
      precioTotal: 700,
      imagen: 'https://th.bing.com/th/id/OIP.ef0Z7QP-fbJ1ogaW5oJn7AHaEz?rs=1&pid=ImgDetMain',
      opciones: [
        { id: 'carroza', nombre: 'Carroza Decorativa', precio: 300, seleccionado: false },
        { id: 'baile', nombre: 'Clases de Baile', precio: 120, seleccionado: false },
        { id: 'vestuario', nombre: 'Vestuario Especial', precio: 250, seleccionado: false }
      ]
    },
    {
      nombre: 'Fiestas Infantiles',
      precioBase: 200,
      precioTotal: 200,
      imagen: 'https://th.bing.com/th/id/OIP.3R-9YNVV1ZkukWEfo45-owHaFj?rs=1&pid=ImgDetMain',
      opciones: [
        { id: 'payaso', nombre: 'Payaso y Animación', precio: 70, seleccionado: false },
        { id: 'piñata', nombre: 'Piñata Especial', precio: 50, seleccionado: false },
        { id: 'juegos', nombre: 'Juegos Inflables', precio: 100, seleccionado: false }
      ]
    }
  ];

  actualizarPrecio(servicio: Servicio) {
    servicio.precioTotal = servicio.precioBase + servicio.opciones
      .filter(opcion => opcion.seleccionado)
      .reduce((total, opcion) => total + opcion.precio, 0);
  }
}
