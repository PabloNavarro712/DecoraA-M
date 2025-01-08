import { Module } from '@nestjs/common';

import { AppService } from 'src/service/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirestoreModule } from 'src/firestore/firestore.module'; // Importa el módulo de Firestore
import { GraficasModule } from './graficas.module';
import { ServiciosModule } from './servicios.module';
import { UsuariosModule } from './usuarios.module';
import { EventosModule } from './eventos.module';
import { GaleriaModule } from './galery.module';

import { GenericService } from 'src/shared/generic.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Configura el módulo de configuración como global
      envFilePath: '.env',
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule], // Asegúrate de importar el módulo de configuración aquí
      useFactory: (configService: ConfigService) => {
        const keyFile = configService.get<string>('SA_KEY');
        console.log('Using Firebase key file:', keyFile); // Para verificar la ruta del archivo
        return { keyFilename: keyFile };
      },
      inject: [ConfigService], // Inyecta el servicio de configuración
    }),
    // Importa todos los módulos necesarios
    ServiciosModule,
    UsuariosModule,
    GaleriaModule,
    EventosModule,
    GraficasModule,
  ],
  controllers: [], // Controladores de la aplicación
  providers: [AppService, GenericService], // Servicios de la aplicación
})
export class AppModule {}
