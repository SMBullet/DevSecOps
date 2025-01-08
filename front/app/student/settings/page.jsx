'use client';

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StudentSidebar from "@/components/StudentSidebar"; // Import Sidebar
import StudentInfoCard from "@/components/StudentInfoCard"; // Import the new StudentInfoCard component
import { Button } from "@/components/ui/button";
import { User2, Mail, Phone, GraduationCap } from "lucide-react"; // Add this import
import axios from "axios";

const SettingsPage = () => {
  const [studentInfo, setStudentInfo] = useState({ username: "", email: "", phone: "+212 678450932", major: "GCDSTE" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) throw new Error("No token found");

        const response = await axios.get("http://128.110.219.24:5050/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { user } = response.data;
        setStudentInfo((prevState) => ({ ...prevState, username: user.username, email: user.email }));
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchStudentInfo();
  }, []);

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
  };

  const handleSave = () => {
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
                    Edit Information
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Username */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="username"
                      value={studentInfo.username}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-4 pr-4 py-3 text-sm border border-gray-200 rounded-xl
                               transition-all duration-200 bg-white/50
                               ${isEditing ? 'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-blue-500/50' : 'bg-gray-50 cursor-not-allowed'}`}
                    />
                  </div>
                </div>

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

                {/* Static Fields */}
                <div className="space-y-4">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="phone"
                        value={studentInfo.phone}
                        disabled
                        className="w-full pl-12 pr-4 py-3 text-sm border border-gray-200 rounded-xl
                               transition-all duration-200 bg-gray-50 cursor-not-allowed"
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
                        disabled
                        className="w-full pl-12 pr-4 py-3 text-sm border border-gray-200 rounded-xl
                               transition-all duration-200 bg-gray-50 cursor-not-allowed"
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
