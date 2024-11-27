"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Clipboard, Calendar, User, MapPin, Briefcase, Award } from "lucide-react";
import MySidebar from "@/components/MySidebar";

// Define the schema with Zod for form validation
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  supervisor: z.string().min(2, { message: "Supervisor name must be at least 2 characters." }),
  student: z.string().min(2, { message: "Student name must be at least 2 characters." }),
  date: z.string().min(1, { message: "Date is required." }),
  room: z.string().min(1, { message: "Room is required." }),
  entreprise: z.string().min(2, { message: "Entreprise name must be at least 2 characters." }),
  degree: z.string().min(2, { message: "Degree name must be at least 2 characters." }),  // New degree field
});

export default function AddProjectPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      supervisor: "",
      student: "",
      date: "",
      room: "",
      entreprise: "",
      degree: "",  // Default value for degree field
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <MySidebar />

      {/* Main Content */}
      <div className="flex-1 w-full p-8 mx-4 my-6 bg-white rounded-3xl shadow-xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Add New Project</h1>
        </header>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              {/* Title */}
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">Title</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clipboard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Enter project title"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The title of the project.
                    </FormDescription>
                    <FormMessage>{errors.title?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Supervisor */}
              <FormField
                control={control}
                name="supervisor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">Supervisor</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Enter supervisor name"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The name of the supervisor for the project.
                    </FormDescription>
                    <FormMessage>{errors.supervisor?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Student */}
              <FormField
                control={control}
                name="student"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">Student</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Enter student name"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The name of the student associated with the project.
                    </FormDescription>
                    <FormMessage>{errors.student?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Enter project date"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The date when the project will be started.
                    </FormDescription>
                    <FormMessage>{errors.date?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Room */}
              <FormField
                control={control}
                name="room"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">Room</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Enter room number"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The room where the project will be held.
                    </FormDescription>
                    <FormMessage>{errors.room?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Enterprise */}
              <FormField
                control={control}
                name="entreprise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">Enterprise</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Enter enterprise name"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The enterprise involved in the project.
                    </FormDescription>
                    <FormMessage>{errors.entreprise?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Degree */}
              <FormField
                control={control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">Degree</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Enter degree"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The degree or qualification related to the project.
                    </FormDescription>
                    <FormMessage>{errors.degree?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-start mt-8">
              <Button
                type="submit"
                variant="primary"
                className="w-auto bg-black text-white hover:bg-gray-800 transition-all duration-300 px-6 py-2"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
