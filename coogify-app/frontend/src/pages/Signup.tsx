import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../public/images/Logo.svg';
import { Footer } from '../components/setup/Footer';
import React from 'react';

export const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      })
    );
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_HOST}:${
          import.meta.env.VITE_BACKEND_PORT
        }/api/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        }
      );

      console.log('Response:', response); // Add this line to check response

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      // Assuming successful signup, you can redirect the user to another page
      window.location.href = '/setup';
    } catch (error: unknown) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="w-full h-full absolute inset-0 bg-gradient-to-tr from-[#9E67E4] via-transparent to-[#212121] text-white overflow-hidden p-6">
      <Link to="/">
        <img src={Logo} alt="Coogify Logo" className="mx-auto pb-20 w-[70px]" />
      </Link>
      <h1 className="text-4xl text-white text-center mb-5 ">Get Started</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#3E3C3C] p-6 rounded-lg shadow-md md:w-[700px] mx-auto "
      >
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">
          <label htmlFor="firstName" className="block text-white">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-[#656262] rounded-[15px] px-3 py-5 focus:outline-none focus:border-purple-500"
            required
            title="Please enter a first name."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-white">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-[#656262] rounded-[15px] px-3 py-5 focus:outline-none focus:border-purple-500"
            required
            title="Please enter a last name."
          />
        </div>
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
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white text-2xl rounded-[15px] px-8 py-2 block mx-auto"
        >
          Let's Go!
        </button>
      </form>
      <Link to="/Login">
        <h1 className="text-[#B67DFF] hover:text-[white] text-center underline pt-5">
          I Already Have an Account
        </h1>
      </Link>
      <div className="pt-14">
        <Footer />
      </div>
    </div>
  );
};
