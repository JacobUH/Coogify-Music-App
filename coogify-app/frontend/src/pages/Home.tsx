import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { HomeMain } from '../components/interface/mainPages/HomeMain';
import { Player } from '../components/interface/elements/Player';
import React from 'react';

export const Home = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <HomeMain />
      <Player />
      <Outlet />
    </div>
  );
};
