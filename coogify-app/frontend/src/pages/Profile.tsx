import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/Sidebar';
import { Navbar } from '../components/interface/Navbar';
import { ProfileMain } from '../components/interface/ProfileMain';
import { Player } from '../components/interface/Player';
import React from 'react';

export const Profile = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <ProfileMain />
      <Player />
      <Outlet />
    </div>
  );
};
