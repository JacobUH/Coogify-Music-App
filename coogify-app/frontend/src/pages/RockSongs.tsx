import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { RockSongsMain } from '../components/interface/mainPages/RockSongsMain';
import React from 'react';

export const RockSongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <RockSongsMain />
      <Player />
      <Outlet />
    </div>
  );
};