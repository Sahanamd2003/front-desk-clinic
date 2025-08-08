import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedDatabase } from './database/seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  
  // Seed database
  const dataSource = app.get(DataSource);
  await seedDatabase(dataSource);
  
  await app.listen(3001);
  console.log('Clinic Management Backend running on port 3001');
}
bootstrap(); 