import { Outlet } from 'react-router-dom';
import React from 'react';
import { AdminNavbar } from '../components/interface/elements/AdminNavbar';
import { AdminSearchMain } from '../components/interface/mainPages/AdminSearchMain';

export const AdminSearch = () => {
  return (
    <div className="w-full h-full text-white relative">
      <AdminNavbar />
      <AdminSearchMain />
      <Outlet />
    </div>
  );
};
