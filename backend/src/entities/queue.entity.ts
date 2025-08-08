import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum QueueStatus {
  WAITING = 'Waiting',
  WITH_DOCTOR = 'With Doctor',
  COMPLETED = 'Completed',
}

export enum QueuePriority {
  NORMAL = 'Normal',
  URGENT = 'Urgent',
}

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column({
    type: 'enum',
    enum: QueueStatus,
    default: QueueStatus.WAITING,
  })
  status: QueueStatus;

  @Column({
    type: 'enum',
    enum: QueuePriority,
    default: QueuePriority.NORMAL,
  })
  priority: QueuePriority;

  @CreateDateColumn()
  arrivalTime: Date;
} 