"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import MySidebar from "@/components/MySidebar"; // Import MySidebar

const OverviewPage = () => {
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState({});
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    student: null,
    supervisor: null,
    date: null,
    room: null,
    degree: null,
  });

  useEffect(() => {
    // Fetch project data from the API
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:6060/api/projects/all");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    // Fetch member data from the API
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:5050/users/");
        const data = await response.json();

        const studentUsers = data.filter((user) => user.role === "STUDENT");
        setStudents(studentUsers);

        const teacherUsers = data.filter((user) => user.role === "TEACHER");
        setTeachers(teacherUsers);

        const memberMap = data.reduce((map, member) => {
          map[member.id] = member.username;
          return map;
        }, {});
        setMembers(memberMap);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchProjects();
    fetchMembers();
  }, []);

  // Filtered projects logic
  const filteredProjects = projects.filter((project) => {
    return (
      project.title?.toLowerCase().includes(search.toLowerCase()) &&
      (filters.student ? project.projectMembers?.includes(filters.student) : true) &&
      (filters.supervisor ? project.projectTeachers?.includes(filters.supervisor) : true) &&
      (filters.date ? project.date === filters.date : true) &&
      (filters.room ? project.room === filters.room : true) &&
      (filters.degree ? project.degree === filters.degree : true)
    );
  });

  // Function to clear all filters
  const clearFilters = () => {
    setFilters({
      student: null,
      supervisor: null,
      date: null,
      room: null,
      degree: null,
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <MySidebar />

      {/* Main Content */}
      <div className="flex-1 w-full p-6 mx-4 my-6 bg-white rounded-3xl shadow-lg">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-gray-600">Welcome back Admin, Check upcoming events.</p>
        </header>

        {/* Search and Filters */}
        <div className="flex justify-between mb-6">
          {/* Search Input */}
          <Input
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3"
          />

          {/* Filters */}
          <div className="flex space-x-4">
            <Select
              value={filters.student || ""}
              onValueChange={(value) => setFilters({ ...filters, student: value || null })}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Student" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>None</SelectItem>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <Button onClick={clearFilters} variant="outline" className="mb-4">
          Clear All Filters
        </Button>

        {/* Content Card */}
        <Card className="bg-white rounded-xl border-none shadow-none p-0">
          <CardHeader>
            <CardTitle>Upcoming Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Table */}
            <Table className="w-full border-none bg-transparent">
              <TableHeader>
                <TableRow className="text-left">
                  <TableCell className="py-4 px-6">#</TableCell>
                  <TableCell className="py-4 px-6">Title</TableCell>
                  <TableCell className="py-4 px-6">Description</TableCell>
                  <TableCell className="py-4 px-6">Status</TableCell>
                  <TableCell className="py-4 px-6">Location</TableCell>
                  <TableCell className="py-4 px-6">Report URL</TableCell>
                  <TableCell className="py-4 px-6">Members</TableCell>
                  <TableCell className="py-4 px-6">Supervisors</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project, index) => (
                  <TableRow key={project.id}>
                    <TableCell className="py-4 px-6">{index + 1}</TableCell>
                    <TableCell className="py-4 px-6">{project.title}</TableCell>
                    <TableCell className="py-4 px-6">{project.description || "N/A"}</TableCell>
                    <TableCell className="py-4 px-6">{project.status}</TableCell>
                    <TableCell className="py-4 px-6">{project.location || "N/A"}</TableCell>
                    <TableCell className="py-4 px-6">
                      {project.reportUrl ? (
                        <a href={project.reportUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          Report
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      {project.projectMembers?.filter((id) => students.some((s) => s.id === id)).length > 0
                        ? project.projectMembers
                            .filter((id) => students.some((s) => s.id === id))
                            .map((memberId) => members[memberId] || memberId)
                            .join(", ")
                        : "No Members"}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      {project.projectMembers?.filter((id) => teachers.some((t) => t.id === id)).length > 0
                        ? project.projectMembers
                            .filter((id) => teachers.some((t) => t.id === id))
                            .map((teacherId) => members[teacherId] || teacherId)
                            .join(", ")
                        : "No Supervisors"}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProjects.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No projects found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewPage;
