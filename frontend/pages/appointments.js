import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import AppointmentList from '../components/AppointmentList';
import ScheduleAppointmentModal from '../components/ScheduleAppointmentModal';

export default function Appointments() {
  const { isAuthenticated, fetchAppointments, fetchDoctors } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    // Fetch data when component mounts
    fetchAppointments();
    fetchDoctors();
  }, [isAuthenticated, router, fetchAppointments, fetchDoctors]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="mt-2 text-gray-600">Manage and schedule patient appointments</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 sm:mt-0 bg-blue-violet-600 hover:bg-blue-violet-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Schedule New Appointment
          </button>
        </div>

        <AppointmentList />
      </div>

      <ScheduleAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
} 