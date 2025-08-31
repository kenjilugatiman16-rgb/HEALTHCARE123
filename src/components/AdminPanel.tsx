import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useApp } from '../App';
import { 
  Users, 
  Calendar, 
  FileText, 
  Shield, 
  LogOut, 
  Search,
  Activity,
  UserCheck,
  Clock,
  TrendingUp
} from 'lucide-react';

export function AdminPanel() {
  const { currentUser, logout, setCurrentScreen, appointments, medicalRecords, users } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  if (!currentUser) return null;

  const patients = users.filter(user => user.role === 'patient');
  const doctors = users.filter(user => user.role === 'doctor');
  const admins = users.filter(user => user.role === 'admin');
  
  const todaysAppointments = appointments.filter(apt => 
    apt.date === new Date().toISOString().split('T')[0]
  );
  
  const scheduledAppointments = appointments.filter(apt => apt.status === 'scheduled');
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'patient': return 'bg-blue-100 text-blue-800';
      case 'doctor': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-blue-900 font-medium">Admin Panel</span>
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
                  <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-blue-900 mb-1">{currentUser.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">System Administrator</p>
                  <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
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
                    <Activity className="h-4 w-4 inline mr-2" />
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeTab === 'users' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Users className="h-4 w-4 inline mr-2" />
                    Users
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
                    <Shield className="h-4 w-4 inline mr-2" />
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
                  <h1 className="text-3xl text-blue-900 mb-2">System Overview</h1>
                  <p className="text-gray-600">Monitor and manage your healthcare system</p>
                </div>

                {/* System Statistics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Users className="h-8 w-8 text-blue-600 mr-4" />
                        <div>
                          <p className="text-2xl text-blue-900">{users.length}</p>
                          <p className="text-gray-600 text-sm">Total Users</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <UserCheck className="h-8 w-8 text-green-600 mr-4" />
                        <div>
                          <p className="text-2xl text-blue-900">{patients.length}</p>
                          <p className="text-gray-600 text-sm">Patients</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Calendar className="h-8 w-8 text-orange-600 mr-4" />
                        <div>
                          <p className="text-2xl text-blue-900">{appointments.length}</p>
                          <p className="text-gray-600 text-sm">Appointments</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-purple-600 mr-4" />
                        <div>
                          <p className="text-2xl text-blue-900">{medicalRecords.length}</p>
                          <p className="text-gray-600 text-sm">Medical Records</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* User Distribution */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-blue-900">User Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-3 w-3 bg-blue-500 rounded-full mr-3"></div>
                            <span className="text-gray-700">Patients</span>
                          </div>
                          <span className="text-blue-900">{patients.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-3 w-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-gray-700">Doctors</span>
                          </div>
                          <span className="text-blue-900">{doctors.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-3 w-3 bg-purple-500 rounded-full mr-3"></div>
                            <span className="text-gray-700">Admins</span>
                          </div>
                          <span className="text-blue-900">{admins.length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-blue-900">Appointment Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-3 w-3 bg-blue-500 rounded-full mr-3"></div>
                            <span className="text-gray-700">Scheduled</span>
                          </div>
                          <span className="text-blue-900">{scheduledAppointments.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-3 w-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-gray-700">Completed</span>
                          </div>
                          <span className="text-blue-900">{completedAppointments.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-3 w-3 bg-orange-500 rounded-full mr-3"></div>
                            <span className="text-gray-700">Today's Appointments</span>
                          </div>
                          <span className="text-blue-900">{todaysAppointments.length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-900">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {appointments.slice(0, 5).map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-blue-600 mr-3" />
                            <div>
                              <p className="text-blue-900 text-sm">
                                {appointment.patientName} with {appointment.doctorName}
                              </p>
                              <p className="text-gray-600 text-xs">
                                {formatDate(appointment.date)} at {appointment.time}
                              </p>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                            {appointment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl text-blue-900 mb-2">User Management</h1>
                  <p className="text-gray-600">Manage all system users and their roles</p>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="relative">
                      <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder="Search users by name, email, or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Specialization</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="text-blue-900">{user.name}</TableCell>
                            <TableCell className="text-gray-600">{user.email}</TableCell>
                            <TableCell>
                              <Badge className={getRoleColor(user.role)}>
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-600">{user.phone || '-'}</TableCell>
                            <TableCell className="text-gray-600">{user.specialization || '-'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl text-blue-900 mb-2">Appointment Management</h1>
                  <p className="text-gray-600">Monitor and manage all system appointments</p>
                </div>

                <div className="space-y-4">
                  {appointments.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No appointments in the system</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="p-6">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Patient</TableHead>
                              <TableHead>Doctor</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Time</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {appointments.map((appointment) => (
                              <TableRow key={appointment.id}>
                                <TableCell className="text-blue-900">{appointment.patientName}</TableCell>
                                <TableCell className="text-blue-900">{appointment.doctorName}</TableCell>
                                <TableCell className="text-gray-600">{formatDate(appointment.date)}</TableCell>
                                <TableCell className="text-gray-600">{appointment.time}</TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(appointment.status)}>
                                    {appointment.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
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