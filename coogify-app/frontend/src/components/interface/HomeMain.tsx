import React from 'react';
import {
  newSongs,
  topSongs,
  rapSongs,
  rbSongs,
} from '../../../public/data/songs';
import { NewMusicRows } from './NewMusicRows';
import { Link } from 'react-router-dom';

export const HomeMain = () => {
  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto">
        <div className="flex flex-col text-[40px] gap-5 px-5 md:py-5 pb-20 pt-5">
          <span>Welcome Back!</span>
          <div className="flex flex-row">
            <Link to="/likedSongs">
              <button className="bg-[#656262] w-[280px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                Liked Songs
              </button>
            </Link>
            <Link to="/library">
              <button className="bg-[#656262] w-[280px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                Your Music
              </button>
            </Link>
            <Link to="/reports">
              <button className="bg-[#656262] w-[280px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                Data Reports
              </button>
            </Link>
            <Link to="/payment">
              <button className="bg-[#656262] w-[280px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                Payments
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          <div className="w-full flex flex-col gap-8">
            <NewMusicRows title="Newest Songs" data={newSongs} />
            <NewMusicRows title="Top Songs" data={topSongs} />
            <NewMusicRows title="Rap Mix" data={rapSongs} />
            <div className="mb-8">
              <NewMusicRows title="Smooth R&B" data={rbSongs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
