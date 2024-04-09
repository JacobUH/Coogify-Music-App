import React from 'react';
import { useState } from 'react';

export const SearchMain = () => {
  const [input, setInput] = useState('');

  /*const fetchData = (value: string) => {}; */

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-hidden">
        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Search
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          <div className="w-full flex justify-center">
            <input
              type="text"
              placeholder="Search for songs, albums, artists"
              className="w-full max-w-5xl bg-[#292828] rounded-full text-center px-4 py-5 text-2xl focus:outline-none hover:ring hover:ring-[#9E67E4]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="w-full item text-center">
            <h2 className="text-3xl font-semibold mb-3">Songs</h2>
            <div className="grid grid-cols-3 gap-5">
              {/* Render songs here */}
            </div>
          </div>
          <div className="w-full text-center">
            <h2 className="text-3xl font-semibold mb-3">Albums</h2>
            <div className="grid grid-cols-3 gap-5">
              {/* Render albums here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
