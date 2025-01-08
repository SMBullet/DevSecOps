"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock, Calendar, UserCheck } from "lucide-react";
import MySidebar from "@/components/MySidebar";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import axios from "axios";

const userSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  dob: z.string().nonempty({ message: "Date of birth is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["STUDENT", "TEACHER"], { message: "Role must be either STUDENT or TEACHER." }),
});

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      dob: "",
      email: "",
      password: "",
      role: "STUDENT",  // Changed to uppercase
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://128.110.219.24:5050/auth/register`, 
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      toast.success("User created successfully!");
      methods.reset();
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || "Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <MySidebar />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 w-full p-8 mx-4 my-6 bg-white rounded-3xl shadow-lg"
      >
        <header className="mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            Users Management
          </motion.h1>
          <p className="text-gray-600">Manage your users and their roles efficiently</p>
        </header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-6">Create New User</h2>
          
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
                <FormField
                  control={methods.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Username</FormLabel>
                      <FormControl>
                        <div className="relative transition-all duration-300 hover:shadow-sm">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            placeholder="Enter username" 
                            {...field} 
                            className="pl-10 h-11 border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={methods.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Date of Birth</FormLabel>
                      <FormControl>
                        <div className="relative transition-all duration-300 hover:shadow-sm">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            type="date" 
                            {...field} 
                            className="pl-10 h-11 border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={methods.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Email</FormLabel>
                      <FormControl>
                        <div className="relative transition-all duration-300 hover:shadow-sm">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            placeholder="Enter email address" 
                            {...field} 
                            className="pl-10 h-11 border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={methods.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Password</FormLabel>
                      <FormControl>
                        <div className="relative transition-all duration-300 hover:shadow-sm">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            type="password" 
                            placeholder="Enter password" 
                            {...field} 
                            className="pl-10 h-11 border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={methods.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Role</FormLabel>
                      <FormControl>
                        <div className="relative transition-all duration-300 hover:shadow-sm">
                          <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <select 
                            {...field} 
                            className="w-full pl-10 h-11 border rounded-md border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                          >
                            <option value="STUDENT">Student</option>
                            <option value="TEACHER">Teacher</option>
                          </select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  className="px-6 transition-all duration-300 hover:bg-gray-50"
                  onClick={() => methods.reset()}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="px-6 bg-black text-white transition-all duration-300 hover:bg-gray-800 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">◌</span>
                      Creating...
                    </span>
                  ) : (
                    'Create User'
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </motion.div>
      </motion.div>
    </div>
  );
}
