import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/Sidebar';
import { Navbar } from '../components/interface/Navbar';
import { SearchMain } from '../components/interface/SearchMain';
import { Player } from '../components/interface/Player';
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
