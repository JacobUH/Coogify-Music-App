import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface ConfirmationScreenProps {
  onClose: () => void; // Specify the type of onClose prop
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  onClose,
}) => {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate('/');
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
