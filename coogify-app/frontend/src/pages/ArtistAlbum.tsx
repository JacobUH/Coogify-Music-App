import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { ArtistAlbumMain } from '../components/interface/mainPages/ArtistAlbumMain';
import { Player } from '../components/interface/elements/Player';
import React from 'react';

export const ArtistAlbum = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <ArtistAlbumMain />
      <Player />
      <Outlet />
    </div>
  );
};
