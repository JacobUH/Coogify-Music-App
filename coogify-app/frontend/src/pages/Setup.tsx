import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../public/images/Logo.svg';
import { Footer } from '../components/setup/Footer';
import React from 'react';

export const Setup = () => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form data
    if (month && day && year) {
      // Form is valid, navigate to setup page
      window.location.href = '/home'; // Alternatively, use useHistory() from react-router-dom for programmatic navigation
    } else {
      // Form is not valid, display error message or handle accordingly
      console.error('Please fill out all required fields');
    }
  };

  return (
    <div className="w-full h-full absolute inset-0 bg-gradient-to-tr from-[#9E67E4] via-transparent to-[#212121] text-white overflow-hidden p-6">
      <Link to="/">
        <img src={Logo} alt="Coogify Logo" className="mx-auto pb-20 w-[70px]" />
      </Link>
      <h1 className="text-4xl text-white text-center mb-5 pt-16">
        Let's Setup Your Account
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#3E3C3C] p-6 rounded-lg shadow-md md:w-[700px] mx-auto "
      >
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
            className="w-full bg-[#6F4D9B] hover:bg-[#533976] rounded-[15px] text-2xl p-3 px-3 py-5"
          >
            Continue as Listener
          </button>
          <button
            type="submit"
            className="w-full bg-[#472670] hover:bg-[#361e55] rounded-[15px] text-2xl p-3 px-3 py-5"
          >
            Continue as Artist
          </button>
        </div>
      </form>
      <div className="pt-44">
        <Footer />
      </div>
    </div>
  );
};
