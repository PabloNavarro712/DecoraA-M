import { Component } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  currentYear: number = new Date().getFullYear();
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  // Bandera para manejar el estado de colapso
  isCollapsed: boolean = true;

  // Genera los días del mes específico (0 = Enero, 1 = Febrero, etc.)
  getDaysInMonth(month: number): number[] {
    const daysInMonth = new Date(this.currentYear, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  // Calcula el offset (espacios vacíos) para alinear los días del mes correctamente
  getFirstDayOffset(month: number): null[] {
    const firstDay = new Date(this.currentYear, month, 1).getDay();
    return Array(firstDay).fill(null);
  }

  // Cambia al año anterior
  prevYear(): void {
    this.currentYear--;
  }

  // Cambia al siguiente año
  nextYear(): void {
    this.currentYear++;
  }

  // Verifica si la fecha es hoy
  isToday(day: number, month: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      this.currentYear === today.getFullYear()
    );
  }

  // Muestra una alerta con la fecha seleccionada (puedes personalizar esta función)
  selectDate(day: number, month: number): void {
    const selectedDate = `${day} de ${this.months[month]} de ${this.currentYear}`;
    alert(`Fecha seleccionada: ${selectedDate}`);
  }

  // Función para alternar el estado de colapso
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
