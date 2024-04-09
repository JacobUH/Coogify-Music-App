import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { SubscriptionMain } from '../components/interface/mainPages/SubscriptionMain';
import { Player } from '../components/interface/elements/Player';
import React from 'react';

export const Subscription = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <SubscriptionMain />
      <Player />
      <Outlet />
    </div>
  );
};
