"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TeacherSidebar from "@/components/TeacherSidebar";
import StudentInfoCard from "@/components/StudentInfoCard";

const TeacherPage = () => {
  const [userId, setUserId] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [membersData, setMembersData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherProjects = async () => {
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

        // Fetch all members
        const membersResponse = await axios.get("http://localhost:5050/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const members = membersResponse.data.reduce((acc, member) => {
          acc[member.id] = member.username;
          return acc;
        }, {});

        setMembersData(members);

        // Filter projects associated with the teacher
        const teacherProjects = projects.filter((project) =>
          project.projectMembers.includes(userId)
        );

        setUserProjects(teacherProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherProjects();
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
      <TeacherSidebar />

      {/* Main Content */}
      <div className="flex-1 w-full p-6 mx-4 my-6 rounded-3xl shadow-lg flex bg-white">
        {/* Left Section (Projects Information) */}
        <div className="flex-1 p-6">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Projects You Are Supervising</h1>
            <p className="text-gray-600">Check the details of all projects you are supervising below.</p>
          </header>

          {/* Projects Cards */}
          {userProjects.length > 0 ? (
            <div className="space-y-4">
              {userProjects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-white rounded-xl border shadow-md p-4 h-auto"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800 mb-2">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {/* Description */}
                    <div>
                      <p className="text-lg font-medium text-gray-700">Description:</p>
                      <p className="text-gray-600 text-sm">{project.description || "No description available"}</p>
                    </div>

                    {/* Location */}
                    <div>
                      <p className="text-lg font-medium text-gray-700">Location:</p>
                      <p className="text-gray-600 text-sm">{project.location || "No location specified"}</p>
                    </div>

                    {/* Report URL */}
                    {project.reportUrl && (
                      <div>
                        <p className="text-lg font-medium text-gray-700">Report:</p>
                        <a
                          href={project.reportUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View Report
                        </a>
                      </div>
                    )}

                    {/* Members */}
                    <div>
                      <p className="text-lg font-medium text-gray-700">Members:</p>
                      <p className="text-gray-600 text-sm">
                        {project.projectMembers.length > 0
                          ? project.projectMembers.map((memberId) => membersData[memberId] || memberId).join(", ")
                          : "No members assigned"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">You are not supervising any projects at the moment.</p>
          )}
        </div>

        {/* Right Section (Teacher Info with Gradient) */}
        <StudentInfoCard />
      </div>
    </div>
  );
};

export default TeacherPage;
