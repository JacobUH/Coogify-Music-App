import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { LatinSongsMain } from '../components/interface/mainPages/LatinSongsMain';
import React from 'react';

export const LatinSongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <LatinSongsMain />
      <Player />
      <Outlet />
    </div>
  );
};