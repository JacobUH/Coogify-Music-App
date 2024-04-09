import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { ProfileMain } from '../components/interface/mainPages/ProfileMain';
import { Player } from '../components/interface/elements/Player';
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
