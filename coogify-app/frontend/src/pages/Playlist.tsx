import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { PlaylistMain } from '../components/interface/mainPages/PlaylistMain';
import { Player } from '../components/interface/elements/Player';
import React from 'react';

// change albumMain to playlistMain

export const Playlist = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <PlaylistMain />
      <Player />
      <Outlet />
    </div>
  );
};
