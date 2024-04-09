import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { LibraryMain } from '../components/interface/mainPages/LibraryMain';
import { Player } from '../components/interface/elements/Player';
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
