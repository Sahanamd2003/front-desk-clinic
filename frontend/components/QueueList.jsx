import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const QueueList = () => {
  const { queue, updateQueueStatus, addToQueue, deleteFromQueue } = useAppContext();
  const [newPatient, setNewPatient] = useState('');
  const [newPriority, setNewPriority] = useState('Normal');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddPatient = async (e) => {
    e.preventDefault();
    if (newPatient.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await addToQueue(newPatient.trim(), newPriority);
        setNewPatient('');
        setNewPriority('Normal');
        console.log('Patient added successfully!');
      } catch (error) {
        console.error('Error adding patient to queue:', error);
        alert('Failed to add patient to queue. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'With Doctor':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    return priority === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Queue Management</h2>
      
      {/* Add New Patient Form */}
      <form onSubmit={handleAddPatient} className="mb-6 p-4 bg-blue-violet-50 rounded-lg">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              value={newPatient}
              onChange={(e) => setNewPatient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-violet-500"
              placeholder="Enter patient name"
              required
            />
          </div>
          <div className="min-w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-violet-500"
            >
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-violet-600 hover:bg-blue-violet-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding...' : 'Add to Queue'}
          </button>
        </div>
      </form>

      {/* Queue List */}
      <div className="space-y-3">
        {queue.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No patients in queue</p>
        ) : (
          queue.map((patient) => (
            <div
              key={patient.id}
              className="flex flex-wrap items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <div className="text-2xl font-bold text-blue-violet-600">
                  #{patient.id}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{patient.patientName}</h3>
                  <p className="text-sm text-gray-500">
                    Arrived: {new Date(patient.arrivalTime).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(patient.priority)}`}>
                  {patient.priority}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
                <select
                  value={patient.status}
                  onChange={(e) => updateQueueStatus(patient.id, e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-violet-500"
                >
                  <option value="Waiting">Waiting</option>
                  <option value="With Doctor">With Doctor</option>
                  <option value="Completed">Completed</option>
                </select>
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to remove ${patient.patientName} from the queue?`)) {
                      deleteFromQueue(patient.id);
                    }
                  }}
                  className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
                  title="Remove from queue"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QueueList; 