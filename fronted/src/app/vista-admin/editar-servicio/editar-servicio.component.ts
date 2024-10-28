import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ServiciosService, Servicio } from '../../servises/servicio.service';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {
  servicioForm: FormGroup;
  servicios: Servicio[] = [];
  editandoServicio: Servicio | null = null;
  mostrarCrearForm = false;
  imagenPreview: string | null = null;
  elementosExpandido: boolean = false;
  opcionesExpandido: boolean = false;

  toggleElementos(): void {
    this.elementosExpandido = !this.elementosExpandido;
  }

  toggleOpciones(): void {
    this.opcionesExpandido = !this.opcionesExpandido;
  }


  constructor(private fb: FormBuilder, private serviciosService: ServiciosService) {
    this.servicioForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      precio: ['', Validators.required],
      elementos: this.fb.array([]),
      opciones: this.fb.array([])
    });
  }

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    this.serviciosService.getServicios().subscribe(servicios => {
      this.servicios = servicios;
    });
  }

  agregarElemento() {
    const elemento = this.fb.control('', Validators.required);
    this.elementos.push(elemento);
  }

  eliminarElemento(index: number) {
    this.elementos.removeAt(index);
  }

  get elementos(): FormArray {
    return this.servicioForm.get('elementos') as FormArray;
  }

  agregarOpcion() {
    const opcion = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.opciones.push(opcion);
  }

  eliminarOpcion(index: number) {
    this.opciones.removeAt(index);
  }

  get opciones(): FormArray {
    return this.servicioForm.get('opciones') as FormArray;
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.serviciosService.uploadImage(file).subscribe({
        next: response => {
          this.servicioForm.get('imagen')?.setValue(response.imageUrl);
        },
        error: error => console.error('Error al subir la imagen:', error)
      });
    }
  }

  guardarServicio() {
    if (this.servicioForm.valid) {
      const servicio: Servicio = this.servicioForm.value;
      if (this.editandoServicio) {
        this.serviciosService.updateServicio(this.editandoServicio.id!, servicio).subscribe({
          next: () => this.cargarServicios(),
          error: error => console.error('Error al actualizar:', error)
        });
      } else {
        this.serviciosService.createServicio(servicio).subscribe({
          next: () => this.cargarServicios(),
          error: error => console.error('Error al crear:', error)
        });
      }
      this.resetForm();
    }
  }

  editarServicio(servicio: Servicio) {
    this.editandoServicio = servicio;
    this.servicioForm.patchValue({
      titulo: servicio.titulo,
      descripcion: servicio.descripcion,
      imagen: servicio.imagen,
      precio: servicio.precio
    });
    this.imagenPreview = servicio.imagen;
    
  
    // Limpiamos los FormArrays para evitar duplicados
    this.elementos.clear();
    this.opciones.clear();
  
    // Rellenamos los elementos
    servicio.elementos.forEach(elemento => {
      this.elementos.push(this.fb.control(elemento, Validators.required));
    });
  
    // Rellenamos las opciones
    servicio.opciones.forEach(opcion => {
      const opcionGroup = this.fb.group({
        nombre: [opcion.nombre, Validators.required],
        precio: [opcion.precio, Validators.required]
      });
      this.opciones.push(opcionGroup);
    });
  }
  

  eliminarServicio(id: string) {
    this.serviciosService.deleteServicio(id).subscribe({
      next: () => this.cargarServicios(),
      error: error => console.error('Error al eliminar:', error)
    });
  }

  toggleCrearForm() {
    this.mostrarCrearForm = !this.mostrarCrearForm;
    this.resetForm();
  }

  resetForm() {
    this.servicioForm.reset();
    this.editandoServicio = null;
    this.imagenPreview = null;
    this.elementos.clear();
    this.opciones.clear();
  }
}
