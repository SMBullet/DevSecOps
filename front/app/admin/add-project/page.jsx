"use client";

import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Clipboard, Calendar, MapPin, Award } from "lucide-react";
import MySidebar from "@/components/MySidebar";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import axios from "axios";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().optional(),
  projectMembers: z.array(z.string().uuid()).optional(),
  status: z.string().min(1, { message: "Status is required." }),
  location: z.string().optional(),
  projectTime: z.string().optional(),
  subject: z.string().optional(),
  reportUrl: z.string().url().optional(),
});

export default function AddProjectPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students from the API
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5050/users/");
        const studentUsers = response.data.filter((user) => user.role === "STUDENT");
        setStudents(studentUsers);
      } catch (error) {
        toast.error("Failed to fetch students");
      }
    };

    fetchStudents();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      projectMembers: [],
      status: "IN_PROGRESS",
      location: "",
      projectTime: "",
      subject: "",
      reportUrl: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Submitting data:", data); // Debugging: log submitted data
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:6060/api/projects/createproject", data);
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
                        <Input
                          placeholder="Enter project title"
                          {...field}
                          className="h-11 border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter project description"
                          {...field}
                          className="h-11 border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Status</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter project status"
                          {...field}
                          className="h-11 border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter project location"
                          {...field}
                          className="h-11 border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reportUrl"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Report URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter report URL"
                          {...field}
                          className="h-11 border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectMembers"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">Project Members</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {students.map((student) => (
                            <div
                              key={student.id}
                              className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                const members = [...field.value];
                                if (members.includes(student.id)) {
                                  field.onChange(members.filter((id) => id !== student.id));
                                } else {
                                  field.onChange([...members, student.id]);
                                }
                              }}
                              style={{
                                backgroundColor: field.value.includes(student.id) ? "#d1fae5" : "white",
                              }}
                            >
                              {student.username}
                            </div>
                          ))}
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
                  {isLoading ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </motion.div>
    </div>
  );
}
