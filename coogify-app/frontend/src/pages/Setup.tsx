import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/images/Logo.svg';
import { Footer } from '../components/setup/Footer';
import axios from 'axios';
import backendBaseUrl from '../apiConfig';
import React from 'react';

export const Setup = () => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

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
      if (userType === 'listener') {
        try {
          const response = await axios.post(
            `${backendBaseUrl}/api/setup/userSetup`,
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
          navigate('/home');
        } catch (error) {
          console.error('Error seting up as listener:', error);
        }
      } else if (userType === 'artist') {
        try {
          const response = await axios.post(
            `${backendBaseUrl}/api/setup/artistSetup`,
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
          navigate(`/artistSetup`);
        } catch (error) {
          console.error('Error seting up as artist:', error);
        }
      }
    }
  };

  return (
    <div className="w-full h-full absolute inset-0 bg-gradient-to-tr from-[#9E67E4] via-transparent to-[#212121] text-white overflow-hidden p-6">
      <img src={Logo} alt="Coogify Logo" className="mx-auto pb-20 w-[70px]" />
      <h1 className="text-4xl text-white text-center mb-5 pt-16">
        Let's Setup Your Account
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
            onClick={() => handleSubmit('listener')}
            className="w-full bg-[#6F4D9B] hover:bg-[#533976] rounded-[15px] text-2xl p-3 px-3 py-5"
          >
            Continue as Listener
          </button>
          <button
            type="submit"
            onClick={() => handleSubmit('artist')}
            className="w-full bg-[#472670] hover:bg-[#361e55] rounded-[15px] text-2xl p-3 px-3 py-5"
          >
            Continue as Artist
          </button>
        </div>
      </div>
      <div className="pt-44">
        <Footer />
      </div>
    </div>
  );
};
