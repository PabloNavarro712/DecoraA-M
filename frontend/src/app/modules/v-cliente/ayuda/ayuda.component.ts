import { Component } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent {
  // Lista de preguntas y respuestas
  showModal: boolean = false;
  faqs = [
    { 
      question: '¿Cómo agendo un evento?', 
      answer: 'Para agendar un evento, primero debes iniciar sesión. Después, el botón de "Reservar" estará disponible. Al hacer clic, se desplegará una ventana donde podrás ingresar los datos del evento.' 
    },
    { 
      question: '¿Dónde puedo revisar el estado de mi evento?', 
      answer: 'En la sección "Mis eventos", podrás ver todos los eventos que has reservado, junto con el estado actual de cada uno.' 
    },
    { 
      question: '¿Cuánto tiempo debo esperar para saber si mi reserva ha sido aceptada?', 
      answer: 'El tiempo de espera para recibir la confirmación de tu reserva puede variar entre 1 y 3 días hábiles.' 
    },
    { 
      question: '¿Puedo cancelar el servicio antes del evento?', 
      answer: 'Sí, puedes cancelar el servicio si quedan 30 días o más antes del evento. Para hacerlo, debes enviar una solicitud de cancelación desde la pestaña "Mis eventos".' 
    },
    { 
      question: '¿Qué métodos de pago aceptan?', 
      answer: 'Aceptamos efectivo, tarjetas de crédito y débito, PayPal y transferencias bancarias.' 
    },
    { 
      question: '¿Ofrecen servicios fuera de la ciudad?', 
      answer: 'Sí, ofrecemos servicios en otras localidades cercanas a la ciudad de Hecelchakan. Contáctanos para solicitar una cotización.' 
    },
    { 
      question: '¿Cómo puedo contactar con atención al cliente?', 
      answer: 'Puedes ponerte en contacto con nosotros a través de la información disponible en nuestra página web.' 
    },
    { 
      question: '¿Qué tipos de eventos pueden beneficiarse del servicio de M&AS?', 
      answer: 'Ofrecemos paquetes de decoración para bodas, XV años, fiestas infantiles y cumpleaños.' 
    }
  ];

  activeAnswer: number | null = null;

  // Función para mostrar/ocultar la respuesta
  toggleAnswer(index: number) {
    if (this.activeAnswer === index) {
      this.activeAnswer = null;
    } else {
      this.activeAnswer = index;
    }
  }

  // Función para abrir el modal
  openModal(): void {
    console.log("clcick", this.showModal)
    this.showModal = true;
  }

  // Función para cerrar el modal
  closeModal(): void {
    this.showModal = false;
  }
}
