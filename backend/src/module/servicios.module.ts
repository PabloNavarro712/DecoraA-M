import { Module } from '@nestjs/common';
import { ServiciosService } from 'src/service/servicios.service';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { ServiciosController } from 'src/controller/servicios.controller';

@Module({
  imports: [FirestoreModule],
  providers: [ServiciosService],
  controllers: [ServiciosController],
})
export class ServiciosModule {}
