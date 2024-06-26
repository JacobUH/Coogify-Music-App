import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/images/Logo.svg';
import { Footer } from '../components/setup/Footer';
import axios from 'axios';
import backendBaseUrl from '../apiConfig';
import React from 'react';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email,
        password,
      })
    );

    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/adminLogin`, // Use backendBaseUrl here
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response);
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      // Assuming successful login, you can handle the session token here
      const storedToken = response.data.sessionID;
      if (storedToken) {
        console.log('new token is: ', storedToken);
      }

      // Store the session token in Local Storage or Session Storage
      localStorage.setItem('sessionToken', storedToken);

      // Assuming successful login, you can redirect the home page
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid Email or Password.');
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <div className="w-full h-full absolute inset-0 bg-gradient-to-tr from-[#9E67E4] via-transparent to-[#212121] text-white overflow-hidden p-6">
      <Link to="/">
        <img src={Logo} alt="Coogify Logo" className="mx-auto pb-20 w-[70px]" />
      </Link>
      <h1 className="text-4xl text-white text-center mb-5 mt-20">
        Admin Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#3E3C3C] p-6 rounded-lg shadow-md md:w-[700px] mx-auto "
      >
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#656262] rounded-[15px] px-3 py-5 focus:outline-none focus:border-purple-500"
            required
            title="Please enter an email."
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#656262] rounded-[15px] px-3 py-5 focus:outline-none focus:border-purple-500"
            required
            title="Please enter a password."
          />
        </div>
        {/* Use a regular button for form submission */}
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white text-2xl rounded-[15px] px-8 py-2 mt-16 block mx-auto"
        >
          Login
        </button>
      </form>
      <div className="pt-52">
        <Footer />
      </div>
    </div>
  );
};
