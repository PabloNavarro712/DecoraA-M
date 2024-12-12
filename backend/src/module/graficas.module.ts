import { Module } from '@nestjs/common';
import { GraficasService } from '../service/graficas.service';
import { GraficasController } from 'src/controller/graficas.controller';

@Module({
  controllers: [GraficasController],
  providers: [
    {
      provide: 'COLLECTION_NAME',
      useValue: 'eventos', // Nombre de la colección Firestore
    },
    {
      provide: GraficasService,
      useFactory: (collectionName: string) =>
        new GraficasService(collectionName),
      inject: ['COLLECTION_NAME'],
    },
  ],
})
export class GraficasModule {}
