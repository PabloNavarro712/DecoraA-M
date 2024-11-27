import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ServiciosService, Servicio } from '../../servises/servicio.service';
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

      if (this.servicios.length > 0) {
        this.seleccionarServicio(this.servicios[0]);
      }
    });
  }

  seleccionarServicio(servicio: Servicio) {
    this.servicioSeleccionado = servicio;
    this.servicioForm.patchValue({
      titulo: servicio.titulo,
      descripcion: servicio.descripcion,
      precio: servicio.precio,
      imagen: servicio.imagen
    });
    this.cargarElementos(servicio.elementos || []);
    this.cargarOpciones(servicio.opciones || []);
  }

  abrirModal(servicio: Servicio) {
    console.log('Editando servicio con ID:', servicio.id);
    this.servicioSeleccionado = servicio; // Actualiza el servicio seleccionado
   }
  
  
  cerrarModal() {
    this.servicioSeleccionado = null; // Limpia el servicio seleccionado
  }

  cargarElementos(elementos: string[]) {
    const elementosFormArray = this.servicioForm.get('elementos') as FormArray;
    while (elementosFormArray.length) {
      elementosFormArray.removeAt(0);
    }
    elementos.forEach(elemento => {
      elementosFormArray.push(this.fb.control(elemento, Validators.required));
    });
  }

  cargarOpciones(opciones: { nombre: string; precio: number }[]) {
    const opcionesFormArray = this.servicioForm.get('opciones') as FormArray;
    while (opcionesFormArray.length) {
      opcionesFormArray.removeAt(0);
    }
    opciones.forEach(opcion => {
      opcionesFormArray.push(this.fb.group({
        nombre: [opcion.nombre, Validators.required],
        precio: [opcion.precio, Validators.required]
      }));
    });
  }

  guardarServicio() {
    if (this.servicioSeleccionado) {
      const servicioActualizado: Servicio = {
        id: this.servicioSeleccionado.id,
        ...this.servicioForm.value
      };

      this.serviciosService.updateServicio(servicioActualizado.id || '', servicioActualizado).subscribe(() => {
        alert('Servicio actualizado correctamente');
        this.cargarServicios();
        this.cerrarModal(); // Cerrar el modal tras guardar
      });
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.serviciosService.uploadImage(file).subscribe(
        response => {
          this.servicioForm.patchValue({ imagen: response.imageUrl });
          this.imagenPreview = response.imageUrl;
        },
        error => {
          console.error('Error al subir la imagen:', error);
        }
      );
    }
  }
}
