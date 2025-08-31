import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { useApp, User } from '../App';
import { Calendar as CalendarIcon, Clock, User as UserIcon, ArrowLeft, Check } from 'lucide-react';

export function AppointmentBooking() {
  const { users, currentUser, bookAppointment, setCurrentScreen } = useApp();
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get available doctors
  const doctors = users.filter(user => user.role === 'doctor');
  
  // Available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const selectedDoctorInfo = doctors.find(doc => doc.id === selectedDoctor);

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedDoctor || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    const appointment = {
      patientId: currentUser.id,
      doctorId: selectedDoctor,
      patientName: currentUser.name,
      doctorName: selectedDoctorInfo?.name || '',
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      status: 'scheduled' as const,
      notes: notes.trim() || undefined
    };

    bookAppointment(appointment);
    setShowConfirmation(true);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setSelectedDoctor('');
    setSelectedDate(new Date());
    setSelectedTime('');
    setNotes('');
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-blue-900 font-medium">Appointment Booking</span>
              </div>
              <Button 
                onClick={() => setCurrentScreen('patient-dashboard')}
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>

        {/* Confirmation */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="border-green-200">
            <CardContent className="p-8 text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl text-green-900 mb-4">Appointment Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully scheduled.
              </p>
              
              <div className="bg-green-50 p-4 rounded-lg mb-6 text-left">
                <h3 className="text-green-900 mb-2">Appointment Details:</h3>
                <div className="space-y-2 text-green-700">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-2" />
                    {selectedDoctorInfo?.name}
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {selectedDate?.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {selectedTime}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setCurrentScreen('patient-dashboard')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Go to Dashboard
                </Button>
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Book Another Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-blue-900 font-medium">Book Appointment</span>
            </div>
            <Button 
              onClick={() => setCurrentScreen(currentUser ? 'patient-dashboard' : 'home')}
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-blue-900 mb-4">Book Your Appointment</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule a consultation with one of our qualified healthcare professionals. 
            Choose your preferred doctor, date, and time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-900">Appointment Details</CardTitle>
              <CardDescription>
                Please fill in all required information to book your appointment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBookAppointment} className="space-y-6">
                {/* Doctor Selection */}
                <div>
                  <Label htmlFor="doctor">Select Doctor *</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          <div className="flex flex-col">
                            <span>{doctor.name}</span>
                            <span className="text-sm text-gray-500">{doctor.specialization}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Selection */}
                <div>
                  <Label htmlFor="time">Select Time *</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose appointment time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific concerns or information for the doctor..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!selectedDoctor || !selectedDate || !selectedTime || isSubmitting}
                >
                  {isSubmitting ? 'Booking Appointment...' : 'Book Appointment'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Calendar and Summary */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Select Date</CardTitle>
                <CardDescription>Choose your preferred appointment date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => 
                    date < new Date() || 
                    date.getDay() === 0 || 
                    date.getDay() === 6
                  }
                  className="rounded-md border border-blue-100"
                />
                <p className="text-sm text-gray-600 mt-2">
                  * Weekends are not available for appointments
                </p>
              </CardContent>
            </Card>

            {/* Appointment Summary */}
            {(selectedDoctor || selectedDate || selectedTime) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Appointment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedDoctorInfo && (
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 text-blue-600 mr-3" />
                        <div>
                          <p className="text-blue-900">{selectedDoctorInfo.name}</p>
                          <p className="text-sm text-gray-600">{selectedDoctorInfo.specialization}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedDate && (
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-blue-600 mr-3" />
                        <div>
                          <p className="text-blue-900">
                            {selectedDate.toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {selectedTime && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-blue-600 mr-3" />
                        <div>
                          <p className="text-blue-900">{selectedTime}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Available Doctors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Available Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center p-3 border border-blue-100 rounded-lg">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <UserIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-blue-900">{doctor.name}</p>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}