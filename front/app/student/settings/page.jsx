"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StudentSidebar from "@/components/StudentSidebar"; // Import Sidebar
import StudentInfoCard from "@/components/StudentInfoCard"; // Import the new StudentInfoCard component
import { Button } from "@/components/ui/button";
import { User2, Mail, Phone, GraduationCap, Building2 } from "lucide-react"; // Add this import

// Dummy data for the student (this can be replaced with a state or data from an API)
const initialStudentInfo = {
  firstName: "Brahim",
  lastName: "KINIOUI",
  picture: "https://via.placeholder.com/150", // Placeholder for student picture
  major: "GCDSTE",
  email: "brahim.kinoui@email.com",
  phone: "+123 456 789",
};

const SettingsPage = () => {
  // Use state to manage the student's information
  const [studentInfo, setStudentInfo] = useState(initialStudentInfo);
  const [isEditing, setIsEditing] = useState(false);

  // Handle change for the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({
      ...studentInfo,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setStudentInfo(initialStudentInfo); // Reset to original values
  };

  const handleSave = () => {
    // Add logic to save updated student information
    alert("Your information has been updated!");
    setIsEditing(false); // Exit edit mode after saving
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content */}
      <div className="flex-1 w-full p-6 mx-4 my-6 rounded-3xl shadow-lg flex bg-white">
        {/* Left Section (Editable Personal Information) */}
        <div className="flex-1 p-6">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Edit Your Personal Information</h1>
            <p className="text-gray-600">Update your personal information below.</p>
          </header>

          {/* Content Card */}
          <Card className="bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm border border-gray-100 shadow-lg rounded-2xl">
            <CardHeader className="border-b border-gray-100/50 pb-6">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                  <User2 className="h-6 w-6 text-blue-500" />
                  Personal Information
                </CardTitle>
                {!isEditing && (
                  <Button
                    onClick={handleEdit}
                    variant="outline"
                    className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                    Edit Information
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Name Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="firstName"
                        value={studentInfo.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-4 pr-4 py-3 text-sm border border-gray-200 rounded-xl
                                 transition-all duration-200 bg-white/50
                                 ${isEditing ? 'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-blue-500/50' : 'bg-gray-50 cursor-not-allowed'}`}
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="lastName"
                        value={studentInfo.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-4 pr-4 py-3 text-sm border border-gray-200 rounded-xl
                                 transition-all duration-200 bg-white/50
                                 ${isEditing ? 'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-blue-500/50' : 'bg-gray-50 cursor-not-allowed'}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Group */}
                <div className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={studentInfo.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-12 pr-4 py-3 text-sm border border-gray-200 rounded-xl
                                 transition-all duration-200 bg-white/50
                                 ${isEditing ? 'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-blue-500/50' : 'bg-gray-50 cursor-not-allowed'}`}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="phone"
                        value={studentInfo.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-12 pr-4 py-3 text-sm border border-gray-200 rounded-xl
                                 transition-all duration-200 bg-white/50
                                 ${isEditing ? 'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-blue-500/50' : 'bg-gray-50 cursor-not-allowed'}`}
                      />
                    </div>
                  </div>

                  {/* Degree */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Degree Program</label>
                    <div className="relative group">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="major"
                        value={studentInfo.major}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-12 pr-4 py-3 text-sm border border-gray-200 rounded-xl
                                 transition-all duration-200 bg-white/50
                                 ${isEditing ? 'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-blue-500/50' : 'bg-gray-50 cursor-not-allowed'}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-4 mt-6">
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700
                               hover:from-blue-700 hover:to-blue-800 text-white py-3
                               rounded-xl transition-all duration-200 shadow-md
                               hover:shadow-lg hover:scale-[1.02]"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Student Info Card */}
        <StudentInfoCard studentInfo={studentInfo} />
      </div>
    </div>
  );
};

export default SettingsPage;
