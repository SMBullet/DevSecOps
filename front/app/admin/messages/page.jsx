"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Using usePathname hook to get current path
import MySidebar from "@/components/MySidebar"; // Assuming MySidebar is located here
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"; // ShadCN Drawer components

const messagesData = [
  {
    id: 1,
    sender: "John Doe",
    subject: "Project Update",
    message: "Your project 'Alpha' has been updated. Please review the changes.",
    date: "2024-11-22",
    isRead: false,
  },
  {
    id: 2,
    sender: "Jane Smith",
    subject: "New Enterprise Opportunity",
    message: "We have a new enterprise proposal that might interest you. Let's discuss.",
    date: "2024-11-21",
    isRead: true,
  },
  {
    id: 3,
    sender: "Admin Support",
    subject: "System Maintenance",
    message: "Scheduled system maintenance will occur tomorrow at 3 AM.",
    date: "2024-11-20",
    isRead: false,
  },
];

const MessagesPage = () => {
  const pathname = usePathname(); // Using usePathname hook to get current path
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Function to check if a message is read
  const isMessageRead = (isRead) => (isRead ? "text-gray-600" : "text-green-600");

  // Handle message read state change or other actions
  const handleMessageAction = (message) => {
    setSelectedMessage(message);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <MySidebar />

      {/* Main content area */}
      <div className="flex-1 p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Messages</h2>
          <Link href="/admin/messages/compose">
            <Button variant="outline" className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Compose</span>
            </Button>
          </Link>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {messagesData.map((message) => (
            <div
              key={message.id}
              className={`p-4 border rounded-lg ${isMessageRead(message.isRead)} hover:bg-gray-100 cursor-pointer`}
              onClick={() => handleMessageAction(message)}
            >
              <div className="flex justify-between">
                <h3 className="font-semibold text-lg">{message.subject}</h3>
                <span className="text-sm text-gray-500">{message.date}</span>
              </div>
              <p className="text-gray-700 mt-1">{message.message}</p>

              {/* Message Actions */}
              <div className="mt-3 flex space-x-4 text-sm text-gray-600">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Reply</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2"
                >
                  <Trash className="h-4 w-4" />
                  <span>Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drawer to show message details */}
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader>
              <DrawerTitle>Message Details</DrawerTitle>
              <DrawerDescription>
                Here are the details of the message you clicked on.
              </DrawerDescription>
            </DrawerHeader>

            {/* Message Details */}
            {selectedMessage && (
              <div className="p-4">
                <div className="mb-4">
                  <strong>Sender:</strong> {selectedMessage.sender}
                </div>
                <div className="mb-4">
                  <strong>Subject:</strong> {selectedMessage.subject}
                </div>
                <div className="mb-4">
                  <strong>Message:</strong> <p>{selectedMessage.message}</p>
                </div>
                <div className="mb-4">
                  <strong>Date:</strong> {selectedMessage.date}
                </div>
              </div>
            )}

            <DrawerFooter>
              <Button onClick={() => setIsDrawerOpen(false)}>Close</Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MessagesPage;
