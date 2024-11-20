
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ServiciosService } from 'src/app/Data/Services/servicio.service';
import { Servicio } from 'src/app/Data/Interfaces/servicio';
import * as $ from 'jquery';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit { 
  servicioForm: FormGroup;
  servicios: Servicio[] = [];
  servicioSeleccionado: Servicio | null = null;
  mostrarCrearForm = false;
  imagenPreview: string | null = null;

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
  
      // Si hay servicios cargados, seleccionamos el primero para editar
      if (this.servicios.length > 0) {
        this.seleccionarServicio(this.servicios[0]);
      }
    });
  }
  
  seleccionarServicio(servicio: Servicio) {
    // Cargar los datos del servicio en el formulario
    this.servicioSeleccionado = servicio;
    this.servicioForm.patchValue({
      titulo: servicio.titulo,
      descripcion: servicio.descripcion,
      precio: servicio.precio,
      imagen: servicio.imagen
    });

    // Cargar los elementos y opciones si existen
    this.cargarElementos(servicio.elementos);
    this.cargarOpciones(servicio.opciones);
  }

  cargarElementos(elementos: string[]) {
    const elementosFormArray = this.servicioForm.get('elementos') as FormArray;
    // Limpiar elementos anteriores
    while (elementosFormArray.length) {
      elementosFormArray.removeAt(0);
    }
    // Agregar los nuevos elementos
    elementos.forEach(elemento => {
      elementosFormArray.push(this.fb.control(elemento, Validators.required));
    });
  }

  cargarOpciones(opciones: { nombre: string, precio: number, seleccionada: boolean }[]) {
    const opcionesFormArray = this.servicioForm.get('opciones') as FormArray;
    // Limpiar opciones anteriores
    while (opcionesFormArray.length) {
      opcionesFormArray.removeAt(0);
    }
    // Agregar las nuevas opciones
    opciones.forEach(opcion => {
      opcionesFormArray.push(this.fb.group({
        nombre: [opcion.nombre, Validators.required],
        precio: [opcion.precio, Validators.required]
      }));
    });
  }

  agregarElemento() {
    this.elementos.push(this.fb.control('', Validators.required));
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

  confirmarGuardado() {
    if (confirm('¿Está seguro de que desea guardar los cambios?')) {
      this.guardarServicio();
    }
  }

  guardarServicio() {
    if (this.servicioSeleccionado) {
      const servicioActualizado: Servicio = {
        id: this.servicioSeleccionado.id,
        ...this.servicioForm.value
      };

      this.serviciosService.updateServicio(servicioActualizado.id || '', servicioActualizado).subscribe(() => {
        alert('Servicio actualizado correctamente');
        this.cargarServicios(); // Recargar la lista de servicios
      });
    }
  }

  toggleCrearForm() {
    this.mostrarCrearForm = !this.mostrarCrearForm;
    if (this.mostrarCrearForm) {
      // Mostrar el modal
      $('#crearServicioModal').modal('show');
    } else {
      $('#crearServicioModal').modal('hide');
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Primero subimos la imagen
      this.serviciosService.uploadImage(file).subscribe(
        response => {
          // Una vez obtenemos la URL de la imagen subida
          this.servicioForm.patchValue({
            imagen: response.imageUrl // Asignamos la URL al formulario
          });
          this.imagenPreview = response.imageUrl; // Actualizamos la vista previa de la imagen
        },
        error => {
          console.error('Error al subir la imagen:', error);
        }
      );
    }
  }
  

  eliminarServicio(id: string): void {
    if (confirm('¿Está seguro de que desea eliminar este servicio?')) {
      this.serviciosService.deleteServicio(id).subscribe(() => {
        this.cargarServicios(); // Recargar la lista de servicios después de eliminar
      });
    }
  }
}  