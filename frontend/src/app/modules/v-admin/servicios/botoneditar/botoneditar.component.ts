import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ServiciosService } from 'src/services/api/servicio/servicio.service';
import { IServicio } from 'src/models/iservicios.metadata';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-botoneditar',
  templateUrl: './botoneditar.component.html',
  styleUrls: ['./botoneditar.component.css']
})
export class BotoneditarComponent {
  servicioForm: FormGroup;
  servicios: IServicio[] = [];
  servicioSeleccionado: IServicio | null = null; // Servicio actualmente seleccionado
  modalVisible: boolean = false; // Controla si el modal es visible
  categorias: string[] = ['XV', 'Boda', 'Bautizo', 'Fiesta Infantil']; // Categorías disponibles

  constructor(
    private fb: FormBuilder,
    private serviciosService: ServiciosService,
    private cdr: ChangeDetectorRef
  ) {
    this.servicioForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      elementos: this.fb.array([]) // Inicializa el FormArray para elementos
    });
  }

  ngOnInit() {
    this.cargarServicios();
  }

 // Cargar todos los servicios
cargarServicios(): void {
  this.serviciosService.getAll().subscribe({
    next: (response) => {
      if (response.error) {
        Swal.fire('Error', response.msg, 'error');
      } else {
        this.servicios = response.data || [];
      }
    },
    error: (error) => {
      Swal.fire('Error', 'Hubo un problema al cargar los servicios.', 'error');
      console.error('Error al cargar los servicios:', error);
    }
  });
}

  abrirModal(servicio?: IServicio) {
    this.modalVisible = true;
    if (servicio) {
      this.servicioSeleccionado = servicio;
      this.servicioForm.patchValue({
        titulo: servicio.titulo,
        descripcion: servicio.descripcion,
        imagen: servicio.imageUrl,
        precio: servicio.precio,
        categoria: servicio.categoria
      });
      const elementosControl = this.servicioForm.get('elementos') as FormArray;
      elementosControl.clear();
      servicio.elementos?.forEach((elemento) => {
        
      });
    } else {
      this.servicioSeleccionado = null;
      this.servicioForm.reset();
      (this.servicioForm.get('elementos') as FormArray).clear();
    }
  }

  cerrarModal() {
    this.modalVisible = false;
    this.servicioSeleccionado = null;
  }

  guardarServicio() {
    const servicio: IServicio = {
      ...this.servicioForm.value,
      elementos: this.servicioForm.value.elementos.map((elemento: any) => ({
        nombre: elemento.nombre,
        precio: parseFloat(elemento.precio)
      }))
    };
    // if (this.servicioSeleccionado) {
    //   servicio.id = this.servicioSeleccionado.id;
    //   this.serviciosService.updateServicio(servicio.id || '', servicio).subscribe(() => {
    //     alert('Servicio actualizado correctamente');
    //     this.cargarServicios();
    //     this.cerrarModal();
    //   });
    // } else {
    //   this.serviciosService.createServicio(servicio).subscribe(() => {
    //     alert('Nuevo servicio creado correctamente');
    //     this.cargarServicios();
    //     this.cerrarModal();
    //   });
    // }
  }

  get elementos(): FormArray {
    return this.servicioForm.get('elementos') as FormArray;
  }

  agregarElemento(): void {
    const nuevoElemento = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
    });
    this.elementos.push(nuevoElemento);
  }
  Elementos() {
    this.elementos.push(this.fb.group({
      nombre: ['', Validators.required],
    }));
  }

  eliminarElemento(index: number): void {
    this.elementos.removeAt(index);
  }

  cargarImagen(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.servicioForm.patchValue({ imagen: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }
}

