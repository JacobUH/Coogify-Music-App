import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { CountrySongsMain } from '../components/interface/mainPages/CountrySongsMain';
import React from 'react';

export const CountrySongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <CountrySongsMain />
      <Player />
      <Outlet />
    </div>
  );
};