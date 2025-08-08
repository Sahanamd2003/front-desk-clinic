import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Doctor } from '../entities/doctor.entity';
import { DoctorStatus } from '../entities/doctor.entity';
import * as bcrypt from 'bcryptjs';

export async function seedDatabase(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const doctorRepository = dataSource.getRepository(Doctor);

  // Seed users
  const existingUser = await userRepository.findOne({ where: { username: 'admin' } });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = userRepository.create({
      username: 'admin',
      password: hashedPassword,
    });
    await userRepository.save(user);
    console.log('User seeded');
  }

  // Seed doctors
  const doctors = [
    {
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      status: DoctorStatus.AVAILABLE,
    },
    {
      name: 'Dr. Michael Chen',
      specialization: 'Pediatrics',
      status: DoctorStatus.AVAILABLE,
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialization: 'Dermatology',
      status: DoctorStatus.BUSY,
    },
    {
      name: 'Dr. David Thompson',
      specialization: 'Orthopedics',
      status: DoctorStatus.OFF_DUTY,
    },
  ];

  for (const doctorData of doctors) {
    const existingDoctor = await doctorRepository.findOne({
      where: { name: doctorData.name },
    });
    if (!existingDoctor) {
      const doctor = doctorRepository.create(doctorData);
      await doctorRepository.save(doctor);
    }
  }
  console.log('Doctors seeded');
} 