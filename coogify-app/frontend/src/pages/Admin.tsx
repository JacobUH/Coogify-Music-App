import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { AdminMain } from '../components/interface/mainPages/AdminMain';
import { Player } from '../components/interface/elements/Player';
import React from 'react';
import { AdminNavbar } from '../components/interface/elements/AdminNavbar';

export const Admin = () => {
  return (
    <div className="w-full h-full text-white relative">
      <AdminNavbar />
      <AdminMain />
      <Outlet />
    </div>
  );
};
