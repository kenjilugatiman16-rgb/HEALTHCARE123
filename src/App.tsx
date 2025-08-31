import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          🏥 Healthcare System
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Welcome to the Healthcare Management System
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            System Status
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Patient Management:</span>
              <span className="text-green-600">✅ Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Appointment Booking:</span>
              <span className="text-green-600">✅ Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Medical Records:</span>
              <span className="text-green-600">✅ Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Admin Panel:</span>
              <span className="text-green-600">✅ Active</span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Deployment Status:</strong> Successfully deployed to GitHub Pages!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}