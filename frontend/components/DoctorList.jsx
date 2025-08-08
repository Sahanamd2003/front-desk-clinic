import { useAppContext } from '../context/AppContext';

const DoctorList = () => {
  const { doctors } = useAppContext();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'Off Duty':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Doctors</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.length === 0 ? (
          <p className="text-gray-500 text-center py-8 col-span-full">No doctors available</p>
        ) : (
          doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doctor.status)}`}>
                  {doctor.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{doctor.specialization}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorList; 