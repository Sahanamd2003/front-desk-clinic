import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from '../entities/appointment.entity';
import { Doctor } from '../entities/doctor.entity';

export class CreateAppointmentDto {
  patientName: string;
  doctorId: number;
  time: string | Date;
}

export class UpdateAppointmentDto {
  status?: AppointmentStatus;
}

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: ['doctor'],
      order: {
        time: 'ASC',
      },
    });
  }

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    console.log('Creating appointment with data:', createAppointmentDto);
    
    // Validate required fields
    if (!createAppointmentDto.patientName || !createAppointmentDto.doctorId || !createAppointmentDto.time) {
      throw new BadRequestException('Patient name, doctor ID, and time are required');
    }
    
    const doctor = await this.doctorRepository.findOne({
      where: { id: createAppointmentDto.doctorId },
    });

    if (!doctor) {
      console.error('Doctor not found with ID:', createAppointmentDto.doctorId);
      throw new NotFoundException(`Doctor with ID ${createAppointmentDto.doctorId} not found`);
    }

    console.log('Found doctor:', doctor);

    // Convert string time to Date if needed
    const appointmentTime = typeof createAppointmentDto.time === 'string' 
      ? new Date(createAppointmentDto.time) 
      : createAppointmentDto.time;

    console.log('Appointment time:', appointmentTime);

    // Validate the date
    if (isNaN(appointmentTime.getTime())) {
      throw new BadRequestException('Invalid appointment time');
    }

    const appointment = this.appointmentRepository.create({
      patientName: createAppointmentDto.patientName,
      doctor: doctor,
      time: appointmentTime,
    });

    console.log('Created appointment entity:', appointment);

    const savedAppointment = await this.appointmentRepository.save(appointment);
    console.log('Saved appointment:', savedAppointment);
    
    return savedAppointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    await this.appointmentRepository.update(id, updateAppointmentDto);
    return this.appointmentRepository.findOne({
      where: { id },
      relations: ['doctor'],
    });
  }
} 