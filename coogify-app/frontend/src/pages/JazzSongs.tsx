import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { JazzSongsMain } from '../components/interface/mainPages/JazzSongsMain';
import React from 'react';

export const JazzSongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <JazzSongsMain />
      <Player />
      <Outlet />
    </div>
  );
};