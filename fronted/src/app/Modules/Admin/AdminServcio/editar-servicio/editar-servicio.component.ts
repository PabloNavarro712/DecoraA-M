import { Component } from '@angular/core';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent { 

  // Datos simulados (reemplazados con el JSON proporcionado)
  servicios = [
    {
      "id": "2LiHMh3anHlhvJvnzeu2",
      "titulo": "Paquete Boda 2",
      "descripcion": "Nos encargamos de que este día sea como siempre lo soñaste. ",
      "imagen": "https://storage.googleapis.com/equipo-4-f104b.appspot.com/1732077143394_439848657_965582272243882_9042865243303341043_n.jpg",
      "elementos": [
        "Luces en cascada",
        "Decoración Floral",
        "Iniciales de los novios",
        "Área de recibimiento "
      ],
      "precio": 2500,
      "opciones": [
        {
          "nombre": "Camino con luces ",
          "precio": 200
        },
        {
          "nombre": "Centros de mesa",
          "precio": 300
        },
        {
          "nombre": "Juegos Artificiales ",
          "precio": 500
        }
      ]
    },
    {
      "id": "6WtlfQktu37tzJEULWMO",
      "titulo": "Paquete Boda 2",
      "descripcion": "Nos encargamos de que este día sea como siempre lo soñaste. ",
      "imagen": "https://storage.googleapis.com/equipo-4-f104b.appspot.com/1732077143394_439848657_965582272243882_9042865243303341043_n.jpg",
      "elementos": [
        "Luces en cascada",
        "Decoración Floral",
        "Iniciales de los novios",
        "Área de recibimiento "
      ],
      "precio": 2500,
      "opciones": [
        {
          "nombre": "Camino con luces ",
          "precio": 200
        },
        {
          "nombre": "Centros de mesa",
          "precio": 300
        },
        {
          "nombre": "Juegos Artificiales ",
          "precio": 500
        }
      ]
    },
    {
      "id": "7gYbiaPaDffra0M3T7r3",
      "titulo": "Paquete Boda 2",
      "descripcion": "Nos encargamos de que este día sea como siempre lo soñaste. ",
      "imagen": "https://storage.googleapis.com/equipo-4-f104b.appspot.com/1732077143394_439848657_965582272243882_9042865243303341043_n.jpg",
      "elementos": [
        "Luces en cascada",
        "Decoración Floral",
        "Iniciales de los novios",
        "Área de recibimiento "
      ],
      "precio": 2500,
      "opciones": [
        {
          "nombre": "Camino con luces ",
          "precio": 200
        },
        {
          "nombre": "Centros de mesa",
          "precio": 300
        },
        {
          "nombre": "Juegos Artificiales ",
          "precio": 500
        }
      ]
    },
    {
      "id": "FRmDOFJozuqm2H7EfWfo",
      "titulo": "Paquete Boda 2",
      "descripcion": "Nos encargamos de que este día sea como siempre lo soñaste. ",
      "imagen": "https://storage.googleapis.com/equipo-4-f104b.appspot.com/1732077143394_439848657_965582272243882_9042865243303341043_n.jpg",
      "elementos": [
        "Luces en cascada",
        "Decoración Floral",
        "Iniciales de los novios",
        "Área de recibimiento "
      ],
      "precio": 2500,
      "opciones": [
        {
          "nombre": "Camino con luces ",
          "precio": 200
        },
        {
          "nombre": "Centros de mesa",
          "precio": 300
        },
        {
          "nombre": "Juegos Artificiales ",
          "precio": 500
        }
      ]
    },
    {
      "id": "anEUTzGXMJGJ3bVGia44",
      "titulo": "Paquete Boda 2",
      "descripcion": "Nos encargamos de que este día sea como siempre lo soñaste. ",
      "imagen": "https://storage.googleapis.com/equipo-4-f104b.appspot.com/1732077143394_439848657_965582272243882_9042865243303341043_n.jpg",
      "elementos": [
        "Luces en cascada",
        "Decoración Floral",
        "Iniciales de los novios",
        "Área de recibimiento "
      ],
      "precio": 2500,
      "opciones": [
        {
          "nombre": "Camino con luces ",
          "precio": 200
        },
        {
          "nombre": "Centros de mesa",
          "precio": 300
        },
        {
          "nombre": "Juegos Artificiales ",
          "precio": 500
        }
      ]
    },
    {
      "id": "gziBN5ykaypYijrWCxff",
      "titulo": "Paquete Boda 2",
      "descripcion": "Nos encargamos de que este día sea como siempre lo soñaste. ",
      "imagen": "https://storage.googleapis.com/equipo-4-f104b.appspot.com/1732077143394_439848657_965582272243882_9042865243303341043_n.jpg",
      "elementos": [
        "Luces en cascada",
        "Decoración Floral",
        "Iniciales de los novios",
        "Área de recibimiento "
      ],
      "precio": 2500,
      "opciones": [
        {
          "nombre": "Camino con luces ",
          "precio": 200
        },
        {
          "nombre": "Centros de mesa",
          "precio": 300
        },
        {
          "nombre": "Juegos Artificiales ",
          "precio": 500
        }
      ]
    },
    {
      "id": "kQ9p54IHUHhkPuWHrcfb",
      "titulo": "Paquete Boda 2",
      "descripcion": "Nos encargamos de que este día sea como siempre lo soñaste. ",
      "imagen": "https://storage.googleapis.com/equipo-4-f104b.appspot.com/1732077143394_439848657_965582272243882_9042865243303341043_n.jpg",
      "elementos": [
        "Luces en cascada",
        "Decoración Floral",
        "Iniciales de los novios",
        "Área de recibimiento "
      ],
      "precio": 2500,
      "opciones": [
        {
          "nombre": "Camino con luces ",
          "precio": 200
        },
        {
          "nombre": "Centros de mesa",
          "precio": 300
        },
        {
          "nombre": "Juegos Artificiales ",
          "precio": 500
        }
      ]
    },
    {
      "id": "o5psI2QuTbvDMhsACDh3",
      "titulo": "Paquete Boda 2",
      "descripcion": "Nos encargamos de que este día sea como siempre lo soñaste. ",
      "imagen": "https://storage.googleapis.com/equipo-4-f104b.appspot.com/1732077143394_439848657_965582272243882_9042865243303341043_n.jpg",
      "elementos": [
        "Luces en cascada",
        "Decoración Floral",
        "Iniciales de los novios",
        "Área de recibimiento "
      ],
      "precio": 2500,
      "opciones": [
        {
          "nombre": "Camino con luces ",
          "precio": 200
        },
        {
          "nombre": "Centros de mesa",
          "precio": 300
        },
        {
          "nombre": "Juegos Artificiales ",
          "precio": 500
        }
      ]
    },
    {
      "id": "pkA7pBAbMQeXJbR7jJMh",
      "titulo": "Paquete Boda 2",
      "descripcion": "Nos encargamos de que este día sea como siempre lo soñaste. ",
      "imagen": "https://storage.googleapis.com/equipo-4-f104b.appspot.com/1732077143394_439848657_965582272243882_9042865243303341043_n.jpg",
      "elementos": [
        "Luces en cascada",
        "Decoración Floral",
        "Iniciales de los novios",
        "Área de recibimiento "
      ],
      "precio": 2500,
      "opciones": [
        {
          "nombre": "Camino con luces ",
          "precio": 200
        },
        {
          "nombre": "Centros de mesa",
          "precio": 300
        },
        {
          "nombre": "Juegos Artificiales ",
          "precio": 500
        }
      ]
    }
  ];

  // Filtros y paginación
  categorias = ['Todos', 'Bodas', 'XV Años']; // Puedes ajustar las categorías según sea necesario
  categoriaSeleccionada = 'Todos';
  paginaActual = 1;
  elementosPorPagina = 5;

  // Obtener servicios filtrados
  get serviciosFiltrados() {
    const serviciosFiltrados = this.categoriaSeleccionada === 'Todos'
      ? this.servicios
      : this.servicios.filter(s => s.titulo.includes(this.categoriaSeleccionada));

    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return serviciosFiltrados.slice(inicio, fin);
  }

  // Cambiar página
  cambiarPagina(direccion: number) {
    this.paginaActual += direccion;
  }

  // Editar servicio
  editarServicio(id: string) {
    console.log(`Editando servicio con ID: ${id}`);
  }

  // Eliminar servicio
  eliminarServicio(id: string) {
    console.log(`Eliminando servicio con ID: ${id}`);
    this.servicios = this.servicios.filter(s => s.id !== id);
  }
}
