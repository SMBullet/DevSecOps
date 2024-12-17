"use client";

import StudentSidebar from "@/components/StudentSidebar";
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal"; // Assuming you have a modal component

const SchedulePage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      date: "2025-06-10",
      title: "PFE's presentation",
      time: "11:00 am - 12:00 pm",
      description: "Presentation of the final year project.",
    },
    // Add more events as needed
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Header */}
        <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-600">Welcome back, Brahim!</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Log Out</button>
          </div>
        </header>

        {/* Calendar Section */}
        <div className="flex-1 bg-[#F9F9F9] p-6 rounded-3xl shadow-lg m-6">
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md border border-gray-300">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-lg text-gray-800">June 2025</p>
              <div className="flex items-center space-x-2">
                <button
                  className="px-2 py-1 text-gray-600 hover:text-gray-900 focus:outline-none"
                  aria-label="Previous Month"
                >
                  {"<"}
                </button>
                <button
                  className="px-2 py-1 text-gray-600 hover:text-gray-900 focus:outline-none"
                  aria-label="Next Month"
                >
                  {">"}
                </button>
              </div>
            </div>
            {/* Weekly View */}
            <div className="grid grid-cols-7 mt-4 text-center text-sm text-gray-600">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                <p key={index} className="font-medium">
                  {day}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 mt-2">
              {/* Placeholder for calendar time blocks */}
              {Array.from({ length: 7 * 5 }).map((_, index) => {
                const event = events.find((e) => e.date === `2025-06-${index + 1}`);
                return (
                  <div
                    key={index}
                    className={`h-20 border ${event ? "bg-blue-200 cursor-pointer" : ""}`}
                    onClick={() => event && handleEventClick(event)}
                  >
                    {event && (
                      <div className="text-sm p-2 font-medium text-blue-800">
                        {event.title} <br /> {event.time}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
          <p className="text-sm text-gray-600">{selectedEvent.time}</p>
          <p className="mt-2">{selectedEvent.description}</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={closeModal}>
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default SchedulePage;