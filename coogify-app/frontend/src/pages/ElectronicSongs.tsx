import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { ElectronicSongsMain } from '../components/interface/mainPages/ElectronicSongsMain';
import React from 'react';

export const ElectronicSongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <ElectronicSongsMain />
      <Player />
      <Outlet />
    </div>
  );
};