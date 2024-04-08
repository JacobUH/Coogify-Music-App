import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/Sidebar';
import { Navbar } from '../components/interface/Navbar';
import { NewestSongsMain } from '../components/interface/NewestSongsMain';
import { Player } from '../components/interface/Player';
import React from 'react';

export const NewestSongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <NewestSongsMain />
      <Player />
      <Outlet />
    </div>
  );
};
