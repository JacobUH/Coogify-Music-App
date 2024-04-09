import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { PaymentMain } from '../components/interface/mainPages/PaymentMain';
import { Player } from '../components/interface/elements/Player';
import React from 'react';

export const Payment = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <PaymentMain />
      <Player />
      <Outlet />
    </div>
  );
};
