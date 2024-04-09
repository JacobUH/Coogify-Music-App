import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { RapSongsMain } from '../components/interface/mainPages/rapSongsMain';
import React from 'react';

export const RapSongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <RapSongsMain />
      <Player />
      <Outlet />
    </div>
  );
};
