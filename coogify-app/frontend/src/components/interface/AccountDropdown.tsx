import React from 'react';
import ProfileIcon from '../../../public/images/Profile Icon.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ConfirmationScreen } from './ConfirmationScreen';

export const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCon, setShowCon] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setShowCon(true);
    setIsOpen(false); // Close the dropdown when the logout button is clicked
  };

  const handleCloseConfirmation = () => {
    setShowCon(false); // Close the confirmation screen
  };

  return (
    <div>
      <div className="relative">
        <img
          src={ProfileIcon}
          alt="Profile Icon"
          onClick={toggleDropdown}
        ></img>
        {isOpen && (
          <div className="absolute mt-2 right-0">
            <div className="bg-[#3A3838] text-white rounded-lg text-right py-1">
              {/* Work Here */}
              <Link to="/profile">
                <div className="block m-2 px-3 py-3 hover:bg-[#656262]">
                  Profile
                </div>
              </Link>
              <Link to="/subscription">
                <div className="block m-2 px-3 py-3 hover:bg-[#656262]">
                  Subscription
                </div>
              </Link>
              <Link to="/payment">
                <div className="block m-2 px-3 py-3 hover:bg-[#656262] ">
                  Payment
                </div>
              </Link>
              <Link to="/reports">
                <div className="block m-2 px-3 py-3 hover:bg-[#656262] border-b-2">
                  Reports
                </div>
              </Link>
              <div
                className="block m-2 px-3 py-3 hover:bg-[#656262]"
                onClick={handleLogout} // here chatGPT
              >
                Logout
              </div>
            </div>
          </div>
        )}
        {showCon && <ConfirmationScreen onClose={handleCloseConfirmation} />}
      </div>
    </div>
  );
};
