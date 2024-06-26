import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { LikedSongsMain } from '../components/interface/mainPages/LikedSongsMain';
import { Player } from '../components/interface/elements/Player';
import React from 'react';

export const LikedSongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <LikedSongsMain />
      <Player />
      <Outlet />
    </div>
  );
};
