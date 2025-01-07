"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, Mail } from "lucide-react";
import MySidebar from "@/components/MySidebar";

import axios from "axios";

// Define schema for the form validation using Zod
const userSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  dob: z.string().nonempty({ message: "Date of birth is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["student", "teacher"], { message: "Role must be either student or teacher." }),
});

export default function UsersPage() {
  const [focusedField, setFocusedField] = useState(null);

  // Create the form methods for handling the form with React Hook Form
  const methods = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      dob: "",
      email: "",
      password: "",
      role: "student", // default role is "student"
    },
  });


  const onSubmit = async (data) => {
    try {
      const userData = {
        username: data.username,
        dob: data.dob,
        email: data.email,
        password: data.password,
        role: data.role,
      };

      // Send the POST request to the back-end API
      const response = await axios.post(`http://localhost:5050/auth/register`, userData);

      // Handle successful response
      console.log("User registered:", response.data);
      // Optionally reset form or show a success message
    } catch (error) {
      // Handle errors
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <MySidebar />

      <div className="flex-1 w-full p-8 mx-4 my-6 bg-white rounded-3xl shadow-xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Users</h1>
          <p className="text-gray-600">Welcome back, Admin! Check your settings and verify your information!</p>
        </header>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New User</h2>
          
          {/* Wrap the form inside FormProvider to share form context */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {/* Username Field */}
                <FormField
                  control={methods.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Enter the username" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Date of Birth Field */}
                <FormField
                  control={methods.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="date" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={methods.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Enter the email address" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={methods.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="password" placeholder="Enter a secure password" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Role Dropdown */}
                <FormField
                  control={methods.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <select {...field} className="pl-10 py-2 pr-3 border rounded-md text-gray-600">
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                          </select>
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
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
