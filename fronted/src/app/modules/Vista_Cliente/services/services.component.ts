import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services = [
    { id: 'xv_anos', icon: '👑', title: 'XV Años', description: '...', info: '...', imageUrl: '...' },
    { id: 'bodas', icon: '🎉', title: 'Bodas', description: '...', info: '...', imageUrl: '...' },
    { id: 'fiestas_infantiles', icon: '🎈', title: 'Fiestas Infantiles', description: '...', info: '...', imageUrl: '...' },
    { id: 'baby_shower', icon: '🍼', title: 'Baby Showers', description: '...', info: '...', imageUrl: '...' }
  ];

  selectedService: string = '';
  currentPackages: any[] = [];
  currentExtras: any[] = [];
  selectedPackage: any = null;
  selectedExtras: any[] = [];
  totalPrice: number = 0;

  activeModal: string | null = null;
  activeService: any = null;

  // Datos de paquetes y extras según el servicio seleccionado
  servicesData: any = {
    "xv_anos": {
      "paquetes": [
        { name: "Paquete Básico", items: ["Fotografía", "Decoración básica", "Catering"], price: 5000 },
        { name: "Paquete Premium", items: ["Fotografía y video", "Decoración temática", "Catering gourmet"], price: 10000 },
        { name: "Paquete VIP", items: ["Fotografía y video profesional", "Decoración de lujo", "Banquete completo"], price: 15000 }
      ],
      "extras": [
        { name: "Video profesional", price: 2000 },
        { name: "DJ en vivo", price: 1500 },
        { name: "Pastel gourmet", price: 1000 }
      ]
    },
    // Similar para bodas, fiestas infantiles y baby showers...
  };

  updatePackages() {
    const serviceData = this.servicesData[this.selectedService];
    this.currentPackages = serviceData.paquetes;
    this.currentExtras = serviceData.extras;
    this.selectedPackage = null;
    this.totalPrice = 0;
  }

  selectPackage(pkg: any) {
    this.selectedPackage = pkg;
    this.totalPrice = pkg.price;
  }

  toggleExtra(extra: any) {
    const index = this.selectedExtras.indexOf(extra);
    if (index === -1) {
      this.selectedExtras.push(extra);
      this.totalPrice += extra.price;
    } else {
      this.selectedExtras.splice(index, 1);
      this.totalPrice -= extra.price;
    }
  }

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
