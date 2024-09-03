import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Practica1Controller } from './practica-1/practica-1.controller';
import { MyServiceService } from './my-service/my-service.service';
import { MyModuleModule } from './my-module/my-module.module';

@Module({
  imports: [MyModuleModule],
  controllers: [AppController, Practica1Controller],
  providers: [AppService, MyServiceService],
})
export class AppModule {}
