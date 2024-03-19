import React from 'react';
import { playlists, yourMusic } from '../../../public/data/songs';
import { LibraryRows } from './LibraryRows';
import { MusicRows } from './MusicRows';

export const LibraryMain = () => {
  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-y-hidden">
        <div className="text-center text-4xl font-bold mb-2 mt-[45px] text-[50px]">
          Library
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-1 md:py-5 pb-20 pt-5">
          {/* Work in here */}
          <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
            <div className="w-full flex flex-col gap-8">
              <LibraryRows title="Your Playlists" data={playlists} />
              <MusicRows title="Your Music" data={yourMusic} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
