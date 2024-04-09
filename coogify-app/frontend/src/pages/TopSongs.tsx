import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { TopSongsMain } from '../components/interface/mainPages/TopSongsMain';
import { Player } from '../components/interface/elements/Player';
import React from 'react';

export const TopSongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <TopSongsMain />
      <Player />
      <Outlet />
    </div>
  );
};
