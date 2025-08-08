import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import QueueList from '../components/QueueList';
import DoctorList from '../components/DoctorList';

export default function Dashboard() {
  const { isAuthenticated, fetchQueue, fetchDoctors } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    // Fetch data when component mounts
    fetchQueue();
    fetchDoctors();
  }, [isAuthenticated, router, fetchQueue, fetchDoctors]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your clinic's queue and view available doctors</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <QueueList />
          </div>
          <div className="lg:col-span-1">
            <DoctorList />
          </div>
        </div>
      </div>
    </div>
  );
} 