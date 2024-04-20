import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { AnalyticsMain } from '../components/interface/mainPages/AnalyticsMain';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import React from 'react';

export const Analytics = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <AnalyticsMain />
      <Player />
      <Outlet />
    </div>
  );
};
