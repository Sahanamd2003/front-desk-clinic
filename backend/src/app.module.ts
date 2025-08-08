import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { QueueModule } from "./queue/queue.module";
import { DoctorsModule } from "./doctors/doctors.module";
import { AppointmentsModule } from "./appointments/appointments.module";
import { User } from "./entities/user.entity";
import { Doctor } from "./entities/doctor.entity";
import { Queue } from "./entities/queue.entity";
import { Appointment } from "./entities/appointment.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Sahana@10",
      database: "clinic_db",
      entities: [User, Doctor, Queue, Appointment],
      synchronize: true, // Only for development
    }),
    AuthModule,
    QueueModule,
    DoctorsModule,
    AppointmentsModule,
  ],
})
export class AppModule {}
