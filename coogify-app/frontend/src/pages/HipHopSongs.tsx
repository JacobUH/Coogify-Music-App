import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { HipHopSongsMain } from '../components/interface/mainPages/HipHopSongsMain';
import React from 'react';

export const HipHopSongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <HipHopSongsMain />
      <Player />
      <Outlet />
    </div>
  );
};