import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/images/Logo.svg';
import { Footer } from '../components/setup/Footer';
import axios from 'axios';
import backendBaseUrl from '../apiConfig';
import React from 'react';

export const AdminSetup = () => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState({ message: '', className: '' });

  const navigate = useNavigate();
  const storedToken = localStorage.getItem('sessionToken');

  const handleSubmit = async (userType: string) => {
    // Validate form data
    if (month && day && year) {
      // Concatenate the values into a single string in "YYYY-MM-DD" format
      const dateString = `${year}-${month.padStart(2, '0')}-${day.padStart(
        2,
        '0'
      )}`;
      // Form is valid, navigate based on user type
      if (userType === 'admin') {
        try {
          const response = await axios.post(
            `${backendBaseUrl}/api/setup/adminSetup`,
            {
              dateOfBirth: dateString,
            },
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
          console.log('Response:', response);
          setError({
            message: 'Admin Account created successfully',
            className: 'text-[#9E67E4]',
          });
          // Wait for 2 seconds before calling refreshPage()
          setTimeout(() => {
            navigate('/admin');
          }, 2000);
        } catch (error) {
          console.error('Error seting up as admin:', error);
        }
      }
    }
  };

  return (
    <div className="w-full h-full absolute inset-0 bg-gradient-to-tr from-[#9E67E4] via-transparent to-[#212121] text-white overflow-hidden p-6">
      <img src={Logo} alt="Coogify Logo" className="mx-auto pb-20 w-[70px]" />
      <h1 className="text-4xl text-white text-center mb-5 pt-16">
        Admin Setup
      </h1>
      <div className="bg-[#3E3C3C] p-6 rounded-lg shadow-md md:w-[700px] mx-auto ">
        <h1 className="text-xl text-white text-center pb-6">
          When's Your Birthday?
        </h1>
        <div className="flex space-x-4">
          <input
            type="number"
            id="month"
            name="month"
            placeholder="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="flex-1 bg-[#656262] text-center rounded-[15px] px-3 py-5 focus:outline-none focus:border-purple-500"
            min="1"
            max="12"
            required
          />
          <input
            type="number"
            id="day"
            name="day"
            placeholder="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="flex-1 bg-[#656262] text-center rounded-[15px] px-3 py-5 focus:outline-none focus:border-purple-500"
            min="1"
            max="31"
            required
          />
          <input
            type="number"
            id="year"
            name="year"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="flex-1 bg-[#656262] text-center rounded-[15px] px-3 py-5 focus:outline-none focus:border-purple-500"
            min="1900"
            max="2100"
            required
          />
        </div>
        <div className="space-y-4 pt-14">
          <button
            type="submit"
            onClick={() => handleSubmit('admin')}
            className="w-full bg-[#6F4D9B] hover:bg-[#533976] rounded-[15px] text-2xl p-3 px-3 py-5"
          >
            Complete Admin Creation
          </button>
        </div>
        {error && (
          <div
            className={`error ${error.className} text-center text-xl font-bold mt-5 mb-4`}
          >
            {error.message}
          </div>
        )}
      </div>
      <div className="pt-64">
        <Footer />
      </div>
    </div>
  );
};
