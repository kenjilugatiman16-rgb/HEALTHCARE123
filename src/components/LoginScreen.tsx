import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { useApp, User } from '../App';
import { Heart, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LoginScreen() {
  const { login, register, setCurrentScreen } = useApp();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient' as 'patient' | 'doctor' | 'admin',
    phone: '',
    dateOfBirth: '',
    medicalHistory: '',
    specialization: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!loginForm.email || !loginForm.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const success = login(loginForm.email, loginForm.password);
    if (!success) {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const success = register(registerForm);
    if (!success) {
      setError('Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-blue-900 font-medium">HealthCare Portal</span>
            </div>
            <Button 
              onClick={() => setCurrentScreen('home')}
              variant="ghost"
              className="text-gray-700 hover:text-blue-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl text-blue-900 mb-2">
              Welcome to HealthCare Portal
            </h2>
            <p className="text-gray-600">
              Access your healthcare dashboard
            </p>
          </div>

          <Card className="border-blue-100">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Log In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <CardHeader className="pb-4">
                  <CardTitle className="text-blue-900">Sign In to Your Account</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">Email Address</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                    {error && (
                      <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                        {error}
                      </div>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                    <div className="text-center">
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                        onClick={() => setError('Demo app - use demo credentials')}
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </form>

                  {/* Demo Credentials */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-blue-900 mb-2">Demo Credentials:</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div><strong>Patient:</strong> patient@demo.com / password</div>
                      <div><strong>Doctor:</strong> doctor@demo.com / password</div>
                      <div><strong>Admin:</strong> admin@demo.com / password</div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <CardHeader className="pb-4">
                  <CardTitle className="text-blue-900">Create New Account</CardTitle>
                  <CardDescription>
                    Join our healthcare platform today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="register-name">Full Name</Label>
                        <Input
                          id="register-name"
                          placeholder="John Doe"
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="register-role">Role</Label>
                        <Select
                          value={registerForm.role}
                          onValueChange={(value: 'patient' | 'doctor' | 'admin') => 
                            setRegisterForm({...registerForm, role: value})
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="patient">Patient</SelectItem>
                            <SelectItem value="doctor">Doctor</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="register-email">Email Address</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="your@email.com"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="register-password">Password</Label>
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="Create password"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="register-confirm">Confirm Password</Label>
                        <Input
                          id="register-confirm"
                          type="password"
                          placeholder="Confirm password"
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="register-phone">Phone</Label>
                        <Input
                          id="register-phone"
                          placeholder="555-0123"
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      {registerForm.role === 'patient' && (
                        <div>
                          <Label htmlFor="register-dob">Date of Birth</Label>
                          <Input
                            id="register-dob"
                            type="date"
                            value={registerForm.dateOfBirth}
                            onChange={(e) => setRegisterForm({...registerForm, dateOfBirth: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                      )}
                      {registerForm.role === 'doctor' && (
                        <div>
                          <Label htmlFor="register-specialization">Specialization</Label>
                          <Input
                            id="register-specialization"
                            placeholder="e.g., Cardiology"
                            value={registerForm.specialization}
                            onChange={(e) => setRegisterForm({...registerForm, specialization: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                      )}
                    </div>

                    {registerForm.role === 'patient' && (
                      <div>
                        <Label htmlFor="register-history">Medical History (Optional)</Label>
                        <Textarea
                          id="register-history"
                          placeholder="Any relevant medical history..."
                          value={registerForm.medicalHistory}
                          onChange={(e) => setRegisterForm({...registerForm, medicalHistory: e.target.value})}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    )}

                    {error && (
                      <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                        {error}
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}