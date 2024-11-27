import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ServiciosService } from 'src/app/data/Services/servicio.service';
import { Servicio } from 'src/app/data/Interfaces/servicio';

@Component({
  selector: 'app-botoneditar',
  templateUrl: './botoneditar.component.html',
  styleUrls: ['./botoneditar.component.css']
})
export class BotoneditarComponent {
  servicioForm: FormGroup;
  servicios: Servicio[] = [];
  servicioSeleccionado: Servicio | null = null; // Servicio actualmente seleccionado
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

  cargarServicios() {
    this.serviciosService.getServicios().subscribe((servicios) => {
      this.servicios = servicios;
    });
  }

  abrirModal(servicio?: Servicio) {
    this.modalVisible = true;
    if (servicio) {
      this.servicioSeleccionado = servicio;
      this.servicioForm.patchValue({
        titulo: servicio.titulo,
        descripcion: servicio.descripcion,
        imagen: servicio.imagen,
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
    const servicio: Servicio = {
      ...this.servicioForm.value,
      elementos: this.servicioForm.value.elementos.map((elemento: any) => ({
        nombre: elemento.nombre,
        precio: parseFloat(elemento.precio)
      }))
    };
    if (this.servicioSeleccionado) {
      servicio.id = this.servicioSeleccionado.id;
      this.serviciosService.updateServicio(servicio.id || '', servicio).subscribe(() => {
        alert('Servicio actualizado correctamente');
        this.cargarServicios();
        this.cerrarModal();
      });
    } else {
      this.serviciosService.createServicio(servicio).subscribe(() => {
        alert('Nuevo servicio creado correctamente');
        this.cargarServicios();
        this.cerrarModal();
      });
    }
  }

  get elementos(): FormArray {
    return this.servicioForm.get('elementos') as FormArray;
  }

  agregarElemento() {
    this.elementos.push(this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]]
    }));
  }

  Elementos() {
    this.elementos.push(this.fb.group({
      nombre: ['', Validators.required],
    }));
  }

  eliminarElemento(index: number) {
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

