"use client";

import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Clipboard, Calendar, User, MapPin, Briefcase, Award } from "lucide-react";
import MySidebar from "@/components/MySidebar";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import axios from "axios";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  supervisor: z.string().min(2, { message: "Supervisor name must be at least 2 characters." }),
  student: z.string().min(2, { message: "Student name must be at least 2 characters." }),
  date: z.string().min(1, { message: "Date is required." }),
  room: z.string().min(1, { message: "Room is required." }),
  entreprise: z.string().min(2, { message: "Entreprise name must be at least 2 characters." }),
  degree: z.string().min(2, { message: "Degree name must be at least 2 characters." }),
});

export default function AddProjectPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      supervisor: "",
      student: "",
      date: "",
      room: "",
      entreprise: "",
      degree: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:6060/api/projects/createproject', data);
      toast.success("Project created successfully!");
      form.reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create project");
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
            Project Management
          </motion.h1>
          <p className="text-gray-600">Add and manage your projects efficiently</p>
        </header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-6">Create New Project</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Project Title</FormLabel>
                      <FormControl>
                        <div className="relative transition-all duration-300 hover:shadow-sm">
                          <Clipboard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            placeholder="Enter project title" 
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
                  control={form.control}
                  name="supervisor"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Supervisor</FormLabel>
                      <FormControl>
                        <div className="relative transition-all duration-300 hover:shadow-sm">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            placeholder="Enter supervisor name" 
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
                  control={form.control}
                  name="student"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Student</FormLabel>
                      <FormControl>
                        <div className="relative transition-all duration-300 hover:shadow-sm">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            placeholder="Enter student name" 
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
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Date</FormLabel>
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
                  control={form.control}
                  name="room"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Room</FormLabel>
                      <FormControl>
                        <div className="relative transition-all duration-300 hover:shadow-sm">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            placeholder="Enter room number" 
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
                  control={form.control}
                  name="entreprise"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Enterprise</FormLabel>
                      <FormControl>
                        <div className="relative transition-all duration-300 hover:shadow-sm">
                          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            placeholder="Enter enterprise name" 
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
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Degree</FormLabel>
                      <FormControl>
                        <div className="relative transition-all duration-300 hover:shadow-sm">
                          <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            placeholder="Enter degree name" 
                            {...field} 
                            className="pl-10 h-11 border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                          />
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
                  onClick={() => form.reset()}
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
                    'Create Project'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </motion.div>
    </div>
  );
}
