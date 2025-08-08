# Clinic Management System

A complete full-stack clinic management application with Next.js frontend and NestJS backend.

## Project Structure

```
front-desk-system/
├── backend/          # NestJS backend
│   ├── src/
│   │   ├── auth/     # Authentication module
│   │   ├── queue/    # Queue management
│   │   ├── doctors/  # Doctor management
│   │   ├── appointments/ # Appointment management
│   │   └── entities/ # TypeORM entities
│   └── package.json
└── frontend/         # Next.js frontend
    ├── components/   # React components
    ├── context/      # React Context
    ├── pages/        # Next.js pages
    └── package.json
```

## Features

### Backend (NestJS)
- **Authentication**: JWT-based authentication
- **Queue Management**: Add, update, and manage patient queue
- **Doctor Management**: View doctor status and information
- **Appointment Management**: Schedule and manage appointments
- **Database**: MySQL with TypeORM
- **API**: RESTful endpoints with JWT protection

### Frontend (Next.js)
- **Authentication**: Login/logout functionality
- **Dashboard**: Real-time queue and doctor status
- **Queue Management**: Add patients, update status, set priority
- **Appointment Management**: Schedule and manage appointments
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Clean, professional design with Tailwind CSS

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up MySQL database:
   - Create a database named `clinic_db`
   - Update database credentials in `src/app.module.ts` if needed

4. Start the backend:
```bash
npm run start:dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Default Login Credentials
- **Username**: `admin`
- **Password**: `admin123`

## API Endpoints

### Authentication
- `POST /auth/login` - Login with username and password

### Queue Management
- `GET /queue` - Get all patients in queue
- `POST /queue` - Add new patient to queue
- `PATCH /queue/:id` - Update queue status/priority

### Doctors
- `GET /doctors` - Get all doctors

### Appointments
- `GET /appointments` - Get all appointments
- `POST /appointments` - Create new appointment
- `PATCH /appointments/:id` - Update appointment status

## Technologies Used

### Backend
- **NestJS**: Framework for building scalable server-side applications
- **TypeORM**: Object-Relational Mapping for database operations
- **MySQL**: Database
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing

### Frontend
- **Next.js**: React framework with Pages Router
- **React Context API**: State management
- **Tailwind CSS**: Utility-first CSS framework
- **Fetch API**: HTTP requests

## Database Schema

### Users
- `id` (Primary Key)
- `username` (Unique)
- `password` (Hashed)

### Doctors
- `id` (Primary Key)
- `name`
- `specialization`
- `status` (Available, Busy, Off Duty)

### Queue
- `id` (Primary Key)
- `patientName`
- `status` (Waiting, With Doctor, Completed)
- `priority` (Normal, Urgent)
- `arrivalTime`

### Appointments
- `id` (Primary Key)
- `patientName`
- `doctor` (Foreign Key to Doctors)
- `time`
- `status` (Booked, Completed, Canceled)

## Development

### Backend Development
```bash
cd backend
npm run start:dev  # Development mode with hot reload
npm run build      # Build for production
npm run start      # Start production server
```

### Frontend Development
```bash
cd frontend
npm run dev        # Development mode
npm run build      # Build for production
npm run start      # Start production server
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. 