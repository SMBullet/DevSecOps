"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, GraduationCap, Mail } from "lucide-react";
import MySidebar from "@/components/MySidebar";

// Define schemas for both forms
const studentSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  degree: z.string().min(2, { message: "Degree must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const teacherSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  speciality: z.string().min(2, { message: "Speciality must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function UsersPage() {
  const [focusedField, setFocusedField] = useState(null);

  const studentForm = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      degree: "",
      email: "",
    },
  });

  const teacherForm = useForm({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      speciality: "",
      email: "",
    },
  });

  const onStudentSubmit = (data) => {
    console.log("Student data:", data);
    // Add your API call here
  };

  const onTeacherSubmit = (data) => {
    console.log("Teacher data:", data);
    // Add your API call here
  };

  return (
    <div className="flex min-h-screen w-full">
      <MySidebar />

      <div className="flex-1 w-full p-8 mx-4 my-6 bg-white rounded-3xl shadow-xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Users</h1>
          <p className="text-gray-600">Welcome back, Admin! Check your settings and verify your informations!</p>
        </header>

        {/* Students Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          <Form {...studentForm}>
            <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="space-y-4">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {/* Student Form Fields */}
                <FormField
                  control={studentForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Enter the first name of the student" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={studentForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Enter the last name of the student" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={studentForm.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Enter the degree of the student" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={studentForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Enter the name of the student" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="destructive">
                  Cancel
                </Button>
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Teachers Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Teachers</h2>
          <Form {...teacherForm}>
            <form onSubmit={teacherForm.handleSubmit(onTeacherSubmit)} className="space-y-4">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {/* Teacher Form Fields */}
                <FormField
                  control={teacherForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Enter the first name of the teacher" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={teacherForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Enter the last name of the teacher" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={teacherForm.control}
                  name="speciality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speciality</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Enter the degree of the student" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={teacherForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Enter the name of the student" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="destructive">
                  Cancel
                </Button>
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
