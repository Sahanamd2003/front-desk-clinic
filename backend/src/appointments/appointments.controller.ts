import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AppointmentsService, CreateAppointmentDto, UpdateAppointmentDto } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Get()
  async findAll() {
    return this.appointmentsService.findAll();
  }

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    console.log('Received appointment creation request:', createAppointmentDto);
    try {
      const result = await this.appointmentsService.create(createAppointmentDto);
      console.log('Appointment created successfully:', result);
      return result;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }
} 