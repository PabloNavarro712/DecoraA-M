import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-controls',
  templateUrl: './carousel-controls.component.html',
  styleUrls: ['./carousel-controls.component.css']
})
export class CarouselControlsComponent {
  @Input() target: string = '';
}
