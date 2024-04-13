import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { ClassicalSongsMain } from '../components/interface/mainPages/ClassicalSongsMain';
import React from 'react';

export const ClassicalSongs = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <ClassicalSongsMain />
      <Player />
      <Outlet />
    </div>
  );
};