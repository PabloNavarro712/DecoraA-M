import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-biembenida',
  templateUrl: './biembenida.component.html',
  styleUrls: ['./biembenida.component.css']
})
export class BiembenidaComponent implements OnInit {
  galleryItems = [
    {
      src: 'https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/435745064_947990417336401_6959710831719792356_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=CsDSum8XEyoQ7kNvgGXDxRL&_nc_ht=scontent.fisj3-3.fna&_nc_gid=AxxHjjGzVDi1BtedSU8EGNL&oh=00_AYAtnVjMidr_FTiHgcEyqQv70C1Y5MTl4BDkHVkhTgwLnA&oe=66F204FA',
      alt: 'Boda 1',
      title: 'Bodas',
      description: 'Decoraciones elegantes y románticas para tu día especial.'
    },
    {
      src: 'https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/435900524_947990860669690_7393336807788493179_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_ohc=tB0-66FCg-QQ7kNvgEE8YBf&_nc_ht=scontent.fisj3-3.fna&_nc_gid=AMxLVX1KjVl2mEgIMS0eQw_&oh=00_AYCuqWA-lhLFCtC_Njk8bWrFEpjbY-LmX1hDqPuefUQPiw&oe=66F22BD8',
      alt: 'Cumpleaños 1',
      title: 'Cumpleaños',
      description: 'Fiestas llenas de color y alegría para celebrar cada año.'
    },
    {
      src: 'https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/457834876_1062768059191969_5529872728532937782_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_ohc=-SDdjaZ90zIQ7kNvgEyDV7i&_nc_ht=scontent.fisj3-3.fna&_nc_gid=AFJjFBKRKErlpkfgCnieu6F&oh=00_AYBLom0kLRdvGSmG9b4aJJZYAVTiCfnY7kKwT2hGI9U-KA&oe=66F2206A',
      alt: 'Evento Corporativo 1',
      title: 'Eventos Corporativos',
      description: 'Ambientes sofisticados para tus reuniones y conferencias.'
    },
    {
      src: 'https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/435606554_947991384002971_1311540058297220325_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_ohc=91OJeJsxbSIQ7kNvgGAiQ26&_nc_ht=scontent.fisj3-3.fna&_nc_gid=A8rQ3STGF0MbjLL4SRsVU3q&oh=00_AYDkiIPr2AVs-p21EDqX3gVemUt9GO9OuAiPDu5Zr_N32w&oe=66F2059B',
      alt: 'Graduación 1',
      title: 'Graduaciones',
      description: 'Celebraciones memorables para tus logros académicos.'
    },
    {
      src: 'https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/435580914_947990744003035_447806066676380988_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_ohc=Lj6VLT9fO0cQ7kNvgEdd6Qf&_nc_ht=scontent.fisj3-3.fna&_nc_gid=AJRS1oDp6S5LY6Hnr3LTiML&oh=00_AYDe6RXXruggynd2ZiPn72eDaPJJgCXfaqIqpeAe1muD5g&oe=66F20696',
      alt: 'Cumpleaños 1',
      title: 'Cumpleaños',
      description: 'Fiestas llenas de color y alegría para celebrar cada año.'
    },
    {
      src: 'https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/456813750_1057005546434887_1147192681761844633_n.jpg?stp=c0.296.1152.1152a_dst-jpg_s206x206&_nc_cat=103&ccb=1-7&_nc_sid=92e838&_nc_ohc=IkMtAK3Y-joQ7kNvgFV-fK1&_nc_ht=scontent.fisj3-3.fna&_nc_gid=A_Rw7K5qchAv7N0_kQE5cIh&oh=00_AYDMCIqr5CVvtXR8AyVB2hPzBy76ns1yXHjn4ZHapcw6JA&oe=66F21DF4',
      alt: 'Evento Corporativo 1',
      title: 'Eventos Corporativos',
      description: 'Ambientes sofisticados para tus reuniones y conferencias.'
    },
    {
      src: 'https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/456759054_1057007843101324_2662404504042060970_n.jpg?stp=c0.296.1152.1152a_dst-jpg_s206x206&_nc_cat=106&ccb=1-7&_nc_sid=92e838&_nc_ohc=_e6cvTifFVAQ7kNvgE7Ut-O&_nc_ht=scontent.fisj3-3.fna&_nc_gid=AgZsLhvjauHv8PSWcS8oyGY&oh=00_AYAYUKYZDDJbVrRTTA5phoxBoiDKOL6iH85bbbhRRI4j-w&oe=66F20E27',
      alt: 'Graduación 1',
      title: 'Graduaciones',
      description: 'Celebraciones memorables para tus logros académicos.'
    },
    {
      src: 'https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/457386655_1062768412525267_2361893357592751224_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=FbnLFFmNkNwQ7kNvgHsh2q3&_nc_ht=scontent.fisj3-3.fna&_nc_gid=AJ-V9pt8n1NzFrIgoxi5NGa&oh=00_AYA0R-UZ6ppKsl0JKuNawabArPQEB-0aYIwBI6Rzzb6lVQ&oe=66F2321A',
      alt: 'Otro Evento 1',
      title: 'Eventos Especiales',
      description: 'Decoraciones para una variedad de ocasiones especiales.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes cargar datos dinámicamente si es necesario
  }
}
