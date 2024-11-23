import { Module } from '@nestjs/common';
import { GaleriaService } from 'src/service/galery.service';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { GaleriaController } from 'src/controller/galery.controller';

@Module({
  imports: [FirestoreModule],
  providers: [GaleriaService],
  controllers: [GaleriaController],
})
export class GaleriaModule {}
