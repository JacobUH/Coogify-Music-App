import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { UploadMain } from '../components/interface/mainPages/UploadMain';
import React from 'react';

export const Upload = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <UploadMain />
      <Player />
      <Outlet />
    </div>
  );
};
