import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue, QueueStatus, QueuePriority } from '../entities/queue.entity';

export class CreateQueueDto {
  patientName: string;
  priority?: QueuePriority;
}

export class UpdateQueueDto {
  status?: QueueStatus;
  priority?: QueuePriority;
}

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private queueRepository: Repository<Queue>,
  ) {}

  async findAll(): Promise<Queue[]> {
    return this.queueRepository.find({
      order: {
        priority: 'DESC',
        arrivalTime: 'ASC',
      },
    });
  }

  async create(createQueueDto: CreateQueueDto): Promise<Queue> {
    const queue = this.queueRepository.create(createQueueDto);
    return this.queueRepository.save(queue);
  }

  async update(id: number, updateQueueDto: UpdateQueueDto): Promise<Queue> {
    await this.queueRepository.update(id, updateQueueDto);
    return this.queueRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.queueRepository.delete(id);
  }
} 