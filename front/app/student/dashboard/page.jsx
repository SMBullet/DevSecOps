"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StudentSidebar from "@/components/StudentSidebar";
import StudentInfoCard from "@/components/StudentInfoCard";

const StudentPage = () => {
  const [userId, setUserId] = useState(null);
  const [userProject, setUserProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndProject = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) throw new Error("No token found");

        // Fetch user data
        const userResponse = await axios.get("http://128.110.219.24:5050/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userId = userResponse.data.user.id;
        setUserId(userId);

        // Fetch all projects
        const projectsResponse = await axios.get("http://128.110.219.24:6060/api/projects/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const projects = projectsResponse.data;

        // Find project associated with the user
        const userProject = projects.find((project) =>
          project.projectMembers.includes(userId)
        );

        setUserProject(userProject || null);
      } catch (err) {
        console.error("Error fetching user/project data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProject();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

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
              {userProject ? (
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <p className="text-lg font-semibold text-gray-800">Title:</p>
                    <p className="text-gray-600">{userProject.title}</p>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-lg font-semibold text-gray-800">Description:</p>
                    <p className="text-gray-600">{userProject.description || "No description available"}</p>
                  </div>

                  {/* Location */}
                  <div>
                    <p className="text-lg font-semibold text-gray-800">Location:</p>
                    <p className="text-gray-600">{userProject.location || "No location specified"}</p>
                  </div>

                  {/* Report URL */}
                  {userProject.reportUrl && (
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Report:</p>
                      <a
                        href={userProject.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Report
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">No project found for the logged-in user.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Section (Student Info with Gradient) */}
        <StudentInfoCard />
      </div>
    </div>
  );
};

export default StudentPage;
