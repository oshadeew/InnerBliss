import { useState, useEffect } from 'react';
import { getDoctors } from '../api/axios';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors().then(res => setDoctors(res.data)).catch(() => {});
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-pink-500 bg-clip-text text-transparent">👨‍⚕️ Mental Health Professionals</h1>
        <p className="text-gray-500 mt-2">Connect with qualified professionals for support</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="glass-card p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-pink-400 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
                <p className="text-sm text-primary-600 font-medium">{doctor.specialization}</p>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiPhone className="w-4 h-4" /> Not provided
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiMail className="w-4 h-4" /> Not provided
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiMapPin className="w-4 h-4" /> Not provided
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className={`text-xs font-medium ${doctor.available ? 'text-green-600' : 'text-gray-400'}`}>
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
