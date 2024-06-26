import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '/images/Back Button.svg';
import { ExtendedCountrySongs } from '../extendedPages/extendedCountrySongs';

export const CountrySongsMain = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto">
        <div className="fixed ml-10 mt-10 z-10">
          <img
            src={BackButton}
            alt="Back"
            onClick={handleBack}
            className="cursor-pointer"
          />
        </div>
        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Country Mix
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* Work in here */}
          <div className="w-full flex justify-center items-center">
            <ExtendedCountrySongs title="Country Songs" />
          </div>
        </div>
      </div>
    </div>
  );
};
