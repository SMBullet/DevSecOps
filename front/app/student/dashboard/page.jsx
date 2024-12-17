"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StudentSidebar from "@/components/StudentSidebar"; // Import Sidebar
import StudentInfoCard from "@/components/StudentInfoCard"; // Import the new StudentInfoCard component
// Dummy data for the student
const pfe = {
  title: "Platform of end of studies management",
  supervisor: "O.Achbarou",
  degree: "GCDSTE",
  entreprise: "Entreprise 1",
};

const studentInfo = {
  name: "Brahim KINIOUI",
  picture: "https://via.placeholder.com/150", // Placeholder for student picture
  major: "GCDSTE",
  email: "brahim.kinoui@email.com",
  phone: "+123 456 789",
};

const StudentPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content */}
      <div className="flex-1 w-full p-6 mx-4 my-6 rounded-3xl shadow-lg flex bg-white">
        {/* Left Section (Project Information) */}
        <div className="flex-1 p-6">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Your PFE Overview</h1>
            <p className="text-gray-600">Check your project details below.</p>
          </header>

          {/* Content Card */}
          <Card className="bg-white rounded-xl border-none shadow-none p-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">Your PFE Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <p className="text-lg font-semibold text-gray-800">Title:</p>
                  <p className="text-gray-600">{pfe.title}</p>
                </div>

                {/* Supervisor */}
                <div>
                  <p className="text-lg font-semibold text-gray-800">Supervisor:</p>
                  <p className="text-gray-600">{pfe.supervisor}</p>
                </div>

                {/* Degree */}
                <div>
                  <p className="text-lg font-semibold text-gray-800">Degree:</p>
                  <p className="text-gray-600">{pfe.degree}</p>
                </div>

                {/* Company */}
                <div>
                  <p className="text-lg font-semibold text-gray-800">Company:</p>
                  <p className="text-gray-600">{pfe.entreprise}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section (Student Info with Gradient) */}
        <StudentInfoCard studentInfo={studentInfo} /> {/* Use the imported component */}
      </div>
    </div>
  );
};

export default StudentPage;
