// components/StudentInfoCard.js

import React from 'react';

const StudentInfoCard = ({ studentInfo }) => {
  return (
    <div className="w-1/3 p-6 bg-gradient-to-br from-[#1A1A1B] to-[#555555] text-white rounded-3xl ml-6">
      {/* Student Picture */}
      <div className="mb-4 text-center">
        <img
          src={studentInfo.picture}
          alt={studentInfo.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold">{studentInfo.name}</h2>
        <p className="text-sm">{studentInfo.major}</p>
      </div>

      {/* Student Info */}
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-lg">Email:</p>
          <p className="text-sm">{studentInfo.email}</p>
        </div>
        <div>
          <p className="font-semibold text-lg">Phone:</p>
          <p className="text-sm">{studentInfo.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;
