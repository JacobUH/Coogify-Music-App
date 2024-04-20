import React, { useEffect } from 'react';
import ProfileIcon from '/images/Profile Icon.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ConfirmationScreen } from './ConfirmationScreen';
import backendBaseUrl from '../../../apiConfig';
import axios from 'axios';

interface User {
  userID: number;
  email: string;
  firstName: string;
  lastName: string;
  isArtist: number;
  isAdmin: number;
  dateCreated: string;
}

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

  const [userCreds, setUserCreds] = useState<User[]>([]);

  const storedToken = localStorage.getItem('sessionToken');

  useEffect(() => {
    const fetchUserCredentials = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/user/userCredentials`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setUserCreds(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching new songs:', err);
      }
    };
    fetchUserCredentials();
  }, []);

  return (
    <div>
      <div className="relative z-50">
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
              {userCreds[0] &&
                userCreds[0].isArtist === 1 &&
                userCreds[0].isAdmin === 0 && (
                  <Link to="/analytics">
                    <div className="block m-2 px-3 py-3 hover:bg-[#656262]">
                      Analytics
                    </div>
                  </Link>
                )}
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
              {userCreds[0] &&
                userCreds[0].isArtist === 0 &&
                userCreds[0].isAdmin === 1 && (
                  <Link to="/reports">
                    <div className="block m-2 px-3 py-3 hover:bg-[#656262] border-b-2">
                      Reports
                    </div>
                  </Link>
                )}
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
