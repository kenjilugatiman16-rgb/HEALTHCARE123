import React, { useState } from 'react';
import { useApp } from '../App';
import { ArrowLeft, Edit, Save, X, User, Mail, Phone, Calendar, Heart, Briefcase, Shield, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';

export function Profile() {
  const { currentUser, setCurrentScreen, users } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser || {});
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const isPatient = currentUser?.role === 'patient';
  const isDoctor = currentUser?.role === 'doctor';
  const isAdmin = currentUser?.role === 'admin';

  const handleSave = () => {
    // In a real app, this would update the user in the backend
    console.log('Saving user data:', editedUser);
    setIsEditing(false);
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const handleCancel = () => {
    setEditedUser(currentUser || {});
    setIsEditing(false);
  };

  const getBackScreen = () => {
    if (isPatient) return 'patient-dashboard';
    if (isDoctor) return 'doctor-dashboard';
    return 'admin-panel';
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'patient': return 'bg-blue-100 text-blue-800';
      case 'doctor': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'patient': return <User className="h-4 w-4" />;
      case 'doctor': return <Briefcase className="h-4 w-4" />;
      case 'admin': return <Shield className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  if (!currentUser) {
    return <div>No user found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <User className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Profile</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Alert */}
        {showSaveAlert && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">
              Profile updated successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={currentUser.name} />
                  <AvatarFallback className="text-xl bg-blue-100 text-blue-700">
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-semibold text-slate-900">{currentUser.name}</h2>
                  <Badge className={`${getRoleBadgeColor(currentUser.role)} flex items-center space-x-1`}>
                    {getRoleIcon(currentUser.role)}
                    <span className="capitalize">{currentUser.role}</span>
                  </Badge>
                </div>
                <p className="text-slate-600">{currentUser.email}</p>
                {currentUser.phone && (
                  <p className="text-slate-600">{currentUser.phone}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Full Name</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedUser.name || ''}
                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-slate-700">{currentUser.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Address</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editedUser.email || ''}
                    onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-slate-700">{currentUser.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone Number</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={editedUser.phone || ''}
                    onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-slate-700">{currentUser.phone || 'Not provided'}</p>
                )}
              </div>

              {isPatient && (
                <div>
                  <Label htmlFor="dateOfBirth" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Date of Birth</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={editedUser.dateOfBirth || ''}
                      onChange={(e) => setEditedUser({...editedUser, dateOfBirth: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-slate-700">
                      {currentUser.dateOfBirth 
                        ? new Date(currentUser.dateOfBirth).toLocaleDateString()
                        : 'Not provided'
                      }
                    </p>
                  )}
                </div>
              )}

              {isDoctor && (
                <div>
                  <Label htmlFor="specialization" className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Specialization</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      id="specialization"
                      value={editedUser.specialization || ''}
                      onChange={(e) => setEditedUser({...editedUser, specialization: e.target.value})}
                      className="mt-1"
                      placeholder="e.g., Cardiology, General Medicine"
                    />
                  ) : (
                    <p className="mt-1 text-slate-700">{currentUser.specialization || 'Not specified'}</p>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Medical Information (for patients) */}
          {isPatient && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>Medical Information</span>
              </h3>
              <div>
                <Label htmlFor="medicalHistory">Medical History & Allergies</Label>
                {isEditing ? (
                  <Textarea
                    id="medicalHistory"
                    value={editedUser.medicalHistory || ''}
                    onChange={(e) => setEditedUser({...editedUser, medicalHistory: e.target.value})}
                    className="mt-1"
                    rows={4}
                    placeholder="Enter any allergies, chronic conditions, or important medical history..."
                  />
                ) : (
                  <p className="mt-1 text-slate-700 whitespace-pre-wrap">
                    {currentUser.medicalHistory || 'No medical history recorded'}
                  </p>
                )}
              </div>
            </Card>
          )}

          {/* Professional Information (for doctors) */}
          {isDoctor && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-blue-500" />
                <span>Professional Information</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>License Number</Label>
                  {isEditing ? (
                    <Input
                      placeholder="Medical license number"
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-slate-700">MD-12345678</p>
                  )}
                </div>
                
                <div>
                  <Label>Years of Experience</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      placeholder="Years of experience"
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-slate-700">10 years</p>
                  )}
                </div>
                
                <div>
                  <Label>Education</Label>
                  {isEditing ? (
                    <Textarea
                      placeholder="Medical education and qualifications"
                      className="mt-1"
                      rows={3}
                    />
                  ) : (
                    <p className="mt-1 text-slate-700">
                      MD from Johns Hopkins University<br />
                      Residency in Internal Medicine at Mayo Clinic
                    </p>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Account Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Email Notifications</p>
                  <p className="text-sm text-slate-600">Receive email updates about appointments and records</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Privacy Settings</p>
                  <p className="text-sm text-slate-600">Manage who can see your information</p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Change Password</p>
                  <p className="text-sm text-slate-600">Update your account password</p>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-600">Delete Account</p>
                  <p className="text-sm text-slate-600">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}