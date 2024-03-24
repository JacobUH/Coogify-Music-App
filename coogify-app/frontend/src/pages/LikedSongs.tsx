import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/Sidebar';
import { Navbar } from '../components/interface/Navbar';
import { LikedSongsMain } from '../components/interface/LikedSongsMain';
import { Player } from '../components/interface/Player';
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
