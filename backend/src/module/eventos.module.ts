import { Module } from '@nestjs/common';
import { EventosService } from 'src/service/eventos.service';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { EventosController } from 'src/controller/eventos.controller';

@Module({
  imports: [FirestoreModule],
  providers: [EventosService],
  controllers: [EventosController],
})
export class EventosModule {}
