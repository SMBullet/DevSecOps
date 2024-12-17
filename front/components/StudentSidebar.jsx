"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Clock, Mail, Settings, LogOut } from "lucide-react"; // New icons
import Link from "next/link";
import { usePathname } from "next/navigation"; // usePathname hook

const StudentSidebar = () => {
  const pathname = usePathname(); // Use usePathname to get the current path

  // Function to check if the current link is active
  const isActive = (path) => pathname === path;

  return (
    <div className="bg-transparent flex flex-col w-64 min-h-screen">
      <div className="flex flex-col h-full p-4 space-y-6 bg-transparent">
        <div className="flex items-center space-x-3">
          <div className="text-xl font-bold text-gray-900">PFEMA.COM</div>
        </div>

        {/* Navigation */}
        <nav className="space-y-6 flex-1 ml-2">
          <Link href="/student/dashboard" passHref>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/student/dashboard") ? "text-green-600" : "text-gray-600"} mb-3 mt-11`}
            >
              <Home className="mr-2 h-5 w-5" /> {/* Changed icon to Home */}
              Overview
            </Button>
          </Link>

          <Link href="/student/schedule" passHref>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/student/schedule") ? "text-green-600" : "text-gray-600"} mb-3`}
            >
              <Clock className="mr-2 h-5 w-5" /> {/* Changed icon to Clock */}
              Schedule
            </Button>
          </Link>

          <Link href="/student/messages" passHref>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/student/messages") ? "text-green-600" : "text-gray-600"} mb-3`}
            >
              <Mail className="mr-2 h-5 w-5" /> {/* Changed icon to Mail */}
              Messages
            </Button>
          </Link>

          <Link href="/student/settings" passHref>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/student/settings") ? "text-green-600" : "text-gray-600"} mb-3`}
            >
              <Settings className="mr-2 h-5 w-5" /> {/* Changed icon to Settings */}
              Settings
            </Button>
          </Link>
        </nav>

        {/* Logout - Positioned at the bottom */}
        <div className="mb-11">
          <Link href="/logout" passHref>
            <Button variant="ghost" className="mb-11 w-full justify-start text-gray-600 hover:text-red-600">
              <LogOut className="mr-2 h-5 w-5" /> {/* LogOut icon remains the same */}
              Log out
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
