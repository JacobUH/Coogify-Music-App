import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { EditAlbumMain } from '../components/interface/mainPages/EditAlbumMain';
import { Player } from '../components/interface/elements/Player';
import React from 'react';

export const EditAlbumPage = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <EditAlbumMain />
      <Player />
      <Outlet />
    </div>
  );
};
