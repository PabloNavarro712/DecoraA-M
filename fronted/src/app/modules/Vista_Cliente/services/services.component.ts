import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  // Definición de la propiedad services
  services = [
    { 
      id: 'modal-1', 
      icon: '🎉', 
      title: 'Decoración de Bodas', 
      description: 'Ofrecemos decoración personalizada para bodas.',
      info: 'Ullamco nulla cillum eiusmod ad. Mollit nulla est eu cillum ipsum sit magna eu.In cillum reprehenderit sint minim qui incididunt sint esse do non.In deserunt et cupidatat pariatur occaecat tempor incididunt velit anim non.',
      imageUrl: 'https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/435721230_949072237228219_4786560063302803056_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=sxE4-SlALpIQ7kNvgGPBe0r&_nc_ht=scontent.fisj3-3.fna&_nc_gid=AnhxwEJ23oHl6TKqck5SmPC&oh=00_AYA4Uk_Y4CkCUUxQDep-l8rgmOZrHS3L6tDJ5xfYhicpRA&oe=66F21496'
    },
    { 
      id: 'modal-2', 
      icon: '🎈', 
      title: 'Fiestas Infantiles', 
      description: 'Fiestas temáticas para los más pequeños.',
      info: 'Id occaecat culpa exercitation proident. Ut duis culpa laborum sunt tempor laborum fugiat occaecat irure magna duis.Fugiat cillum consequat irure nisi elit.Elit aute anim commodo adipisicing officia magna laboris.',
      imageUrl: 'https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/368334757_770624655072979_6268138633135522241_n.jpg?stp=cp6_dst-jpg&_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=aOKVP9Hy6noQ7kNvgF7KIh1&_nc_ht=scontent.fisj3-3.fna&_nc_gid=AID7CNb6zdeMQwA9ir_zyKp&oh=00_AYCRDzQI0PygMDsk6bhFv7ZZZ4k1ShBj18d0ehfOGOC4Fw&oe=66F20358'
    },
    { 
      id: 'modal-3', 
      icon: '💐', 
      title: 'Eventos Corporativos', 
      description: 'Proveemos decoración elegante y profesional para todo tipo de eventos corporativos.',
      info: 'Ullamco nulla cillum eiusmod ad. Mollit nulla est eu cillum ipsum sit magna eu.In cillum reprehenderit sint minim qui incididunt sint esse do non.In deserunt et cupidatat pariatur occaecat tempor incididunt velit anim non.',
      imageUrl: 'https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/380803009_796991245769653_1431039081820430404_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=F_SiFqf970wQ7kNvgF-BTvd&_nc_ht=scontent.fisj3-3.fna&_nc_gid=AhmI6V2AcFdJKCX_VF6rDXg&oh=00_AYA_Eqhz5hDYzL3VjevZaev8DqxSyTgplVOCUzKyK8Vt_A&oe=66F2026E'
    },
    { 
      id: 'modal-4', 
      icon: '👑', 
      title: 'XV Años', 
      description: 'Creamos decoraciones memorables y elegantes para celebrar tus XV Años con estilo.',
      info: 'Ullamco nulla cillum eiusmod ad. Mollit nulla est eu cillum ipsum sit magna eu.In cillum reprehenderit sint minim qui incididunt sint esse do non.In deserunt et cupidatat pariatur occaecat tempor incididunt velit anim non.',
      imageUrl: 'https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/411337581_866841628784614_7559273136906213962_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=0rvZqwcABIIQ7kNvgGDT27b&_nc_ht=scontent.fisj3-3.fna&_nc_gid=APMkuCXX84Xp9zepYmgRoW1&oh=00_AYCwIJvK0JZIovebWb7K_9BYVlzUWdUWM44Yey1tub3fdA&oe=66F214A6'
    },
    // Puedes agregar más servicios aquí si es necesario
    { 
      id: 'modal-5', 
      icon: '🍼', 
      title: 'Baby Showers', 
      description: ' Diseñamos decoraciones tiernas y encantadoras para dar la bienvenida al nuevo miembro de la familia.',
      info: 'Ullamco nulla cillum eiusmod ad. Mollit nulla est eu cillum ipsum sit magna eu.In cillum reprehenderit sint minim qui incididunt sint esse do non.In deserunt et cupidatat pariatur occaecat tempor incididunt velit anim non.',
      imageUrl: 'https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/453064312_1035076468627795_2840531091586568467_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_ohc=yMCc6PO_SmEQ7kNvgFLqhQe&_nc_ht=scontent.fisj3-3.fna&_nc_gid=AlfM4nWRlLq--kiF6TwkzRC&oh=00_AYBJ-0O-rccte3GjeLcjpXQZIWHm4XLneexcoARR4H4nZA&oe=66F2141F'
    },
  ];

  activeModal: string | null = null;
  activeService: any = null;

  openModal(service: any) {
    this.activeModal = service.id;
    this.activeService = service;
  }

  closeModal(event?: MouseEvent) {
    if (!event || (event.target as HTMLElement).classList.contains('modal')) {
      this.activeModal = null;
      this.activeService = null;
    }
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
}
