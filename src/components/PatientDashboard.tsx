import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useApp } from '../App';
import { 
  Calendar, 
  FileText, 
  User, 
  Clock, 
  Heart, 
  LogOut, 
  Plus,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export function PatientDashboard() {
  const { currentUser, logout, setCurrentScreen, appointments, medicalRecords } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProfile, setEditingProfile] = useState(false);

  if (!currentUser) return null;

  const userAppointments = appointments.filter(apt => apt.patientId === currentUser.id);
  const userMedicalRecords = medicalRecords.filter(record => record.patientId === currentUser.id);
  const upcomingAppointments = userAppointments.filter(apt => apt.status === 'scheduled');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-blue-900 font-medium">Patient Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {currentUser.name}</span>
              <Button 
                onClick={() => setCurrentScreen('home')}
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                Home
              </Button>
              <Button 
                onClick={logout}
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-blue-900 mb-1">{currentUser.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{currentUser.email}</p>
                  <Badge className="bg-blue-100 text-blue-800">Patient</Badge>
                </div>
                
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeTab === 'overview' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className="h-4 w-4 inline mr-2" />
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeTab === 'appointments' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Appointments
                  </button>
                  <button
                    onClick={() => setCurrentScreen('medical-records')}
                    className="w-full text-left px-3 py-2 rounded-md transition-colors text-gray-700 hover:bg-gray-100"
                  >
                    <FileText className="h-4 w-4 inline mr-2" />
                    Medical Records
                  </button>
                  <button
                    onClick={() => setCurrentScreen('profile')}
                    className="w-full text-left px-3 py-2 rounded-md transition-colors text-gray-700 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    Profile
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl text-blue-900 mb-2">Dashboard Overview</h1>
                  <p className="text-gray-600">Manage your healthcare journey</p>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Calendar className="h-8 w-8 text-blue-600 mr-4" />
                        <div>
                          <p className="text-2xl text-blue-900">{upcomingAppointments.length}</p>
                          <p className="text-gray-600 text-sm">Upcoming Appointments</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-green-600 mr-4" />
                        <div>
                          <p className="text-2xl text-blue-900">{userMedicalRecords.length}</p>
                          <p className="text-gray-600 text-sm">Medical Records</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Clock className="h-8 w-8 text-orange-600 mr-4" />
                        <div>
                          <p className="text-2xl text-blue-900">{userAppointments.length}</p>
                          <p className="text-gray-600 text-sm">Total Appointments</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button 
                        onClick={() => setCurrentScreen('appointment-booking')}
                        className="bg-blue-600 hover:bg-blue-700 h-12"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Book New Appointment
                      </Button>
                      <Button 
                        onClick={() => setCurrentScreen('medical-records')}
                        variant="outline"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50 h-12"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Medical Records
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Appointments */}
                {upcomingAppointments.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-blue-900">Upcoming Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingAppointments.slice(0, 3).map((appointment) => (
                          <div key={appointment.id} className="flex items-center justify-between p-4 border border-blue-100 rounded-lg">
                            <div>
                              <p className="text-blue-900">{appointment.doctorName}</p>
                              <p className="text-gray-600 text-sm">{formatDate(appointment.date)} at {appointment.time}</p>
                            </div>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl text-blue-900 mb-2">My Appointments</h1>
                    <p className="text-gray-600">View and manage your appointments</p>
                  </div>
                  <Button 
                    onClick={() => setCurrentScreen('appointment-booking')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>

                <div className="space-y-4">
                  {userAppointments.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No appointments scheduled</p>
                        <Button 
                          onClick={() => setCurrentScreen('appointment-booking')}
                          className="mt-4 bg-blue-600 hover:bg-blue-700"
                        >
                          Book Your First Appointment
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    userAppointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-blue-900 mb-2">{appointment.doctorName}</h3>
                              <div className="space-y-1 text-gray-600 text-sm">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  {formatDate(appointment.date)}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {appointment.time}
                                </div>
                              </div>
                              {appointment.notes && (
                                <p className="text-gray-600 text-sm mt-2">{appointment.notes}</p>
                              )}
                            </div>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
}