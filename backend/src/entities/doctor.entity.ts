import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';

export enum DoctorStatus {
  AVAILABLE = 'Available',
  BUSY = 'Busy',
  OFF_DUTY = 'Off Duty',
}

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @Column({
    type: 'enum',
    enum: DoctorStatus,
    default: DoctorStatus.AVAILABLE,
  })
  status: DoctorStatus;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];
} 