import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import { SubscriptionScreen } from './SubscriptionScreen';
import Logo from '/images/Logo.svg';

interface Song {
  trackID: number;
  genreID: number;
  genreName: string;
  artistID: number;
  artistName: string;
  albumName: string;
  songName: string;
  coverArtURL: string;
  duration: string;
  releaseDate: string;
  songURL: string;
  likes: number;
  plays: number;
}

interface Album {
  albumName: string;
  coverArtURL: string;
  artistName: string;
  trackID: string;
}

interface HandleClose {
  onClose: () => void; // Specify the type of onClose prop
}

export const ConfirmCancelScreen: React.FC<
  HandleClose & {
    condition: string;
    selectedSong: Song | null;
    selectedAlbum: Album | null;
  }
> = ({ onClose, condition, selectedSong, selectedAlbum }) => {
  const handleNo = () => {
    onClose();
  };

  const handleYes = () => {
    if (condition === 'cancel') {
      cancelSubscription();
    } else if (condition === 'restore') {
      restoreSubscription();
    } else if (condition === 'deleteSong') {
      deleteSong();
    } else if (condition === 'deleteAlbum') {
      deleteAlbum();
    }
    onClose();
  };

  const storedToken = localStorage.getItem('sessionToken');

  const cancelSubscription = async () => {
    try {
      const response = await axios.get(
        `${backendBaseUrl}/api/subscription/cancelSubscription`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      refreshPage();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    }
  };

  const restoreSubscription = async () => {
    try {
      const response = await axios.get(
        `${backendBaseUrl}/api/subscription/restoreSubscription`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      refreshPage();
    } catch (error) {
      console.error('Error restoring subscription:', error);
    }
  };

  const deleteSong = async () => {
    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/update/deleteSong`,
        {
          trackID: selectedSong?.trackID,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      refreshPage();
    } catch (error) {
      console.error('Error restoring subscription:', error);
    }
  };

  const deleteAlbum = async () => {
    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/update/deleteAlbum`,
        {
          albumName: selectedAlbum?.albumName,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      refreshPage();
    } catch (error) {
      console.error('Error restoring subscription:', error);
    }
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-60"></div>{' '}
        {/* Increased z-index to 60 */}
        <div className="md:ml-[400px] bg-[#3E3C3C] text-white rounded-lg px-14 pt-8 pb-14 shadow-md z-50 flex flex-col items-center">
          <img
            className="w-[35px] h-[35px] mb-8"
            src={Logo}
            alt="coogify logo"
          />
          <p className="text-4xl mb-10">Are You Sure?</p>
          <div className="flex">
            <button
              className="bg-[#683f9c] hover:bg-[#9E67E4] text-white font-bold mt-4 mr-2 py-2 px-10 rounded"
              onClick={handleYes}
            >
              Yes
            </button>

            <button
              className="bg-[#656262] hover:bg-[#9E67E4] text-white font-bold mt-4 py-2 px-10 rounded"
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
