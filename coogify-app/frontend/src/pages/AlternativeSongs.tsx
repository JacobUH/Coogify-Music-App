import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { AlternativeSongsMain } from '../components/interface/mainPages/AlternativeSongsMain';
import React from 'react';

export const AlternativeSongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <AlternativeSongsMain />
      <Player />
      <Outlet />
    </div>
  );
};