import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-agregar-servicio-admin',
  templateUrl: './agregar-servicio-admin.component.html',
  styleUrls: ['./agregar-servicio-admin.component.css']
})
export class AgregarServicioAdminComponent {
  formServicio: FormGroup;
  categorias: string[] = ['Decoración', 'Mobiliario', 'Iluminación'];

  constructor(private fb: FormBuilder) {
    this.formServicio = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      imagen: [null],
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.formServicio.patchValue({ imagen: input.files[0] });
    }
  }

  onSubmit(): void {
    if (this.formServicio.valid) {
      console.log('Formulario válido:', this.formServicio.value);
      // Aquí puedes emitir el evento o llamar a un servicio para enviar los datos
    }
  }
}
