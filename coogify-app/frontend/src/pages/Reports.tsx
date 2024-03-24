import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/Sidebar';
import { Navbar } from '../components/interface/Navbar';
import { ReportMain } from '../components/interface/ReportMain';
import { Player } from '../components/interface/Player';
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
