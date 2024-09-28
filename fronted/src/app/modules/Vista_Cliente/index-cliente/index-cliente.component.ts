import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service'; 

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent {
  constructor(public authService: AuthService) {}

}
