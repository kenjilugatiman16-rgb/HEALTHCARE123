import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useApp, MedicalRecord } from '../App';
import { 
  Calendar, 
  FileText, 
  User, 
  Clock, 
  Heart, 
  LogOut, 
  Search,
  Plus,
  Edit,
  Stethoscope
} from 'lucide-react';

export function DoctorDashboard() {
  const { currentUser, logout, setCurrentScreen, appointments, medicalRecords, users, updateMedicalRecord } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [newRecord, setNewRecord] = useState({
    diagnosis: '',
    prescription: '',
    notes: ''
  });
  const [showNewRecordDialog, setShowNewRecordDialog] = useState(false);

  if (!currentUser) return null;

  const doctorAppointments = appointments.filter(apt => apt.doctorId === currentUser.id);
  const doctorMedicalRecords = medicalRecords.filter(record => record.doctorId === currentUser.id);
  const patients = users.filter(user => user.role === 'patient');
  const todaysAppointments = doctorAppointments.filter(apt => 
    apt.date === new Date().toISOString().split('T')[0] && apt.status === 'scheduled'
  );

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

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMedicalRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !newRecord.diagnosis || !newRecord.prescription) return;

    const selectedPatientInfo = patients.find(p => p.id === selectedPatient);
    if (!selectedPatientInfo) return;

    const recordData = {
      patientId: selectedPatient,
      doctorId: currentUser.id,
      date: new Date().toISOString().split('T')[0],
      diagnosis: newRecord.diagnosis,
      prescription: newRecord.prescription,
      notes: newRecord.notes
    };

    updateMedicalRecord(recordData);
    setNewRecord({ diagnosis: '', prescription: '', notes: '' });
    setSelectedPatient('');
    setShowNewRecordDialog(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-blue-900 font-medium">Doctor Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Dr. {currentUser.name}</span>
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
                    <Stethoscope className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-blue-900 mb-1">Dr. {currentUser.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{currentUser.specialization}</p>
                  <Badge className="bg-green-100 text-green-800">Doctor</Badge>
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
                    onClick={() => setActiveTab('patients')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeTab === 'patients' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    Patients
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
                  <h1 className="text-3xl text-blue-900 mb-2">Doctor Dashboard</h1>
                  <p className="text-gray-600">Manage your patients and appointments</p>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-6">
                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Calendar className="h-8 w-8 text-blue-600 mr-4" />
                        <div>
                          <p className="text-2xl text-blue-900">{todaysAppointments.length}</p>
                          <p className="text-gray-600 text-sm">Today's Appointments</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <User className="h-8 w-8 text-green-600 mr-4" />
                        <div>
                          <p className="text-2xl text-blue-900">{patients.length}</p>
                          <p className="text-gray-600 text-sm">Total Patients</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-orange-600 mr-4" />
                        <div>
                          <p className="text-2xl text-blue-900">{doctorMedicalRecords.length}</p>
                          <p className="text-gray-600 text-sm">Medical Records</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Clock className="h-8 w-8 text-purple-600 mr-4" />
                        <div>
                          <p className="text-2xl text-blue-900">{doctorAppointments.length}</p>
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
                      <Dialog open={showNewRecordDialog} onOpenChange={setShowNewRecordDialog}>
                        <DialogTrigger asChild>
                          <Button className="bg-blue-600 hover:bg-blue-700 h-12">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Medical Record
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Add Medical Record</DialogTitle>
                            <DialogDescription>
                              Create a new medical record for a patient
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleAddMedicalRecord} className="space-y-4">
                            <div>
                              <Label>Select Patient</Label>
                              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Choose patient" />
                                </SelectTrigger>
                                <SelectContent>
                                  {patients.map((patient) => (
                                    <SelectItem key={patient.id} value={patient.id}>
                                      {patient.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="diagnosis">Diagnosis</Label>
                              <Input
                                id="diagnosis"
                                value={newRecord.diagnosis}
                                onChange={(e) => setNewRecord({...newRecord, diagnosis: e.target.value})}
                                className="mt-1"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="prescription">Prescription</Label>
                              <Input
                                id="prescription"
                                value={newRecord.prescription}
                                onChange={(e) => setNewRecord({...newRecord, prescription: e.target.value})}
                                className="mt-1"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="notes">Notes</Label>
                              <Textarea
                                id="notes"
                                value={newRecord.notes}
                                onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                                className="mt-1"
                                rows={3}
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setShowNewRecordDialog(false)}
                              >
                                Cancel
                              </Button>
                              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                Add Record
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        onClick={() => setActiveTab('appointments')}
                        variant="outline"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50 h-12"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        View Appointments
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Today's Appointments */}
                {todaysAppointments.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-blue-900">Today's Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {todaysAppointments.map((appointment) => (
                          <div key={appointment.id} className="flex items-center justify-between p-4 border border-blue-100 rounded-lg">
                            <div>
                              <p className="text-blue-900">{appointment.patientName}</p>
                              <p className="text-gray-600 text-sm">{appointment.time}</p>
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
                <div>
                  <h1 className="text-3xl text-blue-900 mb-2">My Appointments</h1>
                  <p className="text-gray-600">Manage your patient appointments</p>
                </div>

                <div className="space-y-4">
                  {doctorAppointments.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No appointments scheduled</p>
                      </CardContent>
                    </Card>
                  ) : (
                    doctorAppointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-blue-900 mb-2">{appointment.patientName}</h3>
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
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(appointment.status)}>
                                {appointment.status}
                              </Badge>
                              {appointment.status === 'scheduled' && (
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Patients Tab */}
            {activeTab === 'patients' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl text-blue-900 mb-2">Patient Directory</h1>
                  <p className="text-gray-600">Search and manage patient information</p>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="relative">
                      <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder="Search patients by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPatients.map((patient) => (
                    <Card key={patient.id} className="border-blue-100">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-blue-900 mb-1">{patient.name}</h3>
                            <p className="text-gray-600 text-sm">{patient.email}</p>
                            {patient.phone && (
                              <p className="text-gray-600 text-sm">{patient.phone}</p>
                            )}
                            {patient.dateOfBirth && (
                              <p className="text-gray-600 text-sm">
                                DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
                              </p>
                            )}
                            {patient.medicalHistory && (
                              <p className="text-gray-600 text-sm mt-2 p-2 bg-gray-50 rounded">
                                {patient.medicalHistory}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
}