import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { IServicio } from 'src/models/iservicios.metadata';
import { ServiciosService } from 'src/services/api/servicio/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-botonagregar',
  templateUrl: './botonagregar.component.html',
  styleUrls: ['./botonagregar.component.css']
})
export class BotonagregarComponent {
  imagenInvalida: boolean = false;
  productoForm: FormGroup;
  selectedFile: File | null = null;
  showCancelModal = false;
  constructor(
    private fb: FormBuilder, 
    private serviciosService: ServiciosService
  ) {
    this.productoForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      elementos: this.fb.array([], Validators.required),
      precio: [ [Validators.required, Validators.min(0)]],

      opciones: this.fb.array([], Validators.required)
    });

  }

  get elementosArray() {
    return this.productoForm.get('elementos') as FormArray;
  }

  get opcionesArray() {
    return this.productoForm.get('opciones') as FormArray;
  }

  agregarElemento(elemento: string) {
    if (elemento.trim()) {
      this.elementosArray.push(this.fb.control(elemento.trim()));
    }
  }

  eliminarElemento(index: number) {
    this.elementosArray.removeAt(index);
  }

  agregarOpcion(nombre: string, precio: number) {
    if (nombre.trim() && precio >= 0) {
      const opcionGroup = this.fb.group({
        nombre: [nombre.trim(), Validators.required],
        precio: [precio, [Validators.required, Validators.min(0)]],
        seleccionada: [false]
      });
      this.opcionesArray.push(opcionGroup);
    }
  }
 // Función para abrir el modal
 openModal(): void {
  this.showCancelModal = true;
}


  // Función para cerrar el modal
  closeCancelModal(): void {
    this.showCancelModal = false;

  }

  eliminarOpcion(index: number) {
    this.opcionesArray.removeAt(index);
  }

  calcularPrecioTotal() {
    const precioBase = this.productoForm.get('precio')?.value || 0;
    const opciones = this.opcionesArray.controls;
    
    const precioOpciones = opciones
      .filter(opcion => opcion.get('seleccionada')?.value)
      .reduce((total, opcion) => total + opcion.get('precio')?.value, 0);

    const precioTotal = precioBase + precioOpciones;
    this.productoForm.patchValue({ precioTotal }, { emitEvent: false });
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.imagenInvalida = false;
    } else {
      this.selectedFile = null;
      this.imagenInvalida = true;
    }
  }

  onSubmit() {
    if (this.productoForm.valid && this.selectedFile) {
      // Convertir FormArrays a arrays planos
      const elementos = this.elementosArray.value
        .map((elemento: string) => elemento.trim())
        .filter(Boolean);
  
      const opciones = this.opcionesArray.value.map((opcion: any) => ({
        nombre: opcion.nombre.trim(),
        precio: opcion.precio,
        seleccionada: opcion.seleccionada,
      }));
  
      const servicioData = {
        titulo: this.productoForm.get('titulo')?.value,
        descripcion: this.productoForm.get('descripcion')?.value,
        categoria: this.productoForm.get('categoria')?.value,
        precio: this.productoForm.get('precio')?.value,
        precioTotal: this.productoForm.get('precioTotal')?.value || this.productoForm.get('precio')?.value,
        elementos: elementos,
        opciones: opciones,
        mostrarOpciones: false,
      };
  
      // Asegúrate de pasar tanto el servicioData como la imagen (selectedFile)
      this.serviciosService.createServicioConImagen(servicioData, this.selectedFile).subscribe(
        (response) => {
          Swal.fire({
            title: 'Servicio agregado',
            text: 'El servicio ha sido agregado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.resetForm();
          this.closeCancelModal()
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al agregar el servicio.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          console.error('Error:', error);
        }
      );
    } else {
      this.imagenInvalida = !this.selectedFile;
      this.productoForm.markAllAsTouched();
    }
  }
  
  
  // Método para validar si el archivo es una imagen válida
  private isValidImage(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validTypes.includes(file.type);
  }
  
  // Método para resetear el formulario completamente
  resetForm() {
    this.productoForm.reset();
    this.elementosArray.clear();
    this.opcionesArray.clear();
    this.selectedFile = null;
    this.imagenInvalida = false;
  }
}