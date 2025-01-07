"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Clock, Mail, Settings, LogOut } from "lucide-react"; // New icons
import { useRouter } from "next/navigation"; // useRouter for navigation
import { usePathname } from "next/navigation"; // usePathname hook

const StudentSidebar = () => {
  const pathname = usePathname(); // Use usePathname to get the current path
  const router = useRouter(); // Use useRouter for redirecting

  // Function to check if the current link is active
  const isActive = (path) => pathname === path;

  // Logout function
  const handleLogout = () => {
    // Clear authentication tokens or session data
    localStorage.removeItem("authToken"); // Example: Clear the token
    sessionStorage.removeItem("authToken"); // Example: Clear session data

    // Redirect to the homepage
    router.push("/");
  };

  return (
    <div className="bg-transparent flex flex-col w-64 min-h-screen">
      <div className="flex flex-col h-full p-4 space-y-6 bg-transparent">
        <div className="flex items-center space-x-3">
          <div className="text-xl font-bold text-gray-900">PFEMA.COM</div>
        </div>

        {/* Navigation */}
        <nav className="space-y-6 flex-1 ml-2">
          <Button
            variant="ghost"
            className={`w-full justify-start ${isActive("/student/dashboard") ? "text-green-600" : "text-gray-600"} mb-3 mt-11`}
            onClick={() => router.push("/student/dashboard")}
          >
            <Home className="mr-2 h-5 w-5" /> {/* Changed icon to Home */}
            Overview
          </Button>

          <Button
            variant="ghost"
            className={`w-full justify-start ${isActive("/student/schedule") ? "text-green-600" : "text-gray-600"} mb-3`}
            onClick={() => router.push("/student/schedule")}
          >
            <Clock className="mr-2 h-5 w-5" /> {/* Changed icon to Clock */}
            Schedule
          </Button>

          <Button
            variant="ghost"
            className={`w-full justify-start ${isActive("/student/messages") ? "text-green-600" : "text-gray-600"} mb-3`}
            onClick={() => router.push("/student/messages")}
          >
            <Mail className="mr-2 h-5 w-5" /> {/* Changed icon to Mail */}
            Messages
          </Button>

          <Button
            variant="ghost"
            className={`w-full justify-start ${isActive("/student/settings") ? "text-green-600" : "text-gray-600"} mb-3`}
            onClick={() => router.push("/student/settings")}
          >
            <Settings className="mr-2 h-5 w-5" /> {/* Changed icon to Settings */}
            Settings
          </Button>
        </nav>

        {/* Logout - Positioned at the bottom */}
        <div className="mb-11">
          <Button
            variant="ghost"
            className="mb-11 w-full justify-start text-gray-600 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" /> {/* LogOut icon remains the same */}
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
