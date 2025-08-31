import React, { useState, createContext, useContext, ReactNode } from 'react';
import { Homepage } from './components/Homepage';
import { LoginScreen } from './components/LoginScreen';
import { PatientDashboard } from './components/PatientDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { AdminPanel } from './components/AdminPanel';
import { AppointmentBooking } from './components/AppointmentBooking';
import { MedicalRecords } from './components/MedicalRecords';
import { Profile } from './components/Profile';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  phone?: string;
  dateOfBirth?: string;
  medicalHistory?: string;
  specialization?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

// Context
interface AppContextType {
  currentUser: User | null;
  currentScreen: string;
  users: User[];
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => boolean;
  setCurrentScreen: (screen: string) => void;
  bookAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateMedicalRecord: (record: Omit<MedicalRecord, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Patient',
    email: 'patient@demo.com',
    role: 'patient',
    phone: '555-0101',
    dateOfBirth: '1990-05-15',
    medicalHistory: 'No known allergies'
  },
  {
    id: '2',
    name: 'Dr. Sarah Wilson',
    email: 'doctor@demo.com',
    role: 'doctor',
    phone: '555-0102',
    specialization: 'General Medicine'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@demo.com',
    role: 'admin',
    phone: '555-0103'
  },
  {
    id: '4',
    name: 'Dr. Michael Johnson',
    email: 'doctor2@demo.com',
    role: 'doctor',
    phone: '555-0104',
    specialization: 'Cardiology'
  }
];

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '2',
    patientName: 'John Patient',
    doctorName: 'Dr. Sarah Wilson',
    date: '2025-08-28',
    time: '10:00',
    status: 'scheduled'
  },
  {
    id: '2',
    patientId: '1',
    doctorId: '4',
    patientName: 'John Patient',
    doctorName: 'Dr. Michael Johnson',
    date: '2025-09-05',
    time: '14:30',
    status: 'scheduled'
  }
];

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '2',
    date: '2025-08-20',
    diagnosis: 'Annual checkup - healthy',
    prescription: 'Continue current lifestyle',
    notes: 'Patient is in good health. Recommended regular exercise.'
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(mockMedicalRecords);

  const login = (email: string, password: string): boolean => {
    // Simple mock authentication - in real app, this would validate against backend
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      setCurrentScreen(user.role === 'patient' ? 'patient-dashboard' : 
                     user.role === 'doctor' ? 'doctor-dashboard' : 'admin-panel');
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentScreen('home');
  };

  const register = (userData: Partial<User> & { password: string }): boolean => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'patient',
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      medicalHistory: userData.medicalHistory,
      specialization: userData.specialization
    };
    
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setCurrentScreen(newUser.role === 'patient' ? 'patient-dashboard' : 
                   newUser.role === 'doctor' ? 'doctor-dashboard' : 'admin-panel');
    return true;
  };

  const bookAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString()
    };
    setAppointments([...appointments, newAppointment]);
  };

  const updateMedicalRecord = (recordData: Omit<MedicalRecord, 'id'>) => {
    const newRecord: MedicalRecord = {
      ...recordData,
      id: Date.now().toString()
    };
    setMedicalRecords([...medicalRecords, newRecord]);
  };

  const contextValue: AppContextType = {
    currentUser,
    currentScreen,
    users,
    appointments,
    medicalRecords,
    login,
    logout,
    register,
    setCurrentScreen,
    bookAppointment,
    updateMedicalRecord
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'patient-dashboard':
        return <PatientDashboard />;
      case 'doctor-dashboard':
        return <DoctorDashboard />;
      case 'admin-panel':
        return <AdminPanel />;
      case 'appointment-booking':
        return <AppointmentBooking />;
      case 'medical-records':
        return <MedicalRecords />;
      case 'profile':
        return <Profile />;
      default:
        return <Homepage />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-slate-50">
        {renderScreen()}
      </div>
    </AppContext.Provider>
  );
}