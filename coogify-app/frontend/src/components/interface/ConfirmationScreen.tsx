import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import backendBaseUrl from '../../apiConfig';

interface ConfirmationScreenProps {
  onClose: () => void; // Specify the type of onClose prop
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  onClose,
}) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('sessionToken');

  const handleYes = async () => {
    console.log(
      JSON.stringify({
        storedToken,
      })
    );
    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/logout`, // Use backendBaseUrl here
        {
          sessionToken: storedToken,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      // Assuming successful login, you can redirect the home page
      console.log(
        'clearing stored token: ',
        storedToken,
        ' and marking to_delete to 1 in the database.'
      );
      localStorage.clear();
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('unable to logout and remove stored token.');
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        setError(error.response.data.error);
      }
    }
  };

  const handleNo = () => {
    onClose();
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-60"></div>{' '}
        {/* Increased z-index to 60 */}
        <div className="bg-[#3E3C3C] text-white rounded-lg p-4 shadow-md z-50 flex flex-col items-center">
          <p className="mb-4">Are you sure you want to logout?</p>
          <div className="flex">
            <Link
              to="/"
              className="bg-[#212020] hover:bg-[#3f3e3e] text-white font-bold py-2 px-4 mr-2 rounded"
              onClick={handleYes}
            >
              Yes
            </Link>
            <div
              className="bg-[#683f9c] hover:bg-[#9E67E4] text-white font-bold py-2 px-4 rounded"
              onClick={handleNo}
            >
              No
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
