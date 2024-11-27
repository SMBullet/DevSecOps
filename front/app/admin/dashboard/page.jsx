"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import MySidebar from "@/components/MySidebar"; // Import MySidebar

// Dummy data for filtering
const pfes = [
  {
    id: 1,
    title: "Platform of end of studies management",
    supervisor: "O.Achbarou",
    student: "Brahim KINIOUI",
    date: "5/7/2025",
    room: "Room 2",
    degree: "GCDSTE",
    entreprise: "Entreprise 1",
  },
  {
    id: 2,
    title: "A SOC setup and supervision",
    supervisor: "O.Achbarou",
    student: "Yassine Essaleh",
    date: "5/7/2025",
    room: "Room 2",
    degree: "GCDSTE",
    entreprise: "Entreprise 2",
  },
  {
    id: 3,
    title: "Red Team Operator",
    supervisor: "O.Achbarou",
    student: "Mehdi STOTI",
    date: "6/7/2025",
    room: "Room 12",
    degree: "GCDSTE",
    entreprise: "Entreprise 3",
  },
];

const OverviewPage = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    entreprise: null,
    supervisor: null,
    date: null,
    room: null,
    degree: null,
  });

  // Filtered PFE logic
  const filteredPfes = pfes.filter((pfe) => {
    return (
      pfe.title.toLowerCase().includes(search.toLowerCase()) &&
      (filters.entreprise ? pfe.entreprise === filters.entreprise : true) &&
      (filters.supervisor ? pfe.supervisor === filters.supervisor : true) &&
      (filters.date ? pfe.date === filters.date : true) &&
      (filters.room ? pfe.room === filters.room : true) &&
      (filters.degree ? pfe.degree === filters.degree : true)
    );
  });

  // Function to clear all filters
  const clearFilters = () => {
    setFilters({
      entreprise: null,
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
              value={filters.entreprise || ""}
              onValueChange={(value) => setFilters({ ...filters, entreprise: value || null })}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Entreprise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>None</SelectItem>
                <SelectItem value="Entreprise 1">Entreprise 1</SelectItem>
                <SelectItem value="Entreprise 2">Entreprise 2</SelectItem>
                <SelectItem value="Entreprise 3">Entreprise 3</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.supervisor || ""}
              onValueChange={(value) => setFilters({ ...filters, supervisor: value || null })}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Supervisor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>None</SelectItem>
                <SelectItem value="O.Achbarou">O.Achbarou</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.date || ""}
              onValueChange={(value) => setFilters({ ...filters, date: value || null })}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>None</SelectItem>
                <SelectItem value="5/7/2025">5/7/2025</SelectItem>
                <SelectItem value="6/7/2025">6/7/2025</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.room || ""}
              onValueChange={(value) => setFilters({ ...filters, room: value || null })}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>None</SelectItem>
                <SelectItem value="Room 2">Room 2</SelectItem>
                <SelectItem value="Room 12">Room 12</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.degree || ""}
              onValueChange={(value) => setFilters({ ...filters, degree: value || null })}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Degree" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>None</SelectItem>
                <SelectItem value="GCDSTE">GCDSTE</SelectItem>
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
            <CardTitle>Upcoming PFEs</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Table */}
            <Table className="w-full border-none bg-transparent">
              <TableHeader>
                <TableRow className="text-left">
                  <TableCell className="py-4 px-6">#</TableCell>
                  <TableCell className="py-4 px-6">Title</TableCell>
                  <TableCell className="py-4 px-6">Supervisor</TableCell>
                  <TableCell className="py-4 px-6">Student</TableCell>
                  <TableCell className="py-4 px-6">Date</TableCell>
                  <TableCell className="py-4 px-6">Room</TableCell>
                  <TableCell className="py-4 px-6">Degree</TableCell>
                  <TableCell className="py-4 px-6">Entreprise</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPfes.map((pfe) => (
                  <TableRow key={pfe.id}>
                    <TableCell className="py-4 px-6">{pfe.id}</TableCell>
                    <TableCell className="py-4 px-6">{pfe.title}</TableCell>
                    <TableCell className="py-4 px-6">{pfe.supervisor}</TableCell>
                    <TableCell className="py-4 px-6">{pfe.student}</TableCell>
                    <TableCell className="py-4 px-6">{pfe.date}</TableCell>
                    <TableCell className="py-4 px-6">{pfe.room}</TableCell>
                    <TableCell className="py-4 px-6">{pfe.degree}</TableCell>
                    <TableCell className="py-4 px-6">{pfe.entreprise}</TableCell>
                  </TableRow>
                ))}
                {filteredPfes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No PFEs found.
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
