import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/Sidebar';
import { Navbar } from '../components/interface/Navbar';
import { LibraryMain } from '../components/interface/LibraryMain';
import { Player } from '../components/interface/Player';
import React from 'react';

export const Library = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <LibraryMain />
      <Player />
      <Outlet />
    </div>
  );
};
