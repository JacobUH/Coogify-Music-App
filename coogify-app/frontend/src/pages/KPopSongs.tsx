import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { KPopSongsMain } from '../components/interface/mainPages/KPopSongsMain';
import React from 'react';

export const KPopSongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <KPopSongsMain />
      <Player />
      <Outlet />
    </div>
  );
};