"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList, MessageSquare, Calendar, Building, Users, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // useRouter for navigation

const MySidebar = () => {
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
          <Link href="/admin/dashboard" passHref>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/admin/dashboard") ? "text-green-600" : "text-gray-600"} mb-3 mt-11`}
            >
              <ClipboardList className="mr-2 h-5 w-5" />
              Overview
            </Button>
          </Link>

          <Link href="/admin/messages" passHref>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/admin/messages") ? "text-green-600" : "text-gray-600"} mb-3`}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Messages
            </Button>
          </Link>

          <Link href="/admin/add-project" passHref>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/admin/add-project") ? "text-green-600" : "text-gray-600"} mb-3`}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Add a Project
            </Button>
          </Link>

          <Link href="/admin/enterprises" passHref>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/admin/enterprises") ? "text-green-600" : "text-gray-600"} mb-3`}
            >
              <Building className="mr-2 h-5 w-5" />
              Enterprises
            </Button>
          </Link>

          <Link href="/admin/users" passHref>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/admin/users") ? "text-green-600" : "text-gray-600"} mb-3`}
            >
              <Users className="mr-2 h-5 w-5" />
              Users
            </Button>
          </Link>
        </nav>

        {/* Logout - Positioned at the bottom */}
        <div className="mb-11">
          <Button
            variant="ghost"
            className="mb-11 w-full justify-start text-gray-600 hover:text-red-600"
            onClick={handleLogout} // Call handleLogout on click
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MySidebar;
