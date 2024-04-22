import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import { SubscriptionScreen } from './SubscriptionScreen';
import Logo from '/images/Logo.svg';

interface HandleCloseSchool {
  onClose: () => void; // Specify the type of onClose prop
}

export const SchoolEmail: React.FC<
  HandleCloseSchool & {
    subscriptionType: string;
    price: string;
    subColor: string;
  }
> = ({ onClose, subscriptionType, price, subColor }) => {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  const handleNo = () => {
    onClose();
  };

  const handleContinue = () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const eduEmailRegex = /^[^\s@]+@([^\s@]+\.)+edu$/i; // Case insensitive
    if (!eduEmailRegex.test(email)) {
      setError('Please enter a valid .edu email.');
      return;
    }

    // If email format is valid, continue with showing the SubscriptionScreen component
    setShowPopup(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const HandleClosePopup = () => {
    setShowPopup(false);
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
          <p className="text-4xl mb-10">Enter Your School Email.</p>
          <input
            type="text"
            className="bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[350px] px-2 py-2 pb-2 mb-3 rounded-full text-center"
            placeholder="Enter your .edu email"
            value={email}
            onChange={handleEmailChange}
          />
          {error && <p className="text-[#b074ff] text-bold">{error}</p>}
          <div className="flex">
            <button
              className="bg-[#683f9c] hover:bg-[#9E67E4] text-white font-bold mt-4 mr-2 py-2 px-10 rounded"
              onClick={handleContinue}
            >
              Continue
            </button>
            {showPopup && (
              <SubscriptionScreen
                onClose={HandleClosePopup}
                subscriptionType={subscriptionType} // Pass subscription type as prop
                price={price} // Pass price as prop
                subColor={subColor}
              />
            )}{' '}
            <button
              className="bg-[#656262] hover:bg-[#9E67E4] text-white font-bold mt-4 py-2 px-10 rounded"
              onClick={handleNo}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
