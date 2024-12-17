"use client";

import StudentSidebar  from "@/components/StudentSidebar";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { format } from 'date-fns';

// Add this new component for the week day header
const WeekDayHeader = ({ date, day, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={`p-4 text-center cursor-pointer transition-all duration-200 mx-1
      ${isSelected ? 'bg-blue-50/80 rounded-xl shadow-sm' : 'hover:bg-gray-50 rounded-xl'}`}
  >
    <div className="text-sm font-medium text-gray-500 mb-1">{day}</div>
    <div className={`text-xl font-semibold ${
      isSelected ? 'text-blue-600' : 'text-gray-700'
    }`}>{date}</div>
  </div>
);

// Updated Event Component with resize functionality
const Event = ({ id, title, time, type, top, height, onEventMove, onEventResize }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EVENT',
    item: { id, title, time, type, top, height },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getEventStyles = () => {
    const typeStyles = {
      presentation: "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 text-blue-700",
      meeting: "bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 text-purple-700",
      workshop: "bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 text-green-700"
    };
    
    return `${typeStyles[type]} shadow-sm hover:shadow-md`;
  };

  return (
    <div
      ref={drag}
      style={{ 
        top: `${top}px`,
        height: `${height}px`,
        position: 'absolute',
        left: '4px',
        right: '4px',
      }}
      className={`${isDragging ? 'opacity-50' : ''} rounded-lg transition-shadow duration-200`}
    >
      {/* Top resize handle */}
      <div 
        className="absolute -top-1 left-0 right-0 h-2 cursor-ns-resize z-10 group"
        onMouseDown={(e) => onEventResize(e, id, 'top')}
      >
        <div className="absolute inset-x-3 top-1/2 h-1 bg-white rounded opacity-0 group-hover:opacity-100" />
      </div>

      {/* Event content */}
      <div className={`${getEventStyles()} h-full p-2 rounded-lg flex flex-col`}>
        <div className="flex justify-between items-start">
          <div className="text-sm font-semibold">{title}</div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="peer hidden"
            />
            <div className="w-5 h-5 border-2 rounded-md border-gray-300 
              peer-checked:bg-blue-500 peer-checked:border-blue-500 
              transition-all duration-200 relative
              after:content-[''] after:absolute after:left-1/2 after:top-1/2 
              after:w-2 after:h-3.5 after:border-r-2 after:border-b-2 
              after:border-white after:opacity-0 after:-translate-x-1/2 
              after:-translate-y-1/2 after:rotate-45
              peer-checked:after:opacity-100
              hover:border-blue-500 cursor-pointer"
            />
          </label>
        </div>
        <div className="text-xs mt-1 opacity-75">{time}</div>
      </div>

      {/* Bottom resize handle */}
      <div 
        className="absolute -bottom-1 left-0 right-0 h-2 cursor-ns-resize z-10 group"
        onMouseDown={(e) => onEventResize(e, id, 'bottom')}
      >
        <div className="absolute inset-x-3 top-1/2 h-1 bg-white rounded opacity-0 group-hover:opacity-100" />
      </div>
    </div>
  );
};

// Updated TimeSlot Component
const TimeSlot = ({ onDrop, children, dayIndex, hourIndex }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'EVENT',
    drop: (item, monitor) => {
      const dropOffset = monitor.getClientOffset().y - monitor.getInitialClientOffset().y;
      onDrop(item, dayIndex, hourIndex, dropOffset);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`h-20 relative transition-colors duration-200
        ${isOver ? 'bg-blue-50/20' : 'hover:bg-gray-50/30'}`}
    >
      {children}
    </div>
  );
};

const SchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "PFE's presentation",
      time: "11:00 am - 12:00 pm",
      type: "presentation",
      dayIndex: 1,
      hourIndex: 3,
      height: '80px', // One hour default height
      startMinute: 0,
      endMinute: 60
    },
    {
      id: 2,
      title: "Team Meeting",
      time: "2:00 pm - 4:00 pm",
      type: "meeting",
      dayIndex: 3,
      hourIndex: 6,
      duration: 2,
      isCompleted: true
    },
    {
      id: 3,
      title: "Workshop",
      time: "9:00 am - 11:00 am",
      type: "workshop",
      dayIndex: 2,
      hourIndex: 1,
      duration: 2,
      isCompleted: false
    }
  ]);
  const [resizingEvent, setResizingEvent] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
        setIsYearOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setIsCalendarOpen(false);
  };

  const handleYearSelect = (year) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setIsYearOpen(false);
  };

  const handleDayClick = (dayIndex) => {
    setSelectedDay(dayIndex);
  };

  const formatHour = (hour) => {
    const period = hour < 12 ? 'am' : 'pm';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const handleEventMove = useCallback((item, newDayIndex, newHourIndex) => {
    setEvents(prev => prev.map(event => {
      if (event.id === item.id) {
        const newTime = formatHour(8 + newHourIndex);
        return {
          ...event,
          dayIndex: newDayIndex,
          hourIndex: newHourIndex,
          time: newTime
        };
      }
      return event;
    }));
  }, []);

  const formatTime = (hour, minutes) => {
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const handleEventResize = useCallback((e, eventId, handle) => {
    e.preventDefault();
    const startY = e.clientY;
    const eventToResize = events.find(event => event.id === eventId);
    const initialTop = parseInt(eventToResize.top) || eventToResize.hourIndex * 80;
    const initialHeight = parseInt(eventToResize.height) || 80;
    const slotHeight = 80;

    const handleMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const snapToGrid = 5; // Snap to 5-minute intervals

      if (handle === 'top') {
        const newTop = Math.max(0, initialTop + deltaY);
        const newHeight = Math.max(20, initialHeight - deltaY);
        const startHour = 8 + Math.floor(newTop / slotHeight);
        const startMinutes = Math.round((newTop % slotHeight) / slotHeight * 60 / snapToGrid) * snapToGrid;

        setEvents(prev => prev.map(event => {
          if (event.id === eventId) {
            const endTime = event.time.split(' - ')[1];
            return {
              ...event,
              top: newTop,
              height: newHeight,
              hourIndex: Math.floor(newTop / slotHeight),
              time: `${formatTime(startHour, startMinutes)} - ${endTime}`
            };
          }
          return event;
        }));
      } else {
        const newHeight = Math.max(20, initialHeight + deltaY);
        const endTop = initialTop + newHeight;
        const endHour = 8 + Math.floor(endTop / slotHeight);
        const endMinutes = Math.round((endTop % slotHeight) / slotHeight * 60 / snapToGrid) * snapToGrid;

        setEvents(prev => prev.map(event => {
          if (event.id === eventId) {
            const startTime = event.time.split(' - ')[0];
            return {
              ...event,
              height: newHeight,
              time: `${startTime} - ${formatTime(endHour, endMinutes)}`
            };
          }
          return event;
        }));
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [events]);

  const toggleEventComplete = useCallback((eventId) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        return { ...event, isCompleted: !event.isCompleted };
      }
      return event;
    }));
  }, []);

  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push({
        date: date.getDate(),
        day: date.toLocaleString('default', { weekday: 'short' })
      });
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
    setSelectedDay((prev) => (prev === 0 ? 6 : prev - 1));
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
    setSelectedDay((prev) => (prev === 6 ? 0 : prev + 1));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen bg-gray-100">
        <StudentSidebar />
        <div className="flex-1 p-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule</h1>
                  <p className="text-gray-500">
                    Welcome back, Brahim! Check your calendar for your upcoming event!
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePreviousDay}
                    className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  >
                    ←
                  </button>
                  <div className="relative" ref={calendarRef}>
                    <button
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      className="text-xl font-semibold text-gray-700 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
                    >
                      {format(currentDate, 'MMMM')}{' '}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsYearOpen(!isYearOpen);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {currentDate.getFullYear()}
                      </button>
                    </button>

                    {/* Month Picker Dropdown */}
                    {isCalendarOpen && (
                      <div className="absolute top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-50 w-64">
                        <div className="grid grid-cols-3 gap-1">
                          {months.map((month, index) => (
                            <button
                              key={month}
                              onClick={() => handleMonthSelect(index)}
                              className={`p-2 text-sm rounded-lg transition-colors
                                ${currentDate.getMonth() === index 
                                  ? 'bg-blue-50 text-blue-600' 
                                  : 'hover:bg-gray-50'
                                }`}
                            >
                              {month}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Year Picker Dropdown */}
                    {isYearOpen && (
                      <div className="absolute top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-50 w-32">
                        <div className="flex flex-col gap-1">
                          {years.map((year) => (
                            <button
                              key={year}
                              onClick={() => handleYearSelect(year)}
                              className={`p-2 text-sm rounded-lg transition-colors
                                ${currentDate.getFullYear() === year 
                                  ? 'bg-blue-50 text-blue-600' 
                                  : 'hover:bg-gray-50'
                                }`}
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleNextDay}
                    className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Week header */}
              <div className="grid grid-cols-8 mb-2">
                <div className="w-20"></div>
                {weekDates.map(({ date, day }, index) => (
                  <WeekDayHeader
                    key={date}
                    date={date}
                    day={day}
                    isSelected={selectedDay === index}
                    onClick={() => handleDayClick(index)}
                  />
                ))}
              </div>

              {/* Schedule grid - added pt-4 for top spacing */}
              <div className="grid grid-cols-8 rounded-xl overflow-hidden pt-4">
                {/* Time labels */}
                <div className="relative w-20">
                  {Array.from({ length: 11 }, (_, i) => (
                    <div key={i} className="h-20 relative">
                      <span className="absolute -top-2.5 right-3 z-10 bg-white px-2 text-sm font-medium text-gray-500 whitespace-nowrap">
                        {formatHour(8 + i)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Schedule content */}
                <div className="col-span-7">
                  <div className="grid grid-cols-7 relative">
                    {/* Background grid lines that extend to time column */}
                    <div className="absolute -left-20 right-0 top-0 bottom-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:100%_5rem]" />
                    
                    {Array.from({ length: 7 }, (_, dayIndex) => (
                      <div key={dayIndex} className={`relative ${dayIndex < 6 ? 'border-r border-gray-200/70' : ''}`}>
                        {Array.from({ length: 11 }, (_, hourIndex) => (
                          <TimeSlot
                            key={hourIndex}
                            dayIndex={dayIndex}
                            hourIndex={hourIndex}
                            onDrop={handleEventMove}
                          >
                            {events.map(event => 
                              event.dayIndex === dayIndex && 
                              event.hourIndex === hourIndex && (
                                <Event
                                  key={event.id}
                                  {...event}
                                  onEventMove={handleEventMove}
                                  onEventResize={handleEventResize}
                                />
                              )
                            )}
                          </TimeSlot>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default SchedulePage;
