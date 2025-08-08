import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { QueueService, CreateQueueDto, UpdateQueueDto } from './queue.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('queue')
@UseGuards(JwtAuthGuard)
export class QueueController {
  constructor(private queueService: QueueService) {}

  @Get()
  async findAll() {
    return this.queueService.findAll();
  }

  @Post()
  async create(@Body() createQueueDto: CreateQueueDto) {
    console.log('Received queue creation request:', createQueueDto);
    try {
      const result = await this.queueService.create(createQueueDto);
      console.log('Queue created successfully:', result);
      return result;
    } catch (error) {
      console.error('Error creating queue:', error);
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateQueueDto: UpdateQueueDto) {
    return this.queueService.update(+id, updateQueueDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.queueService.remove(+id);
  }
} 