"use client";

import StudentInfoCard from "@/components/StudentInfoCard";
import StudentSidebar from "@/components/StudentSidebar";
import React, { useState, useEffect, useRef } from "react";
import { IoPaperPlaneOutline, IoMicOutline, IoImageOutline, IoAttachOutline, IoHappyOutline } from "react-icons/io5"; // Import the paper plane icon from React Icons

// Dummy data for the student (this can be replaced with a state or data from an API)
const initialStudentInfo = {
  firstName: "Brahim",
  lastName: "KINIOUI",
  picture: "https://via.placeholder.com/150", // Placeholder for student picture
  major: "GCDSTE",
  email: "brahim.kinoui@email.com",
  phone: "+123 456 789",
};

// Updated initial conversations with "Mehdi Stoti" and "Omar Achbarou"
const initialConversations = [
  {
    id: 1,
    participants: ["Mehdi Stoti", "You"], // Conversation with Mehdi Stoti
    participantsPhotos: [
      "https://media.licdn.com/dms/image/v2/D4E35AQEIuWCAVgFAZw/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1728007026055?e=1736902800&v=beta&t=5FaGJYEnqxhQLEixwltj6EiOr7IXKh1ahkjkwKpldO8", // Mehdi's photo
      "https://via.placeholder.com/40", // Your photo
    ],
    messages: [
      { sender: "Mehdi Stoti", message: "Hey Hakim, how are you?" },
      { sender: "You", message: "I'm doing well, thanks! How about you?" },
      { sender: "Mehdi Stoti", message: "Good to hear! Just wanted to check in on the project progress." },
      { sender: "You", message: "Everything is on track, I'll send you an update soon." },
    ],
  },
  {
    id: 2,
    participants: ["Omar Achbarou", "You"], // Conversation with Omar Achbarou
    participantsPhotos: [
      "https://media.licdn.com/dms/image/v2/C4D03AQFm4vxMfPlTKg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1632831843821?e=1741824000&v=beta&t=lxIbC-PDoUg_DKZSpqdzefl_v2dZBfSUuNK_S10psrI", // Omar's photo
      "https://via.placeholder.com/40", // Your photo
    ],
    messages: [
      { sender: "Omar Achbarou", message: "Hakim, are you available for a quick chat?" },
      { sender: "You", message: "Sure, what's up?" },
      { sender: "Omar Achbarou", message: "I need some help with a few things for the project." },
      { sender: "You", message: "Of course, let me know what you need help with." },
    ],
  },
];

const MessagesPage = () => {
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState(initialConversations);
  const [studentInfo, setStudentInfo] = useState(initialStudentInfo);
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const textareaRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const handleSelectConversation = (id) => {
    setSelectedConversationId(id);
  };

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const updatedConversations = conversations.map((conversation) => {
        if (conversation.id === selectedConversationId) {
          return {
            ...conversation,
            messages: [
              ...conversation.messages,
              { sender: "You", message: newMessage.trim() },
            ],
          };
        }
        return conversation;
      });
      setConversations(updatedConversations);
      setNewMessage(""); // Reset the input field
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log("File selected:", file);
    }
  };

  const selectedConversation =
    selectedConversationId !== null
      ? conversations.find((conversation) => conversation.id === selectedConversationId)
      : null;

  // Function to truncate text
  const truncateText = (text, maxLength = 30) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  useEffect(() => {
    // Adjust the textarea height dynamically based on the content
    if (textareaRef.current) {
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 72; // Max height for 3 lines (3 * 24px line height)
      setTextareaHeight(scrollHeight > maxHeight ? maxHeight : scrollHeight);
    }
  }, [newMessage]);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <StudentSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 mx-4 my-8 rounded-xl shadow-xl flex bg-white">
        {/* Left Section (All Conversations) */}
        <div className="w-[400px] border-r border-gray-200">
          {/* Welcome Section */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
            <p className="text-gray-600">Hello Hakim, check your messages</p>
          </div>

          {/* Search Bar */}
          <div className="px-6 py-4">
            <input
              type="search"
              placeholder="Search conversations..."
              className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Messages</h2>
            {/* Conversations List */}
            <div className="space-y-3 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`cursor-pointer p-4 flex items-center space-x-3 rounded-xl transition-all duration-200 hover:bg-blue-50 
                    ${conversation.id === selectedConversationId 
                      ? 'bg-blue-50 border-l-4 border-blue-500 shadow-md' 
                      : 'hover:shadow-md'}`}
                  onClick={() => handleSelectConversation(conversation.id)}
                >
                  <img
                    src={conversation.participantsPhotos[0]}
                    alt={conversation.participants[0]}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {conversation.participants[0]}
                    </p>
                    <p className="text-sm text-gray-500">
                      {truncateText(conversation.messages[conversation.messages.length - 1].message)}
                    </p>
                  </div>
                  {/* Add unread message indicator if needed */}
                  <div className="w-3 h-3 bg-blue-500 rounded-full hidden"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section (Selected Conversation) */}
        <div className="w-[600px] flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center space-x-4 px-6 py-4 border-b border-gray-200 h-[80px] flex-shrink-0">
                <img
                  src={selectedConversation.participantsPhotos[0]}
                  alt={selectedConversation.participants[0]}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                />
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {selectedConversation.participants[0]}
                  </h2>
                  <p className="text-sm text-gray-500">Active now</p>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="flex flex-col space-y-4">
                  {selectedConversation.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-4 rounded-2xl shadow-sm break-words ${
                          msg.sender === "You"
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="h-[80px] px-6 py-4 border-t border-gray-200 flex-shrink-0">
                <div className="relative">
                  {/* Attachment Menu Popup */}
                  {showAttachMenu && (
                    <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg p-2 flex gap-2">
                      <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors flex flex-col items-center">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        <IoImageOutline size={20} className="text-blue-500" />
                        <span className="text-xs mt-1">Image</span>
                      </label>
                      <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors flex flex-col items-center">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        <IoAttachOutline size={20} className="text-blue-500" />
                        <span className="text-xs mt-1">File</span>
                      </label>
                    </div>
                  )}

                  {/* Input Container */}
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 h-[45px]">
                    {/* Attachment Button */}
                    <button
                      onClick={() => setShowAttachMenu(!showAttachMenu)}
                      className="p-1.5 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                      title="Attach files"
                    >
                      <IoAttachOutline size={18} className="text-gray-600" />
                    </button>

                    {/* Emoji Button */}
                    <button
                      className="p-1.5 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                      title="Add emoji"
                    >
                      <IoHappyOutline size={18} className="text-gray-600" />
                    </button>

                    {/* Text Input - Fixed Height with Horizontal Scroll */}
                    <input
                      type="text"
                      value={newMessage}
                      onChange={handleNewMessageChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 h-[24px] text-sm overflow-x-auto whitespace-nowrap"
                    />

                    {/* Record Audio Button */}
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
                        isRecording 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'hover:bg-gray-200'
                      }`}
                      title={isRecording ? "Stop recording" : "Start recording"}
                    >
                      <IoMicOutline 
                        size={18} 
                        className={isRecording ? 'text-white' : 'text-gray-600'} 
                      />
                    </button>

                    {/* Send Button */}
                    <button
                      onClick={handleSendMessage}
                      className="p-1.5 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors flex-shrink-0"
                      title="Send message"
                    >
                      <IoPaperPlaneOutline size={18} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p className="text-xl font-semibold">Select a conversation</p>
                <p className="text-sm">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Student Info Card */}
        <StudentInfoCard studentInfo={studentInfo} />
      </div>
    </div>
  );
};

export default MessagesPage;
