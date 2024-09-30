import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GaleryService } from 'src/service/galery.service'; // Ajusta el path según tu estructura
import { GaleryDocument } from 'src/todos/document/galery.document'; // Ajusta el path según tu estructura

@Controller('api/galery')
export class GaleryController {
  constructor(private readonly galeryService: GaleryService) {}

  @Get()
  async findAll(): Promise<GaleryDocument[]> {
    return await this.galeryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<GaleryDocument> {
    return await this.galeryService.findById(id);
  }

  @Post('/')
  async create(@Body() galery: GaleryDocument): Promise<GaleryDocument> {
    return await this.galeryService.create(galery);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() galery: Partial<GaleryDocument>): Promise<void> {
    await this.galeryService.update(id, galery);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.galeryService.delete(id);
  }
}
