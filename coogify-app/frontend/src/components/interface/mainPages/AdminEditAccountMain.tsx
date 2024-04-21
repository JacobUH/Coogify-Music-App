import React, { useEffect, useState } from 'react';
import BackButton from '/images/Back Button.svg';
import { Link, useNavigate } from 'react-router-dom';
import backendBaseUrl from '../../../apiConfig';
import axios from 'axios';

interface Table {
  userRole: string;
  fullName: string;
  email: string;
  subType: string;
  totRevenue: number;
  numPlaylists: number;
  numSessions: number;
  dateCreated: string;
}

export const AdminEditAccountMain = () => {
  const storedToken = localStorage.getItem('sessionToken');
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div
      className="text-white pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 130px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-hidden">
        <div className="absolute top-40 left-20">
          <img
            src={BackButton}
            alt="Back"
            onClick={handleBack}
            className="cursor-pointer"
          />
        </div>
        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Edit Account
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* Create Admin Account */}
          <Link
            to="/adminCreate"
            className="w-full bg-[#575656] text-center text-white py-9 rounded-xl shadow-lg hover:bg-blue-600 transition duration-300"
          >
            <span className="text-3xl font-semibold">Create Admin Account</span>
          </Link>

          {/* Edit User/Artist Account */}
          <Link
            to="/editAccount"
            className="w-full bg-[#575656] text-center text-white py-9 rounded-xl shadow-lg hover:bg-green-600 transition duration-300"
          >
            <span className="text-3xl font-semibold">Edit Account</span>
          </Link>

          {/* Edit Song/Album Access */}
          <Link
            to="/editMusic"
            className="w-full bg-[#575656] text-center text-white py-9 rounded-xl shadow-lg hover:bg-yellow-600 transition duration-300"
          >
            <span className="text-3xl font-semibold">
              Edit Song/Album Access
            </span>
          </Link>

          {/* User Metric Data Report */}
          <Link
            to="/userReport"
            className="w-full bg-[#575656] text-center text-white py-9 rounded-xl shadow-lg hover:bg-purple-600 transition duration-300"
          >
            <span className="text-3xl font-semibold">
              User Metric Data Report
            </span>
          </Link>

          {/* Financial Data Report */}
          <Link
            to="/financialReport"
            className="w-full bg-[#575656] text-center text-white py-9 rounded-xl shadow-lg hover:bg-red-600 transition duration-300"
          >
            <span className="text-3xl font-semibold">
              Financial Data Report
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
