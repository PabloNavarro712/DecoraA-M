import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  // Lista de preguntas y respuestas
  faqs = [
    { question: '¿Puedo cancelar el servicio antes del evento?', answer: 'Sí, ofrecemos un plazo de cancelación de 30 días antes la fecha del evento, con una multa del 30% del precio facturado.' },
    { question: '¿Qué métodos de pago aceptan?', answer: 'Aceptamos efectivo, tarjetas de crédito, débito, PayPal y transferencias bancarias.' },
    { question: '¿Ofrece servicios fuera de la ciudad?', answer: 'Sí, ofrecemos el servicio a otras entidades cercanas a la ciudad de hecelchakan. Contactanos para poder cotizar .' },
    { question: '¿Cómo puedo contactar con atención al cliente?', answer: 'Puedes contactarnos a través de nuestra informacion de contacto en la pagina web' },
    { question: '¿Que tipo de eventos pueden beneficiarse de servicio de M&AS?', answer:'Ofrecemos distintos paquetes de decoracion para bodas, XV años, Fiestas infantiles y cumpleaños.'},
    { question: '¿Solamente existen los 3 tipos de paquetes que ofrecen para cada evente?', answer:'No, puedes escoger un paquete que sea mas adecuado e incluso lo puedes personalizarlo para adecuarlo mas a tus necesidades. ' }
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
}
