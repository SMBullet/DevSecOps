// components/StudentInfoCard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentInfoCard = () => {
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        if (!token) throw new Error('No token found');

        const response = await axios.get('http://128.110.219.24:5050/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { user } = response.data;

        setStudentInfo({
          username: user.username,
          email: user.email,
          dob: user.dob,
          role: user.role,
          picture: user.picture || 'https://static.vecteezy.com/system/resources/thumbnails/049/462/170/small_2x/anonymous-man-in-black-hoodie-with-hooded-face-evoking-mystery-and-intrigue-in-dark-setting-photo.jpeg',
        });
      } catch (error) {
        console.error('Error fetching student info:', error);
      }
    };

    fetchStudentInfo();
  }, []);

  if (!studentInfo) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="w-1/3 p-6 bg-gradient-to-br from-[#1A1A1B] to-[#555555] text-white rounded-3xl ml-6">
      {/* Student Picture */}
      <div className="mb-4 text-center">
        <img
          src={studentInfo.picture}
          alt={studentInfo.username}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold">{studentInfo.username}</h2>
      </div>

      {/* Student Info */}
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-lg">Email:</p>
          <p className="text-sm">{studentInfo.email}</p>
        </div>
        <div>
          <p className="font-semibold text-lg">Date of Birth:</p>
          <p className="text-sm">{studentInfo.dob}</p>
        </div>
        <div>
          <p className="font-semibold text-lg">Role:</p>
          <p className="text-sm">{studentInfo.role}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;
