import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ServiciosService } from 'src/services/api/servicio/servicio.service';
import { IServicio } from 'src/models/iservicios.metadata';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-botonagregar',
  templateUrl: './botonagregar.component.html',
  styleUrls: ['./botonagregar.component.css']
})
export class BotonagregarComponent {
  formServicio: FormGroup;
  imagenSeleccionada: File | null = null;
  elementos: FormArray;
  opciones: FormArray;

  constructor(private fb: FormBuilder, private serviciosService: ServiciosService) {
    this.formServicio = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      imagen: [null, Validators.required],
      elementos: this.fb.array([]),
      opciones: this.fb.array([]),
    });
    this.opciones = this.formServicio.get('opciones') as FormArray;
    this.elementos = this.formServicio.get('elementos') as FormArray;
  }



 // Método para agregar un nuevo elemento
 agregarElemento(): void {
  const nuevoElemento = this.fb.group({
    nombre: ['', Validators.required],
  });
  this.elementos.push(nuevoElemento);
  console.log(this.elementos.value); // Verificar el valor del FormArray después de agregar el elemento

}
// Método para agregar una nueva opción
agregaropcion(): void {
  const nuevaOpcion = this.fb.group({
    nombre: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0)]],
  });
  this.opciones.push(nuevaOpcion);
  console.log(this.opciones.value);  // Verificar el valor del FormArray después de agregar la opción
}

  // Método para eliminar un elemento
  eliminarElemento(indice: number): void {
    this.elementos.removeAt(indice);
  }

    // Método para eliminar un elemento
    eliminarOpcion(indice: number): void {
      this.opciones.removeAt(indice);
    }
  
  // Manejo de archivos
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.imagenSeleccionada = input.files[0];
      this.formServicio.patchValue({ imagen: this.imagenSeleccionada });
    }
  }

  // Método para enviar el formulario al backend
  onSubmit(): void {
    if ( this.imagenSeleccionada) {
      // Preparando el objeto para enviar
      const servicio: Partial<IServicio> = {
        titulo: this.formServicio.value.titulo,
        descripcion: this.formServicio.value.descripcion,
        categoria: this.formServicio.value.categoria,
        precio: this.formServicio.value.precio,
        // Obtener los elementos correctamente
        elementos: this.elementos.controls.map((el: any) => el.value.nombre),

        opciones: this.formServicio.value.opciones.map((el: any) => ({
          nombre: el.nombre,
          precio: el.precio,
          seleccionada: false, // o cualquier valor por defecto que desees
        }))
        
      };
  
      // Enviando el formulario con los datos
      this.serviciosService.createServicioConImagen(servicio, this.imagenSeleccionada)
        .subscribe({
          next: (response) => {
            console.log('Servicio creado:', response);
            Swal.fire({
              icon: 'success',
              title: '¡Servicio creado!',
              text: 'El servicio ha sido creado con éxito.',
              confirmButtonText: 'Aceptar',
            });
            this.formServicio.reset();
          },
          error: (err) => {
            console.error('Error al crear el servicio:', err);
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Hubo un problema al crear el servicio.',
              confirmButtonText: 'Intentar nuevamente',
            });
          },
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, complete todos los campos correctamente.',
        confirmButtonText: 'Aceptar',
      });
    }
  }
  
  

}

