import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import { SubscriptionScreen } from './SubscriptionScreen';
import Logo from '/images/Logo.svg';

interface Song {
  trackID: number;
  songName: string;
  coverArtURL: string;
  songURL: string;
  albumName: string;
  artistName: string;
}

interface HandleClose {
  onClose: () => void; // Specify the type of onClose prop
  selectedSong: Song | null;
}

export const ChangeSong: React.FC<HandleClose> = ({
  onClose,
  selectedSong,
}) => {
  const handleNo = () => {
    onClose();
  };

  const storedToken = localStorage.getItem('sessionToken');

  const songUpdate = async () => {
    try {
      //console.log("this is the trackID: ", trackID, " and songName: ", songName);
      const response = await axios.post(
        `${backendBaseUrl}/api/update/updateSong`,
        {
          trackID: selectedSong?.trackID,
          songName: selectedSong?.songName,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      refreshPage();
    } catch (error) {
      console.error('error updating song:', error);
    }
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-60"></div>
        {/* Increased z-index to 60 */}
        <div className="md:ml-[400px] bg-[#3E3C3C] text-white rounded-lg px-14 pt-8 pb-14 shadow-md z-50 flex flex-col items-center">
          <img
            className="w-[35px] h-[35px] mb-8"
            src={Logo}
            alt="coogify logo"
          />
          <p className="text-4xl mb-6">Change Song Name</p>

          {/* Text box for new song name */}
          <input
            type="text"
            placeholder="Enter new song name"
            className="bg-gray-200 text-black rounded py-2 px-4 mb-6 w-full"
          />

          <div className="flex">
            <button
              className="bg-[#656262] hover:bg-[#9E67E4] text-white font-bold mt-2 mr-2 py-2 px-10 rounded"
              onClick={songUpdate}
            >
              Yes
            </button>

            <button
              className="bg-[#683f9c] hover:bg-[#9E67E4] text-white font-bold mt-2 py-2 px-10 rounded"
              onClick={handleNo}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
