import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import Logo from '/images/Logo.svg';

interface HandleCloseActive {
  onClose: () => void; // Specify the type of onClose prop
}

export const SubscriptionActive: React.FC<HandleCloseActive> = ({
  onClose,
}) => {
  const handleNo = () => {
    onClose();
  };

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
          <p className="text-4xl">You Already Have a Subscription!</p>
          <div className="flex">
            <button
              className="bg-[#683f9c] hover:bg-[#9E67E4] text-white font-bold mt-14 py-2 px-10 rounded"
              onClick={handleNo}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
