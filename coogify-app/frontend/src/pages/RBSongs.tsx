import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { RBSongsMain } from '../components/interface/mainPages/RBSongsMain';
import React from 'react';

export const RBSongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <RBSongsMain />
      <Player />
      <Outlet />
    </div>
  );
};
