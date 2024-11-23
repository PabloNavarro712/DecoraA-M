import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-detaller-evento-cliente',
  templateUrl: './detaller-evento-cliente.component.html',
  styleUrls: ['./detaller-evento-cliente.component.css']
})
export class DetallerEventoClienteComponent implements OnInit {
  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.makeDraggable();
  }

  makeDraggable() {
    const element = this.elRef.nativeElement.querySelector('.contenido-detalles');
    let isMouseDown = false;
    let offsetX: number, offsetY: number;

    element.addEventListener('mousedown', (e: MouseEvent) => {
      isMouseDown = true;
      offsetX = e.clientX - element.getBoundingClientRect().left;
      offsetY = e.clientY - element.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (isMouseDown) {
        element.style.left = `${e.clientX - offsetX}px`;
        element.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isMouseDown = false;
    });
  }
}
