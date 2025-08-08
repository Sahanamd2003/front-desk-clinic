import { useAppContext } from '../context/AppContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { logout } = useAppContext();
  const router = useRouter();

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-violet-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-violet-700">
                Clinic Front Desk
              </h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    router.pathname === '/dashboard'
                      ? 'text-blue-violet-800 bg-blue-violet-100'
                      : 'text-blue-violet-600 hover:text-blue-violet-800'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/appointments"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    router.pathname === '/appointments'
                      ? 'text-blue-violet-800 bg-blue-violet-100'
                      : 'text-blue-violet-600 hover:text-blue-violet-800'
                  }`}
                >
                  Appointments
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 