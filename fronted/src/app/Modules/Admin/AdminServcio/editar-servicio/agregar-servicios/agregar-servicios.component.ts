import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-agregar-servicios',
  templateUrl: './agregar-servicios.component.html',
  styleUrls: ['./agregar-servicios.component.css']
})
export class AgregarServiciosComponent {
  formServicio: FormGroup;
  categorias: string[] = ['Decoración', 'Mobiliario', 'Iluminación'];

  constructor(private fb: FormBuilder) {
    this.formServicio = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      imagen: [null],
      elementosPaquete: this.fb.array([])  // FormArray vacío inicialmente
    });
  }

  // Getter para acceder al FormArray
  get elementosPaquete(): FormArray {
    return this.formServicio.get('elementosPaquete') as FormArray;
  }

  // Método para agregar un nuevo paquete
  agregarElemento(): void {
    const nuevoElemento = this.fb.group({
      nombre: ['']  // No se valida por ahora
    });
    this.elementosPaquete.push(nuevoElemento);

    // Deshabilitar la validación cuando no hay elementos, solo si el array está vacío
    if (this.elementosPaquete.length === 1) {
      this.formServicio.get('elementosPaquete')?.clearValidators();
      this.formServicio.get('elementosPaquete')?.updateValueAndValidity();
    }
  }

  // Método para eliminar un paquete
  eliminarElemento(indice: number): void {
    this.elementosPaquete.removeAt(indice);
  }

  // Método para manejar la subida de archivos
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.formServicio.patchValue({ imagen: input.files[0] });
    }
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.formServicio.valid) {
      console.log('Formulario válido:', this.formServicio.value);
      // Aquí puedes conectar el formulario con el backend
    } else {
      console.error('Formulario inválido');
    }
  }
}

