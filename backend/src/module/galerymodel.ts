import { Module } from '@nestjs/common';
import { GaleryService } from 'src/service/galery.service'; // Ajusta el path según tu estructura
import { FirestoreModule } from 'src/firestore/firestore.module'; // Ajusta el path según tu estructura
import { GaleryController } from 'src/controller/galery.controller'; // Ajusta el path según tu estructura

@Module({
  imports: [FirestoreModule],
  providers: [GaleryService],
  controllers: [GaleryController],
})
export class GaleryModule {}