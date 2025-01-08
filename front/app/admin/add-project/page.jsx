"use client";

import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import MySidebar from "@/components/MySidebar";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import axios from "axios";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().optional(),
  projectMembers: z.array(z.string()).optional(),
  projectTeachers: z.array(z.string()).optional(),
  status: z.string().min(1, { message: "Status is required." }),
  location: z.string().optional(),
  projectTime: z.string().optional(),
  subject: z.string().optional(),
  reportUrl: z.string().url().optional(),
});

export default function AddProjectPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch students from the API
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://128.110.219.24:5050/users/");
        const studentUsers = response.data.filter((user) => user.role === "STUDENT");
        setStudents(studentUsers);
      } catch (error) {
        toast.error("Failed to fetch students");
      }
    };

    // Fetch teachers from the API
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://128.110.219.24:5050/users/");
        const teacherUsers = response.data.filter((user) => user.role === "TEACHER");
        setTeachers(teacherUsers);
      } catch (error) {
        toast.error("Failed to fetch teachers");
      }
    };

    fetchStudents();
    fetchTeachers();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      projectMembers: [],
      projectTeachers: [],
      status: "IN_PROGRESS",
      location: "",
      projectTime: "",
      subject: "",
      reportUrl: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("http://128.110.219.24:6060/api/projects/createproject", data);
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
              </div>

              <FormField
                control={form.control}
                name="projectMembers"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">Add Students</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange([...field.value, value])}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select students" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectTeachers"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">Add Teachers</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange([...field.value, value]);
                        form.setValue("projectMembers", [
                          ...form.getValues("projectMembers"),
                          value,
                        ]);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select teachers" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            {teacher.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

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
