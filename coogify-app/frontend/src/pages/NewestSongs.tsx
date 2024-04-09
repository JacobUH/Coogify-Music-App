import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { NewestSongsMain } from '../components/interface/mainPages/NewestSongsMain';
import { Player } from '../components/interface/elements/Player';
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
