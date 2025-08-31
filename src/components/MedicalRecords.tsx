import React, { useState } from 'react';
import { useApp } from '../App';
import { ArrowLeft, Plus, Search, Filter, Download, Eye, Calendar, User, Stethoscope, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function MedicalRecords() {
  const { currentUser, setCurrentScreen, medicalRecords, users, updateMedicalRecord } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    patientId: '',
    doctorId: currentUser?.id || '',
    date: new Date().toISOString().split('T')[0],
    diagnosis: '',
    prescription: '',
    notes: ''
  });

  const isDoctor = currentUser?.role === 'doctor';
  const isPatient = currentUser?.role === 'patient';

  // Filter records based on user role
  const userRecords = medicalRecords.filter(record => {
    if (isPatient) {
      return record.patientId === currentUser?.id;
    }
    if (isDoctor) {
      return record.doctorId === currentUser?.id;
    }
    return true; // Admin sees all
  });

  // Filter records based on search term
  const filteredRecords = userRecords.filter(record =>
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.prescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRecord = () => {
    if (newRecord.diagnosis && newRecord.prescription) {
      updateMedicalRecord(newRecord);
      setNewRecord({
        patientId: '',
        doctorId: currentUser?.id || '',
        date: new Date().toISOString().split('T')[0],
        diagnosis: '',
        prescription: '',
        notes: ''
      });
      setIsAddingRecord(false);
    }
  };

  const getPatientName = (patientId: string) => {
    const patient = users.find(u => u.id === patientId);
    return patient?.name || 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = users.find(u => u.id === doctorId);
    return doctor?.name || 'Unknown Doctor';
  };

  const getBackScreen = () => {
    if (isPatient) return 'patient-dashboard';
    if (isDoctor) return 'doctor-dashboard';
    return 'admin-panel';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setCurrentScreen(getBackScreen())}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Medical Records</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {isDoctor && (
                <Dialog open={isAddingRecord} onOpenChange={setIsAddingRecord}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Record
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Medical Record</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="patientId">Patient</Label>
                        <Select value={newRecord.patientId} onValueChange={(value) => setNewRecord({...newRecord, patientId: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select patient" />
                          </SelectTrigger>
                          <SelectContent>
                            {users.filter(u => u.role === 'patient').map(patient => (
                              <SelectItem key={patient.id} value={patient.id}>
                                {patient.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          type="date"
                          value={newRecord.date}
                          onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="diagnosis">Diagnosis</Label>
                        <Input
                          placeholder="Enter diagnosis"
                          value={newRecord.diagnosis}
                          onChange={(e) => setNewRecord({...newRecord, diagnosis: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="prescription">Prescription</Label>
                        <Textarea
                          placeholder="Enter prescription details"
                          value={newRecord.prescription}
                          onChange={(e) => setNewRecord({...newRecord, prescription: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          placeholder="Enter additional notes"
                          value={newRecord.notes}
                          onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddingRecord(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddRecord} className="bg-blue-600 hover:bg-blue-700">
                          Add Record
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search medical records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>

        {/* Records Grid */}
        <div className="space-y-4">
          {filteredRecords.length === 0 ? (
            <Card className="p-8 text-center">
              <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No Medical Records</h3>
              <p className="text-slate-500">
                {isPatient 
                  ? "You don't have any medical records yet." 
                  : "No medical records found for your patients."}
              </p>
            </Card>
          ) : (
            filteredRecords.map((record) => (
              <Card key={record.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-900">
                          {new Date(record.date).toLocaleDateString()}
                        </span>
                      </div>
                      {isDoctor && (
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-slate-500" />
                          <span className="text-sm text-slate-600">
                            {getPatientName(record.patientId)}
                          </span>
                        </div>
                      )}
                      {isPatient && (
                        <div className="flex items-center space-x-2">
                          <Stethoscope className="h-4 w-4 text-slate-500" />
                          <span className="text-sm text-slate-600">
                            {getDoctorName(record.doctorId)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">Diagnosis</h3>
                      <p className="text-slate-700">{record.diagnosis}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Prescription</h4>
                      <p className="text-slate-700">{record.prescription}</p>
                    </div>
                    
                    {record.notes && (
                      <div>
                        <h4 className="font-medium text-slate-900 mb-1">Notes</h4>
                        <p className="text-slate-700">{record.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedRecord(record)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Medical Record Details</DialogTitle>
                        </DialogHeader>
                        {selectedRecord && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Date</Label>
                                <p className="text-slate-700">{new Date(selectedRecord.date).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <Label>Patient</Label>
                                <p className="text-slate-700">{getPatientName(selectedRecord.patientId)}</p>
                              </div>
                              <div>
                                <Label>Doctor</Label>
                                <p className="text-slate-700">{getDoctorName(selectedRecord.doctorId)}</p>
                              </div>
                            </div>
                            
                            <div>
                              <Label>Diagnosis</Label>
                              <p className="text-slate-700 mt-1">{selectedRecord.diagnosis}</p>
                            </div>
                            
                            <div>
                              <Label>Prescription</Label>
                              <p className="text-slate-700 mt-1">{selectedRecord.prescription}</p>
                            </div>
                            
                            {selectedRecord.notes && (
                              <div>
                                <Label>Additional Notes</Label>
                                <p className="text-slate-700 mt-1">{selectedRecord.notes}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}