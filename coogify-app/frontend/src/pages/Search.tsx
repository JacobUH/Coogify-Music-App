import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { SearchMain } from '../components/interface/mainPages/SearchMain';
import { Player } from '../components/interface/elements/Player';
import React from 'react';

export const Search = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <SearchMain />
      <Player />
      <Outlet />
    </div>
  );
};
