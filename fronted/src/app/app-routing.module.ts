import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar componentes que serán las secciones
import { InicioComponent } from './modules/Vista_Cliente/inicio/inicio.component';
import { BodasComponent } from './modules/Vista_Cliente/bodas/bodas.component';
import { XvanosComponent } from './modules/Vista_Cliente/xvanos/xvanos.component';
import { CumpleanosComponent } from './modules/Vista_Cliente/cumpleanos/cumpleanos.component';
import { BabyshowerComponent } from './modules/Vista_Cliente/babyshower/babyshower.component';
import { FiestasTematicasComponent } from './modules/Vista_Cliente/fiestas-tematicas/fiestas-tematicas.component';
import { OtrosServiciosComponent } from './modules/Vista_Cliente/otros-servicios/otros-servicios.component';
import { GaleriaComponent } from './modules/Vista_Cliente/galeria/galeria.component';
import { TestimoniosComponent } from './modules/Vista_Cliente/testimonios/testimonios.component';
import { SobreNosotrosComponent } from './modules/Vista_Cliente/sobre-nosotros/sobre-nosotros.component';
import { ContactoComponent } from './modules/Vista_Cliente/contacto/contacto.component';
import { CotizacionComponent } from './modules/Vista_Cliente/cotizacion/cotizacion.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'bodas', component: BodasComponent },
  { path: 'xvanos', component: XvanosComponent },
  { path: 'cumpleanos', component: CumpleanosComponent },
  { path: 'babyshower', component: BabyshowerComponent },
  { path: 'fiestas-tematicas', component: FiestasTematicasComponent },
  { path: 'otros-servicios', component: OtrosServiciosComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'testimonios', component: TestimoniosComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'cotizacion', component: CotizacionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
