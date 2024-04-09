import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { ReportMain } from '../components/interface/mainPages/ReportMain';
import { Player } from '../components/interface/elements/Player';
import React from 'react';

export const Report = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <ReportMain />
      <Player />
      <Outlet />
    </div>
  );
};
