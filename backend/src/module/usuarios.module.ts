import { Module } from '@nestjs/common';
import { UsuariosService } from 'src/service/usuarios.service';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { UsuariosController } from 'src/controller/usuarios.controller';

@Module({
  imports: [FirestoreModule],
  providers: [UsuariosService],
  controllers: [UsuariosController],
})
export class UsuariosModule {}
