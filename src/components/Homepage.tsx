import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useApp } from '../App';
import { Heart, Calendar, FileText, Shield, Users, Clock } from 'lucide-react';

export function Homepage() {
  const { setCurrentScreen, currentUser, logout } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-blue-900 font-medium">Kenji's Clinic</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setCurrentScreen('home')}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentScreen('appointment-booking')}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors"
              >
                Appointments
              </button>
              <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors">
                Medical Records
              </button>
              <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors">
                Profile
              </button>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome, {currentUser.name}</span>
                  <Button 
                    onClick={() => setCurrentScreen(
                      currentUser.role === 'patient' ? 'patient-dashboard' : 
                      currentUser.role === 'doctor' ? 'doctor-dashboard' : 'admin-panel'
                    )}
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Dashboard
                  </Button>
                  <Button 
                    onClick={logout}
                    variant="outline"
                    className="border-red-200 text-red-700 hover:bg-red-50"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    onClick={() => setCurrentScreen('login')}
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Log In
                  </Button>
                  <Button 
                    onClick={() => setCurrentScreen('login')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl text-blue-900 mb-6">
            Your Health, Our Priority
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience seamless healthcare management with our comprehensive platform. 
            Book appointments, access medical records, and connect with healthcare professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setCurrentScreen('appointment-booking')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              Book Appointment
            </Button>
            <Button 
              onClick={() => setCurrentScreen('login')}
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg"
            >
              Access Portal
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-blue-900 mb-4">
            Comprehensive Healthcare Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform provides everything you need to manage your healthcare journey effectively and efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-blue-900">Easy Appointment Booking</CardTitle>
              <CardDescription>
                Schedule appointments with your preferred doctors at convenient times
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-blue-900">Digital Medical Records</CardTitle>
              <CardDescription>
                Access your complete medical history and records securely online
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-blue-900">Secure & Private</CardTitle>
              <CardDescription>
                Your health information is protected with enterprise-grade security
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-blue-900">Expert Healthcare Team</CardTitle>
              <CardDescription>
                Connect with qualified doctors and healthcare professionals
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-blue-900">24/7 Access</CardTitle>
              <CardDescription>
                Access your healthcare information anytime, anywhere
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-blue-900">Personalized Care</CardTitle>
              <CardDescription>
                Receive tailored healthcare recommendations and reminders
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients and healthcare providers who trust our platform for their healthcare needs.
          </p>
          <Button 
            onClick={() => setCurrentScreen('login')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg"
          >
            Create Your Account Today
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2025 HealthCare Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}