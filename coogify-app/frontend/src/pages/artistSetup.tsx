import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../public/images/Logo.svg';
import { Footer } from '../components/setup/Footer';
import React from 'react';
import backendBaseUrl from '../apiConfig';

export const ArtistSetup = () => {
  const [artistName, setArtistName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const storedToken = localStorage.getItem('sessionToken');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    navigate('/home');
  };

  return (
    <div className="w-full h-full absolute inset-0 bg-gradient-to-tr from-[#9E67E4] via-transparent to-[#212121] text-white overflow-hidden p-6">
      <img src={Logo} alt="Coogify Logo" className="mx-auto pb-48 w-[70px]" />
      <h1 className="text-4xl text-white text-center mb-5 ">
        Welcome New Artist
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#3E3C3C] p-6 rounded-lg shadow-md md:w-[700px] mx-auto"
      >
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">
          <label htmlFor="firstName" className="block text-white">
            Artist Name
          </label>
          <input
            type="text"
            id="artistName"
            name="artistName"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            className="w-full bg-[#656262] rounded-[15px] px-3 py-5 focus:outline-none focus:border-purple-500 mb-16"
            required
            title="Please enter an artist name."
          />
        </div>

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white text-2xl rounded-[15px] px-8 py-2 block mx-auto"
        >
          Start Creating!
        </button>
      </form>
      <div className="pt-64">
        <Footer />
      </div>
    </div>
  );
};
