import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { AlbumMain } from '../components/interface/mainPages/AlbumMain';
import { Player } from '../components/interface/elements/Player';
import React from 'react';

// change albumMain to playlistMain

export const Playlist = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <AlbumMain />
      <Player />
      <Outlet />
    </div>
  );
};
